import { SharedStyle } from "sketch";
import { hexToRgba, rgbaToFloatingPointRgbaString } from "../utils/color";

export type FloatingRgbaString = RGBA<string>;

interface RGBA<T> {
  r: T;
  g: T;
  b: T;
  a: T;
}

interface ByColorItem {
  name: string;
  dark: FloatingRgbaString;
  light: FloatingRgbaString;
}

export interface ByThemeItem {
  name: string;
  value: string;
}

export interface ByThemes {
  dark: ByThemeItem[];
  light: ByThemeItem[];
}

export type ByColors = ByColorItem[];

const createThemeObject = (themedLayerStyles: SharedStyle[]) => {
  let byColor: {
    name: string;
    dark?: FloatingRgbaString;
    light?: FloatingRgbaString;
  }[] = [];
  let byTheme: ByThemes = {
    light: [],
    dark: []
  };
  let errors: string[] = [];

  themedLayerStyles.forEach(sharedStyle => {
    const splittedName = sharedStyle.name.split("/");
    const colorName = splittedName[2].replace(/\s/g, "").replace("-", "");
    const themeName = splittedName[1].toLowerCase() as "light" | "dark";
    if (colorName.charAt(0) !== "_") {
      const color = sharedStyle.style.fills[0].color;
      const rgba = rgbaToFloatingPointRgbaString(hexToRgba(color));
      const androidHex =
        color.substring(0, 1) +
        color.slice(-2) +
        color.substring(1, color.length - 2);

      let byColorIndex = byColor.findIndex(c => c.name === colorName);

      if (byColorIndex > -1) {
        byColor[byColorIndex] = {
          ...byColor[byColorIndex],
          [themeName]: rgba
        };
      } else {
        byColor.push({ name: colorName, [themeName]: rgba });
      }

      byTheme[themeName].push({ name: colorName, value: androidHex });
    }
  });

  byColor.forEach(c => {
    if (!c.light) errors.push(`"${c.name}" has no light color.`);
    if (!c.dark) errors.push(`"${c.name}" has no dark color.`);
  });

  if (errors.length) {
    throw {
      type: "alert",
      title: "Missing colors",
      message: errors.map(error => `· ${error}`).join("\n")
    };
  }

  return { byColor: byColor as ByColors, byTheme };
};

export default createThemeObject;

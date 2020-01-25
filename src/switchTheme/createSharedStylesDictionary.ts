import { SharedStyle, Style } from "sketch";

export interface StylesDictionary {
  [index: string]: {
    colorName: string;
    themeName: string;
    style: Style;
    oppositeStyle: OppositeStyle;
  };
}

interface OppositeStyle {
  themeName: string;
  id: string;
  style: Style;
}

const createSharedStylesDictionary = (
  sharedStyles: SharedStyle[]
): StylesDictionary => {
  let dictionary: StylesDictionary = {};
  let errors: string[] = [];

  sharedStyles.forEach(s => {
    const splitted = s.name.split("/");
    const colorName = splitted[2].toLowerCase();
    const themeName = splitted[1];
    const oppositeStyle = sharedStyles.find(
      a => a.name.split("/")[2].toLowerCase() === colorName && a.id !== s.id
    );
    if (oppositeStyle) {
      dictionary[s.id] = {
        colorName: colorName,
        themeName: themeName,
        style: s.style,
        oppositeStyle: {
          id: oppositeStyle.id,
          style: oppositeStyle.style,
          themeName: oppositeStyle.name.split("/")[1]
        }
      };
    } else {
      errors.push(
        `"${colorName}" has no ${
          themeName === "Light" ? "Dark" : "Light"
        } color.`
      );
    }
  });

  if (errors.length) {
    throw {
      type: "alert",
      title: "Missing colors",
      message: errors.map(error => `· ${error}`).join("\n")
    };
  }

  return dictionary;
};

export default createSharedStylesDictionary;

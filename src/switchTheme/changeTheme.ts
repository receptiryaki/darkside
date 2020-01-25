import { Layers } from "./getAllLayersFromArtboard";
import { Override, ShapePathSelection } from "sketch";
import { StylesDictionary } from "./createSharedStylesDictionary";

export type Target = OverrideType | LayerType;

interface OverrideType {
  type: "override";
  value: Override;
}

interface LayerType {
  type: "layer";
  value: ShapePathSelection;
}

const changeTheme = (layers: Layers[], stylesDictionary: StylesDictionary) => {
  let anyChanged = false;
  let baseTheme: string;
  layers.forEach(layer => {
    switch (layer.type) {
      case "ShapePath":
        const d = layer.sharedStyleId && stylesDictionary[layer.sharedStyleId];
        if (d) {
          if (!baseTheme) baseTheme = d.themeName;
          if (d.oppositeStyle.themeName !== baseTheme) {
            layer.sharedStyleId = d.oppositeStyle.id;
            layer.style = d.oppositeStyle.style;
            anyChanged = true;
          }
        }
        break;
      case "SymbolInstance":
        layer.overrides.forEach(o => {
          const d = typeof o.value === "string" && stylesDictionary[o.value];
          if (d) {
            if (!baseTheme) baseTheme = d.themeName;
            if (d.oppositeStyle.themeName !== baseTheme) {
              o.value = d.oppositeStyle.id;
              anyChanged = true;
            }
          }
        });
        break;
      default:
        break;
    }
  });
  if (!anyChanged) {
    throw {
      type: "alert",
      title: "Not found",
      message: "Can not found any themed item"
    };
  }
};

export default changeTheme;

import {
  Selection,
  SelectionLayers,
  ShapePathSelection,
  ImageSelection,
  SymbolInstanceSelection
} from "sketch";

export type Layers =
  | ShapePathSelection
  | ImageSelection
  | SymbolInstanceSelection;

const extractLayers = (artboards: SelectionLayers[]) => {
  let layers: Layers[] = [];
  artboards.forEach(l => {
    switch (l.type) {
      case "Group":
      case "Artboard":
        layers = [...layers, ...extractLayers(l.layers)];
        break;
      case "Image":
      case "ShapePath":
      case "SymbolInstance":
        layers.push(l);
      default:
        break;
    }
  });
  return layers;
};

const getAllLayersFromArtboard = (selection?: Selection) => {
  let artboards = selection?.layers.filter(layer => layer.type === "Artboard");

  if (!artboards?.length) {
    throw {
      type: "alert",
      title: "Artboard not found",
      message: "Select the artboard you want to change the theme."
    };
  }

  return extractLayers(artboards);
};

export default getAllLayersFromArtboard;

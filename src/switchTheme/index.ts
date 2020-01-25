import getThemedLayerStyles from "../utils/getThemedLayerStyles";
import Sketch from "sketch";
import createSharedStylesDictionary from "./createSharedStylesDictionary";
import getAllLayersFromArtboard from "./getAllLayersFromArtboard";
import changeTheme from "./changeTheme";
import handleError from "../utils/handleError";

const switchTheme = () => {
  try {
    const document = Sketch.getSelectedDocument();
    const selectedLayers = document?.selectedLayers;
    const themedLayerStyles = getThemedLayerStyles();
    const stylesDictionary = createSharedStylesDictionary(themedLayerStyles);
    const allLayers = getAllLayersFromArtboard(selectedLayers);
    changeTheme(allLayers, stylesDictionary);
  } catch (error) {
    handleError(error);
  }
};

export default switchTheme;

import getThemedLayerStyles from "../utils/getThemedLayerStyles";
import createThemeObject from "./createThemeObject";
import ios from "./ios";
import askPath from "../utils/askPath";
import android from "./android";
import handleError from "../utils/handleError";

const exportThemes = () => {
  try {
    const themedLayerStyles = getThemedLayerStyles();
    const themeObject = createThemeObject(themedLayerStyles);
    const exportPath = askPath();
    ios(`${exportPath}/Themes/iOS/`, themeObject.byColor);
    android(`${exportPath}/Themes/Android/`, themeObject.byTheme);
  } catch (error) {
    handleError(error);
  }
};

export default exportThemes;

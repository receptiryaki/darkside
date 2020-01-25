import { ByThemes } from "../createThemeObject";
import writeToFile from "../../utils/writeToFile";
import template from "./template";

const android = (exportPath: string, themes: ByThemes) => {
  const lightXml = template(themes.light);
  const darkXml = template(themes.dark);

  writeToFile(lightXml, `${exportPath}/values/`, "colors.xml");
  writeToFile(darkXml, `${exportPath}/values-night/`, "colors.xml");
};

export default android;

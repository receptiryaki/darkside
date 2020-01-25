import writeToFile from "../../utils/writeToFile";
import { ByColors } from "../createThemeObject";
import contentsJson from "./contentsJson";
import template from "./template";

const ios = (exportPath: string, colors: ByColors) => {
  writeToFile(
    JSON.stringify(contentsJson, null, "\t"),
    `${exportPath}/ColorAssets.xcassets`,
    "Contents.json"
  );

  colors.forEach(c => {
    writeToFile(
      JSON.stringify(template(c.light, c.dark), null, "\t"),
      `${exportPath}/ColorAssets.xcassets/${c.name}.colorset`,
      "Contents.json"
    );
  });
};

export default ios;

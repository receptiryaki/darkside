import sketch, { SharedStyle } from "sketch";

const getThemedLayerStyles = () => {
  const sharedLayerStyles = sketch.getSelectedDocument()?.sharedLayerStyles;

  let colorAssets: SharedStyle[] = [];

  sharedLayerStyles?.forEach(layerStyle => {
    const splittedName = layerStyle.name.split("/");
    const first = splittedName[0];
    const second = splittedName[1];
    const third = splittedName[2];

    if (first.toLowerCase() === "themes") {
      if (third) {
        const s = second;
        if (/^(Dark|Light)$/.test(s)) {
          colorAssets.push(layerStyle);
        } else {
          throw {
            type: "alert",
            title: `Theme named "${second}" not accepted.`,
            message: `Styles starting with the "Theme" should continue with "Dark" or "Light".\ne.g "Theme/Dark/Primary"`
          };
        }
      }
    }
  });

  if (!colorAssets?.length) {
    throw {
      type: "alert",
      title: "Could not found layer styles",
      message:
        'Sketch could not find a layer style prepared for the themes.\n\nName your layer styles as:\n"Theme/<Light or Dark>/<Color Name>"'
    };
  }

  return colorAssets;
};

export default getThemedLayerStyles;

import { FloatingRgbaString } from "../createThemeObject";

const template = (light: FloatingRgbaString, dark: FloatingRgbaString) => ({
  info: {
    version: 1,
    author: "Sketch Dark Side Plugin"
  },
  colors: [
    {
      idiom: "universal",
      color: {
        "color-space": "srgb",
        components: {
          red: light.r,
          alpha: light.a,
          blue: light.b,
          green: light.g
        }
      }
    },
    {
      idiom: "universal",
      appearances: [
        {
          appearance: "luminosity",
          value: "dark"
        }
      ],
      color: {
        "color-space": "srgb",
        components: {
          red: dark.r,
          alpha: dark.a,
          blue: dark.b,
          green: dark.g
        }
      }
    }
  ]
});

export default template;

const hexToRgba = (hex: string) => {
  const hashlessHex = removeHash(hex);
  const hexObject = parseHex(hashlessHex);
  return hexObject;
};

const removeHash = (hex: string) =>
  hex.charAt(0) === "#" ? hex.slice(1) : hex;

const parseHex = (nakedHex: string) => {
  const isShort = nakedHex.length === 3 || nakedHex.length === 4;

  const twoDigitHexR = isShort
    ? `${nakedHex.slice(0, 1)}${nakedHex.slice(0, 1)}`
    : nakedHex.slice(0, 2);
  const twoDigitHexG = isShort
    ? `${nakedHex.slice(1, 2)}${nakedHex.slice(1, 2)}`
    : nakedHex.slice(2, 4);
  const twoDigitHexB = isShort
    ? `${nakedHex.slice(2, 3)}${nakedHex.slice(2, 3)}`
    : nakedHex.slice(4, 6);
  const twoDigitHexA =
    (isShort
      ? `${nakedHex.slice(3, 4)}${nakedHex.slice(3, 4)}`
      : nakedHex.slice(6, 8)) || "ff";

  return {
    r: hexToDecimal(twoDigitHexR),
    g: hexToDecimal(twoDigitHexG),
    b: hexToDecimal(twoDigitHexB),
    a: (hexToDecimal(twoDigitHexA) / 255).toFixed(2),
  };
};

const hexToDecimal = (hex: string) => parseInt(hex, 16);

const makeFloatingPoint = (n: number) => ((1 / 255) * n).toFixed(3).toString();

const rgbaToFloatingPointRgbaString = (rgbaColor: {
  r: number;
  g: number;
  b: number;
  a: string;
}) => ({
  r: makeFloatingPoint(rgbaColor.r),
  g: makeFloatingPoint(rgbaColor.g),
  b: makeFloatingPoint(rgbaColor.b),
  a: rgbaColor.a,
});

export { hexToRgba, rgbaToFloatingPointRgbaString };

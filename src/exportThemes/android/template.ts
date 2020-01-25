import { ByThemeItem } from "../createThemeObject";

const template = (
  colors: ByThemeItem[]
) => `<?xml version="1.0" encoding="utf-8"?>
<resources>
\t${colors.map(c => `<color name="${c.name}">${c.value}</color>`).join("\n\t")}
</resources>`;

export default template;

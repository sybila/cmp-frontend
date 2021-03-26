import { rem, shade, tint } from "polished";

const primary = "#43c6ac";
const secondary = "#ffc801";

const colors = {
  primary: {
    100: tint(0.4, primary),
    200: tint(0.3, primary),
    300: tint(0.2, primary),
    400: tint(0.1, primary),
    500: primary,
    600: shade(0.1, primary),
    700: shade(0.2, primary),
    800: shade(0.3, primary),
    900: shade(0.4, primary),
  },
  secondary: {
    100: tint(0.4, secondary),
    200: tint(0.3, secondary),
    300: tint(0.2, secondary),
    400: tint(0.1, secondary),
    500: secondary,
    600: shade(0.1, secondary),
    700: shade(0.2, secondary),
    800: shade(0.3, secondary),
    900: shade(0.4, secondary),
  },
  gray: {
    100: "#F4F6F7",
    200: "#E7EBED",
    300: "#B8C4CA",
    400: "#6E7D86",
    500: "#454E54",
  },
  white: "#FFFFFF",
  black: "#000000",
  text: "#444",
} as const;

const fonts = {
  "font-S": rem(14) as "rem(14)",
  "font-M": rem(16) as "rem(16)",
  "font-L": rem(18) as "rem(18)",
} as const;

const sizes = {
  "size-1": 8,
  "size-1.5": 12,
  "size-2": 16,
  "size-3": 24,
  "size-4": 32,
} as const;

const zIndex = {
  below: -1,
  base: 0,
  above: 1,
  dropdown: 5,
  tooltip: 10,
  overlay: 40,
  modal: 50,
  notify: 55,
} as const;

const bp = {
  small: 320,
  medium: 768,
  large: 1024,
} as const;

export default {
  colors,
  fonts,
  sizes,
  zIndex,
  bp,
};

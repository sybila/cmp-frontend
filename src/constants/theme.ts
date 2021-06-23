import { rem, shade, tint } from "polished";
import { DefaultTheme } from "styled-components/macro";
import { default as bulmaTheme } from "@theme-ui/preset-bulma";

//const primary = "#43c6ac";
const primary = "rgb(255, 200, 0)";
const secondary = "#ffc801";
const text = "#444";

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
  text,
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

const boxShadow = {
  strong:
    "0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%)",
} as const;

const borderRadius = {
  normal: {
    px: "3px",
    raw: 3,
  },
  strong: {
    px: "6px",
    raw: 6,
  },
} as const;

const custom = {
  colors,
  fonts,
  sizes,
  zIndex,
  bp,
  boxShadow,
  borderRadius,
};

const buttons = {
  primary: {
    bg: primary,
    color: colors.white,
    rounded: {
      borderRadius: 9999,
    },
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    custom: typeof custom;
    colors: typeof bulmaTheme.colors;
    fonts: typeof bulmaTheme.fonts;
    fontSizes: typeof bulmaTheme.fontSizes;
    fontWeights: typeof bulmaTheme.fontWeights;
    space: typeof bulmaTheme.space;
    styles: typeof bulmaTheme.styles;
    buttons: typeof buttons;
  }
}

export const theme: DefaultTheme = {
  ...bulmaTheme,
  colors: {
    ...bulmaTheme.colors,
    primary,
    text,
  },
  buttons,
  custom,
};

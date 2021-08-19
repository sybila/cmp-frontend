import { TextareaProps } from "@rebass/forms";
import { Textarea as TextAreaBase } from "@rebass/forms/styled-components";
import { rem } from "polished";
import styled, { css } from "styled-components/macro";

type Props = {
  $size?: "small" | "normal";
  $fullWidth?: boolean;
};

const TextArea = styled(
  TextAreaBase as React.ComponentType<TextareaProps>
)<Props>(
  ({ theme, $size = "normal", $fullWidth = true }) => css`
    width: ${$fullWidth ? "100%" : "auto"};
    min-width: ${rem(theme.custom.sizes["size-2"] * 2)};
    background-color: ${theme.colors.white};
    border-radius: ${theme.custom.borderRadius.normal.px};

    ${{
      normal: css`
        font-size: ${theme.custom.fonts["font-M"]};
        line-height ${rem(theme.custom.sizes["size-3"])};
        padding: ${rem(theme.custom.sizes["size-1"] * 0.5)};`,
      small: css`
        font-size: ${theme.custom.fonts["font-S"]};
        line-height ${rem(theme.custom.sizes["size-2"] * 0.8)};
        padding: ${rem(theme.custom.sizes["size-1"] * 0.25)};`,
    }[$size]}
  `
);

export default TextArea;

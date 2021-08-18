import { InputProps } from "@rebass/forms";
import { Input } from "@rebass/forms/styled-components";
import { rem } from "polished";
import styled, { css } from "styled-components/macro";

type Props = {
  $size?: "small" | "normal";
  $fullWidth?: boolean;
};

const InlineInput = styled(Input as React.ComponentType<InputProps>)<Props>(
  ({ theme, $size = "small", $fullWidth }) => css`
    width: ${$fullWidth ? "100%" : "auto"};
    min-width: ${rem(theme.custom.sizes["size-2"] * 2)};
    display: inline-block;
    border: none;
    border-bottom: 1px solid;
    border-color: ${theme.custom.colors.gray[200]};

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

export default InlineInput;

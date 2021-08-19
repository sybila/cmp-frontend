import { rem } from "polished";
import { Link } from "react-router-dom";
import { Button as ButtonBase } from "rebass/styled-components";
import styled, { css } from "styled-components/macro";

type Props = {
  $size?: "small" | "normal" | "large";
};

const Button = styled(ButtonBase)<Props>(
  ({ theme, $size = "large" }) => css`
    ${{
      small: css`
        padding: ${rem(theme.custom.sizes["size-1"] * 0.75)}
          ${rem(theme.custom.sizes["size-2"] * 0.75)};
      `,
      normal: css`
        padding: ${rem(theme.custom.sizes["size-1"])}
          ${rem(theme.custom.sizes["size-2"])};
      `,
      large: "",
    }[$size]}
  `
);

type ButtonLinkProps = {
  to: string;
};

export const ButtonLink = styled(Button).attrs<ButtonLinkProps>({
  as: Link,
  className: "button is-primary",
})<ButtonLinkProps>(
  ({ theme, $size = "large" }) => css`
    ${{
      small: css`
        padding: ${rem(theme.custom.sizes["size-1"] * 0.75)}
          ${rem(theme.custom.sizes["size-2"] * 0.75)};
      `,
      normal: css`
        padding: ${rem(theme.custom.sizes["size-1"])}
          ${rem(theme.custom.sizes["size-2"])};
      `,
      large: "",
    }[$size]}
  `
);

export default Button;

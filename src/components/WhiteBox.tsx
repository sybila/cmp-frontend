import { Box } from "rebass";
import { rem } from "polished";
import styled, { css } from "styled-components/macro";

const WhiteBox = styled(Box).attrs({
  className: "box is-padding-extended",
})(
  ({ theme }) => css`
    & + & {
      margin-left: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

export default WhiteBox;

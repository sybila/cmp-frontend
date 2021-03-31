import React from "react";
import LatexRenderer, { LatexWrapper } from "components/LatexRenderer";
import { RulePartial } from "models/Model";
import styled, { css } from "styled-components";
import { rem } from "polished";

type Props = {
  rule: RulePartial;
};

export const EquationsWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    margin-bottom: ${rem(theme.custom.sizes["size-4"])};

    ${LatexWrapper} {
      margin-right: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

const RuleComponent = ({ rule }: Props) => {
  return (
    <LatexWrapper>
      <p className="subtitle is-6 is-uppercase has-text-grey-lighter">
        {rule.id}
      </p>
      <LatexRenderer>{rule.equation.latex}</LatexRenderer>
    </LatexWrapper>
  );
};

export default RuleComponent;

import React from "react";
import LatexRenderer, {
  LatexWithExpand,
  LatexWrapper,
} from "components/LatexRenderer";
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

export const EquationComponent = ({
  latex,
  name,
  expandedLatex,
}: {
  latex: string;
  expandedLatex?: string;
  name: string;
}) => {
  return (
    <LatexWrapper>
      <p className="subtitle is-6 is-uppercase has-text-grey-lighter">{name}</p>
      {expandedLatex ? (
        <LatexWithExpand expanded={expandedLatex}>{latex}</LatexWithExpand>
      ) : (
        <LatexRenderer>{latex}</LatexRenderer>
      )}
    </LatexWrapper>
  );
};

const RuleComponent = ({ rule }: Props) => {
  return <EquationComponent latex={rule.equation.latex} name={`${rule.id}`} />;
};

export default RuleComponent;

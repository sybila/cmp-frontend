import React, { useEffect, useMemo, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Box } from "rebass/styled-components";
import styled, { css } from "styled-components";
import { rem } from "polished";

type Props = {
  children: string;
  options?: katex.KatexOptions;
};

const MATH_MODE_SIGN = "$";

const stripMathMode = (expression: string) => {
  let result = expression.trim();
  if (result[0] === MATH_MODE_SIGN) result = result.slice(1);
  if (result[result.length - 1] === MATH_MODE_SIGN)
    result = result.slice(0, -1);

  return result;
};

export const LatexWrapper = styled.div(
  ({ theme }) => css`
    display: inline-block;
    box-shadow: ${theme.custom.boxShadow.strong};
    border-radius: ${theme.custom.borderRadius.normal.px};
    padding: ${rem(theme.custom.sizes["size-2"])};
    margin: ${rem(theme.custom.sizes["size-2"])} 0;
  `
);

const LatexRenderer = ({ children: rawExpression, options }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const expression = useMemo(() => stripMathMode(rawExpression), [
    rawExpression,
  ]);

  useEffect(() => {
    katex.render(expression, boxRef.current, {
      throwOnError: false,
      output: "htmlAndMathml",
      ...options,
    });
  }, [expression]);

  return <Box as="span" ref={boxRef} />;
};

export default LatexRenderer;

import React, { useEffect, useMemo, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import { Box, Button, Flex } from "rebass/styled-components";
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

export const LatexWrapper = styled.div<{ fullwidth?: boolean }>(
  ({ theme, fullwidth }) => css`
    display: inline-block;
    box-shadow: ${theme.custom.boxShadow.strong};
    border-radius: ${theme.custom.borderRadius.normal.px};
    padding: ${rem(theme.custom.sizes["size-2"])};
    margin: ${rem(theme.custom.sizes["size-2"])} 0;
    ${fullwidth &&
    css`
      width: 100%;
    `}
  `
);

export const LatexWithExpand = ({
  children: rawExpression,
  options,
  expanded,
}: Props & { expanded: string }) => {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Flex alignItems="center">
      <LatexRenderer options={options}>
        {isExpanded ? expanded : rawExpression}
      </LatexRenderer>
      <Button type="button" onClick={() => setExpanded(!isExpanded)} ml={2}>
        {isExpanded ? "Collapse" : "Expand"} all functions
      </Button>
    </Flex>
  );
};

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

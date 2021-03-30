import React, { useEffect, useRef } from "react";
import katex from "katex";
import { Box } from "rebass/styled-components";

type Props = {
  children: string;
  options: katex.KatexOptions;
};

const LatexRenderer = ({ children: expression, options }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    katex.render(expression, boxRef.current, {
      throwOnError: false,
      ...options,
    });
  }, [expression]);

  return <Box as="div" ref={boxRef} />;
};

export default LatexRenderer;

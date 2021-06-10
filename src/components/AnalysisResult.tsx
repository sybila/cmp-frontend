import { AnalysisResult as AnalysisResultDataType } from "models/Analysis";
import React from "react";
import WhiteBox from "components/WhiteBox";
import LatexRenderer, { LatexWrapper } from "./LatexRenderer";

type Props = {
  analysis: AnalysisResultDataType;
};

const AnalysisResult = ({ analysis }: Props) => {
  let resultComponent: JSX.Element | null = null;
  if (analysis.outputType === "LaTeX" && typeof analysis.result === "string") {
    resultComponent = (
      <LatexWrapper>
        <LatexRenderer>{analysis.result}</LatexRenderer>
      </LatexWrapper>
    );
  }

  return <WhiteBox>{resultComponent}</WhiteBox>;
};

export default AnalysisResult;

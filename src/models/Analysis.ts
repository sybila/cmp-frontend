export type AnalysisInputType = "int" | "float" | "bool" | "array" | "string";

export type AnalysisOutputType = "";

export type AnalysisInput = {
  key: string;
  name: string;
  type: AnalysisInputType;
  description: string;
};

export type AnalysisOutput = {
  type: AnalysisOutputType;
  description: string;
};

export interface AnalysisPrescription {
  name: string;
  description: string;
  inputs: AnalysisInput[];
  output: Partial<AnalysisOutput>;
}

export interface AnalysisTypesEnumeration {
  analysis: string[];
}

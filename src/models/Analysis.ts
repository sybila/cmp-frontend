export type AnalysisInputType = "int" | "float" | "bool" | "array" | "string" | "ExperimentId" | "VariableId";

export type AnalysisOutputType = "";

export type AnalysisInput = {
  key: string;
  name: string;
  type: AnalysisInputType;
  description: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  unsigned?: boolean;
};

export type AnalysisInputGroup = {
  name: string;
  expandable?: boolean;
  inputs: AnalysisInput[];
};

export type AnalysisOutput = {
  type: AnalysisOutputType;
  description: string;
};

export interface AnalysisPrescription {
  name: string;
  description: string;
  inputGroups: AnalysisInputGroup[];
  output: Partial<AnalysisOutput>;
}

export interface AnalysisResult {
  result: any[] | number | string;
  outputType: string;
}

export interface AnalysisTypesEnumeration {
  analysis: string[];
}

import AnalysisSettings from "components/AnalysisSettings";
import { AnalysisInput } from "models/Analysis";
import { Dataset, InitialValue } from "models/Model";
import React, { useCallback, useMemo } from "react";

type Props = {
  inputs: AnalysisInput[];
  modelId: number;
  dataset: Dataset;
  onSubmit: (vals: Record<string, unknown>) => void;
};

const Settings = ({ inputs, modelId, dataset, onSubmit }: Props) => {
  const strippedInputs = useMemo(
    () => inputs.filter(({ key }) => key !== "modelId" && key !== "dataset"),
    [inputs]
  );

  const handleSubmit = useCallback(
    (values: Record<string, unknown>) => {
      console.log(values);
      onSubmit({
        ...values,
        "Model Id": modelId,
        Dataset: {
          name: dataset.name,
          initialValues: Object.keys(dataset.initialValues).reduce<
            InitialValue[]
          >((acc, key) => [...acc, ...dataset.initialValues[key]], []),
        },
      });
    },
    [modelId, dataset]
  );

  return <AnalysisSettings inputs={strippedInputs} onSubmit={handleSubmit} />;
};

export default Settings;

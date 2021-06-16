import AnalysisSettings from "components/AnalysisSettings";
import { AnalysisInput, AnalysisInputGroup } from "models/Analysis";
import { Dataset, InitialValue } from "models/Model";
import React, { useCallback, useMemo } from "react";

type Props = {
  inputGroups: AnalysisInputGroup[];
  modelId: number;
  dataset?: Dataset;
  onSubmit: (vals: Record<string, unknown>) => void;
};

const Settings = ({ inputGroups, modelId, dataset, onSubmit }: Props) => {
  const strippedinputGroups = useMemo(
    () =>
      inputGroups
        .filter(({ name }) => name !== "automatic")
        .map((group) => ({
          ...group,
          inputs: group.inputs.filter(({ name }) => name !== "dataset"),
        })),
    [inputGroups]
  );

  const handleSubmit = useCallback(
    (values: Record<string, unknown>) => {
      let result: Record<string, unknown> = {
        ...values,
        "Model Id": modelId,
      };

      if (dataset) {
        result = {
          ...result,
          Dataset: {
            name: dataset.name,
            initialValues: Object.keys(dataset.initialValues).reduce<
              InitialValue[]
            >((acc, key) => [...acc, ...dataset.initialValues[key]], []),
          },
        };
      }

      onSubmit(result);
    },
    [modelId, dataset, onSubmit]
  );

  return (
    <AnalysisSettings
      inputGroups={strippedinputGroups}
      onSubmit={handleSubmit}
    />
  );
};

export default Settings;

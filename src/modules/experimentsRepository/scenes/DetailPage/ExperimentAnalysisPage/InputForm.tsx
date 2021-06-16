import AnalysisSettings from "components/AnalysisSettings";
import { AnalysisInput, AnalysisInputGroup } from "models/Analysis";
import { Dataset, InitialValue } from "models/Model";
import React, { useCallback, useMemo } from "react";

type Props = {
    inputGroups: AnalysisInputGroup[];
    experimentId: number;
    onSubmit: (vals: Record<string, unknown>) => void;
};

const InputForm = ({ inputGroups, experimentId, onSubmit }: Props) => {
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
            console.log(values);
            onSubmit({
                ...values,
            });
        },
        [experimentId]
    );

    return (
        <AnalysisSettings
            inputGroups={strippedinputGroups}
            onSubmit={handleSubmit}
        />
    );
};

export default InputForm;
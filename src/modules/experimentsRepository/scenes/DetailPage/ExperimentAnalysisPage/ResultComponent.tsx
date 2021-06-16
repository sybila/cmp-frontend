import AnalysisSettings from "components/AnalysisSettings";
import { AnalysisInput, AnalysisInputGroup } from "models/Analysis";
import { Dataset, InitialValue } from "models/Model";
import React, { useCallback, useMemo } from "react";
import Visualizer from "cmp-visualizer";
import { isNull } from "lodash";

type Props = {
    result: undefined;
    outputType: string;
};

const getModels = (inputData: any) => {
    return Object.keys(inputData).map((key) => ({
        model: inputData[key].model,
        id: key,
    }));
};

const ResultComponent = ({ result, outputType }: Props) => {

    const models = useMemo(
        () => (result != null && outputType === "array" ? getModels(result) : undefined),
        [result]
    );

    let output = (
        <output name="result"></output>
    );

    if (outputType === "float") {
        output = (
            <React.Fragment key={'i' + outputType}>
                <output name="result">{{ result }.result}</output>
            </React.Fragment>
        );
    }
    else if (outputType === "string") {
        output = (
            <React.Fragment key={'i' + outputType}>
                <output name="result">{{ result }.result}</output>
            </React.Fragment>
        );
    }
    else if (outputType === "array") {
        output = (
            <>
                {Object.keys(result).length ? (
                    <Visualizer
                        inputData={result}
                        models={models}
                        width="100%"
                    />
                ) : (
                        <progress className="progress is-primary" max="100">
                            30%
                        </progress>
                    )}
            </>
        );
    }
    return (
        <section className="section p-b-0">
            <div className="container">
                {output}
            </div>
        </section>
    );
};

export default ResultComponent;
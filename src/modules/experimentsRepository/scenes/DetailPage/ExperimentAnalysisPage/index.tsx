import React, { useCallback, useState, useEffect } from "react";
import { rem } from "polished";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { ExperimentComponentProps } from "../..";
import { Box, Button, Flex, Text } from "rebass";
import { Label, Select } from "@rebass/forms";
import { useRouteMatch } from "react-router";
import styled, { css } from "styled-components/macro";
import WhiteBox from "components/WhiteBox";
import api from "../../../services";
import useApi from "hooks/useApi";
import InputForm from "./InputForm";
import ResultComponent from "./ResultComponent";

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
}

interface State {
  selectOptions: [];
  inputs: [];
  analyse: "";
  outputType: "";
}

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
}

const analysisLoaded = () => api.fetchAnalysis();

const loadAnalysisPrescription = (analysisType) =>
  api.fetchAnalysePrescription(analysisType);

const ExperimentAnalysisPage = () => {
  const [analysis] = useApi.useGet(analysisLoaded);
  const {
    params: { experimentId },
  } = useRouteMatch<{ experimentId: string }>();

  const [analysisType, setSelectedAnalyseMethod] = useState<
    string | undefined
  >();

  const [prescription, setPrescription] = useState<any>();

  const [result, setResult] = useState({
    resultData: null,
    outputType: null,
  });

  const { resultData, outputType } = result;

  useEffect(() => {
    if (analysisType) {
      loadAnalysisPrescription(analysisType).then(({ data: { data } }) => {
        setPrescription(data);
      });
    }
  }, [analysisType]);

  const handleExecute = useCallback(
    (vals: Record<string, unknown>) => {
      api.executeAnalysis(analysisType, [vals]).then(({ data: { data } }) =>
        data.outputType === "array"
          ? setResult({
              resultData: { result: data.result },
              outputType: data.outputType,
            })
          : setResult({
              resultData: data.result,
              outputType: data.outputType,
            })
      );
      console.log(resultData);
    },
    [analysisType]
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${experimentsNames.url}/detail/${experimentId}/analysis`}
      >
        Analysis
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <Box mb={16}>
            <Label htmlFor="analysis" mb={10}>
              Analysis Method
            </Label>
            <Select
              id="analysis-select"
              name="analysis"
              onChange={(d) => setSelectedAnalyseMethod(d.target.value)}
            >
              {analysis?.analysis.map((name) => (
                <option key={`analysis-${name}`} value={`${name}`}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>
          {prescription && analysisType && (
            <WhiteBox>
              <h5 className="title is-4 m-b-10">Parameters</h5>
              <InputForm
                experimentId={parseInt(experimentId, 10)}
                inputGroups={prescription.inputGroups}
                onSubmit={handleExecute}
              />
            </WhiteBox>
          )}
          {result && (
            <WhiteBox>
              <h5 className="title is-4 m-b-10">Result</h5>
              <ResultComponent result={resultData} outputType={outputType} />
            </WhiteBox>
          )}
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  experimentsById: getExperimentsObject(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentAnalysisPage);

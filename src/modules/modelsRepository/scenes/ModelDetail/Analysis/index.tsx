import { useApi } from "hooks/useApi";
import { rem } from "polished";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import { Box } from "rebass";
import { Label, Select } from "@rebass/forms";
import styled, { css } from "styled-components/macro";
import { moduleNames } from "../../../reducers/MainReducer";
import api from "../../../services";
import {
  AnalysisPrescription,
  AnalysisResult as AnalysisResultDataType,
} from "models/Analysis";
import Settings from "../../../components/ModelAnalysisSettings";
import WhiteBox from "components/WhiteBox";
import AnalysisResult from "components/AnalysisResult";

const NOT_INCLUDED_OPTIONS = ["Simulation"];

const NOT_SELECTED = "None";

const Analysis = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const [analysisOption, setAnalysisOption] = useState(NOT_SELECTED);
  const [analysisPrescription, setAnalysisPrescription] =
    useState<AnalysisPrescription | undefined>();
  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResultDataType | undefined>(); // TODO: create data type

  const [analysisOptionsRaw] = useApi(
    useCallback(() => api.loadAnalysisOptions(), [modelId])
  );

  const analysisOptions = useMemo(
    () =>
      analysisOptionsRaw?.analysis?.filter(
        (opt) => !NOT_INCLUDED_OPTIONS.includes(opt)
      ),
    [analysisOptionsRaw]
  );

  useEffect(() => {
    analysisOption !== NOT_SELECTED &&
      api
        .loadAnalysisPrescription(analysisOption)
        .then(({ data: { data } }) => setAnalysisPrescription(data));
  }, [analysisOption]);

  const handleExecute = useCallback(
    (vals: Record<string, unknown>) => {
      api
        .executeAnalysis(analysisOption, [vals])
        .then(({ data: { data } }) => setAnalysisResult(data));
    },
    [analysisOption]
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/analysis`}
      >
        Analysis
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <Box mx={-2} mb={4} className="container">
            <WhiteBox>
              {analysisOptions && (
                <Box mb={16}>
                  <Label htmlFor="analysis-option" mb={10}>
                    Choose Analysis
                  </Label>
                  <Select
                    id="analysis-option-select"
                    name="analysis-option"
                    defaultValue={NOT_SELECTED}
                    onChange={(d) => setAnalysisOption(d.target.value)}
                  >
                    <option disabled value={NOT_SELECTED}>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {analysisOptions.map((option) => (
                      <option key={`analysis-option-${option}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Box>
              )}
              {analysisPrescription && (
                <Settings
                  modelId={parseInt(modelId, 10)}
                  inputGroups={analysisPrescription.inputGroups}
                  onSubmit={handleExecute}
                />
              )}
            </WhiteBox>
          </Box>
          {analysisResult && <AnalysisResult analysis={analysisResult} />}
        </div>
      </section>
    </>
  );
};

export default Analysis;

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

const WhiteBox = styled(Box).attrs({
  className: "box is-padding-extended",
})(
  ({ theme }) => css`
    & + & {
      margin-left: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

const NOT_INCLUDED_OPTIONS = ["Simulation"];

const Analysis = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const [analysisOption, setAnalysisOption] = useState("");

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
    analysisOptions?.length && setAnalysisOption(analysisOptions[0]);
  }, [analysisOptions]);

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/analysis`}
      >
        Analysis
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          <WhiteBox>
            {analysisOptions && (
              <Box mb={16}>
                <Label htmlFor="analysis-option" mb={10}>
                  Choose Analysis
                </Label>
                <Select
                  id="analysis-option-select"
                  name="analysis-option"
                  onChange={(d) => setAnalysisOption(d.target.value)}
                >
                  {analysisOptions.map((option) => (
                    <option key={`analysis-option-${option}`} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Box>
            )}
          </WhiteBox>
        </div>
      </section>
    </>
  );
};

export default Analysis;

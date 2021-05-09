import { useApi } from "hooks/useApi";
import { rem } from "polished";
import React, { useCallback, useState, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router";
import { Box, Button, Flex, Text } from "rebass";
import { Label, Select } from "@rebass/forms";
import Visualizer from "cmp-visualizer";
import styled, { css } from "styled-components/macro";
import api from "../../../services";
import { moduleNames } from "../../../reducers/MainReducer";
import { Dataset } from "models/Model";
import LatexRenderer from "components/LatexRenderer";
import Settings from "./Settings";
import InitialValues from "./InitialValues";

const WhiteBox = styled(Box).attrs({
  className: "box is-padding-extended",
})(
  ({ theme }) => css`
    & + & {
      margin-left: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

const loadSimulationPrescription = () =>
  api.loadAnalysisPrescription("Simulation");

const getDefaultDataset = (datasets: Dataset[]) =>
  datasets.find(({ default: d }) => d);

const getModels = (inputData: any) => {
  return Object.keys(inputData).map((key) => ({
    model: inputData[key].model,
    id: key,
  }));
};

const Simulation = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const [selectedDatasetID, setSelectedDatasetID] = useState<
    number | undefined
  >();
  const [simulationData, setSimulationData] = useState<any>(); // TODO: create simulation data type
  const models = useMemo(
    () => (simulationData ? getModels(simulationData) : undefined),
    [simulationData]
  );

  const [datasets] = useApi(
    useCallback(
      () =>
        api.loadDatasets(parseInt(modelId, 10)).then((payload) => {
          setSelectedDatasetID(getDefaultDataset(payload.data.data)?.id);
          return payload;
        }),
      [modelId]
    )
  );

  const [events] = useApi(
    useCallback(() => api.loadEvents(parseInt(modelId, 10)), [modelId])
  );

  const [prescription] = useApi(loadSimulationPrescription);

  const selectedDataset = useMemo(
    () => datasets?.find(({ id }) => id === selectedDatasetID),
    [selectedDatasetID, datasets]
  );

  const handleExecute = useCallback((vals: Record<string, unknown>) => {
    api
      .executeAnalysis("Simulation", [vals])
      .then(({ data: { data } }) =>
        setSimulationData({ simulation: data.result })
      );
  }, []);

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/simulation`}
      >
        Simulation
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          {simulationData && models && (
            <Box mx={-2} mb={4} className="container">
              <WhiteBox>
                <Visualizer
                  inputData={simulationData}
                  models={models}
                  width="100%"
                />
              </WhiteBox>
            </Box>
          )}
          <Flex mx={-2} className="container">
            <WhiteBox width={1 / 2} px={2}>
              <Box mb={24}>
                {datasets && (
                  <Box mb={16}>
                    <Label htmlFor="dataset" mb={10}>
                      Dataset
                    </Label>
                    <Select
                      id="dataset-select"
                      name="dataset"
                      defaultValue={`${selectedDatasetID}`}
                      onChange={(d) =>
                        setSelectedDatasetID(parseInt(d.target.value, 10))
                      }
                    >
                      {datasets.map(({ id, name }) => (
                        <option key={`dataset-${id}`} value={`${id}`}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  </Box>
                )}
              </Box>
              {prescription && (
                <Settings
                  modelId={parseInt(modelId, 10)}
                  dataset={selectedDataset}
                  inputGroups={prescription.inputGroups}
                  onSubmit={handleExecute}
                />
              )}
            </WhiteBox>
            <WhiteBox width={1 / 2} px={2}>
              {selectedDataset && (
                <InitialValues selectedDataset={selectedDataset} />
              )}
            </WhiteBox>
          </Flex>
        </div>
      </section>
    </>
  );
};

export default Simulation;

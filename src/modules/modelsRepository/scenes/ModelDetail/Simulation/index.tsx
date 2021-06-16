import { useApi } from "hooks/useApi";
import { rem } from "polished";
import React, { useCallback, useState, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router";
import { Box, Flex } from "rebass";
import { Label, Select } from "@rebass/forms";
import Visualizer from "cmp-visualizer";
import styled, { css } from "styled-components/macro";
import api from "../../../services";
import { moduleNames } from "../../../reducers/MainReducer";
import { Dataset } from "models/Model";
import Settings from "../../../components/ModelAnalysisSettings";
import InitialValues from "./InitialValues";
import WhiteBox from "components/WhiteBox";

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
  const [selectedDatasetID, setSelectedDatasetID] =
    useState<number | undefined>();
  const [simulationData, setSimulationData] = useState<any>(); // TODO: create simulation data type
  const [modifiedDataset, setModifiedDataset] = useState<Dataset>();
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

  const originalSelectedDataset = useMemo(
    () => datasets?.find(({ id }) => id === selectedDatasetID),
    [datasets, selectedDatasetID]
  );

  const selectedDataset = useMemo(
    () => modifiedDataset ?? originalSelectedDataset,
    [originalSelectedDataset, modifiedDataset]
  );

  const handleExecute = useCallback((vals: Record<string, unknown>) => {
    api
      .executeAnalysis("Simulation", [vals])
      .then(({ data: { data } }) =>
        setSimulationData({ simulation: data.result })
      );
  }, []);

  const handleDatasetEdit = useCallback(
    (
      values: Record<keyof Dataset["initialValues"], Record<string, string>>
    ) => {
      const mapValues = (k: keyof Dataset["initialValues"]) =>
        Object.keys(values[k]).map((key) => {
          const [alias, id] = key.split("-");
          return {
            alias,
            id: parseInt(id, 10),
            initialValue: values[k][key],
          };
        });

      setModifiedDataset({
        ...originalSelectedDataset,
        initialValues: {
          compartments: mapValues("compartments"),
          species: mapValues("species"),
          parameters: mapValues("parameters"),
        },
      });
    },
    [originalSelectedDataset]
  );

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
                <InitialValues
                  selectedDataset={originalSelectedDataset}
                  onChange={handleDatasetEdit}
                />
              )}
            </WhiteBox>
          </Flex>
        </div>
      </section>
    </>
  );
};

export default Simulation;

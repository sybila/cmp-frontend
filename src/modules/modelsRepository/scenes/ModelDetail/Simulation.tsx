import { useApi } from "hooks/useApi";
import { rem } from "polished";
import React, { useCallback, useState, useMemo } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router";
import { Box, Button, Flex, Text } from "rebass";
import { Label, Select } from "@rebass/forms";
import Visualizer from "cmp-visualizer";
import styled, { css } from "styled-components/macro";
import api from "../../services";
import { moduleNames } from "../../reducers/MainReducer";
import { Dataset } from "models/Model";
import { data as simulationMockData } from "./simulationMockData";
import LatexRenderer from "components/LatexRenderer";

const WhiteBox = styled(Box).attrs({
  className: "box is-padding-extended",
})(
  ({ theme }) => css`
    & + & {
      margin-left: ${rem(theme.custom.sizes["size-2"])};
    }
  `
);

const getDefaultDataset = (datasets: Dataset[]) =>
  datasets.find(({ default: d }) => d);

const getModels = (inputData: any) => {
  return Object.keys(inputData).map((key) => ({
    model: inputData[key].model,
    id: key,
  }));
};

// TEMP: Temporary until visualizer endpoint is known.
const models = getModels(simulationMockData);

const Simulation = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const [selectedDatasetID, setSelectedDatasetID] = useState<
    number | undefined
  >();

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

  const selectedDataset = useMemo(
    () => datasets?.find(({ id }) => id === selectedDatasetID),
    [selectedDatasetID, datasets]
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
          <Flex mx={-3} className="container">
            <WhiteBox width={1 / 2} px={2}>
              <Box mb={24}>
                {datasets && (
                  <Box mb={16}>
                    <Label htmlFor="dataset">Dataset</Label>
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
                <Box>
                  <Label htmlFor="graphset">Graphset</Label>
                  <Select id="graphset-select" name="graphset"></Select>
                </Box>
              </Box>
              <Visualizer
                inputData={simulationMockData}
                models={models}
                width="100%"
              />
              <Flex justifyContent="flex-end">
                <Button
                  type="button"
                  onClick={() => console.log("executing simulation")}
                >
                  Execute
                </Button>
              </Flex>
            </WhiteBox>
            <WhiteBox width={1 / 4} px={2}>
              {selectedDataset && (
                <>
                  <Text fontWeight="bold" fontSize={18}>
                    Initial values
                  </Text>
                  <Box pl={12} mt={12}>
                    <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
                      Compartments
                    </Text>
                    <Box pl={12}>
                      {selectedDataset.initialValues.compartments.map(
                        (item) => (
                          <Text fontSize={14} key={`initial-comp-${item.id}`}>
                            <Text as="span" fontWeight="bold">
                              {item.alias}
                            </Text>{" "}
                            = {item.initialValue}
                          </Text>
                        )
                      )}
                    </Box>
                  </Box>
                  <Box pl={12} mt={12}>
                    <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
                      Species
                    </Text>
                    <Box pl={12}>
                      {selectedDataset.initialValues.species.map((item) => (
                        <Text fontSize={14} key={`initial-spec-${item.id}`}>
                          <Text as="span" fontWeight="bold">
                            {item.alias}
                          </Text>{" "}
                          = {item.initialValue}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                  <Box pl={12} mt={12}>
                    <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
                      Parameters
                    </Text>
                    <Box pl={12}>
                      {selectedDataset.initialValues.parameters.map((item) => (
                        <Text fontSize={14} key={`initial-param-${item.id}`}>
                          <Text as="span" fontWeight="bold">
                            {item.alias}
                          </Text>{" "}
                          = {item.initialValue}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                </>
              )}
            </WhiteBox>
            <WhiteBox width={1 / 4} px={2}>
              <Text fontWeight="bold" fontSize={18}>
                Events
              </Text>
              <Box pl={12} mt={12}>
                {events && (
                  <Box>
                    {events.map((event) => (
                      <Box key={`event-${event.id}`}>
                        <Text fontSize={16} sx={{ textTransform: "uppercase" }}>
                          {event.alias}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </WhiteBox>
          </Flex>
        </div>
      </section>
    </>
  );
};

export default Simulation;

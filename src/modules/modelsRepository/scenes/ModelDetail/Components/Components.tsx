import { useApi } from "hooks/useApi";
import React, { useCallback, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { Box, Text } from "rebass/styled-components";
import Tree from "components/Tree";
import { Card, List } from "components/Cards";
import { moduleNames } from "../../../reducers/MainReducer";
import api from "../../../services";
import { transformCompartmentToTreeItem, TreeItemComponent } from ".";

const Components = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const url = useMemo(
    () => `/${moduleNames.url}/model-detail/${modelId}/components`,
    [modelId]
  );
  const history = useHistory();

  const [species, setSpecies] = useState({});

  const [compartmentsList] = useApi(
    useCallback(() => api.loadCompartments(parseInt(modelId, 10)), [modelId])
  );

  const components = useMemo(
    () =>
      compartmentsList
        ? compartmentsList
            .map((comp) =>
              transformCompartmentToTreeItem(comp, species[comp.id])
            )
            .map((item) => ({
              ...item,
              actions: [
                {
                  caption: "Detail",
                  callback: () => {
                    history.push(`${url}/compartment/${item.id}`);
                  },
                },
              ],
              children: item.children?.map((child) => ({
                ...child,
                actions: [
                  {
                    caption: "Detail",
                    callback: () => {
                      history.push(
                        `${url}/compartment/${item.id}/species/${child.id}`
                      );
                    },
                  },
                ],
              })),
            }))
        : [],
    [compartmentsList, species]
  );

  const handleNodeClick = useCallback(
    (id: number, meta: any) => {
      if (meta === TreeItemComponent.Compartment && !species[id]) {
        api.loadCompartmentDetail(modelId, id).then(({ data: { data } }) => {
          setSpecies({ ...species, [id]: data.species });
        });
      }
    },
    [species]
  );

  return (
    <section className="section p-b-0">
      <div className="container">
        <div className="box is-padding-extended">
          <div className="columns">
            <div className="column">
              <Box>
                <p className="subtitle is-6 is-uppercase">Compartments</p>
                <Tree data={components} onNodeClick={handleNodeClick} />
              </Box>
              {/* <List isTree>
                {compartmentsList &&
                  compartmentsList.map((compartment) => (
                    <Card
                      headerTitle={
                        <Link to={`${url}/compartment/${compartment.id}`}>
                          {compartment.name}
                        </Link>
                      }
                      onOpen={(state) => handleOpen(compartment.id, state)}
                    >
                      {species[compartment.id] && (
                        <List>
                          {species[compartment.id].map((specie) => (
                            <Card
                              disableToggle
                              headerTitle={
                                <Link
                                  to={`${url}/compartment/${compartment.id}/species/${specie.id}`}
                                >
                                  {specie.name}
                                </Link>
                              }
                            />
                          ))}
                        </List>
                      )}
                    </Card>
                  ))}
              </List> */}
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Components;

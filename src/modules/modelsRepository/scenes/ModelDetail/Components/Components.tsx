import { useApi } from "hooks/useApi";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box } from "rebass/styled-components";
import Tree from "components/Tree";
import { moduleNames } from "../../../reducers/MainReducer";
import api from "../../../services";
import {
  transformCompartmentToTreeItem,
  TreeItemComponent,
} from "../../../helpers";

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
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Components;

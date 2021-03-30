import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { useApi } from "hooks/useApi";
import {
  Table,
  TableSection,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import api from "../../services";

const Reactions = () => {
  const match = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelInterface = getModel(parseInt(match.params.modelId, 10));

  const [reactionsList] = useApi(
    useCallback(() => api.loadReactions(parseInt(match.params.modelId, 10)), [
      match.params.modelId,
    ])
  );

  return (
    <section className="section p-b-0">
      <div className="container">
        <div className="box is-padding-extended">
          {reactionsList && (
            <Table>
              <TableSection as="thead">
                <TableRow>
                  <TableDataCell as="th">Name</TableDataCell>
                  <TableDataCell as="th">Expression</TableDataCell>
                </TableRow>
              </TableSection>
              <TableSection as="tbody">
                {reactionsList.map((reaction) => {
                  return (
                    <TableRow>
                      <TableDataCell>{reaction.name}</TableDataCell>
                      <TableDataCell>
                        {reaction.expression?.latex}
                      </TableDataCell>
                    </TableRow>
                  );
                })}
              </TableSection>
            </Table>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reactions;

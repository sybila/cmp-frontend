import { Model as ModelInterface } from "models/Model";
import { getModelById } from "modules/modelsRepository/selectors";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import useApi from "hooks/useApi";
import {
  Table,
  TableSection,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import LatexRenderer from "components/LatexRenderer";
import api from "../../../services";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import { makeReactionEquation } from "modules/modelsRepository/helpers";
import { intToBoolean } from "services/dataTransform";

const Reactions = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const model: ModelInterface = getModel(parseInt(modelId, 10));

  const [reactionsList] = useApi.useGet(
    useCallback(() => api.loadReactions(parseInt(modelId, 10)), [modelId])
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
                  <TableDataCell as="th">Reaction</TableDataCell>
                  <TableDataCell as="th">Kinetic law</TableDataCell>
                </TableRow>
              </TableSection>
              <TableSection as="tbody">
                {reactionsList.map((reaction) => {
                  return (
                    <TableRow>
                      <TableDataCell>
                        <Link to={`reactions/reaction/${reaction.id}`}>
                          {reaction.name}
                        </Link>
                      </TableDataCell>
                      <TableDataCell>
                        <LatexRenderer>
                          {makeReactionEquation(
                            reaction.reactionItems,
                            intToBoolean(reaction.isReversible)
                          )}
                        </LatexRenderer>
                      </TableDataCell>
                      <TableDataCell>
                        <LatexRenderer>{reaction.rate.latex}</LatexRenderer>
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

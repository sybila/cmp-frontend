import { getModelById } from "modules/modelsRepository/selectors";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { useApi } from "hooks/useApi";
import {
  Table,
  TableSection,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";
import LatexRenderer from "components/LatexRenderer";
import api from "../../../services";

const Events = () => {
  const {
    params: { modelId },
  } = useRouteMatch<{ modelId: string }>();
  const getModel = useSelector(getModelById);

  const [eventsList] = useApi(
    useCallback(() => api.loadEvents(parseInt(modelId, 10)), [modelId])
  );

  return (
    <section className="section p-b-0">
      <div className="container">
        <div className="box is-padding-extended">
          {eventsList && (
            <Table>
              <TableSection as="thead">
                <TableRow>
                  <TableDataCell as="th">Name</TableDataCell>
                  <TableDataCell as="th">Trigger</TableDataCell>
                  <TableDataCell as="th">Event assignment</TableDataCell>
                </TableRow>
              </TableSection>
              <TableSection as="tbody">
                {eventsList.map((event) => {
                  return (
                    <TableRow>
                      <TableDataCell>
                        <Link to={`events/${event.id}`}>{event.alias}</Link>
                      </TableDataCell>
                      <TableDataCell>
                        <LatexRenderer>{event.trigger?.latex}</LatexRenderer>
                      </TableDataCell>
                      <TableDataCell>
                        <LatexRenderer>
                          {(event.eventAssignment ?? [])[0]?.formula?.latex}
                        </LatexRenderer>
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

export default Events;

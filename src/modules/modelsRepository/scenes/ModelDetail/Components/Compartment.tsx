import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Annotations from "components/Annotations";
import {
  Table,
  TableBody,
  TableDataCell,
  TableRow,
} from "components/primitives/Table";

const Compartment = () => {
  const {
    params: { modelId, compartmentId },
  } = useRouteMatch<{ modelId: string; compartmentId: string }>();

  const [compartment] = useApi(
    useCallback(() => api.loadCompartmentDetail(modelId, compartmentId), [
      modelId,
      compartmentId,
    ])
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/components/compartment/${compartmentId}`}
      >
        {compartment ? compartment.name : "Compartment"}
      </BreadcrumbsItem>
      {compartment && (
        <DetailSection title={compartment.name}>
          {compartment.notes && <p>{compartment.notes}</p>}
          <Table>
            <TableBody>
              <TableRow>
                <TableDataCell>Alias</TableDataCell>
                <TableDataCell>
                  <TableDataCell>{compartment.alias}</TableDataCell>
                </TableDataCell>
              </TableRow>
            </TableBody>
          </Table>
          <Annotations list={compartment.annotations} />
        </DetailSection>
      )}
    </>
  );
};

export default Compartment;

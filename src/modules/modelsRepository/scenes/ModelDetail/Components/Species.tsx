import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useRouteMatch } from "react-router-dom";
import api from "../../../services";
import DetailSection from "components/DetailSection";
import Annotations from "components/Annotations";

const Species = () => {
  const {
    params: { modelId, compartmentId, speciesId },
  } = useRouteMatch<{
    modelId: string;
    compartmentId: string;
    speciesId: string;
  }>();

  const [species] = useApi(
    useCallback(() => api.loadSpecieDetail(modelId, compartmentId, speciesId), [
      modelId,
      compartmentId,
      speciesId,
    ])
  );

  return (
    <>
      <BreadcrumbsItem
        to={`/${moduleNames.url}/model-detail/${modelId}/components/compartment/${compartmentId}/species/${speciesId}`}
      >
        {species ? species.name : "Species"}
      </BreadcrumbsItem>
      {species && (
        <DetailSection title={species.name}>
          {species.notes && <p>{species.notes}</p>}
          <Annotations list={species.annotations} />
        </DetailSection>
      )}
    </>
  );
};

export default Species;

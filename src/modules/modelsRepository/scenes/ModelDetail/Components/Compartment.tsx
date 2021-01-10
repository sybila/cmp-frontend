import { useApi } from "hooks/useApi";
import { moduleNames } from "modules/modelsRepository/reducers/MainReducer";
import React, { useCallback } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useHistory, useRouteMatch } from "react-router-dom";
import api from "../../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Compartment = () => {
  const {
    params: { modelId, compartmentId },
  } = useRouteMatch<{ modelId: string; compartmentId: string }>();
  const history = useHistory();

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
      ></BreadcrumbsItem>
      {compartment && (
        <section className="section p-b-0">
          <div className="container">
            <div className="is-flex m-b-20">
              <button
                className="button is-outlined is-normal p-t-10 p-b-10"
                onClick={() => history.goBack()}
              >
                <FontAwesomeIcon className="m-r-10" icon={faAngleLeft} /> Go
                back
              </button>
              <p className="subtitle is-3 m-l-25">{compartment.name}</p>
            </div>
            <div className="box is-padding-extended"></div>
          </div>
        </section>
      )}
    </>
  );
};

export default Compartment;

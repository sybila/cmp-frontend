import React, { useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link, useRouteMatch } from "react-router-dom";

import { moduleNames as bioQuantitiesNames } from "../../reducers/MainReducer";
import services from "../../services";
import { mockDataDetails } from "../mockData";

type Params = { detailId: string };

const BioQuantityDetail = () => {
  const [detail, setDetail] = useState(mockDataDetails);
  const match = useRouteMatch<Params>();

  useEffect(() => {
    if (match.params.detailId) {
      const parsed = parseInt(match.params.detailId, 10);
      services.fetchBioNumber(parsed).then(({ data: { data } }) => {});
    }
  }, [match.params.detailId]);

  return detail ? (
    <>
      <BreadcrumbsItem to={`/${bioQuantitiesNames.url}/detail/${detail.id}`}>
        {detail.name}
      </BreadcrumbsItem>
      <div className="section">
        <div className="container">
          <h2 className="title is-2">Detail of {detail.name}</h2>
          <div className="box"></div>
        </div>
      </div>
    </>
  ) : (
    <section className="section p-b-0">
      <div className="container">
        <div className="box ">
          <h4 className="title is-4 m-b-10">Error</h4>
          <div className="notification is-danger is-light">
            <strong>Error: </strong>selected bio quantity was not found.
          </div>
          <Link to="/bio-quantity">Return to repository</Link>
        </div>
      </div>
    </section>
  );
};

export default BioQuantityDetail;

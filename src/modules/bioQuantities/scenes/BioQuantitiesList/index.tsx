import Pager from "components/Pager";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../../services";

import { moduleNames as bioQuantitiesNames } from "../../reducers/MainReducer";
import { mockData } from "../mockData";

const BioQuantitiesList = () => {
  useEffect(() => {
    service.fetchAllBioNumbers(1, 2, 0);
  }, []);

  return (
    <div className="section">
      <div className="container">
        <h2 className="title is-2">List of BioQuantities</h2>
        <Pager countOnPage={5}>
          {mockData &&
            mockData.map((item, i) => (
              <div className="box variable-item" key={`note-${i}`}>
                <strong className="m-r-5">{item.name}</strong>
                <span className="m-r-5">({item.valueStep})</span>
                <span>| {item.organismId}</span>
                <Link
                  className="button is-primary"
                  to={`/${bioQuantitiesNames.url}/detail/4`}
                >
                  View data
                </Link>
              </div>
            ))}
        </Pager>
      </div>
    </div>
  );
};

export default BioQuantitiesList;

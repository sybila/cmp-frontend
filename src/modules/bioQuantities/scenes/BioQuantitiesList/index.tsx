import Pager from "components/Pager";
import React, { useEffect } from "react";
import service from "../../services";
import Table from "components/TableWithPagination";

import { moduleNames as bioQuantitiesNames } from "../../reducers/MainReducer";
import { mockData } from "../mockData";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

const BioQuantitiesList = () => {
  useEffect(() => {
    service.fetchAllBioNumbers(1, 2, 0);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Organism",
        accessor: "organism",
      },
      {
        Header: "Value",
        accessor: "value",
      },
    ],
    []
  );

  const data = React.useMemo(
    () =>
      mockData.map((item, i) => ({
        name: item.name,
        value: item.valueStep,
        organism: item.organismId,
      })),
    []
  );

  return (
    <>
      <BreadcrumbsItem to={`/${bioQuantitiesNames.url}/`}>
        BioQuantities List
      </BreadcrumbsItem>
      <div className="section">
        <div className="container">
          <h2 className="title is-2">List of BioQuantities</h2>
          <div className="columns is-full-height">
            <div className="column">
              <div className="box is-full-height is-padding-extended">
                <Table data={data} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioQuantitiesList;

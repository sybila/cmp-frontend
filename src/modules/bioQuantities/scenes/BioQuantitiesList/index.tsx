import React, { useCallback, useEffect, useState } from "react";
import service, { sortType, searchType } from "../../services";
import Table, { Refetch } from "components/TableWithPagination";

import { moduleNames as bioQuantitiesNames } from "../../reducers/MainReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10;
const COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
    search: true,
    sort: true,
    Cell: ({ value, row }) => (
      <Link to={`/${bioQuantitiesNames.url}/detail/${row.id}`}>{value}</Link>
    ),
  },
  {
    Header: "Organism",
    accessor: "organism",
    search: true,
    sort: true,
  },
  {
    Header: "Value",
    accessor: "value",
    search: false,
    sort: false,
  },
];

const BioQuantitiesList = () => {
  const [bioQuantities, setBioQuantities] = useState<object[]>([]);

  const handleFetch = useCallback(
    (
      page: number,
      pageSize = PAGE_SIZE,
      search?: searchType,
      sort?: sortType,
      overwrite = false
    ) => {
      return service
        .fetchAllBioNumbers(page, pageSize, search, sort)
        .then(({ data: { data } }) => {
          if (overwrite) {
            setBioQuantities(data);
          } else {
            setBioQuantities((prevState) => [...prevState, ...data]);
          }
        });
    },
    [setBioQuantities]
  );

  const handleRefetch: Refetch = useCallback(
    (page, pageSize, search, sort) => {
      handleFetch(1, page * pageSize, search, sort, true);
    },
    [handleFetch]
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
                <Table
                  data={bioQuantities}
                  columns={COLUMNS}
                  pageSize={PAGE_SIZE}
                  fetchNext={handleFetch}
                  refetch={handleRefetch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioQuantitiesList;

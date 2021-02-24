import React, { useCallback, useEffect, useState } from "react";
import { useTable, usePagination, Column } from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { debounce } from "lodash";

export type Refetch = (
  page: number,
  pageSize: number,
  search: searchType,
  sort: sortType
) => void;

type Column = {
  Header: string;
  accessor: string;
  search?: boolean;
  sort?: boolean;
};

type Props = {
  data: object[];
  columns: Column[];
  pageSize?: number; // default: 10
  fetchNext?: (page: number) => Promise<void>;
  refetch: Refetch;
};

type searchType = { [key: string]: string | number };
type sortType = {
  [key: string]: "asc" | "desc";
};

const Table = ({ columns, data, pageSize = 10, fetchNext, refetch }: Props) => {
  const [search, setSearch] = useState<searchType>({});
  const [sort, setSort] = useState<sortType>({});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    usePagination
  );

  const handleSearch = useCallback(
    (id: string, value: string) => {
      setSearch((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    },
    [setSearch]
  );

  const handleSort = useCallback(
    (id: string) => {
      setSort((prevState) => {
        return {
          ...prevState,
          [id]: prevState[id] === "asc" ? "desc" : "asc",
        };
      });
    },
    [setSort]
  );

  const handleRefetch = useCallback(debounce(refetch, 200), [refetch]);

  useEffect(() => {
    console.log(pageIndex, pageSize);
    handleRefetch(pageIndex + 1, pageSize, search, sort);
  }, [handleRefetch, sort, search]);

  return (
    <div>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div className="is-flex">
                    {column.sort && (
                      <button
                        className="button is-white"
                        onClick={() => handleSort(column.id)}
                      >
                        <FontAwesomeIcon
                          icon={
                            sort[column.id] === "asc" ? faCaretUp : faCaretDown
                          }
                        />
                      </button>
                    )}
                    {column.search ? (
                      <input
                        className="input"
                        type="text"
                        placeholder={column.render("Header")}
                        onChange={(e) =>
                          handleSearch(column.id, e.currentTarget.value)
                        }
                        name={column.id}
                        value={search[column.id]}
                      />
                    ) : (
                      column.render("Header")
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav className="pagination" role="navigation" aria-label="pagination">
        {canPreviousPage && (
          <a
            className="pagination-previous"
            title="This is the first page"
            onClick={previousPage}
          >
            Previous
          </a>
        )}
        <a
          className="pagination-next"
          onClick={() =>
            canNextPage
              ? nextPage()
              : fetchNext && fetchNext(pageIndex + 2).then(nextPage)
          }
        >
          Next
        </a>
        <ul className="pagination-list"></ul>
      </nav>
    </div>
  );
};

export default Table;

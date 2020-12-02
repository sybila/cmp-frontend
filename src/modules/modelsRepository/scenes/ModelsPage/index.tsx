import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useDispatch, useSelector } from "react-redux";
import { moduleNames as modelsNames } from "../../reducers/MainReducer";

import { loadModels } from "../../actions";
import { getAllModels, getModelById } from "../../selectors";
import { Model } from "models/Model";
import PanelBlock, { PanelTab } from "components/PanelBlock";
import Detail from "./Detail";
import config from "config";
import { getUser } from "ApplicationSelectors";

interface Filter extends PanelTab {
  permission?: number;
  status?: string;
}

const FILTERS: Filter[] = [
  {
    id: 1,
    caption: "All",
  },
  {
    id: 2,
    caption: "Public",
    status: "public",
  },
  {
    id: 3,
    caption: "Private",
    permission: config.permissions.REGISTERED,
    status: "private",
  },
];

const MainPage = () => {
  const [displayId, setDisplayId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setFilter] = useState<Filter>(FILTERS[0]);

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const models: Model[] = useSelector(getAllModels);
  const displayModel: Model = useSelector((state) =>
    getModelById(state as any)(displayId)
  );

  useEffect(() => {
    dispatch(loadModels());
  }, []);

  const filters = useMemo(
    () =>
      FILTERS.filter(
        (filter) => !filter.permission || filter.permission >= user.type.tier
      ),
    [user]
  );

  const modelsFiltered = useMemo(
    () =>
      models.filter(
        (model) =>
          !selectedFilter ||
          !selectedFilter.status ||
          model.status === selectedFilter.status
      ),
    [selectedFilter, models]
  );

  const handleModelClick = useCallback(
    (id: number) => {
      setDisplayId(id);
    },
    [setDisplayId]
  );

  const handleFilterClick = useCallback(
    (id: number) => {
      setFilter(filters.find((filter) => filter.id === id));
    },
    [filters]
  );

  return (
    <>
      <BreadcrumbsItem to={`/${modelsNames.url}/`}>
        Published Models
      </BreadcrumbsItem>
      <section className="section">
        <div className="container">
          <div className="columns p-b-0">
            <div className="column is-12 p-b-0">
              <h2 className="title is-2">Published models</h2>
            </div>
          </div>
          <div className="columns is-full-height">
            <div className="column is-4">
              <div className="box">
                <PanelBlock
                  items={modelsFiltered}
                  activeId={displayId}
                  itemClick={handleModelClick}
                  search={setSearchQuery}
                  searchQuery={searchQuery}
                  title={"Models"}
                  emptyMsg={"No models found."}
                  tabs={filters}
                  onTabClick={handleFilterClick}
                />
              </div>
            </div>
            <div className="column">
              <div className="box is-full-height is-padding-extended">
                <Detail model={displayModel} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MainPage;

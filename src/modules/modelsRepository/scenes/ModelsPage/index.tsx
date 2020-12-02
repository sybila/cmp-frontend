import React, { useCallback, useEffect, useState } from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { useDispatch, useSelector } from "react-redux";
import { moduleNames as modelsNames } from "../../reducers/MainReducer";

import { loadModels } from "../../actions";
import { getAllModels, getModelById } from "../../selectors";
import { Model } from "models/Model";
import PanelBlock from "components/PanelBlock";
import Detail from "./Detail";

const MainPage = () => {
  const [displayId, setDisplayId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const models = useSelector(getAllModels);
  const displayModel: Model = useSelector((state) =>
    getModelById(state as any)(displayId)
  );

  useEffect(() => {
    dispatch(loadModels());
  }, []);

  const handleModelClick = useCallback(
    (id: number) => {
      setDisplayId(id);
    },
    [setDisplayId]
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
                  items={models}
                  activeId={displayId}
                  itemClick={handleModelClick}
                  search={setSearchQuery}
                  searchQuery={searchQuery}
                  title={"Models"}
                  emptyMsg={"No models found."}
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

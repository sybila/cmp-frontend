import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { moduleNames as modelsNames } from "../../reducers/MainReducer";

interface Props {}

interface State {}

class MainPage extends React.Component<Props, State> {
  render() {
    return (
      <>
        <BreadcrumbsItem to={`/${modelsNames.url}/info`}>
          About models
        </BreadcrumbsItem>
        <div className="section">
          <div className="container">
            <h2 className="title is-2">About models module</h2>
            <div className="box">
              <p>
                The model module provides an interface to create, store,
                simulate and analyze the computational models relevant in the
                given CMP context. CMP model repository supports similar types
                of models as models that can be written in the SBML standard,
                since our database reflects the structure of SBML. This means
                that following entities can be defined and be added to any
                model:
                <ul className={"classic"}>
                  <li>compartment</li>
                  <li>reaction</li>
                  <li>specie</li>
                  <li>reaction item</li>
                  <li>function</li>
                  <li>constraint</li>
                  <li>event</li>
                  <li>event assignment</li>
                  <li>initial assignment</li>
                  <li>function definition</li>
                  <li>rule</li>
                </ul>
              </p>

              <p>
                Some of these entities can be mapped to BCS. This backs up the
                informational value of the platform. Such mappings serve for
                easier determination of model’s or experiment’s overlaps and
                connections with each other, including the easier revelation of
                their possible meaning.
              </p>

              <p>
                The module also provides an import and export of SBML documents.
              </p>

              <p>
                Attentive readers could point out that units and units
                definitions are too a part of SBML model. We’ve covered that
                functionality in our Units module, that serves both, Model and
                Experiment modules, for convenience.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

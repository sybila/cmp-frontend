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
                The model module provides an interface to store,
                simulate and analyze the computational models relevant in the
                given epidemiological context. CMP model repository supports models that written in the SBML standard.
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

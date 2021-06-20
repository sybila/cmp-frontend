import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { moduleNames as quantityNames } from "../reducers/MainReducer";

interface Props {}

interface State {}

class ModuleInfo extends React.Component<Props, State> {
  render() {
    return (
      <>
        <BreadcrumbsItem to={`/${quantityNames.url}/info`}>
          About EpiQuantities
        </BreadcrumbsItem>
        <div className="section">
          <div className="container">
            <h2 className="title is-2">About EpiQuantities module</h2>
            <div className="box">
              <p>
                In general, BioQuantities module provides a collection of numbers relevant
                in biological processes and research. In context of epidemics, it provides values relevant
                  in the epidemiology.
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

export default connect(mapStateToProps, mapDispatchToProps)(ModuleInfo);

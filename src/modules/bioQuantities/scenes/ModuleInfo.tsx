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
          About BioQuantities
        </BreadcrumbsItem>
        <div className="section">
          <div className="container">
            <h2 className="title is-2">About BioQuantities module</h2>
            <div className="box">
              <p>
                Bioquantities module provides a collection of numbers relevant
                in biological processes and research.
              </p>
              <p>
                Users can use numbers from the database or import their own
                numbers. Bioquantities module communicates with BCS, Units and
                Experiments module.
              </p>
              <p>
                Currently we recognize 3 types of Bioquantities - scalar value,
                time series and value intervals. Each Bioquantity is represented
                by its id, name and value. If the Bioquantity has been currated,
                attribute is_valid is set to true.{" "}
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

import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { moduleNames as experimentsNames } from "../../reducers/MainReducer";

interface Props {}

interface State {}

class MainPage extends React.Component<Props, State> {
  render() {
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/info`}>
          About experiments
        </BreadcrumbsItem>
        <div className="section">
          <div className="container">
            <h2 className="title is-2">About experiments module</h2>
            <div className="box">
              <p>
                Main purpose of experiments in CMP is model validation.
                Experiment repository is a tool for storage and presentation of
                time-series data from wet-lab experiments. Every experiment
                should be well described (device, medium, organism, etc.) and
                annotated, so that will be possible to reproduce the result.
                Experiment's variables might be related to Biochemical Space and
                should have a set unit. Measured data can be imported from
                specific formats and you can export the experiment to your local
                device. There is also an option to add notes to experiment or
                specific variables. Notes can be plain text or picture and are
                assigned to particular time. Moreover, it is possible to
                visualise the data in a table or chart, where you can compare
                experiment data with models simulations.
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

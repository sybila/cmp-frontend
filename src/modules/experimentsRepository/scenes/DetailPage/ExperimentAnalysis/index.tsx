import React, { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import moment from "moment";
import dataService from "services/dataService";
import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { Link } from "react-router-dom";
import { ExperimentComponentProps } from "../..";
import axios from 'axios'
import Select from 'react-select'
import { isIndexed } from "immutable";
import InputForm from "./InputForm";
import ResultComponent from "./ResultComponent";
import service from "./../../../services";
import { result } from "lodash";

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
}

interface State {
  selectOptions: [],
  inputs: [],
  analyse: "",
  outputType: "",
  result: []
}

class ExperimentAnalysisPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectOptions: [],
      inputs: [],
      analyse: "",
      outputType: "",
      result: []
    };
  }

  async getOptions() {
    service.fetchAnalysis()
      .then((analysis) => analysis.map(d => ({
        "value": d,
        "label": d
      })))
      .then((options) => this.setState({ selectOptions: options }))
  }


  componentDidMount() {
    this.getOptions()
  }

  async handleChange(event) {
    this.setState({ analyse: event.label })
    service.fetchAnalysePrescription(event.label).then((prescription) => (this.setState({ inputs: prescription.inputs })))
  }

  /*async getData(url) {
    try {
      let res = await axios({
        url: url,
        method: 'get',
        timeout: 8000,
        headers: {
          'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"
        }
      })
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.status)
      }
      // Don't forget to return something
      console.log(res.data)
      return res.data.inputs
    }
    catch (err) {
      console.error(err);
    }
  }*/

  async onSubmit(model) {
    console.log(model);
    service.fetchRunAnalyse(this.state.analyse, { "inputs": [model] })
      .then((result) => (this.setState({ result: result.result, outputType: result.outputType })))
  }

  render() {
    const { experimentsById, match } = this.props;
    const currentExperiment: Experiment =
      experimentsById[match.params.experimentId];
    return currentExperiment ? (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/detail/${currentExperiment.id}`}
        >
          Analysis
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            <div className="box ">
              <h4 className="title is-4 m-b-10">Analyse</h4>
              <form>
                <Select width='30%'
                  options={this.state.selectOptions}
                  onChange={this.handleChange.bind(this)} />
              </form>
              <br></br>
              <div>
                <InputForm className="inputForms"
                  style="margin-right: 20px;"
                  title="Inputs"
                  model={this.state.inputs}
                  onSubmit={(model) => { this.onSubmit(model) }}
                />
              </div>
              <br></br>
              <div>
                <ResultComponent className="resultComponent"
                  style="margin-right: 20px;"
                  title="Result"
                  outputType={this.state.outputType}
                  result={this.state.result}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    ) : (
        <></>
      );
  }
}

const mapStateToProps = (state: AppState) => ({
  experimentsById: getExperimentsObject(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentAnalysisPage);

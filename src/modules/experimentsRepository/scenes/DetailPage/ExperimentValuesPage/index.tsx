import React from "react";
import Sheet from "../../../components/Sheet";
import { AppState } from "reducers/GlobalReducer";
import { ExperimentVariable } from "models/Experiment";
import { getVarsById } from "modules/experimentsRepository/selectors";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import _ from "lodash";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { Dispatch, bindActionCreators } from "redux";
import { loadExperimentVariablesValues } from "modules/experimentsRepository/actions";
import { ExperimentComponentProps } from "../..";
import { Link } from "react-router-dom";
import SelectableTimeline from "components/SelectableTimeline";

interface Props extends ExperimentComponentProps {
  variables: ExperimentVariable[];
  loadVariablesDetails: typeof loadExperimentVariablesValues;
  hasValues: boolean;
}

interface State {
  times: number[];
  hiddenVars: number[];
  minTime: number;
  maxTime: number;
}

class ExperimentValuesPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      hiddenVars: [],
      minTime: 0,
      maxTime: 0,
    };

    this.handleVarToggle = this.handleVarToggle.bind(this);
    this.handleRangeUpdate = this.handleRangeUpdate.bind(this);
    this.handleToggleAllVars = this.handleToggleAllVars.bind(this);
  }

  componentDidMount() {
    const { hasValues, match, loadVariablesDetails } = this.props;
    const { experimentId } = match.params;

    if (!hasValues) {
      loadVariablesDetails(experimentId);
    } else {
      const times = this.getTimes;
      this.setState({
        times,
        maxTime: times.length > 0 ? times[times.length - 1] : 0,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.variables, this.props.variables)) {
      const times = this.getTimes;
      this.setState({
        times,
        maxTime: times.length > 0 ? times[times.length - 1] : 0,
      });
    }
  }

  handleVarToggle(id: number) {
    const hiddenVars = [...this.state.hiddenVars];
    const index = hiddenVars.indexOf(id);

    index === -1 ? hiddenVars.push(id) : hiddenVars.splice(index, 1);

    this.setState({
      hiddenVars,
    });
  }

  handleToggleAllVars() {
    if (this.state.hiddenVars.length) {
      this.setState({ hiddenVars: [] });
    } else {
      this.setState({
        hiddenVars: this.props.variables.map((variable) => variable.id),
      });
    }
  }

  get getTimes() {
    return this.props.variables
      .filter((variable) => variable.values)
      .flatMap((variable) =>
        variable.values ? variable.values.map((value) => value.time) : []
      )
      .sort((a, b) => a - b)
      .filter((item, pos, ary) => {
        return !pos || item != ary[pos - 1];
      });
  }

  get graphset() {
    return {
      name: "Selected vriables",
      datasets: this.props.variables.map(
        (variable) => !this.state.hiddenVars.includes(variable.id)
      ),
    };
  }

  public handleRangeUpdate(ranges) {
    this.setState({ minTime: ranges[0].left, maxTime: ranges[0].right });
  }

  render() {
    const { variables } = this.props;
    const { hiddenVars, times, maxTime, minTime } = this.state;
    const { experimentId } = this.props.match.params;

    const displayedVars = variables
      ? variables.filter((variable) => hiddenVars.indexOf(variable.id) === -1)
      : [];
    const lastTimeStamp = times.length > 0 ? times[times.length - 1] : 0;

    return (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/:experimentId/variables/:variableId/data`}
        >
          Values
        </BreadcrumbsItem>
        <section className="section">
          <div className="container">
            <div className="box">
              <div className="box-heading m-b-20">
                <h4 className="title is-4 m-b-10">All values</h4>
              </div>
              <div className="m-b-10">Timeline</div>
              <SelectableTimeline
                lastTimeStamp={lastTimeStamp}
                onChange={this.handleRangeUpdate}
              />
              <div className="m-b-10 m-t-20">Displayed variables</div>
              <div className="tags are-small variables-tags">
                {variables.map((variable, i) => (
                  <span
                    key={`tags-vars-${i}`}
                    className={`tag is-rounded${
                      hiddenVars.indexOf(variable.id) === -1
                        ? " is-primary"
                        : ""
                    }`}
                    onClick={() => this.handleVarToggle(variable.id)}
                  >
                    {variable.name}
                  </span>
                ))}
                {variables && variables.length ? (
                  <span
                    className={`tag is-rounded${
                      hiddenVars.length ? " is-primary" : ""
                    }`}
                    onClick={this.handleToggleAllVars}
                  >
                    Toggle All
                  </span>
                ) : (
                  ""
                )}
              </div>
              <Sheet
                vars={displayedVars}
                times={times.filter(
                  (time) => time >= minTime && time <= maxTime
                )}
              />
              <Link
                to={{
                  pathname: `/experiments/repository/detail/${experimentId}/chart`,
                  state: { graphset: this.graphset },
                }}
                className="button is-rounded is-light is-link m-t-20"
              >
                View chart for selected variables
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => ({
  variables: getVarsById(state, ownProps.match.params.experimentId),
  hasValues: state.module_experiments.variables.hasValues,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadVariablesDetails: bindActionCreators(
    loadExperimentVariablesValues,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentValuesPage);

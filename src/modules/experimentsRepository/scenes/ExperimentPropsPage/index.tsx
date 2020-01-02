import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import moment from "moment";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { Link } from "react-router-dom";
import { ExperimentComponentProps } from "..";

interface Props extends ExperimentComponentProps {
  experimentsById: ByIdObject<Experiment>;
}

interface State {}

class ExperimentPropsPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { experimentsById, match } = this.props;
    const currentExperiment =
      experimentsById[match.params.experimentId];

    return currentExperiment ? (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/${currentExperiment.id}`}
        >
          Experiment properties
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            <div className="box ">
              <p>{currentExperiment.description}</p>
              <table className="table">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>{currentExperiment.status}</td>
                  </tr>
                  <tr>
                    <th>Inserted</th>
                    <td>
                      {moment(currentExperiment.inserted).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Started</th>
                    <td>
                      {moment(currentExperiment.started).format(
                        "YYYY/MM/DD HH:mm"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-tablet">
              {currentExperiment.experimentsInRelation &&
                currentExperiment.experimentsInRelation.length > 0 && (
                  <div className="column">
                    <div className="box">
                      <h4 className="title is-4">Experiments in relation</h4>
                      <div className="tags are-medium">
                        {currentExperiment.experimentsInRelation.map(
                          (experiment, index) => (
                            <span className="tag" key={`${index}-exp-in-relation`}>
                              <Link
                                to={`/${experimentsNames.url}/repository/detail/${experiment.id}`}
                              >
                                {experiment.name}
                              </Link>
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              {currentExperiment.bioquantities &&
                currentExperiment.bioquantities.length > 0 && (
                  <div className="column">
                    <div className="box">
                      <h4 className="title is-4">Bioquantities</h4>
                    </div>
                  </div>
                )}
              {currentExperiment.models && currentExperiment.models.length > 0 && (
                <div className="column">
                  <div className="box">
                    <h4 className="title is-4">Models</h4>
                  </div>
                </div>
              )}
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
  experimentsById: getExperimentsObject(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentPropsPage);

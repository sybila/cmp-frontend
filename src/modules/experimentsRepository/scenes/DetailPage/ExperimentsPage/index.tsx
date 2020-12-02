import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { loadExperiments } from "modules/experimentsRepository/actions";
import {
  getAllExperiments,
  getExperimentsObject,
} from "modules/experimentsRepository/selectors";
import { ExperimentPartial } from "models/Experiment";
import PanelBlock from "components/PanelBlock";
import ExperimentDetail from "./ExperimentDetail";
import { ByIdObject } from "models/GenericTypes";

interface Props {
  experiments: ExperimentPartial[];

  experimentsById: ByIdObject<ExperimentPartial>;
  loadExperiments: () => void;
}

interface State {
  activeId: number;
  searchQuery: string;
}

class ExperimentsRepository extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.panelClickHandle = this.panelClickHandle.bind(this);
    this.searchHandle = this.searchHandle.bind(this);

    this.state = {
      activeId: null,
      searchQuery: "",
    };
  }

  componentDidMount() {
    const { loadExperiments } = this.props;
    loadExperiments();
  }

  componentDidUpdate(prevProps) {
    const { experiments } = this.props;
    if (prevProps.experiments !== experiments && experiments.length) {
      this.setState({
        activeId: experiments[0].id,
      });
    }
  }

  panelClickHandle(id: number) {
    this.setState({ activeId: id });
  }

  searchHandle(searchQuery: string) {
    this.setState({ searchQuery });
  }

  render() {
    const { experiments, experimentsById } = this.props;
    const { activeId, searchQuery } = this.state;

    const experiment = experimentsById[activeId];
    const filteredExperiments = experiments.filter((experiment) =>
      experiment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/`}>
          Repository
        </BreadcrumbsItem>
        <section className="section">
          <div className="container">
            <div className="columns p-b-0">
              <div className="column is-12 p-b-0">
                <h2 className="title is-2">Experiments repository</h2>
              </div>
            </div>
            <div className="columns is-full-height">
              <div className="column is-4">
                <div className="box">
                  <PanelBlock
                    items={filteredExperiments}
                    activeId={activeId}
                    itemClick={this.panelClickHandle}
                    search={this.searchHandle}
                    searchQuery={searchQuery}
                    title={"Experiments"}
                    emptyMsg={"No experiments found."}
                  />
                </div>
              </div>
              <div className="column">
                <div className="box is-full-height is-padding-extended">
                  <ExperimentDetail experiment={experiment} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadExperiments: bindActionCreators(loadExperiments, dispatch),
});

const mapStateToProps = (state: AppState) => ({
  experiments: getAllExperiments(state),
  experimentsById: getExperimentsObject(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsRepository);

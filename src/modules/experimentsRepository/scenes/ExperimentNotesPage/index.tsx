import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import moment from "moment";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { makeNotesSelectorForExperiment } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment, ExperimentNote } from "models/Experiment";
import { loadExperimentNotes } from "modules/experimentsRepository/actions";

interface Props extends RouteComponentProps {
  notes: ExperimentNote[];
  loadNotes: Function
}

interface State {
}

class ExperimentNotesPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const { loadNotes, match } = this.props;
    loadNotes((match.params as any).experimentId);
    console.log((match.params as any));
  }

  render() {
    const { match, notes } = this.props;
    console.log("render", (match.params as any));
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail/${(match.params as any).experimentId}/notes`}>
          Experiment notes
        </BreadcrumbsItem>
        <section className="section p-b-0">
          {notes && notes.map((note) => note.note)}
        </section>
      </> 
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {
  const selectNotesForExperiment = makeNotesSelectorForExperiment();

  return {
    notes: selectNotesForExperiment(state, ownProps.match.params.experimentId)
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: bindActionCreators(loadExperimentNotes, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentNotesPage);

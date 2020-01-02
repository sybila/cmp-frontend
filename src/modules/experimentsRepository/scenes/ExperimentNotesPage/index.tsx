import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getNotesById } from "modules/experimentsRepository/selectors";
import { ExperimentNote } from "models/Experiment";
import { loadExperimentNotes } from "modules/experimentsRepository/actions";
import { hhmmss } from "utils/helpers";
import { ExperimentComponentProps } from "..";

interface Props extends ExperimentComponentProps {
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
    const { loadNotes, match, notes } = this.props;
    !notes && loadNotes(match.params.experimentId);
  }

  render() {
    const { match, notes } = this.props;
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail/${match.params.experimentId}/notes`}>
          Experiment notes
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            {notes && notes.map((item, i) => <div className="box" key={`note-${i}`}>
              <div><strong>Time:</strong> {hhmmss(item.time)}</div>
              <p>{item.note}</p>
              {item.imgLink && <img src={item.imgLink} alt={item.note}/>}
            </div>)}
          </div>
        </section>
      </> 
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {

  return {
    notes: getNotesById(state, ownProps.match.params.experimentId)
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: bindActionCreators(loadExperimentNotes, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentNotesPage);

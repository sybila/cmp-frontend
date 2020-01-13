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
import SelectableTimeline from "components/SelectableTimeline";

interface Props extends ExperimentComponentProps {
  notes: ExperimentNote[];
  loadNotes: Function;
}

interface State {
  minTime: number;
  maxTime: number;
}

class ExperimentNotesPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      minTime: 0,
      maxTime: 0
    };

    this.handleRangeUpdate = this.handleRangeUpdate.bind(this);
  }

  componentDidMount() {
    const { loadNotes, match, notes } = this.props;

    if (notes) {
      const length = notes.length;
      length > 0 &&
        this.setState({
          maxTime: notes[length - 1].time
        });
    } else {
      loadNotes(match.params.experimentId).then(data => {
        const { byId, all } = data.value.data;
        if (all.length > 0) {
          const lastIndex = all[all.length - 1];
          this.setState({
            maxTime: byId[lastIndex].time
          });
        }
      });
    }
  }

  public handleRangeUpdate(ranges) {
    this.setState({ minTime: ranges[0].left, maxTime: ranges[0].right });
  }

  render() {
    const { match, notes } = this.props;
    const { minTime, maxTime } = this.state;

    const last = notes ? notes[notes.length - 1].time : 0;
    return (
      <>
        <BreadcrumbsItem
          to={`/${experimentsNames.url}/repository/detail/${match.params.experimentId}/notes`}
        >
          Notes
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            <div className="box">
              <h4 className="title is-4 m-b-10">Timeline</h4>
              <SelectableTimeline
                lastTimeStamp={last}
                onChange={this.handleRangeUpdate}
              />
            </div>
            {notes &&
              notes
                .filter(item => item.time >= minTime && item.time <= maxTime)
                .map((item, i) => (
                  <div className="box" key={`note-${i}`}>
                    <div>
                      <strong>Time:</strong> {hhmmss(item.time)}
                    </div>
                    <p>{item.note}</p>
                    {item.imgLink && <img src={item.imgLink} alt={item.note} />}
                  </div>
                ))}
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {
  return {
    notes: getNotesById(state, ownProps.match.params.experimentId)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadNotes: bindActionCreators(loadExperimentNotes, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentNotesPage);

import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { ExperimentNote } from "models/Experiment";

interface Props extends RouteComponentProps {
  notes: ExperimentNote[];
  loadNotes: Function;
}

interface State {
}

class ExperimentVarsPage extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    const { loadNotes, match, notes } = this.props;
    !notes && loadNotes((match.params as any).experimentId);
  }

  render() {
    const { match, notes } = this.props;
    return (
      <>
        <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail/${(match.params as any).experimentId}/variables`}>
          Experiment notes
        </BreadcrumbsItem>
        <section className="section p-b-0">
          <div className="container">
            
          </div>
        </section>
      </> 
    );
  }
}

const mapStateToProps = (state: AppState, ownProps) => {

  return {
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentVarsPage);

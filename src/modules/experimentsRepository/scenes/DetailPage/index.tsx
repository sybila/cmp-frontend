import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import PageMenuPanel from "components/PageMenuPanel";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { loadExperiment } from "modules/experimentsRepository/actions";

interface Props extends RouteComponentProps {
    experimentsById: ByIdObject<Experiment>;
    loadExperiment: Function;
}

interface State {
}

class DetailPage extends React.PureComponent<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    routes = [
        {
            caption: "Experiment",
            to: "/detail"
        }
    ];

    componentDidMount() {
        const { match, loadExperiment } = this.props;
        loadExperiment((match.params as any).experimentId);
    }

    render() {
        const { experimentsById, match } = this.props;
        const currentExperiment = experimentsById[(match.params as any).experimentId];

        return (
            currentExperiment ? <>
            <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail/${currentExperiment.id}`}>
                {currentExperiment.name}
            </BreadcrumbsItem>
            <section className="section">
                <div className="container">
                    <PageMenuPanel items={this.routes} />
                </div>
            </section>
            </> : <></>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    experimentsById: getExperimentsObject(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadExperiment: bindActionCreators(loadExperiment, dispatch),
});
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailPage);

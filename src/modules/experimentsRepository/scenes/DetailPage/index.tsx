import React from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps, Switch, Route } from "react-router";
import _ from "lodash";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import PageMenuPanel from "components/PageMenuPanel";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getExperimentsObject } from "modules/experimentsRepository/selectors";
import { ByIdObject } from "models/GenericTypes";
import { Experiment } from "models/Experiment";
import { loadExperiment } from "modules/experimentsRepository/actions";
import ExperimentPropsPage from "../ExperimentPropsPage";

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

    componentDidMount() {
        const { match, loadExperiment } = this.props;
        loadExperiment((match.params as any).experimentId);
    }

    render() {
        const { experimentsById, match } = this.props;
        const currentExperiment = experimentsById[(match.params as any).experimentId];

        const routeBase = `/${experimentsNames.url}/repository/detail/${currentExperiment ? currentExperiment.id : ""}`
        const routes = [
            {
                caption: "Experiment",
                to: "",
                component: ExperimentPropsPage,
                order: 5
            },
            {
                caption: "Protocol",
                to: "/protocol",
                order: 0
            },
            {
                caption: "Notes",
                to: "/notes",
                order: 1
            },
            {
                caption: "Vriables",
                to: "/variables",
                order: 2
            },
            {
                caption: "Values",
                to: "/values",
                order: 3
            },
            {
                caption: "View char",
                to: "/char",
                order: 4
            },
        ];

        return (
            currentExperiment ? <>
            <BreadcrumbsItem to={`/${experimentsNames.url}/repository/detail`}>
                {currentExperiment.name}
            </BreadcrumbsItem>
            <section className="section p-b-0">
                <div className="container">
                    <h2 className="title is-2">{currentExperiment.name}</h2>
                    <PageMenuPanel items={routes} basePath={routeBase} />
                </div>
            </section>
            <Switch>
                {_.sortBy(routes, [(route) => route.order]).map((route) => <Route
                    path={route.to}
                    component={route.component}
                />)}
            </Switch>
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

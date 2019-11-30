import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";

interface Props { }

interface State { }

class ExperimentsRepository extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <>
                <BreadcrumbsItem to={`/${experimentsNames.url}/repository`}>
                    Experiments repository
                </BreadcrumbsItem>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-4">
                                <div className="box">
                                    <nav className="panel">
                                        <p className="panel-heading">
                                            Experiments
                                        </p>
                                        <div className="panel-block">
                                            <p className="control has-icons-left">
                                                <input className="input" type="text" placeholder="Search" />
                                                <span className="icon is-left">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </span>
                                            </p>
                                        </div>
                                        <a className="panel-block" href="/">
                                            bulma
                                        </a>
                                    </nav>
                                </div>
                            </div>
                            <div className="column">
                                <div className="box">
                                    <h2 className="title is-2">Experiments repository</h2>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = (state: AppState) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExperimentsRepository);

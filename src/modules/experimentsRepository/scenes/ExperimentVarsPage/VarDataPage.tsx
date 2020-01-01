import React from "react";
import Sheet from "../../components/Sheet";
import { AppState } from "reducers/GlobalReducer";
import { ExperimentVariable } from "models/Experiment";
import { getVarsById } from "modules/experimentsRepository/selectors";
import { connect } from "react-redux";

interface Props {
    variables: ExperimentVariable[];
}

class VarDataPage extends React.PureComponent<Props> {
    render() {
        const { variables } = this.props;
        console.log(variables);
        return <section className="section">
            <div className="container">
                <div className="box">
                    <Sheet vars={variables} />
                </div>
            </div>
        </section>;
    }
}

const mapStateToProps = (state: AppState, ownProps) => ({
    variables: getVarsById(state, ownProps.match.params.experimentId),
})

export default connect(mapStateToProps)(VarDataPage);
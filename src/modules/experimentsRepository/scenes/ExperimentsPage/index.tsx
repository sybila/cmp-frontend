import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";

import { moduleNames as experimentsNames } from "../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { Section, Container, Box, Heading, Panel, Columns, Form } from 'react-bulma-components';

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
                <Section>
                    <Container>
                        <Columns>
                            <Columns.Column size={4}>
                                <Box
                                    paddingless={false}
                                >
                                    <Panel>
                                        <Panel.Header>
                                            Experiments
                                        </Panel.Header>
                                        <Panel.Block>
                                            <Form.Control>
                                                <Form.Input size="small" type="text" placeholder="search" />
                                            </Form.Control>
                                        </Panel.Block>
                                        <Panel.Block renderAs="a" active>
                                            bulma
                                        </Panel.Block>
                                    </Panel>
                                </Box>
                            </Columns.Column>
                            <Columns.Column>
                                <Box
                                    paddingless={false}
                                >
                                    <Heading size={2}>Experiments repository</Heading>

                                </Box>
                            </Columns.Column>
                        </Columns>
                    </Container>
                </Section>
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

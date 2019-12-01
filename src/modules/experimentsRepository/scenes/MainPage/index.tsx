import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Section, Container, Box, Heading } from 'react-bulma-components';


interface Props { }

interface State { }

class MainPage extends React.Component<Props, State> {
    render() {
        return (
            <Section>
                <Container>
                    <Heading size={2}>Experiments repository</Heading>
                    <Box
                        paddingless={false}
                    >
                        <p>
                            Model repository contains computational models of selected
                            biological processes relevant for cyanobacteria. Models
                            implemented on this website are manually curated, integrated
                            within the e-cyanobacterium formal Biochemical Space, and
                            associated with cross-references.{" "}
                        </p>

                        <p>
                            Most of the implemented models are already published, though some
                            of the models present fresh work which might be yet unpublished.
                            All of the models are available in public domain.
                        </p>
                    </Box>
                </Container>
            </Section>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);

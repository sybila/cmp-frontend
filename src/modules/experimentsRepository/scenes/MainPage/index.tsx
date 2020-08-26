import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import Visualizer from "../../../../utils/visualizer";

interface Props {}

interface State {}

class MainPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="section">
        <Visualizer
          models={[{ model: true, id: "anotherModel" }]}
          width="50%"
        />

        <div className="container">
          <h2 className="title is-2">Experiments</h2>
          <div className="box">
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
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

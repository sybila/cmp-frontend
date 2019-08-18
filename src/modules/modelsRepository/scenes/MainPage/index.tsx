import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Props {}

interface State {}

class MainPage extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <h2 className={"module-heading"}>Model Repository</h2>
        <div className={"row"}>
          <div className={"bg-box-white col-12"}>
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

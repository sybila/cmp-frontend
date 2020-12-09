import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { UserModel } from "models/User";
import { getUser } from "ApplicationSelectors";
import { AppState } from "reducers/GlobalReducer";
import Dashboard from "modules/administration/scenes/Dashboard";

import HeroImg from "assets/cmp-hero-img.png";

interface Props {
  user: UserModel;
}

class LoginPage extends React.Component<Props> {
  componentDidMount() {}

  render() {
    return !this.props.user ? (
      <div className={"landing-hero section container"}>
        <figure className="image">
          <img
            src={HeroImg}
            title="Comprehensive Modelling Platform"
            alt="Comprehensive Modelling Platform"
          />
        </figure>
        <div>
          <h1>Comprehensive Modelling Platform</h1>
          <p className={"lead"}>
            CMP is a general framework for public sharing, annotation, and
            visualisation of domain-specific dynamical models and wet-lab
            experiments.
          </p>
          <p>
            The platform is unique in integrating abstract mathematical models
            with a precise consortium-agreed bio-chemical description provided
            in a rule-based formalism. The general aim is to stimulate
            collaboration between experimental and computational systems
            biologists to achieve a better understanding of the domain-specific
            system.
          </p>
          <p>
            CMP is logically divided into 4 parts. Each of them has a specific
            responsibility and works with a different database. Modules
            communicate with each other in specific ways concerning their
            competence defined by their functionalities.
          </p>
          <a className={"btn btn-primary btn-lg cta"} href="/" role="button">
            About us
          </a>
        </div>
      </div>
    ) : (
      <Dashboard />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: getUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

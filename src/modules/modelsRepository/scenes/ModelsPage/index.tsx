import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { AppState } from "reducers/GlobalReducer";
import { loadModels } from "../../actions";
import { getAllModels, getModelById } from "../../selectors";
import { Model } from "models/Model";
import Accordion from "../../../../components/Accordion";
import placeholderImg from "../../../../assets/image-clark.png";

interface Props {
  loadModels: () => any;
  models: Model[];
  getModelById: (id: number) => Model;
}

interface State {
  displayId: number;
}

class MainPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      displayId: null
    };
    this.handleModelClick = this.handleModelClick.bind(this);
  }

  componentDidMount() {
    this.props.loadModels().then((Data: any) => {
      const displayId = Data.value.all[0];
      this.setState({ displayId });
    });
  }

  handleModelClick(id: number) {
    this.setState({ displayId: id });
  }

  render() {
    const { models, getModelById } = this.props;
    const { displayId } = this.state;

    const displayModel: Model = getModelById(displayId);

    const accordionItems = models.map((model: Model) => ({
      id: model.id,
      heading: model.name,
      body: model.description
    }));

    return (
      <div className="mdc-layout-grid__inner">
        <BreadcrumbsItem to="/models-repo/published-models">
          Published Models
        </BreadcrumbsItem>
        <h2
          className={
            "module-heading mdc-layout-grid__cell mdc-layout-grid__cell--span-12"
          }
        >
          Published Models
        </h2>
        <div
          className={
            "mdc-layout-grid__cell mdc-layout-grid__cell--span-4 box-scroll-wrap"
          }
        >
          <div className={"bg-box-white"}>
            <Accordion
              items={accordionItems}
              className={"box-scroll"}
              onClick={this.handleModelClick}
            />
          </div>
        </div>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
          <div className={"bg-box-white"}>
            {displayModel && (
              <React.Fragment>
                <h3>{displayModel.name}</h3>
                <img className="model-image" src={placeholderImg} alt={displayModel.name}/>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aliquam ante. Nullam faucibus mi quis velit. Phasellus enim
                  erat, vestibulum vel, aliquam a, posuere eu, velit. Fusce
                  suscipit libero eget elit. Praesent id justo in neque
                  elementum ultrices. Nam quis nulla. Duis sapien nunc, commodo
                  et, interdum suscipit, sollicitudin et, dolor. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Vestibulum fermentum tortor
                  id mi.
                </p>
                <Link className="btn btn-primary" to={`model-detail/20/model`}>
                  View model
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModels: bindActionCreators(loadModels, dispatch)
});

const mapStateToProps = (state: AppState) => ({
  models: getAllModels(state),
  getModelById: getModelById(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

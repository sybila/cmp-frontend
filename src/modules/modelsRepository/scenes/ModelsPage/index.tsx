import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { loadModels } from "../../actions";
import { getAllModels } from "../../selectors";
import { Model } from "models/Model";
import Accordion from "../../../../components/Accordion";
import placeholderImg from "../../../../assets/image-clark.png";
import { truncate } from "utils/helpers";

interface Props {
  loadModels: () => any;
  models: Model[];
}

interface State {}

class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.loadModels();
  }

  render() {
    const { models } = this.props;

    const accordionItems = models.map((model: Model) => ({
      heading: model.name,
      body: model.description
    }));

    return (
      <div>
        <BreadcrumbsItem to="/models-repo/published-models">
          Published Models
        </BreadcrumbsItem>
        <h2 className={"module-heading"}>Published Models</h2>
        <div className={"row row-boxes fluid-height"}>
          <div className={"bg-box-white col-4 box-scroll-wrap"}>
            <Accordion items={accordionItems} className={"box-scroll"} />
          </div>
          <div className="col-8">
            <div className={"bg-box-white"}>
              <h3>Clark et al. 2014 (in progress)</h3>
              <img className="model-image" src={placeholderImg} />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aliquam ante. Nullam faucibus mi quis velit. Phasellus enim
                erat, vestibulum vel, aliquam a, posuere eu, velit. Fusce
                suscipit libero eget elit. Praesent id justo in neque elementum
                ultrices. Nam quis nulla. Duis sapien nunc, commodo et, interdum
                suscipit, sollicitudin et, dolor. Sed ut perspiciatis unde omnis
                iste natus error sit voluptatem accusantium doloremque
                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Vestibulum fermentum tortor id mi.
              </p>
              <Link className="btn btn-primary" to={`model-detail/20/model`}>
                View model
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadModels: bindActionCreators(loadModels, dispatch)
});

const mapStateToProps = state => ({
  models: getAllModels(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

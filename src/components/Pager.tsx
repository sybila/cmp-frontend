import React from "react";
import _ from "lodash";

interface Props {
  countOnPage: number;
}

interface State {
  page: number;
  paginationNumbers: number[];
}

class Pager extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      paginationNumbers: []
    };

    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
  }

  componentDidMount() {
    this.setPaginationNumbers();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.children, this.props.children)) {
      console.log(true);
      this.setPaginationNumbers();
    }
  }

  get getChildren() {
    return React.Children.toArray(this.props.children);
  }

  get getNumberOfPages() {
    return Math.ceil(this.getChildren.length / this.props.countOnPage);
  }

  setPaginationNumbers() {
    let paginationNumbers = [];

    if (this.getNumberOfPages < 9) {
      paginationNumbers = Array.from(
        new Array(this.getNumberOfPages).keys()
      );
    } else {
      // TODO: review functionality 
      paginationNumbers.push(1);
      const mid = Math.ceil(this.getNumberOfPages / 2);
      paginationNumbers.push(mid - 1);
      paginationNumbers.push(mid);
      paginationNumbers.push(mid + 1) ;
      paginationNumbers.push(this.getNumberOfPages);
    }

    this.setState({ paginationNumbers });
  }

  handlePageClick(page: number) {
    this.setState({
      page
    });
  }

  handleNextPageClick() {
    const { page } = this.state;
    const numberOfPages = this.getNumberOfPages;
    if (page < numberOfPages - 1) {
      this.handlePageClick(page + 1);
    }
  }

  handlePrevPageClick() {
    const { page } = this.state;
    if (page > 0) {
      this.handlePageClick(page - 1);
    }
  }

  render() {
    const { page, paginationNumbers } = this.state;
    const { countOnPage } = this.props;
    const children = this.getChildren;
    const start = page * countOnPage;

    const renderedChildren = children.slice(start, start + countOnPage);

    const paginationItems = paginationNumbers.map((child, i) => {
      const pageNumber = i + 1;
      const isCurrent = page === i ? " is-current" : "";
      return (
        <li key={`pagination-${i}`}>
          <a
            className={`pagination-link${isCurrent}`}
            onClick={() => this.handlePageClick(i)}
            aria-label={`Goto page ${pageNumber}`}
          >
            {pageNumber}
          </a>
        </li>
      );
    });

    return (
      <>
        {renderedChildren}
        <div className="pagination-wrapper">
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <a
              className="pagination-previous"
              onClick={this.handlePrevPageClick}
            >
              Previous
            </a>
            <a className="pagination-next" onClick={this.handleNextPageClick}>
              Next page
            </a>
            <ul className="pagination-list">{paginationItems}</ul>
          </nav>
        </div>
      </>
    );
  }
}

export default Pager;

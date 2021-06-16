import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const DetailSection = ({ title, children }: Props) => {
  const history = useHistory();

  return (
    <section className="section p-b-0">
      <div className="container">
        <div className="is-flex m-b-20">
          <button
            className="button is-outlined is-normal p-t-10 p-b-10"
            onClick={() => history.goBack()}
          >
            <FontAwesomeIcon className="m-r-10" icon={faAngleLeft} /> Go back
          </button>
          <p className="subtitle is-3 m-l-25">{title}</p>
        </div>
        <div className="box is-padding-extended">{children}</div>
      </div>
    </section>
  );
};

export default DetailSection;

import React from "react";

interface Props {
  description?: string;
}

const Model = (props: Props) => {
  const { description } = props;

  return (
    <>
      <section className="section p-b-0">
        <div className="container">
          <div className="box ">
            <h4 className="title is-4 m-b-10">Model</h4>
            <p></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Model;

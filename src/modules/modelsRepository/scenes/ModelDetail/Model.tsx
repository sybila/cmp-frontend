import React from "react";

interface Props {
  description?: string;
}

const Model = (props: Props) => {
  const { description } = props;

  return (
    <div
      className={
        "bg-box-white mdc-layout-grid__cell mdc-layout-grid__cell--span-12"
      }
    >
      <p>{description}</p>
    </div>
  );
};

export default Model;

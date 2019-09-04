import React from "react";

interface Props {
  description?: string;
}

const Model = (props: Props) => {
  const { description } = props;

  return (
    <div className={"row"}>
      <div className={"bg-box-white col-12"}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Model;

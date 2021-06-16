import React from "react";
import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  isTree?: boolean;
}

const List = ({ children, isTree }: Props) => {
  return (
    <div className={clsx({ "cards-list": true, "cards-tree": isTree })}>
      {children}
    </div>
  );
};

export default List;

import React from "react";
import { Link } from "react-router-dom";

interface Props {
  children: string;
  class?: string;
}

export const Button = (props: Props) => (
  <button type="button" className={`btn ${props.class}`}>
    {props.children}
  </button>
);

interface LinkProps extends Props {
  to: string;
}

export const ButtonLink = (props: LinkProps) => (
  <Link className={`btn ${props.class}`} to={props.to}>
    {props.children}
  </Link>
);

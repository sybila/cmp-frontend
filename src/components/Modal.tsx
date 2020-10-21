import React from "react";
import useClickOutside from "hooks/useClickOutside";

interface Props {
  isOpen: boolean;
  title: string;
  children?: any;
  actions: any;
  close: () => void;
}

const Modal = (props: Props) => {
  const ref = React.useRef();
  useClickOutside(ref, props.close);

  return (
    <div className={`modal${props.isOpen ? " is-active" : ""}`}>
      <div className="modal-background"></div>
      <div ref={ref} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={props.close}
          ></button>
        </header>
        <section className="modal-card-body">{props.children}</section>
        <footer className="modal-card-foot">{props.actions}</footer>
      </div>
    </div>
  );
};

export default Modal;

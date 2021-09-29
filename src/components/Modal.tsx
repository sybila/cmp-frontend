import React from "react";
import useClickOutside from "hooks/useClickOutside";

type Props = React.PropsWithChildren<{
  isOpen: boolean;
  title: string;
  footer?: React.ReactNode;
  onDismiss: () => void;
}>;

const Modal = ({ footer, onDismiss, isOpen, children, title }: Props) => {
  const ref = React.useRef();
  // FIX: MouseUp should not trigger click outside, also there are
  // issues with portaled menus for example with UsersPicker
  // useClickOutside(ref, onDismiss);

  return (
    <div className={`modal${isOpen ? " is-active" : ""}`}>
      <div className="modal-background"></div>
      <div ref={ref} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onDismiss}
          ></button>
        </header>
        <section className="modal-card-body">{children}</section>
        {footer && <footer className="modal-card-foot">{footer}</footer>}
      </div>
    </div>
  );
};

export default Modal;

import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

type Title = string | JSX.Element;
interface CardInterface {
  headerTitle?: Title;
  title?: Title;
  subtitle?: Title;
  footer?: JSX.Element[];
  children?: React.ReactNode;
  onOpen?: (state: boolean) => void;
  disableToggle?: boolean;
}

const Card = ({
  title,
  subtitle,
  footer,
  headerTitle,
  children,
  onOpen,
  disableToggle,
}: CardInterface) => {
  const [isOpen, toggle] = React.useState(false);

  const handleOpen = useCallback(() => {
    toggle(!isOpen);
    onOpen && onOpen(!isOpen);
  }, [isOpen]);

  return (
    <div className="card">
      {headerTitle && (
        <header className="card-header" onClick={handleOpen}>
          <p className="card-header-title m-b-0">{headerTitle}</p>
          {!disableToggle && (
            <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleUp} />
              </span>
            </a>
          )}
        </header>
      )}
      {(isOpen || !headerTitle) && (
        <>
          <div className="card-content">
            {title && <p className="title">{title}</p>}
            {subtitle && <p className="subtitle">{subtitle}</p>}
            {children}
          </div>
          {footer && (
            <footer className="card-footer">
              {footer.map((footerItem) => (
                <p className="card-footer-item">
                  <span>{footerItem}</span>
                </p>
              ))}
            </footer>
          )}
        </>
      )}
    </div>
  );
};

export default Card;

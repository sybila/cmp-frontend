import React from "react";

interface CardInterface {
  title?: string;
  subtitle?: string;
  footer?: JSX.Element[];
}

const Card = ({ title, subtitle, footer }: CardInterface) => {
  return (
    <div className="card">
      <div className="card-content">
        {title && <p className="title">{title}</p>}
        {subtitle && <p className="subtitle">{subtitle}</p>}
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
    </div>
  );
};

export default Card;

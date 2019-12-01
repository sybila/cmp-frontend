import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    items: {
        caption: string;
        to: string;
    }[];
}

const PageMenuPanel = (props: Props) => {
    const { items } = props;
    
    return (
        <nav className="navbar menu-panel">
            <div className="navbar-menu">
                <div className="navbar-start">
                    {items.map((item) => <NavLink to={item.to} className="navbar-item">
                        {item.caption}
                    </NavLink>)}
                </div>
            </div>
        </nav>
    );
}

export default PageMenuPanel;
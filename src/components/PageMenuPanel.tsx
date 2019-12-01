import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
    basePath?: string;
    items: {
        caption: string;
        to: string;
    }[];
}

const PageMenuPanel = (props: Props) => {
    const { items, basePath } = props;
    
    return (
        <nav className="navbar menu-panel">
            <div className="navbar-menu">
                <div className="navbar-start">
                    {items.map((item) => <NavLink exact to={`${basePath}${item.to}`} className="navbar-item">
                        {item.caption}
                    </NavLink>)}
                </div>
            </div>
        </nav>
    );
}

export default PageMenuPanel;
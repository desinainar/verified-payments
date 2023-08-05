import React from "react";
import {AiFillCaretDown} from 'react-icons/ai'
 
const NavItem = ({ item = "", showArrow=true}) => {
    if (item) {
       return <div className="header-nav-item">
            <p className="header-nav-item-title">
                {item}
            </p>
            {showArrow && <AiFillCaretDown/>}
        </div>;
    } else {
        return <div className="header-nav-item">
            <span className="header-nav-item-placeholder" />
            <AiFillCaretDown className="header-search-icon"/>
        </div>;
    }
};
 
export default NavItem;
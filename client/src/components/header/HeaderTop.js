import React from "react";
import Logo from "../../assets/Synchrony_Logo.png";
import NavItem from "./NavItem.js";
import { AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
 
const HeaderTop = () => {
    return (
        <div className="header-top">
            <img className="header-logo" src={Logo} alt="Logo" />
            <div className="header-nav">
                <NavItem item="MARKETPLACE" />
                <NavItem />
                <NavItem />
                <NavItem />
            </div>
            <div className="header-right">
                <NavItem item="BLOG" showArrow={false} />
                <NavItem item="ABOUT" />
                <NavItem item="CONTACT" showArrow={false} />
                <NavItem
                    item={<AiOutlineSearch className="header-search-icon" />}
                    showArrow={false}
                />
                <div className="header-profile-button">
                    <p className="header-nav-item-title">JANE</p>
                    <AiFillCaretDown />
                </div>
            </div>
        </div>
    );
};
 
export default HeaderTop;
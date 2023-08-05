import React from "react";
import BlackCard from "../../assets/blackcard.png";
import BlueCard from "../../assets/bluecard.png";
import { BsCart } from "react-icons/bs";
 
const HeaderBottom = ({showCheckout, setShowCheckout}) => {

    const handleClick = () => {
        var popup = document.getElementById("CheckoutPopup");
        popup.classList.toggle("show");

        setShowCheckout(true);
    }

    return (
        <div className="header-bottom">
            <img src={BlackCard} alt="BlackCard" />
            <div className="header-pagination">
               
                <h4 className="header-pagination-section">
                     <span className="header-pagination-page">Marketplace</span> / All Deals & Offers
                </h4>
            </div>
            <div className="spacer" />
            <div className="header-recommended">RECOMMENDED</div>
            <img className="header-bluecard" src={BlueCard} alt="BlueCard" />
            <button className="header-checkout-btn" onClick={()=>{handleClick()}}>
                <BsCart className="header-checkout-cart-icon"/>
                <h3 className="header-checkout">Checkout</h3>
            </button>
        </div>
    );
};
 
export default HeaderBottom;
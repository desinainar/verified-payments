import React from "react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";

const Header = ({ showCheckout, setShowCheckout }) => {
	return (
		<div>
			<HeaderTop />
			<HeaderBottom
				showCheckout={showCheckout}
				setShowCheckout={setShowCheckout}
			/>
		</div>
	);
};

export default Header;

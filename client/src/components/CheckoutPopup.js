import React from "react";
import { useState, useEffect } from "react";

const CheckoutPopup = ({
	productList,
	products,
	setProducts,
	setShowCheckout,
}) => {
	const [total, setTotal] = useState(0);
	const [paymentStatus, setPaymentStatus] = useState("");

	const verifyWithSynchrony = (e) => {
		e.stopPropagation();
		// e.preventDefault();
		console.log("Data received from user", e.detail);
		if (e.detail.paymentStatus === "pending") {
			setPaymentStatus("pending");
		}

		fetch("http://localhost:8080/processPaymentVendor/", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				transactionId: e.detail.transactionId,
				tokenizedCard: e.detail.tokenizedCard,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Response from Synchrony: ", data);
				setPaymentStatus(data.paymentStatus);
				console.log("Storing Transaction on Synchrony Blockchain...");
			});
	};

	useEffect(() => {
		window.addEventListener(
			"extensionData",
			(e) => {
				verifyWithSynchrony(e);
			},
			{ once: true }
		);

		return () => {
			window.removeEventListener("extensionData", (e) => {
				verifyWithSynchrony(e);
			});
		};
	}, []);

	useEffect(() => {
		let sum = 0;
		for (let i in products) {
			sum += productList[products[i]].price;
		}
		setTotal(sum);
		// eslint-disable-next-line
	}, [products]);

	const handleClickOff = (e) => {
		const checkoutPopup = document.getElementById("CheckoutPopup");
		if (e.target === checkoutPopup) {
			setShowCheckout(false);
			checkoutPopup.classList.toggle("show");
		}
	};

	return (
		<div
			className="CheckoutPopup"
			id="CheckoutPopup"
			onClick={(e) => {
				handleClickOff(e);
			}}
		>
			<div className="checkout-popup-main">
				<h1 className="checkout-header">Checkout</h1>
				<ol className="checkout-body">
					{products.map((product, i) => {
						const productData = productList[product];
						return (
							<div className="checkout-product-container" key={i}>
								<h3 className="checkout-product-name">
									{productData.name}
								</h3>
								<h3 className="checkout-product-price">
									$
									{productData.price.toLocaleString(
										"en-US", // leave undefined to use the visitor's browser
										// locale or a string like 'en-US' to override it.
										{ minimumFractionDigits: 2 }
									)}
								</h3>
							</div>
						);
					})}
					<hr className="checkout-product-line-break" />
					<div className="checkout-product-container">
						<h3 className="checkout-product-name">Total:</h3>
						<h3 className="checkout-product-price">
							$
							{total.toLocaleString("en-US", {
								minimumFractionDigits: 2,
							})}
						</h3>
					</div>
				</ol>
				<button className="payment-button" id="PayNowWithTokenization">
					Pay
				</button>
				{paymentStatus !== "" && <h1>Payment {paymentStatus}</h1>}
			</div>
		</div>
	);
};

export default CheckoutPopup;

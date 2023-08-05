import "./App.css";
import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";

import CheckoutPopup from "./components/CheckoutPopup";
import Header from "./components/header/Header";
import Products from "./components/Products";

import test_org from "./assets/Synchrony_Logo.png";

import macbook from "./assets/macbook_pro.jpeg";
import fruit_snack from "./assets/fruit_snack.jpeg";
import amazon_echo from "./assets/amazon_echo.jpeg";
import beats_headphones from "./assets/beats_headphones.jpeg";
import ts_jordans from "./assets/ts_jordans.jpeg";
import wallet from "./assets/wallet.jpeg";
import fidget_cube from "./assets/fidget_cube.jpg";
import brian_doubles from "./assets/brian_doubles.jpeg";
import barbenheimer from "./assets/barbenheimer.jpeg";

function App() {
	const productList = [
		{
			img: macbook,
			org: test_org,
			name: "Macbook Pro 16in",
			orgName: "Synchrony",
			price: 1949.0,
		},
		{
			img: brian_doubles,
			org: test_org,
			name: "Dinner with Brian Doubles",
			orgName: "Synchrony",
			price: 1013.74,
		},
		{
			img: barbenheimer,
			org: test_org,
			name: "Barbenheimer Poster",
			orgName: "Synchrony",
			price: 19.49,
		},
		{
			img: fidget_cube,
			org: test_org,
			name: "Fidget Cube",
			orgName: "Synchrony",
			price: 15001.99,
		},
		{
			img: ts_jordans,
			org: test_org,
			name: "Travis Scott x Air Jordan 1",
			orgName: "Synchrony",
			price: 1447.97,
		},

		{
			img: fruit_snack,
			org: test_org,
			name: "Fruit Snacks",
			orgName: "Synchrony",
			price: 18.99,
		},
		{
			img: amazon_echo,
			org: test_org,
			name: "Amazon Echo",
			orgName: "Synchrony",
			price: 59.99,
		},
		{
			img: beats_headphones,
			org: test_org,
			name: "Beats Headphones",
			orgName: "Synchrony",
			price: 299.99,
		},
		{
			img: wallet,
			org: test_org,
			name: "Wallet",
			orgName: "Synchrony",
			price: 71.67,
		},
	];

	const [products, setProducts] = useState([]);
	const [showCheckout, setShowCheckout] = React.useState(false);

	useEffect(() => {
		// console.log(products);
	}, [products]);

	return (
		<div className="App">
			<Header
				showCheckout={showCheckout}
				setShowCheckout={setShowCheckout}
			/>
			<Products
				productList={productList}
				products={products}
				setProducts={setProducts}
			/>
			<CheckoutPopup
				productList={productList}
				products={products}
				setProducts={setProducts}
				showCheckout={showCheckout}
				setShowCheckout={setShowCheckout}
			/>
		</div>
	);
}

export default App;

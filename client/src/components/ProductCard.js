import React from "react";
import { useState } from "react";

const ProductCard = (props) => {
	const [selected, setSelected] = useState(false);

	const handleClick = (e) => {
		if (!selected) {
			props.setProducts([...props.products, props.productKey])
		} else {
			props.setProducts(props.products.filter(item => item !== props.productKey))
		}
		setSelected(!selected);
	};

	return (
		<div
			className={`${selected ? "product-card-active" : ""} product-card`}
			onClick={(e) => {
				handleClick(e);
			}}
		>
			{props.special && (
				<div className="product-special-tag">
					<h3>{props.special}</h3>
				</div>
			)}
			<img
				className="product-img"
				src={props.productImg}
				alt={props.title}
			/>
			<div className="product-banner">
				<h5 className="product-org">{props.orgName}</h5>
				<img
					className="product-org-img"
					src={props.orgImg}
					alt={props.orgName}
				/>
				<h5 className="product-name">{props.productName}</h5>
				<h5 className="product-price">${props.price}</h5>
			</div>
		</div>
	);
};

export default ProductCard;

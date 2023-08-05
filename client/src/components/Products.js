import React from "react";
import ProductCard from "./ProductCard";


const Products = ({productList, products, setProducts}) => {

	return (
		<div className="Products">
			<h1 className="products-header">Products</h1>
			<div className="products-container">
				{productList.map((product, i) => {
					return (
						<ProductCard
							setProducts={setProducts}
							products={products}
							key={i}
							productKey={i}
							productImg={product.img}
							orgImg={product.org}
							productName={product.name}
							orgName={product.orgName}
							price={product.price}
						/>
					);
				})}
				{/* <ProductCard
					productImg={macbook}
					orgImg={test_org}
					productName="Macbook Pro 16in"
					orgName="Synchrony"
				/>

				<ProductCard
					productImg={fruit_snack}
					orgImg={test_org}
					productName="Fruit Snacks"
					orgName="Synchrony"
				/>

				<ProductCard
					productImg={amazon_echo}
					orgImg={test_org}
					productName="Amazon Echo"
					orgName="Synchrony"
				/> */}
			</div>
		</div>
	);
};

export default Products;

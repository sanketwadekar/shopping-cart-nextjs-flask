import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

function ProductCard(props)
{
	return <>
		<div class="card" style="width: 18rem;">
			<img class="card-img-top" src="..." alt="Card image cap"/>
			<div class="card-body">
				<h5 class="card-title">{props.title || ""}</h5>
				<p class="card-text">{props.description || ""}</p>
				<button class="btn btn-primary">Add To Cart</button>
			</div>
		</div>
	</>
}

function ProductList()
{
	const [products, setProducts] = useState([]);
	useEffect(()=>{
	fetch('https://dummyjson.com/products')
	.then(res => res.json())
	.then((data)=>{
		console.log(data);
		setProducts([...data.products]);
	});
	}, [])
	if (products.length) {
		return <div className="d-flex flex-row justify-content-around flex-wrap">
		{products.map((product, index) => {
			return <div className='flex-fill w-25 card mx-3 my-2 shadow' style={{border: "solid 1px #b1b5b4", backgroundColor: "#ebedec"}} key={index}>
				<Link to={`/details/${product.id}`} style={{textDecoration: "none", color: "#000000"}}>
				<div className="card-body p-6">
					<div className="card-title h6">{product.title}</div>
					<div className="product-list-image">
						<img src={product.thumbnail} alt={"image"}></img>
					</div>
					<div className="d-flex flex-row justify-content-between">
						<div className="card-text fw-bold">${product.price}</div>
						<div className="card-text">{product.rating} <i className="fas fa-star" style={{color: "#FFD700"}}></i></div>
					</div>
				</div>
				</Link>
				</div>
		})}
		</div>
	}
	return <div>Loading</div>
}

export default ProductList;
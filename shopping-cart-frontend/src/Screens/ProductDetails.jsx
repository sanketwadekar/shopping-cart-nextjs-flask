import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Carousel({images})
{
	return (<div id="demo" className="carousel slide" data-bs-ride="carousel">

<div className="carousel-indicators">
	{images && images.map((image, index) => {
		return <button type="button" className={`${index == 0 && "active"}`}data-bs-target="#demo" data-bs-slide-to={index} ></button>
	})}
</div>

<div className="carousel-inner">
	{images && images.map((image, index) => {
		return <div className={`carousel-item ${index == 0 && "active"}`}>
				<img src={image} alt="image" className="d-block mx-auto" style={{minHeight: "100%"}}/>
			</div>
	})}
</div>

<button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
	{/* <span className="carousel-control-prev-icon carousel-control-button"></span> */}
	<i class="fas fa-angle-left carousel-control-button"></i>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
	<i class="fas fa-angle-right carousel-control-button"></i>
	{/* <span className="carousel-control-next-icon carousel-control-button"></span> */}
</button>
</div>)
}


function ProductDetails(props)
{
	let params = useParams();
	const [product, setProduct] = useState(null);
	useEffect(() => {
		fetch(`https://dummyjson.com/products/${params.id}`)
		.then(res => res.json())
		.then((data) => {
			setProduct({...data});
		});
	}, []);
	if (!product) {
		return <>Loading...</>
	}
	return <>
	<div className="d-flex flex-row justify-content-between">
		<div className="pt-3">
			{/* <span className="h3 px-1">{product.brand}</span> */}
			<span className="h4 px-1 product-details-title">{product.title}</span>
		</div>
		<div className="p-2 pt-4">User ratings: <span className="h5">{product.rating} <i className="fas fa-star" style={{color: "#FFD700"}} ></i></span></div>
	</div>
		<Carousel images={product.images} />
		{/* Product Details ID: { product.id } */}
		<div className="d-flex flex-row justify-content-between">
			<div className="p-2"><span className="p-1">Price: </span><span className="h2">${product.price}</span></div>
			<div className="p-2"><button className="btn add-to-cart-btn" onClick={()=>{props.addToCart(product)}}>Add to cart</button></div>
		</div>
	</>
}

export default ProductDetails;
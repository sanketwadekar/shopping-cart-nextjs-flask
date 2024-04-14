import React, {useContext} from "react";
import CartContext from "./context/CartContext";

function NavBarPopup({cartList, clearCart, deleteFromCart})
{
	async function processPayment()
	{
		if (cartList.length == 0) {
			alert("Cart is empty");
			return;
		}
		let itemsToBuy = [];
		let itemsMap = {};
		cartList.forEach(item=>{
			console.log(itemsMap)
			if (!itemsMap[item['id']]) {
				itemsMap[item['id']] = 1;
			} else {
				itemsMap[item['id']] += 1;
			}
		})
		for (let key in itemsMap) {
			itemsToBuy.push({
				id: key,
				quantity: itemsMap[key]
			})
		}

		let response = await fetch("http://localhost:8000/checkout",
		{method: "POST", headers: {'Content-Type': 'application/json'},
		body: JSON.stringify(itemsToBuy)})
		.then(res => {
			let data = res.json();
			console.log(data);
			return data;
		});

		console.log(response);

		if (response.status == 1) {
			alert("Order placed successfully");
			clearCart();
		} else {
			alert(`Could not place order. There are only ${response.stock} items of ${response.title} left.`)
		}
	}
	let totalPrice = 0;
 return <>
 <div className="modal modal-lg fade" id="myModal">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">Shopping Cart</h4>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body container">
				<div className="row p-4 fw-bold">
						<div className="col-2">Sr. No.</div>
						<div className="col-7">Item</div>
						<div className="col-3">Price</div>
				</div>
				{cartList.map((item, index) => {
					totalPrice += item.price;
					return (<div key={index} className="row p-4">
						<div className="col-2">{index + 1}</div>
						<div className="col-4">{item.title}</div>
						<div className="col-3 cart-li">
							<img src={item.thumbnail}></img>
						</div>
						<div className="col-2 fw-bold">${item.price}</div>
						<div className="col-1 fw-bold"><i className="fas fa-trash-alt" style={{color: "red", cursor: "pointer"}} onClick={()=>{deleteFromCart(index)}}></i></div>
						</div>)
				})}
      </div>
      <div className="container">
				<div className="d-flex flex-row justify-content-between p-4">
					<div className="fw-bold">Total amount: ${totalPrice}</div>
					<div className="">
        		<button type="button" className="btn btn-outline bg-black text-white" data-bs-dismiss="modal" onClick={()=>{processPayment(cartList)}}>Make Payment</button>
					</div>
				</div>
      </div>

    </div>
  </div>
</div>
 </>
}

function NavBar({items})
{
	const {cart, clearCart, deleteFromCart} = useContext(CartContext);
	return <>
		<NavBarPopup cartList={cart} clearCart={clearCart} deleteFromCart={deleteFromCart}/>
		<nav className="navbar navbar-fixed-top flex flex-row justify-content-between" style={{background: "#e8a735"}}>
			<a href="/" style={{textDecoration: "none", color: "#000000"}}>
				<div className="mx-2"><i className="fa-solid fa-home"></i></div>
			</a>
			<div className="mx-2 fw-bold h5">Shopping Site</div>
			<a href="#" style={{textDecoration: "none", color: "#000000"}}>
				<div className="mx-2" data-bs-toggle="modal" data-bs-target="#myModal">View Cart <i className="fa-solid fa-cart-shopping"></i> {cart.length}</div>
			</a>
		</nav>
	</>
}

export default NavBar;
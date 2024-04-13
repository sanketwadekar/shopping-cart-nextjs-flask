import React from "react";

function NavBarPopup({cartList, deleteProduct})
{
	function processPayment()
	{
		let success = true;
		if (success) {
			alert("Order placed successfully");
		} else {
			alert("Could not place order.")
		}
	}
	let totalPrice = 0;
 return <>
 <div class="modal fade" id="myModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Shopping Cart</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body container">
				<div className="row p-4 fw-bold">
						<div className="col-2">Sr. No.</div>
						<div className="col-8">Item</div>
						<div className="col-2">Price</div>
				</div>
				{cartList.map((item, index) => {
					totalPrice += item.price;
					return (<div key={index} className="row p-4">
						<div className="col-2">{index + 1}</div>
						<div className="col-4">{item.title}</div>
						<div className="col-3 cart-li"><img src={item.thumbnail}></img></div>
						<div className="col-2 fw-bold">${item.price}</div>
						<div className="col-1 fw-bold"><i className="fas fa-trash" style={{color: "red", cursor: "pointer"}} onClick={()=>{deleteProduct(item.id)}}></i></div>
						</div>)
				})}
					{/* <div className="row p-4">
						<div className="col-6"></div>
						<div className="col-4">Total amount: </div>
						<div className="col-2 fw-bold">${totalPrice}</div>
					</div> */}
      </div>
      <div class="container">
				<div className="d-flex flex-row justify-content-between p-4">
					<div className="fw-bold">Total amount: ${totalPrice}</div>
					<div className="">
        		<button type="button" class="btn btn-outline bg-black text-white" data-bs-dismiss="modal" onClick={()=>{processPayment()}}>Make Payment</button>
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
	return <>
		<nav className="navbar flex flex-row-reverse" style={{background: "#248266"}}>
			<NavBarPopup cartList={items}/>
			<a href="#" style={{textDecoration: "none", color: "#000000"}}>
				<div className="mx-2" data-bs-toggle="modal" data-bs-target="#myModal">View Cart <i className="fa-solid fa-cart-shopping"></i> {items.length}</div>
			</a>
		</nav>
	</>
}

export default NavBar;
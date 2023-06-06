import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const CheckoutDetails = () => {
    const { id } = useParams();
    const { login } = useContext(MyCreateContext);
    const navigate = useNavigate();
    const [user, setUser] = useState([{}]);
    const [product, setProduct] = useState([{}]);
    useEffect(() => {
        fetch(`https://api.softingart.com/product/${login.email}/${id}`).then(res => res.json()).then(data => {
            if (data.status !== "failed") {
                setProduct(data.status);
            }
        });
    }, [id, login])

    useEffect(() => {
        fetch(`https://api.softingart.com/account/${login.email}`).then(res => res.json()).then(data => setUser(data));
    }, [login])

    const placeOrder = (id) => {
        fetch("https://api.softingart.com/checkout", {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ product_id: id, email: user[0].id, total: product[0].total, number: product[0].number, mail: login.email })
        }).then(res => res.json()).then(data2 => {
            if (data2.status === "failed") {
                alert("failed");
            } else {
                navigate("/order-placed");
            }
        });
    }

    return (
        <section className='checkout'>
            <div className="container">
                <div className="row justify-center">
                    {
                        user.map((ele, ind) =>
                            <div key={ind} className="col-6">
                                <h2 className='account-h'>Billing details</h2>
                                <p><b>Name:</b> {ele.name}</p>
                                <p><b>Email Address:</b> {ele.email}</p>
                                <p><b>Country / Region:</b> India</p>
                                <p><b>Address:</b> {ele.address}, {ele.city}, {ele.state}, {ele.pincode}</p>
                            </div>
                        )
                    }
                    {
                        product.map((ele, ind) =>
                            <div key={ind} className="col-6">
                                <h2 className='account-h'>Your order</h2>
                                <img src={"https://api.softingart.com/api/products/" + ele.image} alt="" />
                                <p><b>Product Name:</b> {ele.name}</p>
                                <p><b>Quantity:</b> {ele.total}</p>
                                <p><b>Price:</b> ₹{ele.price * ele.total}/-</p>
                                <p><b>Payment:</b> Pay with cash upon delivery.</p>
                            </div>
                        )
                    }
                    <div className="col-6">
                        <div className="row justify-center">
                            <div className="col-6">
                                <button onClick={() => placeOrder(id)} className='btn w-100'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CheckoutDetails

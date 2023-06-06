import React, { useContext, useEffect, useState } from 'react'
import PageBanner from './PageBanner'
import { Link } from 'react-router-dom'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const CartPage = () => {
    const { login } = useContext(MyCreateContext);
    const [data, setData] = useState([{}])
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch(`https://api.softingart.com/cart-products/${login.email}`).then(res => res.json()).then(data2 => {
            if (data2.status !== "failed") { setData(data2.status) }
        });
    }, [login, count])
    const delCart = (element) => {
        fetch(`https://api.softingart.com/remove-from-cart/${element}`).then(res => res.json()).then(data2 => {
            if (data2.status === "success") {
                setCount(count + 1);
            } else {
                alert("failed to remove");
            }
        });
    }
    return (
        <>
            <PageBanner name='Cart' />
            <section>
                <div className="container overflow-x">
                    <table cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Remove</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Buy Now</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(ele => <tr key={Math.random()}>
                                    <td>
                                        <Link className='remove-cart-btn' onClick={(e) => { e.preventDefault(); delCart(ele.number) }} to={''}><i className="fa-solid fa-xmark"></i></Link>
                                    </td>
                                    <td>
                                        <img src={"https://api.softingart.com/api/products/" + ele.image} className='cart-img' title={ele.name} alt="SoftingArt" />
                                    </td>
                                    <td>
                                        <Link className='cart-link' to={`/product/${ele.id}`}>{ele.name}</Link>
                                    </td>
                                    <td>
                                        <span className="cart-price">₹{ele.price * ele.total}/-</span>
                                    </td>
                                    <td>{ele.total}</td>
                                    <td>
                                        <Link to={`/checkout/${ele.id}`} className='btn'>Buy Now</Link>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default CartPage

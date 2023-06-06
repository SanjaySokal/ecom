import React, { useState } from 'react'
import AccountHeading from '../Components/AccountHeading'
import { Link } from 'react-router-dom';

const Orders = () => {
    const [data, setData] = useState([{ date: "-", email: "-", orderid: '-', price: "0", product_id: '-', products_name: "", status: "", total: "0", u_name: "-" }]);
    const deleteItem = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://api.softingart.com/cancel-order/${id}`).then(res => res.json()).then(dta => {
                if (dta.status === "success") {
                    alert("Order Cancelled");
                    setData([{ date: "-", email: "-", orderid: '-', price: "0", product_id: '-', products_name: "", status: "", total: "0", u_name: "-" }]);
                } else alert("failed to cancel");
            });
        }
    }

    const completeItem = (id) => {
        fetch(`https://api.softingart.com/complete-order/${id}`).then(res => res.json()).then(dta => {
            if (dta.status === "success") {
                alert("Order Completed");
                setData([{ date: "-", email: "-", orderid: '-', price: "0", product_id: '-', products_name: "", status: "", total: "0", u_name: "-" }]);
            } else alert("failed to complete");
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/all-orders/${e.target.value}`).then(res => res.json()).then(dta => setData(dta));
        }
    }
    return (
        <>
            <AccountHeading data="Orders" />
            <input onChange={handleSearch} type="search" placeholder='Search Orders' required className='w-100' />
            <div className="overflow-x product-list-admin">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                Order Id
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                User Name
                            </th>
                            <th>
                                Product
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Count
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Cancel
                            </th>
                            <th>
                                Complete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((ele, ind) =>
                                <tr key={ind}>
                                    <td>#{ele.orderid}</td>
                                    <td>{ele.date}</td>
                                    <td>{ele.u_name}</td>
                                    <td><Link to={`/product/${ele.product_id}`}>{ele.products_name}</Link></td>
                                    <td>₹{parseInt(ele.price) * parseInt(ele.total)}/-</td>
                                    <td>{ele.total}</td>
                                    <td>{ele.status === '0' ? "pending" : (ele.status === '1' ? "completed" : "cancelled")}</td>
                                    <td>{ele.status === '0' ? <Link to={''} onClick={e => { e.preventDefault(); deleteItem(ele.orderid); }} className='delete-link-btn'><i className="fa-regular fa-trash-can"></i> cancel</Link> : "not allowed"}</td>
                                    <td>{ele.status === '0' ? <Link to={''} onClick={e => { e.preventDefault(); completeItem(ele.orderid); }} className='edit-link-btn'><i className="fa-solid fa-check"></i> complete</Link> : "not allowed"}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Orders

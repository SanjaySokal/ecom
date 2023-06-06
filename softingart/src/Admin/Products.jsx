import React, { useEffect, useState } from 'react'
import AccountHeading from '../Components/AccountHeading'
import { Link } from 'react-router-dom'

const Products = () => {
    const [data, setData] = useState([{}]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch("https://api.softingart.com/products").then(res => res.json()).then(dta => setData(dta));
    }, [count])
    const deleteItem = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://api.softingart.com/delete-product/${id}`).then(res => res.json()).then(dta => {
                if (dta.status === "success") alert("Product deleted"); else alert("failed to delete");
                setCount(count + 1);
            });
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/search-product/${e.target.value}`).then(res => res.json()).then(dta => setData(dta));
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-7">
                    <AccountHeading data='Manage Products' />
                </div>
                <div className="col-5">
                    <Link to={'/admin/add-product'} className='btn'>Add Product</Link>
                </div>
            </div>
            <form onSubmit={handleSearch}>
                <input type="search" onChange={handleSearch} required className='w-100' placeholder='Search product by id or name' />
            </form>
            <div className="overflow-x product-list-admin">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Image
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Del
                            </th>
                            <th>
                                Edit
                            </th>
                            <th>
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((ele, ind) =>
                                <tr key={ind}>
                                    <td>{ele.name}</td>
                                    <td><img src={"https://api.softingart.com/api/products/" + ele.image} alt='SoftingArt' title={ele.name} width={"100px"} /></td>
                                    <td>₹{ele.price}/-</td>
                                    <td>₹{ele.del}/-</td>
                                    <td><Link to={`/admin/edit-product/${ele.id}`} className='edit-link-btn'><i className="fa-regular fa-pen-to-square"></i> edit</Link></td>
                                    <td><Link to={''} onClick={e => { e.preventDefault(); deleteItem(ele.id); }} className='delete-link-btn'><i className="fa-regular fa-trash-can"></i> delete</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Products

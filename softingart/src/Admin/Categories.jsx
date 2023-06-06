import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountHeading from '../Components/AccountHeading';

const Categories = () => {
    const [data, setData] = useState([{ id: "", catagory_name: "", link: "" }]);
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch("https://api.softingart.com/all-category").then(res => res.json()).then(dta => setData(dta));
    }, [count])
    const deleteItem = (id) => {
        if (window.confirm("Are you sure?")) {
            console.log(id);
            fetch(`https://api.softingart.com/delete-category/${id}`).then(res => res.json()).then(dta => {
                if (dta.status === "success") alert("Category deleted"); else alert("failed to delete");
                setCount(count + 1);
            });
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-7">
                    <AccountHeading data='Manage Categories' />
                </div>
                <div className="col-5">
                    <Link to={'/admin/add-category'} className='btn'>Add Category</Link>
                </div>
            </div>
            <div className="overflow-x">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Link
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
                                    <td>{ele.catagory_name}</td>
                                    <td>{ele.link}</td>
                                    <td><Link to={`/admin/edit-category/${ele.id}`} className='edit-link-btn'><i className="fa-regular fa-pen-to-square"></i> edit</Link></td>
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

export default Categories

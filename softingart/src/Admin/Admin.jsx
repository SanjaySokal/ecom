import React, { useState } from 'react';
import AccountHeading from '../Components/AccountHeading';
import { Link } from 'react-router-dom';

const Admin = () => {
    const [data, setData] = useState([{ name: "-", email: "-", pincode: '-', state: "-", type: '-', id: "" }]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/all-users/${e.target.value}`).then(res => res.json()).then(dta => setData(dta.status));
        }
    }

    const deleteUser = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://api.softingart.com/delete-users/${id}`).then(res => res.json()).then(dta => {
                if (dta.status === "success") {
                    alert("User Deleted");
                    setData([{ name: "-", email: "-", pincode: '-', state: "-", type: '-', id: "" }]);
                } else alert("failed to cancel");
            });
        }
    }
    return (
        <>
            <AccountHeading data='Manage Users' />
            <input onChange={handleSearch} type="search" placeholder='Search Users' required className='w-100' />
            <div className="overflow-x product-list-admin">
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                PinCode
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                Type
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
                                    <td>{ele.email}</td>
                                    <td>{ele.pincode}</td>
                                    <td>{ele.state}</td>
                                    <td>{ele.type}</td>
                                    <td><Link to={'/admin/users/edit/' + ele.id} className='edit-link-btn'><i className="fa-regular fa-pen-to-square"></i> edit</Link></td>
                                    <td><Link to={''} onClick={e => { e.preventDefault(); deleteUser(ele.id); }} className='delete-link-btn'><i className="fa-regular fa-trash-can"></i> delete</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Admin

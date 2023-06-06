import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const AccountSidebar = () => {
    const { changeLogin } = useContext(MyCreateContext);
    const Logout = (e) => {
        e.preventDefault();
        document.cookie = 'softinglogin=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        changeLogin(false, "");
    }
    return (
        <div className='sidebar-menu'>
            <li>
                <Link to={"/my-account/edit"}>Account Details</Link>
            </li>
            <li>
                <Link to={"/my-account/orders"}>Recent Orders</Link>
            </li>
            <li>
                <Link to={"/my-account/order-completed"}>Completed Orders</Link>
            </li>
            <li>
                <Link to={"/my-account/order-cancelled"}>Cancelled Orders</Link>
            </li>
            <li>
                <Link to={"/login"} onClick={Logout}>Logout</Link>
            </li>
        </div>
    )
}

export default AccountSidebar

import React, { useContext, useEffect } from 'react';
import PageBanner from '../Components/PageBanner';
import { Link, useNavigate } from 'react-router-dom';
import Links from './Links';
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const Home = () => {
    const { login } = useContext(MyCreateContext);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Admin Panel - SoftingArt";
        if (!login.login) {
            navigate("/login");
        } else {
            fetch(`https://api.softingart.com/account/${login.email}`).then(res => res.json()).then(data => {
                if (data[0].type !== "1") navigate("/");
            });
        }
    }, [login, navigate])
    return (
        <>
            <PageBanner name='Admin Home' />
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className='sidebar-menu'>
                                <li>
                                    <Link to={"/admin/orders"}>Orders</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/category"}>Categories</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/products"}>Products</Link>
                                </li>
                                <li>
                                    <Link to={"/admin/users"}>Users</Link>
                                </li>
                            </div>
                        </div>
                        <div className="col-9">
                            <Links />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home

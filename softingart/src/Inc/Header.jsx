import { Link, useLocation } from 'react-router-dom';
import img from '../images/logo.png';
import { useEffect, useState } from 'react';

const Header = () => {
    const location = useLocation();
    const [menuclass, setMenuClass] = useState("list");

    const changeMenu = () => {
        if (menuclass === "list") {
            setMenuClass("list show");
        } else {
            setMenuClass("list")
        }
    }

    useEffect(() => {
        setMenuClass("list");
    }, [location])

    return (
        <header>
            <nav className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={img} width="250px" title="SoftingArt" alt="SoftingArt" />
                    </Link>
                </div>
                <div className="links">
                    <button onClick={changeMenu} className='menu-btn'><i className="fa-solid fa-bars"></i></button>
                    <div className={menuclass}>
                        <button onClick={changeMenu} className='menu-close'><i className="fa-solid fa-xmark"></i></button>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/my-account">My Account</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

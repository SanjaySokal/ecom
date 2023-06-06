import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const Footer = () => {
    const { login } = useContext(MyCreateContext);
    const [admin, setAdmin] = useState(<Link to={'/login'}>Admin Panel</Link>);
    useEffect(() => {
        if (login.login) {
            setAdmin(<Link to={'/admin'}>Admin Panel</Link>);
        }
    }, [login])
    return (
        <>
            <footer>
                <div className="opacity-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <h3>About Us</h3>
                                <h4>Ready To Start Shopping With Us?</h4>
                                <p>
                                    We believe that sustainable living should be accessible to everyone.
                                </p>
                                <Link to={'/shop'} className="btn">Shop Now</Link>
                            </div>
                            <div className="col-3">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li>
                                        <Link to={'/'}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to={'/shop'}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link to={'/my-account'}>My Account</Link>
                                    </li>
                                    <li>
                                        <Link to={'/contact'}>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3>Our Policies</h3>
                                <ul>
                                    <li>
                                        <Link to={'/privacy-policy'}>Privact Policy</Link>
                                    </li>
                                    <li>
                                        <Link to={'/refund-return'}>Refund & Return Policy</Link>
                                    </li>
                                    <li>
                                        <Link to={'/terms-conditions'}>Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        {admin}
                                    </li>
                                </ul>
                            </div>
                            <div className="col-3">
                                <h3>Contact Us</h3>
                                <p>
                                    <i className="fa-solid fa-headset"></i> +91 82 95 67 3601
                                </p>
                                <p>
                                    <i className="fa-solid fa-paper-plane"></i> contact@softingart.com
                                </p>
                                <p>
                                    <i className="fa-solid fa-map-location-dot"></i> SoftingArt, Khairoli, Mahendergarh, Haryana 123028
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className='copyright'>
                        Copyright &copy; {(new Date()).getFullYear()} SoftingArt | All Rights Reserved | Designed & Developed By <a href="https://www.sanjaysokal.com/" rel='noreferrer' target='_blank'>Sanjay Sokal</a>
                    </p>
                </div>
            </footer>
        </>
    )
}

export default Footer

import React from 'react'
import img from '../images/about.jpg';
import { Link } from 'react-router-dom';

const HomeAbout = () => {
    return (
        <section className='about'>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={img} className='w-100' title='SoftingArt' alt="SoftingArt" />
                    </div>
                    <div className="col-6">
                        <h3 className="heading">
                            About Us
                        </h3>
                        <h2>The Best Solutions for Best Business</h2>
                        <p>
                            At SoftingArt, we are passionate about giving new life to old gadgets while promoting sustainability. Our team carefully selects and curates unique and affordable tech products that are still functional and have plenty of life left in them. We believe that reusing and recycling technology can reduce electronic waste and have a positive impact on the environment.
                        </p>
                        <p>
                            In addition to our gadget sales, we offer website designing and development services for IT companies. We specialize in creating custom websites that are user-friendly, visually appealing, and optimized for search engines. At SoftingArt, we strive to deliver high-quality products and services while maintaining a strong commitment to customer satisfaction and environmental responsibility.
                        </p>
                        <Link to="/contact" className="btn">Get A Quote</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeAbout

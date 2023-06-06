import React from 'react';
import WhyIn from './WhyIn';
import img from '../images/icon-1.png';
import img2 from '../images/icon-2.png';
import img3 from '../images/icon-3.png';
import img4 from '../images/icon-4.png';

const HomeWhy = () => {
    return (
        <section>
            <div className="section-heading center"><h3>Why Choose Us</h3></div>
            <div className="container">
                <div className="row">
                    <WhyIn h3='Fast & Secure Delivery' img={img} />
                    <WhyIn h3='100% Guarantee On Product' img={img2} />
                    <WhyIn h3='48 Hour Return Policy' img={img3} />
                    <WhyIn h3='Next Level Pro Quality' img={img4} />
                </div>
            </div>
        </section>
    )
}

export default HomeWhy

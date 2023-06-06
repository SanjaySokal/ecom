import React from 'react'
import Service from './Service'
import SectionHeadings from './SectionHeadings'
import img from '../images/web-development.jpg';
import img2 from '../images/app-development.jpg';
import img3 from '../images/software-development.jpg';

const HomeServices = () => {
    return (
        <section className='services'>
            <SectionHeadings class='center' h3='Our Services' h2='Our Services: What We Do' para='Our services include selling old used gadgets, website designing and development for IT companies. We strive to deliver unique and affordable solutions while promoting sustainability and customer satisfaction.' />
            <div className="container">
                <div className="row">
                    <Service img={img} name='Web Development' />
                    <Service img={img2} name='App Development' />
                    <Service img={img3} name='Software Development' />
                </div>
            </div>
        </section>
    )
}

export default HomeServices

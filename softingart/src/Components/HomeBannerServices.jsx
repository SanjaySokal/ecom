import React from 'react'
import HomeBannerService from './HomeBannerService'

const HomeBannerServices = () => {
    return (
        <div className='container banner-icons'>
            <div className="row">
                <HomeBannerService icon={<i className="fa-solid fa-shield-halved fa-beat"></i>} name="Eco-Friendly" para="Explore our eco-friendly products for a sustainable lifestyle." />
                <HomeBannerService icon={<i className="fa-solid fa-cart-shopping fa-beat"></i>} name="Sustainable Gadgets" para="Go green with sustainable gadgets - Tech for a better planet." />
                <HomeBannerService icon={<i className="fa-solid fa-crown fa-beat"></i>} name="Best Sellers" para="Find our most popular and highly-rated products in one place." />
                <HomeBannerService icon={<i className="fa-solid fa-lightbulb fa-beat"></i>} name="New Arrivals" para="Discover the latest trends with our new arrivals collection." />
            </div>
        </div>
    )
}

export default HomeBannerServices

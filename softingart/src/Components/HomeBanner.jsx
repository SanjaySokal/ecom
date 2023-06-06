import React from 'react'
import { Link } from 'react-router-dom'

const HomeBanner = () => {
  return (
    <div className='home-banner'>
      <div className="image">
        <h3>Welcome to SoftingArt <span>Discover Technology Treasures!</span></h3>
        <h1>Discover Hidden Tech <span>Treasures Today!</span></h1>
        <p>Find hidden tech gems in our collection of old used gadgets. Welcome to SoftingArt, your treasure trove of technology!</p>
        <Link to={'/shop'} className='btn'>Shop Now</Link>
      </div>
    </div>
  )
}

export default HomeBanner

import React from 'react'
import { Link } from 'react-router-dom'

const Placed = () => {
    return (
        <section className='checkout'>
            <div className="container text-center">
                <div className="icon">
                    <i className="fa-solid fa-check fa-beat"></i>
                </div>
                <h4>Thanyou for shopping with us. Your Order has been placed.</h4>
                <Link to={'/shop'} className='btn'>Goto Shop</Link>
            </div>
        </section>
    )
}

export default Placed

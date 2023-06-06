import React from 'react'
import { Link } from 'react-router-dom';

const Product = (props) => {
    return (
        <div className="col-3">
            <div className="product">
                <img src={"https://api.softingart.com/api/products/" + props.img} className='w-100' title='SoftingArt' alt="SoftingArt" />
                <Link to={"/product/" + props.link}>{props.name}</Link>
                <div className='line'></div>
                <div className="price"><del>₹{props.deltag}</del> <span>₹{props.price}</span></div>
            </div>
        </div>
    )
}

export default Product

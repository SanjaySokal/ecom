import React from 'react';
import { Link } from 'react-router-dom';

const Service = (props) => {
    return (
        <div className='col-4'>
            <div className="service">
                <img src={props.img} className='w-100' title='SoftingArt' alt="SoftingArt" />
                <Link to={'/contact'}>{props.name}</Link>
            </div>
        </div>
    )
}

export default Service

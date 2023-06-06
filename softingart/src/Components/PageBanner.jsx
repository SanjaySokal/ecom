import React from 'react'
import { Link } from 'react-router-dom';

export default function PageBanner(props) {
    return (
        <div className='page-image'>
            <div className="background">
                <h2>{props.name}</h2>
                <div className="links">
                    <Link to={'/'}>Home</Link> / {props.name}
                </div>
            </div>
        </div>
    )
}

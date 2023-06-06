import React from 'react';

const WhyIn = (props) => {
    return (
        <div className="col-3">
            <div className="why-icon">
                <img src={props.img} title='SoftingArt' alt="SoftingArt" />
                <h3>{props.h3}</h3>
            </div>
        </div>
    )
}

export default WhyIn

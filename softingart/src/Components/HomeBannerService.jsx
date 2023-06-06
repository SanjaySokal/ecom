import React from 'react'

const HomeBannerService = (props) => {
    return (
        <div className='col-3'>
            <div className="banner-icon-content">
                <div className="icon">{props.icon}</div>
                <h3>{props.name}</h3>
                <p>{props.para}</p>
            </div>
        </div>
    )
}

export default HomeBannerService

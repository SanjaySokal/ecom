import React from 'react'

const SectionHeadings = (props) => {
    return (
        <div className={`section-heading ${props.class}`}>
            <h3>{props.h3}</h3>
            <h2>{props.h2}</h2>
            <p>{props.para}</p>
        </div>
    )
}

export default SectionHeadings

import React from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../Components/PageBanner'

const Eooro = () => {
    return (
        <>
            <PageBanner name="Error 404" />
            <section>
                <div className="container error">
                    <h1>404</h1>
                    <Link to={'/'} className='btn'>Back To Home</Link>
                </div>
            </section>
        </>
    )
}

export default Eooro

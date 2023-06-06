import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner';
import { Link } from 'react-router-dom';

const Verified = () => {
    useEffect(() => {
        document.title = "Email Verified - SoftingArt";
    }, [])
    return (
        <>
            <PageBanner name='Email Verified' />
            <section className='checkout'>
                <div className="container text-center">
                    <div className="icon">
                        <i className="fa-solid fa-check fa-beat"></i>
                    </div>
                    <h4>Thanyou your email has been verified successfully.</h4>
                    <Link to={'/'} className='btn'>Goto Home</Link>
                </div>
            </section>
        </>
    )
}

export default Verified

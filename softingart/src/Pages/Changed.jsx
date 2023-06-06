import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner';
import { Link } from 'react-router-dom';

const Changed = () => {
    useEffect(() => {
        document.title = "Password Changed - SoftingArt";
    }, [])
    return (
        <>
            <PageBanner name='Password Changed' />
            <section className='checkout'>
                <div className="container text-center">
                    <div className="icon">
                        <i className="fa-solid fa-check fa-beat"></i>
                    </div>
                    <h4>Thanyou your password has been changed successfully.</h4>
                    <Link to={'/'} className='btn'>Goto Home</Link>
                </div>
            </section>
        </>
    )
}

export default Changed

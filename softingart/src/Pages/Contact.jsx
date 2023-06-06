import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner'
import ContactPage from '../Components/ContactPage'

const Contact = () => {
    useEffect(() => {
        document.title = "Contact - SoftingArt";
    }, [])

    return (
        <>
            <PageBanner name='Contact Us' />
            <ContactPage />
        </>
    )
}

export default Contact

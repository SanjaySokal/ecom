import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner'
import CheckoutDetails from '../Components/CheckoutDetails'

const Checkout = () => {
    useEffect(() => {
        document.title = "Checkout - SoftingArt";
    }, [])
    return (
        <>
            <PageBanner name='Checkout' />
            <CheckoutDetails />
        </>
    )
}

export default Checkout

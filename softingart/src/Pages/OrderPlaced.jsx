import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner'
import Placed from '../Components/Placed'

const OrderPlaced = () => {
    useEffect(() => {
        document.title = "Order Placed - SoftingArt";
    }, [])
    return (
        <>
            <PageBanner name='Order Placed' />
            <Placed />
        </>
    )
}

export default OrderPlaced

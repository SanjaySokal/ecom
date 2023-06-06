import React, { useEffect } from 'react'
import PageBanner from '../Components/PageBanner'
import Products from '../Components/Products';

const Shop = () => {
    useEffect(() => {
        document.title = "Shop - SoftingArt";
    }, [])

    return (
        <>
            <PageBanner name="Shop" />
            <Products />
        </>
    )
}

export default Shop

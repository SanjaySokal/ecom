import React, { useEffect } from 'react'
import HomeBanner from '../Components/HomeBanner';
import HomeBannerServices from '../Components/HomeBannerServices';
import HomeAbout from '../Components/HomeAbout';
import HomeServices from '../Components/HomeServices';
import HomeWhy from '../Components/HomeWhy';
const Home = () => {
    useEffect(() => {
        document.title = "Home - SoftingArt";
    }, [])

    return (
        <>
            <HomeBanner />
            <HomeBannerServices />
            <HomeAbout />
            <HomeServices />
            <HomeWhy />
        </>
    )
}

export default Home

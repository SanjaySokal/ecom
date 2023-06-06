import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Load = () => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])
    return (
        <>
        </>
    )
}

export default Load

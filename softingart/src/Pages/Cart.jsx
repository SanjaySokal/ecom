import React, { useContext, useEffect, useState } from 'react'
import CartPage from '../Components/CartPage'
import Login from '../Pages/Login'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const Cart = () => {
    const [data, setData] = useState(<></>);
    const { login } = useContext(MyCreateContext);

    useEffect(() => {
        if (login.login) {
            setData(<CartPage />);
        } else {
            setData(<Login />);
        }

        document.title = "Cart - SoftingArt";
    }, [login])

    return (
        <>
            {data}
        </>
    )
}

export default Cart

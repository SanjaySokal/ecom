import React, { useContext, useEffect, useState } from 'react'
import Account from '../Components/Account'
import Login from '../Pages/Login'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const MyAccount = () => {
    const [data, setData] = useState(<></>);
    const { login } = useContext(MyCreateContext);

    useEffect(() => {
        if (login.login) {
            setData(<Account />);
        } else {
            setData(<Login />);
        }

        document.title = "My Account - SoftingArt";
    }, [login])

    return (
        <>
            {data}
        </>
    )
}

export default MyAccount

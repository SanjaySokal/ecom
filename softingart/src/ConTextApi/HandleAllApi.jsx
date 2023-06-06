import React, { createContext, useEffect, useState } from 'react';

export const MyCreateContext = createContext();

const HandleAllApi = (props) => {
    const [login, setlogin] = useState({ login: false, email: "" });

    const changeLogin = (change, email) => setlogin({ login: change, email: email });;

    const checkLogin = () => {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
            var new_arr = arr[i].split("=");
            for (var j = 0; j < new_arr.length; j++) {
                if (new_arr[j] === "softinglogin") {
                    setlogin({ login: true, email: new_arr[j + 1] });
                    break;
                }
            }
        }
    }
    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <MyCreateContext.Provider value={{ login, changeLogin }}>
            {props.children}
        </MyCreateContext.Provider>
    )
}

export default HandleAllApi

import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';
import PageBanner from '../Components/PageBanner';

const Login = () => {
    const { login, changeLogin } = useContext(MyCreateContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login - SoftingArt";
        if (login.login) { navigate('/') }
    }, [login, navigate])

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [btn, setBtn] = useState({ text: "Login", disabled: false });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setBtn({ text: "Login", disabled: false });
    }

    function handleSubmit(event) {
        event.preventDefault();
        fetch("https://api.softingart.com/login", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            if (result.status === "user not exist" || result.status === "failed") {
                setBtn({ text: "failed to login", disabled: true })
            } else {
                const d = new Date();
                d.setTime(d.getTime() + (15 * 24 * 60 * 60 * 1000));
                let expires = "expires=" + d.toUTCString();
                document.cookie = "softinglogin=" + data.email + ";" + expires + ";path=/";
                changeLogin(true, data.email)
            }
        })
    }

    return (
        <>
            <PageBanner name='Login' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>User Login</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="email" className="w-100" onChange={changeHandler} value={data.email} placeholder="Email" required name="email" />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" className="w-100" onChange={changeHandler} value={data.password} placeholder="Password" required name="password" />
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" disabled={btn.disabled} className="btn w-100">{btn.text}</button>
                                        </div>
                                    </div>
                                    <div className="bottom-links">
                                        <Link to="/register">Register Here</Link>
                                        <Link to="/forgot-password">Forgot Passowrd</Link>
                                        <Link to="/send-verify">Verify Email</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login

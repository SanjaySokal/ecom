import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';
import PageBanner from '../Components/PageBanner';

const Register = () => {
    const navigate = useNavigate();

    const { login } = useContext(MyCreateContext);

    useEffect(() => {
        document.title = "Register - SoftingArt";
        if (login.login) { navigate("/") }
    }, [login, navigate])

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        con_password: "",
        address: "",
        pincode: "",
        city: "",
        state: ""
    })

    const [btn, setBtn] = useState({ text: "Register", disabled: false });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
        setBtn({ text: "Register", disabled: false })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setBtn({ text: "wait...", disabled: true });
        if (data.password === data.con_password) {
            fetch("https://api.softingart.com/register", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    address: data.address,
                    pincode: data.pincode,
                    city: data.city,
                    state: data.state,
                    otp: Math.round(Math.random() * 100000)
                })
            }).then(res => res.json()).then(result => {
                if (result.status === "success") {
                    setData({ name: "", email: "", phone: "", password: "", con_password: "", address: "", pincode: "", city: "", state: "" })
                    setBtn({ text: "check your email and verify to login", disabled: true })
                } else if (result.status === "user exist") {
                    setBtn({ text: "user already exists", disabled: true })
                } else {
                    setBtn({ text: "failed to register", disabled: true })
                }
            })
        } else {
            setBtn({ text: "Enter the same password", disabled: true })
        }
    }
    return (
        <>
            <PageBanner name='Register' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>User Register</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="text" className="w-100" onChange={changeHandler} value={data.name} placeholder="Name" required name="name" />
                                        </div>
                                        <div className="col-12">
                                            <input type="email" className="w-100" onChange={changeHandler} value={data.email} placeholder="Email" required name="email" />
                                        </div>
                                        <div className="col-12">
                                            <input type="tel" className="w-100" onChange={changeHandler} value={data.phone} placeholder="Phone" required name="phone" />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" className="w-100" onChange={changeHandler} value={data.password} placeholder="Password" required name="password" />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" className="w-100" onChange={changeHandler} value={data.con_password} placeholder="Confirm password" required name="con_password" />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="w-100" onChange={changeHandler} value={data.address} placeholder="Address" required name="address" />
                                        </div>
                                        <div className="col-12">
                                            <input type="tel" className="w-100" onChange={changeHandler} value={data.pincode} placeholder="Area Pincode" required name="pincode" />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="w-100" onChange={changeHandler} value={data.city} placeholder="City" required name="city" />
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="w-100" onChange={changeHandler} value={data.state} placeholder="State" required name="state" />
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" disabled={btn.disabled} className="btn w-100">{btn.text}</button>
                                        </div>
                                    </div>
                                    <div className="bottom-links">
                                        <Link to="/login">Login Here</Link>
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

export default Register

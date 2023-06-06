import React, { useEffect, useState } from 'react'
import PageBanner from '../Components/PageBanner'
import { Link, useNavigate, useParams } from 'react-router-dom'

const PasswordChange = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        otp: "",
        password: "",
        con_password: ""
    })
    const [btn, setBtn] = useState({ disabled: false, text: "Change" });
    const { email } = useParams();

    useEffect(() => {
        document.title = "Change Password - SoftingArt";
    }, [])

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setBtn({ disabled: false, text: "Change" });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setBtn({ disabled: true, text: "wait..." });

        if (data.password === data.con_password) {
            fetch("https://api.softingart.com/change-now", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ password: data.con_password, email: email, otp: data.otp })
            }).then(res => res.json()).then(result => {
                if (result.status === "failed") {
                    setBtn({ disabled: true, text: "failed" })
                } else {
                    setBtn({ disabled: true, text: "success" })
                    setData({
                        otp: "",
                        password: "",
                        con_password: ""
                    })
                    navigate("/password-changed")
                }
            })
        } else {
            setBtn({ disabled: true, text: "enter same password" })
        }
    }
    return (
        <>
            <PageBanner name='Change Password' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Change Password</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="tel" className="w-100" onChange={changeHandler} value={data.otp} placeholder="Enter OTP" required name="otp" />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" className="w-100" onChange={changeHandler} value={data.password} placeholder="Enter New Password" required name="password" />
                                        </div>
                                        <div className="col-12">
                                            <input type="password" className="w-100" onChange={changeHandler} value={data.con_password} placeholder="Enter New Confirm Password" required name="con_password" />
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" disabled={btn.disabled} className="btn w-100">{btn.text}</button>
                                        </div>
                                    </div>
                                    <div className="bottom-links">
                                        <Link to="/login">Login</Link>
                                        <Link to="/register">Register Here</Link>
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

export default PasswordChange

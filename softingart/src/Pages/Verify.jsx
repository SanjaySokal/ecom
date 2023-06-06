import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PageBanner from '../Components/PageBanner';

const Verify = () => {
    const [data, setData] = useState("")
    const { email } = useParams();
    const navigate = useNavigate();
    const [btn, setBtn] = useState({
        disabled: false,
        text: "Verify"
    })

    useEffect(() => {
        document.title = "Verify Your Email - SoftingArt";
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        setBtn({ disabled: true, text: "wail..." });
        console.log(data);
        fetch("https://api.softingart.com/verify-now", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ otp: data, email: email })
        }).then(res => res.json()).then(result => {
            if (result.status === "success") {
                setBtn({ disabled: true, text: "check your email" });
                navigate("/verified");
            } else {
                setBtn({ disabled: true, text: "failed to verify" });
            }
        })
    }
    return (
        <>
            <PageBanner name='Verify Email' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Verify Email</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="tel" className="w-100" onChange={(e) => setData(e.target.value.trim())} value={data} placeholder="Enter OTP" required name="otp" />
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

export default Verify

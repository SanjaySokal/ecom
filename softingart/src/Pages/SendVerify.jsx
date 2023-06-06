import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../Components/PageBanner';

const SendVerify = () => {

    useEffect(() => {
        document.title = "Send Email Verification Link - SoftingArt";
    }, [])

    const [data, setData] = useState({ email: "" })
    const [btn, setBtn] = useState({
        disabled: false,
        text: "Send Link"
    })

    function handleSubmit(event) {
        setBtn({ disabled: true, text: "wait..." })
        event.preventDefault();
        fetch(`https://api.softingart.com/send-verify/${data.email}`).then(res => res.json()).then(dat => {
            if (dat.status === "success") {
                setBtn({ disabled: true, text: "check email and verify" });
            } else {
                setBtn({ disabled: true, text: "failed to send link" });
            }
        });
    }
    return (
        <>
            <PageBanner name='Send Email Verification Link' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Send Email Verification Link</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="email" className="w-100" onChange={(e) => { setData({ email: e.target.value.trim() }); setBtn({ disabled: false, text: "Send Link" }) }} value={data.email} placeholder="Email" required name="email" />
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

export default SendVerify

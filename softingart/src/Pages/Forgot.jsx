import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../Components/PageBanner';

const Forgot = () => {
    const [data, setData] = useState({ email: "" })
    const [btn, setBtn] = useState({ disabled: false, text: "Forgot" })

    function handleSubmit(event) {
        event.preventDefault();
        setBtn({ disabled: true, text: "wait..." })

        fetch("https://api.softingart.com/forgot", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(res => res.json()).then(result => {
            if (result.status === "failed") {
                setBtn({ disabled: true, text: "failed" })
            } else {
                setBtn({ disabled: true, text: "check your email" });
                setData({ email: "" })
            }
        })
    }
    return (
        <>
            <PageBanner name='Forgot Password' />
            <section>
                <div className="container">
                    <div className="row justify-center">
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Forgot Password</h3>
                                    <div className="row justify-center">
                                        <div className="col-12">
                                            <input type="email" className="w-100" onChange={e => { setData({ email: e.target.value.trim() }); setBtn({ disabled: false, text: "Forgot" }) }} value={data.email} placeholder="Email" required name="email" />
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

export default Forgot

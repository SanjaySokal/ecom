import React, { useState } from 'react'

const ContactPage = () => {
    const [details, setDetails] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [btn, setBtn] = useState({ disanles: false, text: "Submit" });
    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setBtn({ disanles: false, text: "Submit" });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setBtn({ disanles: true, text: "wait..." });
        fetch('https://api.softingart.com/contact', {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(details)
        }).then(res => res.json()).then(data => {
            if (data.status === "failed") {
                setBtn({ disanles: true, text: "failed to send message" });
            } else {
                setBtn({ disanles: false, text: "Thankyou for message." });
                setDetails({ name: "", email: "", phone: "", subject: "", message: "" });
            }
        });
    }
    return (
        <>
            <section className='contact-page'>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h3 className='heading-c-main'>Details</h3>
                            <p>
                                Have a question or concern? We’re here to help! Contact our friendly customer service team for assistance with orders, returns, or general inquiries.
                            </p>
                            <li>
                                <i className="fa-solid fa-headset"></i> <a href="tel:+918295673601">+91-82-95-67-3601</a>
                            </li>
                            <li>
                                <i className="fa-regular fa-paper-plane"></i> <a href="mailto:contact@softingart.com">contact@softingart.com</a>
                            </li>
                            <li>
                                <i className="fa-solid fa-map-location-dot"></i> <a target='_blank' rel='noreferrer' href="https://goo.gl/maps/MWgHkiJ3rw5jGvnK8?coh=178572&entry=tt">SoftingArt, Khairoli, Mahendergarh, Haryana 123028</a>
                            </li>

                            <h4>Follow us on Social Media</h4>

                            <div className="social-links">
                                <a href="/"><i className="fa-brands fa-facebook"></i></a>
                                <a href="/"><i className="fa-brands fa-instagram"></i></a>
                                <a href="/"><i className="fa-brands fa-linkedin"></i></a>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="contact-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Get in Touch</h3>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>
                                                <span>Name*</span>
                                                <input type="text" onChange={setValuses} value={details.name} name='name' placeholder='Name' required className='w-100' />
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <label>
                                                <span>Email*</span>
                                                <input type="email" onChange={setValuses} value={details.email} name='email' placeholder='Email' required className='w-100' />
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <label>
                                                <span>Phone Number*</span>
                                                <input type="tel" onChange={setValuses} value={details.phone} name='phone' placeholder='Phone Number' required className='w-100' />
                                            </label>
                                        </div>
                                        <div className="col-6">
                                            <label>
                                                <span>Subject*</span>
                                                <input type="text" onChange={setValuses} value={details.subject} name='subject' placeholder='Subject' required className='w-100' />
                                            </label>
                                        </div>
                                        <div className="col-12">
                                            <label>
                                                <span>Message*</span>
                                                <textarea name="message" defaultValue={details.message} onChange={setValuses} required placeholder='Message' className='w-100'></textarea>
                                            </label>
                                        </div>
                                        <div className="col-4">
                                            <button type="submit" disabled={btn.disanles} className='btn w-100'>{btn.text}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <iframe title='SoftingArt' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.279413382304!2d77.02264507437224!3d28.4711307913938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1930bf2ddf6b%3A0x313c87919d329ce2!2sSoftingArt!5e0!3m2!1sen!2sin!4v1683784131360!5m2!1sen!2sin" style={{ border: 0 }} width={"100%"} height={"350px"}></iframe>
        </>
    )
}

export default ContactPage

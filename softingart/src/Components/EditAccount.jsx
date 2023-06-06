import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountHeading from './AccountHeading'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const EditAccount = () => {
    const { login } = useContext(MyCreateContext);
    const [details, setDetails] = useState({ name: "", email: "", id: "" });
    useEffect(() => {
        if (login.login) {
            fetch(`https://api.softingart.com/account/${login.email}`).then(res => res.json()).then(result => {
                setDetails({ name: result[0].name, email: result[0].email, id: result[0].id });
            })
        } else {
            setDetails("");
        }
    }, [login])
    const [btn, setBtn] = useState({ disabled: false, text: "Update Profile" })
    const changeDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        setBtn({ disabled: false, text: "Update Profile" });
    }
    const changeProfile = (e) => {
        e.preventDefault();
        setBtn({ disabled: true, text: "updating..." })
        fetch("https://api.softingart.com/account/update", {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(details)
        }).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setBtn({ disabled: false, text: "updated" })
            } else {
                setBtn({ disabled: true, text: "failed to update" })
            }
        })
    }
    return (
        <>
            <AccountHeading data='Account Details' />
            <form onSubmit={changeProfile} className='row profile'>
                <div className="col-12">
                    <label>
                        <span>Your Name*</span> <input type="text" name='name' placeholder='Name' required className='w-100' onChange={changeDetails} value={details.name} />
                    </label>
                </div>
                <div className="col-12">
                    <label>
                        <span>Your Email*</span> <input disabled type="email" name='email' placeholder='Email' required className='w-100' onChange={changeDetails} value={details.email} />
                    </label>
                </div>
                <div className="col-12">
                    <p>Want to change address? - <Link to={'/contact'}>contact us</Link></p>
                    <p>Want to change password? - <Link to={'/forgot-password'}>change now</Link></p>
                </div>
                <div className="col-12">
                    <button type='submit' disabled={btn.disabled} className='btn'>{btn.text}</button>
                </div>
            </form>
        </>
    )
}

export default EditAccount

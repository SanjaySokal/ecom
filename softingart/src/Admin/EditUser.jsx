import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AccountHeading from '../Components/AccountHeading';

const EditUser = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({ name: "-", email: "-", pincode: '-', phone: "", state: "-", type: '-', address: "", city: "" });
    const [btn, setBtn] = useState({ disanles: true, text: "Edit User" });
    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setBtn({ disanles: false, text: "Edit User" });
    }

    useEffect(() => {
        fetch(`https://api.softingart.com/user/${id}`).then(res => res.json()).then(data => {
            if (data.status !== "failed") {
                setDetails({ name: data.status[0].name, email: data.status[0].email, pincode: data.status[0].pincode, state: data.status[0].state, type: data.status[0].type, phone: data.status[0].phone, address: data.status[0].address, city: data.status[0].city });
            } else {
                setDetails({ name: "-", email: "-", pincode: '-', phone: "", state: "-", type: '-', address: "", city: "" });
            }
        })
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtn({ disanles: true, text: "wait..." });
        fetch(`https://api.softingart.com/set-user/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(details)
        }).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setBtn({ disanles: true, text: "User Updated Successfully" });
            } else {
                setBtn({ disanles: true, text: "failed" });
            }
        })
    }
    return (
        <>
            <AccountHeading data="Edit User" />
            <form onSubmit={handleSubmit} className="row profile">
                <div className="col-12">
                    <label><span>Name*</span>
                        <input type="text" name="name" onChange={setValuses} placeholder="User Name" required className="w-100" value={details.name} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Email*</span>
                        <input type="email" disabled={true} onChange={setValuses} name="email" placeholder="Email" required className="w-100" value={details.email} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Phone*</span>
                        <input type="tel" onChange={setValuses} name="phone" placeholder="Phone" required className="w-100" value={details.phone} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Pincode*</span>
                        <input type="text" onChange={setValuses} name="pincode" placeholder="Pincode" required className="w-100" value={details.pincode} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>City*</span>
                        <input type="text" onChange={setValuses} name="city" placeholder="City" required className="w-100" value={details.city} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>State*</span>
                        <input type="text" onChange={setValuses} name="state" placeholder="State" required className="w-100" value={details.state} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Type*</span>
                        <input type="number" min={0} max={2} onChange={setValuses} name="type" placeholder="Type" required className="w-100" value={details.type} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Address*</span>
                        <input type="text" onChange={setValuses} name="address" placeholder="Address" required className="w-100" value={details.address} />
                    </label>
                </div>
                <div className="col-12">
                    <button type="submit" disabled={btn.disanles} className="btn">{btn.text}</button>
                </div>
            </form>
        </>
    )
}

export default EditUser

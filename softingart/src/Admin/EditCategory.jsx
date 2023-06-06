import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AccountHeading from '../Components/AccountHeading';

const EditCategory = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({ name: "", link: "" });
    const [btn, setBtn] = useState({ disanles: true, text: "Edit Category" });
    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setBtn({ disanles: false, text: "Edit Category" });
    }

    useEffect(() => {
        fetch(`https://api.softingart.com/all-category/${id}`).then(res => res.json()).then(data => setDetails({ name: data[0].catagory_name, link: data[0].link }))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        setBtn({ disanles: true, text: "wait..." });
        fetch(`https://api.softingart.com/update-category/${id}/${details.name}/${details.link}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setBtn({ disanles: true, text: "Category Updated Successfully" });
            } else {
                setBtn({ disanles: true, text: "failed" });
            }
        })
    }
    return (
        <>
            <AccountHeading data="Edit Category" />
            <form onSubmit={handleSubmit} className="row profile">
                <div className="col-12">
                    <label><span>Category Name*</span>
                        <input type="text" name="name" onChange={setValuses} placeholder="Category Name" required className="w-100" value={details.name} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Category Link*</span>
                        <input type="text" onChange={setValuses} name="link" placeholder="Category Link" required className="w-100" value={details.link} />
                    </label>
                </div>
                <div className="col-12">
                    <button type="submit" disabled={btn.disanles} className="btn">{btn.text}</button>
                </div>
            </form>
        </>
    )
}

export default EditCategory

import React, { useState } from 'react';

const AddCategory = () => {
    const [details, setDetails] = useState({ name: "", link: "" });
    const [btn, setBtn] = useState({ disanles: false, text: "Add Category" });
    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setBtn({ disanles: false, text: "Add Category" });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setBtn({ disanles: true, text: "wait..." });
        fetch(`https://api.softingart.com/add-category/${details.name}/${details.link}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setBtn({ disanles: false, text: "Category Added" });
                setDetails({ name: "", link: "" });
            } else {
                setBtn({ disanles: true, text: "failed" });
            }
        })
    }
    return (
        <>
            <h2 className="account-h">Add Category</h2>
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

export default AddCategory

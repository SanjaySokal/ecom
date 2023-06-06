import React, { useEffect, useState } from 'react';
import AccountHeading from '../Components/AccountHeading';
import UpdateStatus from './UpdateStatus';
import { useParams } from 'react-router-dom';

const EditProducts = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({ name: "", price: "", del: "", desc: "", small: "", category: "" });
    const [cate, setCate] = useState([{}]);
    const [html, setHtml] = useState(<></>);

    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setHtml(<UpdateStatus status={"Updating..."} />)
        if (e.target.name === "name") {
            updateName(e.target.value.trim());
        } else if (e.target.name === "price") {
            updateprice(e.target.value.trim());
        } else if (e.target.name === "del") {
            updatedel(e.target.value.trim());
        } else if (e.target.name === "category") {
            updateCatagory(e.target.value.trim());
        } else if (e.target.name === "desc") {
            updateDesc(e.target.value.trim());
        } else if (e.target.name === "small") {
            updateSmall(e.target.value.trim());
        }
    }

    useEffect(() => {
        fetch("https://api.softingart.com/all-category").then(res => res.json()).then(data => setCate(data));
    }, [])

    useEffect(() => {
        fetch(`https://api.softingart.com/single-product/${id}`).then(res => res.json()).then(data => setDetails({ name: data.status[0].name, price: data.status[0].price, del: data.status[0].del, desc: data.status[0].desc, small: data.status[0].small, category: data.status[0].catagory }))
    }, [id])

    const updateName = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/name/${id}/${nameVal}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const updateprice = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/price/${id}/${nameVal}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const updatedel = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/del/${id}/${nameVal}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const updateCatagory = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/catagory/${id}/${nameVal}`).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const updateDesc = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/desc/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ desc: nameVal })
        }).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const updateSmall = (nameVal) => {
        fetch(`https://api.softingart.com/update-product/small/${id}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ small: nameVal })
        }).then(res => res.json()).then(data => {
            if (data.status === "success") {
                setHtml(<UpdateStatus status={"Updated Successfully"} />);
            } else {
                setHtml(<UpdateStatus status={"Failed..."} />);
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <AccountHeading data="Edit Product" />
            {html}
            <form onSubmit={handleSubmit} className="row profile">
                <div className="col-12">
                    <label><span>Product Name*</span>
                        <input type="text" name="name" onChange={setValuses} placeholder="Product Name" required className="w-100" value={details.name} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Price*</span>
                        <input type="text" onChange={setValuses} name="price" placeholder="Product Link" required className="w-100" value={details.price} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Del*</span>
                        <input type="text" onChange={setValuses} name="del" placeholder="Product Link" required className="w-100" value={details.del} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Category*</span>
                        <select required defaultValue={'DEFAULT'} onChange={setValuses} className='w-100' name="category">
                            <option disabled value={'DEFAULT'}>Select Category</option>
                            {
                                cate.map((ele, ind) => <option key={ind} value={ele.id}>{ele.catagory_name}</option>)
                            }
                        </select>
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Long Description*</span>
                        <textarea name="desc" className='w-100' onChange={setValuses} required defaultValue={details.desc}></textarea>
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Short Description*</span>
                        <textarea name="small" className='w-100' onChange={setValuses} required defaultValue={details.small}></textarea>
                    </label>
                </div>
            </form>
        </>
    )
}

export default EditProducts

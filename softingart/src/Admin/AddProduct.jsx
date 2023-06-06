import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageProgress from './ImageProgress';

const AddProduct = () => {
    const [details, setDetails] = useState({ name: "", price: "", del: "", category: "", small: "", desc: "" });
    const [img, setImg] = useState();
    const [imgName, setImageName] = useState({ name: "", ramdName: "" });
    const [progress, setProgress] = useState(<></>);
    const [btn, setBtn] = useState({ disanles: false, text: "Add Product" });
    const [cate, setCate] = useState([{}]);
    const setValuses = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value.trim() });
        setBtn({ disanles: false, text: "Add Product" });
    }

    useEffect(() => {
        fetch("https://api.softingart.com/all-category").then(res => res.json()).then(data => setCate(data));
    }, [])
    async function handleSubmit(e) {
        e.preventDefault();
        setBtn({ disanles: true, text: "wait..." });
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(imgName.name)) {
            setBtn({ disanles: true, text: "please select (.jpg .jpeg .png .gif) images" });
        } else {
            await axios.post("https://api.softingart.com/add-product", { name: details.name, price: details.price, del: details.del, category: details.category, small: details.small, desc: details.desc, image: img, imgName: imgName.name, ramdName: imgName.ramdName }, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': `multipart/form-data;`,
                },
                onUploadProgress: (data) => {
                    var loaded = data.loaded;
                    var total = (data.total === undefined) ? 0 : (data.total);
                    var load = Math.round((loaded / total) * 100)
                    if (load === 100) {
                        setProgress(<ImageProgress progress={load} color={"#0053fe"} />);
                    } else {
                        setProgress(<ImageProgress progress={load} color={"#f100fe"} />);
                    }
                }
            }).then(res => {
                if (res.data.protocol41) {
                    setDetails({ name: "", price: "", del: "", category: "", small: "", desc: "" });
                    setBtn({ disanles: true, text: "Product Added Successfully" });
                } else {
                    setBtn({ disanles: true, text: "Failed to add..." });
                }
            });
        }
    }
    return (
        <>
            <h2 className="account-h">Add Product</h2>
            <form onSubmit={handleSubmit} className="row profile">
                <div className="col-12">
                    <label><span>Product Name*</span>
                        <input type="text" name="name" onChange={setValuses} placeholder="Product Name" required className="w-100" value={details.name} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Single Image*</span>
                        <input type="file" onChange={(e) => {
                            setImg(e.target.files[0]);
                            setImageName({
                                name: e.target.files[0].name,
                                ramdName: parseInt(Math.random() * 10000) + "" + ((new Date()).getDate()) + "_" + (Date.now()) + "_" + e.target.files[0].name.replaceAll(" ", "_").replaceAll("-", "_")
                            })
                        }} name="image" placeholder="Product image" required className="w-100" />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Price*</span>
                        <input type="number" onChange={setValuses} name="price" placeholder="Product price" required className="w-100" value={details.price} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Product Del*</span>
                        <input type="number" onChange={setValuses} name="del" placeholder="Product del price" required className="w-100" value={details.del} />
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
                    <label><span>Small Description*</span>
                        <textarea type="text" onChange={setValuses} name="small" placeholder="Small Description" required className="w-100" value={details.small} />
                    </label>
                </div>
                <div className="col-12">
                    <label><span>Long Description*</span>
                        <textarea type="text" onChange={setValuses} name="desc" placeholder="Long Description" required className="w-100" value={details.desc} />
                    </label>
                </div>
                <div className="col-12">
                    {progress}
                </div>
                <div className="col-12">
                    <button type="submit" disabled={btn.disanles} className="btn">{btn.text}</button>
                </div>
            </form>
        </>
    )
}

export default AddProduct

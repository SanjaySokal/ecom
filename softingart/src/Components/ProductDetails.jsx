import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const ProductDetails = (props) => {
    const [count, setCount] = useState(1);
    const { login } = useContext(MyCreateContext);
    const navigate = useNavigate();

    const handelSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/add-to-cart", {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ id: props.id, count: count, email: login.email })
        }).then(res => res.json()).then(data => {
            if (data.status === "success") {
                navigate("/cart");
            } else {
                alert("failed")
            }
        })
    }

    const [btn, setBtn] = useState(<button type='submit' className='btn'>Add To Cart</button>);

    useEffect(() => {
        if (!login.login) {
            setBtn(<Link type='button' to={'/login'} className='btn'>Add To Cart</Link>);
        } else {
            fetch(`https://api.softingart.com/check-cart/${props.id}/${login.email}`).then(res => res.json()).then(data => {
                if (data.status) {
                    setBtn(<Link type='button' to={'/cart'} className='btn'>Go To Cart</Link>);
                }
            })
        }
    }, [login, props.id])

    useEffect(() => {
        document.title = `${props.title} - SoftingArt`;
    }, [props])

    return (
        <section className='product-detail'>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <img src={"https://api.softingart.com/api/products/" + props.img} className='w-100 product-detail-image' title={props.title} alt="SoftingArt" />
                    </div>
                    <div className="col-7">
                        <h3 className="product-detail-heading">{props.title}</h3>
                        <div className="price"><del>₹{props.del}</del> <span>₹{props.price}/-</span></div>
                        <div className="desc">
                            <div dangerouslySetInnerHTML={{ __html: props.small }}></div>
                        </div>
                        <form onSubmit={handelSubmit} className="count">
                            <input type="number" max={5} min={1} maxLength={1} minLength={1} required onChange={e => setCount(e.target.value)} value={count} />
                            {btn}
                        </form>

                        <div className="catagory">
                            <p><b>Categories: </b> <Link to={props.catlink}>{props.category}</Link></p>
                        </div>
                    </div>
                </div>
                <div className="product-desc">
                    <h3>Description</h3>
                    <div dangerouslySetInnerHTML={{ __html: props.desc }}></div>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails

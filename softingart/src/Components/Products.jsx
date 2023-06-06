import React, { useEffect, useState } from 'react'
import Product from './Product'
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([{}]);
    const [params, setParams] = useState((new URLSearchParams(window.location.search)).get('page') === null ? 1 : (new URLSearchParams(window.location.search)).get('page'));

    const product_per_page = 12;
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('https://api.softingart.com/products').then(res => res.json()).then(data => {
            var arr = [];
            for (let i = 1; i <= Math.ceil(data.length / 12); i++) {
                if (params === i) {
                    arr.push(<Link to={'/shop'} className='active'>{i}</Link>);
                } else {
                    arr.push(<Link to={'/shop'}>{i}</Link>);
                }
            }
            setList(arr);
        })
    }, [params])

    useEffect(() => {
        fetch(`https://api.softingart.com/products/${((params - 1) * product_per_page)}/${product_per_page}`).then(res => res.json()).then(data => setProducts(data));
    }, [params])

    const handleChange = (e) => {
        e.preventDefault();
        var value = e.target.value.trim();
        if (value !== "") {
            fetch(`https://api.softingart.com/search-product/${value}`).then(res => res.json()).then(data => {
                setProducts(data);
                setList([]);
            })
        }
    }

    return (
        <section>
            <div className="container">
                <div className="product-search">
                    <form onSubmit={e => e.preventDefault()}>
                        <input type="text" onChange={handleChange} name='name' className='w-100' placeholder='Type here to Search' required />
                    </form>
                </div>
                <div className="row">
                    {products.map(dta => <Product key={Math.random()} img={dta.image} deltag={dta.del} price={dta.price} link={dta.id} name={dta.name} />)}
                </div>
            </div>

            <div className="navs-list">
                <div className="list">
                    {list.map(
                        (ele, ind) =>
                            (ind === (params - 1))
                                ?
                                <Link key={ind} className='active' to={`/shop?page=${ind + 1}`}>{ind + 1}</Link>
                                :
                                <Link key={ind} onClick={() => { setParams(ind + 1) }} to={`/shop?page=${ind + 1}`}>{ind + 1}</Link>
                    )
                    }
                </div>
            </div>

        </section>
    )
}

export default Products

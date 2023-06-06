import React, { useEffect, useState } from 'react'
import PageBanner from '../Components/PageBanner';
import Product from '../Components/Product';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const [products, setProducts] = useState([{}]);
    const { category } = useParams();

    useEffect(() => {
        fetch(`https://api.softingart.com/category/${category}`).then(res => res.json()).then(data => setProducts(data.status));
    }, [category])

    useEffect(() => {
        document.title = products[0].catagory_name + " - SoftingArt";
    }, [products])

    return (
        <>
            <PageBanner name={products[0].catagory_name} />
            <section>
                <div className="container">
                    <div className="row">
                        {products.map(dta => <Product key={Math.random()} img={dta.image} deltag={dta.del} price={dta.price} link={dta.id} name={dta.name} />)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategoryProducts

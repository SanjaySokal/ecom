import React, { useEffect, useState } from 'react'
import PageBanner from '../Components/PageBanner'
import ProductDetails from '../Components/ProductDetails'
import Lazy from '../Components/Lazy';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const param = useParams();
  const [html, setHtml] = useState(<Lazy />);

  useEffect(() => {
    fetch(`https://api.softingart.com/single-product/${param.id}`).then(res => res.json()).then(data => {
      if (data.status !== "failed") {
        setHtml(<>
          <PageBanner name={data.status[0].name} />
          <ProductDetails id={data.status[0].id} img={data.status[0].image} title={data.status[0].name} price={data.status[0].price} del={data.status[0].del} small={data.status[0].small} desc={data.status[0].desc} category={data.status[0].catagory_name} catlink={`/product/category/${data.status[0].link}`} />
        </>);
      } else {
        setHtml(<Lazy />)
      }
    });
  }, [param.id])

  return (
    <>
      {html}
    </>
  )
}

export default ProductDetail

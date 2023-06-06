import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';

const RecOrder = (props) => {
    const { login } = useContext(MyCreateContext)
    const navigate = useNavigate();
    const OrderCancel = () => {
        var con = window.confirm("Do you want to cancel?");
        if (con) {
            console.log(props.orderid);
            fetch(`https://api.softingart.com/cancel-order/${props.orderid}/${login.email}`).then(res => res.json()).then(data => {
                console.log(data)
                if (data.status === "success") {
                    navigate("/my-account");
                } else {
                    alert("failed");
                }
            })
        }
    }

    return (

        <tr>
            <td>
                #{props.orderid}
            </td>
            <td>
                <Link to={`/product/${props.products_id}`}>{props.products_name}</Link>
            </td>
            <td>
                {props.total}
            </td>
            <td>
                ₹{props.price * props.total}/-
            </td>
            <th>
                <button onClick={OrderCancel} className='btn'>Cancel</button>
            </th>
        </tr>
    )
}

export default RecOrder

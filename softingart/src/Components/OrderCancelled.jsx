import React, { useContext, useEffect, useState } from 'react'
import AccountHeading from './AccountHeading'
import { MyCreateContext } from '../ConTextApi/HandleAllApi';
import { Link } from 'react-router-dom';

const OrderCancelled = () => {
    const { login } = useContext(MyCreateContext)
    const [data, setData] = useState("");
    const [view, setView] = useState(<></>);
    useEffect(() => {
        if (!login.login) {
            setData("")
        }
    }, [login])

    useEffect(() => {
        fetch(`https://api.softingart.com/cancelled-order/${login.email}`).then(res => res.json()).then(result => {
            setData(result)
        })
    }, [login])

    useEffect(() => {
        if (data.length > 0) {
            setView(data.map(ele => <tr key={ele.orderid}><td>#{ele.orderid}</td><td><Link to={`/product/${ele.products_id}`}>{ele.products_name}</Link></td><td>{ele.total}</td><td>₹{ele.price * ele.total}/-</td></tr>))
        } else {
            setView(<tr><td>error</td><td>error</td><td>error</td><td>error</td></tr>);
        }
    }, [data])
    return (
        <>
            <AccountHeading data='Cancelled Orders' />
            <div className="overflow-x">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Your ID
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {view}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrderCancelled

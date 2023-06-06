import React, { useContext, useEffect, useState } from 'react'
import AccountHeading from './AccountHeading'
import RecOrder from './RecOrder'
import { MyCreateContext } from '../ConTextApi/HandleAllApi'

const RecentOrders = () => {
    const { login } = useContext(MyCreateContext)
    const [data, setData] = useState("");
    const [view, setView] = useState(<></>);
    useEffect(() => {
        fetch(`https://api.softingart.com/recent-order/${login.email}`).then(res => res.json()).then(result => {
            setData(result)
        })
    }, [login])

    useEffect(() => {
        if (data.length > 0) {
            setView(data.map(ele => <RecOrder key={ele.orderid} orderid={ele.orderid} products_id={ele.products_id} products_name={ele.products_name} price={ele.price} total={ele.total} />))
        } else {
            setView(<tr><td>error</td><td>error</td><td>error</td><td>error</td><td>error</td></tr>);
        }
    }, [data])

    return (
        <>
            <AccountHeading data='Recent Orders' />
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
                            <th>
                                Cancel
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

export default RecentOrders

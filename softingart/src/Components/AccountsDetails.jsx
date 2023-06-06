import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EditAccount from './EditAccount'
import RecentOrders from './RecentOrders'
import OrderCompleted from './OrderCompleted'
import OrderCancelled from './OrderCancelled'

const AccountsDetails = () => {
    return (
        <Routes>
            <Route path='/' element={<EditAccount />} />
            <Route path='/edit' element={<EditAccount />} />
            <Route path='/orders' element={<RecentOrders />} />
            <Route path='/order-completed' element={<OrderCompleted />} />
            <Route path='/order-cancelled' element={<OrderCancelled />} />
        </Routes>
    )
}

export default AccountsDetails

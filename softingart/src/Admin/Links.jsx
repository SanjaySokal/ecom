import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from './Products';
import AddCategory from './AddCategory';
import Categories from './Categories';
import EditCategory from './EditCategory';
import Main from './Main';
import AddProduct from './AddProduct';
import EditProducts from './EditProducts';
import Orders from './Orders';
import Admin from './Admin';
import EditUser from './EditUser';

const Links = () => {
    return (
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/add-category' element={<AddCategory />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/edit-category/:id' element={<EditCategory />} />
            <Route path='/edit-product/:id' element={<EditProducts />} />
            <Route path='/category' element={<Categories />} />
            <Route path='/products' element={<Products />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/users' element={<Admin />} />
            <Route path='/users/edit/:id' element={<EditUser />} />
        </Routes>
    )
}

export default Links

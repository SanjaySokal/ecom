import React, { Suspense } from 'react';
import './App.css';
import Header from './Inc/Header';
import { Routes, Route } from 'react-router-dom';
import Lazy from './Components/Lazy';
import Footer from './Inc/Footer';
import Load from './Load';
import HandleAllApi from './ConTextApi/HandleAllApi';
const Home = React.lazy(() => import('./Pages/Home'));
const Login = React.lazy(() => import('./Pages/Login'));
const Register = React.lazy(() => import('./Pages/Register'));
const Shop = React.lazy(() => import('./Pages/Shop'));
const Forgot = React.lazy(() => import('./Pages/Forgot'));
const ProductDetail = React.lazy(() => import('./Pages/ProductDetail'));
const MyAccount = React.lazy(() => import('./Pages/MyAccount'));
const Cart = React.lazy(() => import('./Pages/Cart'));
const Contact = React.lazy(() => import('./Pages/Contact'));
const Checkout = React.lazy(() => import('./Pages/Checkout'));
const OrderPlaced = React.lazy(() => import('./Pages/OrderPlaced'));
const Verify = React.lazy(() => import('./Pages/Verify'));
const Verified = React.lazy(() => import('./Pages/Verified'));
const Changed = React.lazy(() => import('./Pages/Changed'));
const PasswordChange = React.lazy(() => import('./Pages/PasswordChange'));
const SendVerify = React.lazy(() => import('./Pages/SendVerify'));
const PrivacyPolicy = React.lazy(() => import('./Pages/PrivacyPolicy'));
const Terms = React.lazy(() => import('./Pages/Terms'));
const Refund = React.lazy(() => import('./Pages/Refund'));
const CategoryProducts = React.lazy(() => import('./Pages/CategoryProducts'));
const Eooro = React.lazy(() => import('./Pages/Eooro'));
const AdminHome = React.lazy(() => import('./Admin/Home'));

function App() {
  return (
    <>
      <HandleAllApi>
        <Header />
        <Suspense fallback={<Lazy />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<Eooro />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/order-placed' element={<OrderPlaced />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/product/category/:category' element={<CategoryProducts />} />
            <Route path='/verify/:email' element={<Verify />} />
            <Route path='/send-verify' element={<SendVerify />} />
            <Route path='/verified' element={<Verified />} />
            <Route path='/forgot-password' element={<Forgot />} />
            <Route path='/password-changed' element={<Changed />} />
            <Route path='/change-password/:email' element={<PasswordChange />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-conditions' element={<Terms />} />
            <Route path='/refund-return' element={<Refund />} />
            <Route path='/my-account/*' element={<MyAccount />} />
            <Route path='/admin/*' element={<AdminHome />} />
          </Routes>
        </Suspense>
        <Footer />
        <Load />
      </HandleAllApi>
    </>
  );
}

export default App;

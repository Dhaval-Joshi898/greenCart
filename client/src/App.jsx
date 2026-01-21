import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Routes,Route, useLocation } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProducts from './pages/seller/AddProducts';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './components/Loading';


const App=()=>{
  const isSellerPath=useLocation().pathname.includes("seller")
  const {showUserLogin,isSeller}=useAppContext()
  // console.log('showUserLogin',showUserLogin)
  return(
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSellerPath ? null :<Navbar/>}   {/* user is seller dont show any of these*/}
      {showUserLogin? <Login/> :null}

      <Toaster />
      <div className={`${isSellerPath ? "" :"px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<AllProducts/>}/>
          <Route path="/products/:category" element={<ProductCategory/>}/>
          <Route path="/products/:category/:id" element={<ProductDetails/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/add-address" element={<AddAddress/>}/>
          <Route path="/my-orders" element={<MyOrders/>}/>
          <Route path="/loader" element={<Loading/>}/>
          <Route path="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>} >
              {/* Below are child routes of /seller and all are e.g /seller/product-list & /seller/orders */}
              <Route index element={isSeller ? <AddProducts/> : null}/> {/*only this index will be show when it is /seller shows by default */}
              <Route path='product-list' element={<ProductList/>}/>
              <Route path='orders' element={<Orders/>}/>
          </Route> 

          
        </Routes>
        
      </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App;
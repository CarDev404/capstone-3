// This is the App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link
import { UserProvider } from './UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Error from './pages/Error';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import ProductView from './pages/ProductView';
import OrderForm from './pages/OrderForm';
import AdminView from './components/AdminView';
import UserOrders from './components/UserOrders'; // Import UserOrders component

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    console.log(user);
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data._id !== 'undefined') {
          setUser({
            id: data._id,
            isAdmin: data.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <div className="App">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products />} />
            <Route path="/product/:productId" element={<ProductView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/checkout/:productId" element={<OrderForm />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/user-orders" element={<UserOrders />} /> {/* Add UserOrders route */}
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;










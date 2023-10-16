// UserOrders.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function UserOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders data from the server
    fetch('http://localhost:4000/users/product/checkout/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Set the fetched orders data in the state
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching user orders:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Orders</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.products[0].productName}</td>
              <td>{order.products[0].quantity}</td>
              <td>{order.totalAmount}</td>
              <td>{new Date(order.purchasedOn).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}




// This is the AdminView.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProducts from './ArchiveProducts';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productsData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? 'text-success' : 'text-danger'}>
            {product.isActive ? 'Available' : 'Unavailable'}
          </td>
          <td>
            <EditProduct product={product._id} fetchData={fetchData} />
          </td>
          <td>
            {/* Member 2 and 3 */}
            {/* Conditional rendering of Archive or Activate button */}
            <ArchiveProducts productId={product._id} isActive={product.isActive} fetchData={fetchData} />
          </td>
        </tr>
      );
    });

    setProducts(productsArr);
  }, [productsData]);

  return (
    <>
      <h1 className="text-center my-4">Admin Dashboard</h1>
      {/* Add New Product button */}
      <div className="text-center my-3">
        <Link to="/admin/add-product">
          <Button variant="primary">Add New Product</Button>
        </Link>
        {/* Show User Orders button */}
        <Link to="/admin/user-orders">
          <Button variant="secondary" className="ml-3">
            Show User Orders
          </Button>
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    </>
  );
}


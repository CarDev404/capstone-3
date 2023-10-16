// ProductList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all active products from your backend API
    fetch('http://localhost:4000/product/active')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, []);

  return (
    <div>
      <h1>Active Products</h1>
      <Link to="/products/all">All Active Products</Link> {/* Link to all active products */}
      <Link to="/products/single">Single Product</Link> {/* Link to a single product */}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <a href={`/products/${product.id}`}>{product.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

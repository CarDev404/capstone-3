import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import UserContext from '../UserContext';

export default function OrderForm() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch the product details based on the productId
    fetch(`http://localhost:4000/product/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product data.');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error(error);
        setError('Error fetching product data.');
      });
  }, [productId]);

  const handleCheckout = async () => {
    try {
      console.log('Product ID:', productId);
      console.log('Quantity:', quantity);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        throw new Error('Log in to place an order.');
      }

      const orderData = {
        userId: user.id,
        products: [
          {
            productId: productId,
            quantity: parseInt(quantity),
          },
        ],
      };

      const response = await fetch(`http://localhost:4000/users/checkout/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Failed to place an order');
      }

      const data = await response.json();
      console.log('Data:', data);

      if (data.message === 'Order processed successfully') {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Order placed successfully',
        }).then(() => {
          // Redirect to the home page
          navigate('/');
        });
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'An error occurred while placing your order',
        });
      }
    } catch (error) {
      console.error('Error placing order:', error);

      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.message || 'An error occurred while placing your order',
      });
    }
  };

  return (
    <Container className="pt-5 custom-width-container">
      <div className="divcart mx-6">
        <h2>Checkout</h2>
        <Card className="bg-dark text-white mt-3">
          <Card.Body>
            <span className="text-white">Item to be Checked Out:</span>
            {error ? (
              <p>Error: {error}</p>
            ) : product ? (
              <div>
                <h3 className="">{product.name}</h3>
                <h6>Price:</h6> <p className="text-warning">PhP {product.price}</p>
              </div>
            ) : (
              <p>Loading product information...</p>
            )}
          </Card.Body>
        </Card>
        <Card.Body>
          <div className="mb-3 d-flex align-items-end">
            <Form.Group className="mr-3 mb-0 flex-grow-1" controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </Form.Group>

            <div className="mx-3">
              <Button className="btn btn-warning" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        </Card.Body>
      </div>
    </Container>
  );
}








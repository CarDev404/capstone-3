import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:4000/product/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product data.');
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data); // Update product state with retrieved data
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., show an error message to the user
      });
  }, [productId]);

  const buy = (productId) => {
    fetch(`http://localhost:4000/users/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.message === 'Order Purchase Successful.') {
          Swal.fire({
            title: 'Successfully bought',
            icon: 'success',
            text: 'You have successfully purchased this product.',
          });
          navigate('/products');
        } else {
          Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error, e.g., show an error message to the user
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{product.name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {product.price}</Card.Text>
              {user.id !== null ? (
                <Button
                  variant="primary"
                  block
                  onClick={() => buy(product._id)} // Pass the product ID here
                >
                  Buy
                </Button>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Log in to buy
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}


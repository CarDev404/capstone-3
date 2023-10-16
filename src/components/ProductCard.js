import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function ProductCard({ productProp }) {
  const { user } = useContext(UserContext);
  const { _id, name, description, price } = productProp;

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Link to={`/checkout/${_id}`} className="btn btn-primary">
          Details
        </Link>
        {user.isAdmin ? null : ( // Display Buy button if the user is not an admin
          <Link to={`/checkout/${_id}`} className="btn btn-success">
            Buy
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}




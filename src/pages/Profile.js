import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import UserContext from '../UserContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
  });

  useEffect(() => {
    fetch(`http://localhost:4000/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data._id) {
          // Make sure that data contains the expected properties (firstName, lastName, email)
          const updatedDetails = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            mobileNo: data.mobileNo || '',
          };

          setDetails(updatedDetails);
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        // Handle errors here if necessary
      });
  }, []);

  return (
    user.access === null ? (
      <Navigate to="/product" />
    ) : (
      <>
        <Row>
          <Col className="p-5 bg-primary text-white">
            <h1 className="my-5">Profile</h1>
            <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
            <hr />
            <h4>Contacts</h4>
            <ul>
              <li>Email: {details.email}</li>
              {details.mobileNo && <li>Mobile No: {details.mobileNo}</li>}
            </ul>
          </Col>
        </Row>
        <Row className='pt-4 mt-4'>
          <Col>
            {/* Add ResetPassword component here */}
          </Col>
        </Row>
        <Row className='pt-4 mt-4'>
          <Col>
            {/* Add UpdateProfile component here */}
          </Col>
        </Row>
      </>
    )
  );
}


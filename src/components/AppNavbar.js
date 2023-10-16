//This is the AppNavbar.js
import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="black" expand="lg" variant="dark"> {/* Set background color to black and use dark variant */}
      <Navbar.Brand as={Link} to="/" className="navbar-brand-italic">
        LuxeHavinSkin 
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/" exact>
            HOME
          </Nav.Link>
          <Nav.Link as={NavLink} to="/product" exact>
            PRODUCTS
          </Nav.Link>
          {user.id !== null ? (
            user.isAdmin ? (
              <>
                {/* <Nav.Link as={Link} to="/addProduct">
                  ADD PRODUCT
                </Nav.Link> */}
                <Nav.Link as={Link} to="/logout">
                  LOGOUT
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">
                  PROFILE
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  LOGOUT
                </Nav.Link>
              </>
            )
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                LOGIN
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                REGISTER
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}



import Container from "react-bootstrap/Container";
import BSNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Navbar() {
  const { user } = useUser();

  return (
    <BSNavbar bg="light" expand="sm" className="Navbar">
      <Container>
        <BSNavbar.Brand as={NavLink} to="/storefront">
          🛍️ Shop
        </BSNavbar.Brand>
        <Nav>
          {user === undefined ? (
            <Spinner animation="border" />
          ) : (
            <>
              {user === null ? (
                <Button variant="outline-success" as={NavLink} to="/login">
                  Log In
                </Button>
              ) : (
                <NavDropdown title="Account" id="account-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/orders">
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item>Log Out</NavDropdown.Item>
                </NavDropdown>
              )}
            </>
          )}
        </Nav>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </BSNavbar>
  );
}

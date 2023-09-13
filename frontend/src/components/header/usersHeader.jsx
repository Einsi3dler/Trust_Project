import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import "./header.css";

export default function UserHeader() {
  return (
    <Navbar expand="lg" fixed="top" collapseOnSelect className="header">
      <Container fluid>
        <Navbar.Brand> <div className="logo"></div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="m-1" />
        <Navbar.Offcanvas
          id="basic-navbar-nav"
          aria-labelledby="navbar-label"
          placement="end"
          className="bg-dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="navbar-label">Trust</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className="nav-menu justify-content-end flex-grow-1 pe-3"
              id="nav-menu"
            >
              <Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link>Transactions</Nav.Link>
              <Nav.Link>Account</Nav.Link>
            </Nav>
            <Nav className="nav-menu justify-content-end flex-grow-1 pe-3">
              <Nav.Link id="nav-signup" href="/logout">
                Log out{" "}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

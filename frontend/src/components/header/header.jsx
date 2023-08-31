import { Container, Navbar, Nav, Offcanvas } from 'react-bootstrap';
import './header.css';

export default function PageHeader () {
	return (
		<Navbar fixed="top" data-bs-theme expand="lg" collapseOnSelect  className="bg-primary header">
			<Container fluid>
			<Navbar.Brand className='logo'>TRUST</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Offcanvas
			 id="basic-navbar-nav"
			 aria-labelledby="navbar-label"
			 placement="end"
			 className="bg-dark"
			 >
			<Offcanvas.Header closeButton>
            <Offcanvas.Title id="navbar-label">
                  Trust
            </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
         	 <Nav className="nav-menu justify-content-end flex-grow-1 pe-3">
			<Nav.Link>Home</Nav.Link>
			<Nav.Link>Features</Nav.Link>
			<Nav.Link>Contact</Nav.Link>
			<Nav.Link>About</Nav.Link>
			<Nav.Link>Services</Nav.Link>
			</Nav>
			<Nav className="nav-menu justify-content-end flex-grow-1 pe-3">
			<Nav.Link href="/sign-in">Sign In </Nav.Link>
			<Nav.Link href="/sign-up">Sign Up </Nav.Link>
			</Nav>
			</Offcanvas.Body>
			</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)

}

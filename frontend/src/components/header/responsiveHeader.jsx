import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import './header.css';

export default function ResponsiveHeader () {
	return (
			<Navbar.Offcanvas
              id="basic-navbar-nav"
              aria-labelledby="navbar-label"
              placement="end"
			  className="d-lg-none"
            >

         	 <Nav >
			<Nav.Link>Home</Nav.Link>
			<Nav.Link>Features</Nav.Link>
			<Nav.Link>Contact</Nav.Link>
			<Nav.Link>About</Nav.Link>
			<Nav.Link>Services</Nav.Link>
			<Nav.Link href="/sign-in">Sign In </Nav.Link>
			<Nav.Link href="/sign-up">Sign Up </Nav.Link>
			</Nav>
			</Offcanvas.Body>
			</Navbar.Offcanvas>

	)
}
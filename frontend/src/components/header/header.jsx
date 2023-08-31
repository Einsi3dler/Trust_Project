import { Container, Navbar, Nav } from 'react-bootstrap';
import './header.css';

export default function PageHeader () {
	return (
		<Navbar  className="bg-primary">
			<Container fluid>
			<Navbar.Brand className='logo'>TRUST</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
        	<Navbar.Collapse id="basic-navbar-nav">
         	 <Nav className="nav-menu d-none d-lg-flex">
			<Nav.Link>Home</Nav.Link>
			<Nav.Link>Features</Nav.Link>
			<Nav.Link>Contact</Nav.Link>
			<Nav.Link>About</Nav.Link>
			<Nav.Link>Services</Nav.Link>
			</Nav>
			<Nav className="nav-user d-none d-lg-flex">
			<Nav.Link href="/sign-in">Sign In </Nav.Link>
			<Nav.Link href="/sign-up">Sign Up </Nav.Link>
			</Nav>
			</Navbar.Collapse>
			</Container>
		</Navbar>
	)

}

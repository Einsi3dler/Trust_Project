import { Container, NavLink, Navbar, NavbarBrand } from 'react-bootstrap';
import './header.css';

export default function PageHeader () {
	return (
		<Navbar  className="bg-primary">
			<Container fluid>
			<NavbarBrand className='logo'>Trust</NavbarBrand>
			<NavLink>Login</NavLink>
			<NavLink>Sign Up</NavLink>
			</Container>
		</Navbar>
	)

}

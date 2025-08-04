import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Navlink } from "./Navlink";

const CustomNavbar = () => {
    const navigate = useNavigate();

	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/">Semina</Navbar.Brand>
				<Nav className="me-auto">
					<Navlink action={() => navigate('/categories')}>Categories</Navlink>
					<Navlink action={() => navigate('/speakers')}>Speakers</Navlink>
					<Navlink action={() => navigate('/events')}>Events</Navlink>
					<Navlink action={() => navigate('/participants')}>Participants</Navlink>
					<Navlink action={() => navigate('/transactions')}>Transactions</Navlink>
				</Nav>
			</Container>
		</Navbar>
	)
}

export { CustomNavbar };
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	accessCategories,
	accessEvents,
	accessOrders,
	accessParticipants,
	accessPayments,
	accessTalents
} from "../utils/access";
import { Navlink } from "./Nav Access";

const CustomNavbar = () => {
	const navigate = useNavigate();
	const [role, setRole] = useState(null);

	useEffect(() => {
		const getRole = () => {
			const { role } = localStorage.getItem("auth")
				? JSON.parse(localStorage.getItem("auth"))
				: {};

			setRole(role);
		}
		getRole();
	}, [])

	const handleLogout = () => {
		localStorage.clear();
		window.location.href = '/login'
	}

	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/">Semina</Navbar.Brand>
				<Nav className="me-auto">
					<Navlink
						role={role}
						roles={accessCategories.read}
						action={() => navigate('/categories')}
					>
						Categories
					</Navlink>
					<Navlink
						role={role}
						roles={accessTalents.read}
						action={() => navigate('/talents')}
					>
						Talents
					</Navlink>
					<Navlink
						role={role}
						roles={accessPayments.read}
						action={() => navigate('/payments')}
					>
						Payments
					</Navlink>
					<Navlink
						role={role}
						roles={accessEvents.read}
						action={() => navigate("/events")}
					>
						Events
					</Navlink>
					<Navlink
						role={role}
						roles={accessParticipants.read}
						action={() => navigate("/participants")}
					>
						Participants
					</Navlink>
					<Navlink
						role={role}
						roles={accessOrders.read}
						action={() => navigate("/transactions")}
					>
						Transactions
					</Navlink>
				</Nav>
				<Nav className="justify-content-end">
					<Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	)
}

export { CustomNavbar };
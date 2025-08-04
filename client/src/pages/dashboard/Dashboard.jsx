import { Navigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomNavbar } from "../../components/Navbar";

const Dashboard = () => {
	const token = localStorage.getItem("token");
	if (!token) {
		return <Navigate to="/login" replace={true} />
	}

	return (
		<>
			<CustomNavbar />
			<Container className="mt-3">
				<CustomButton>Add</CustomButton>

				<Table className="mt-3 m-auto" striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Username</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<td>2</td>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan={2}>Larry the Bird</td>
							<td>@twitter</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		</>
	)
}

export { Dashboard };
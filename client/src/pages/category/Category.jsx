import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Container, Spinner, Table } from "react-bootstrap";
import { CustomAlert } from "../../components/Alert";
import { CustomButton } from "../../components/Button";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomNavbar } from "../../components/Navbar";
import { useEffect, useState } from "react";

const Category = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState({
		status: false,
		variant: "danger",
		message: ""
	})
	const token = localStorage.getItem("token");

	useEffect(() => {
		setLoading(true);
		const getCategories = async () => {
			try {
				const response = await axios.get("/api/categories", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})

				setLoading(false);
				setData(response.data.data);
			} catch (error) {
				setLoading(false);
				setAlert((prev) => {
					return {
						...prev,
						status: true,
						variant: "danger",
						message: error?.response?.data?.message
					}
				})
			}
		}

		if (token) {
			getCategories();
		}
	}, [token])

	if (!token) {
		return <Navigate to="/login" replace={true} />;
	}

	return (
		<>
			<CustomNavbar />
			<Container className="mt-3">
				<CustomBreadcrumb secondText="Categories" />
				{alert.status && (
					<CustomAlert
						className={"mt-5 mb-3 mx-auto w-100"}
						variant={alert.variant}
						message={alert.message}
					/>
				)}
				<CustomButton action={() => navigate('/categories/create')}>Add</CustomButton>

				<Table
					className="mt-3 m-auto"
					striped
					bordered
					hover
					variant="dark">
					<thead>
						<tr>
							<th>Number</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={2} style={{ textAlign: "center" }}>
									<div className="d-flex justify-content-center align-items-center">
										<Spinner variant="light" />
									</div>
								</td>
							</tr>
						) : (
							data.map((item, index) => (
								<tr key={item._id}>
									<td>{index + 1}</td>
									<td>{item.name}</td>
								</tr>
							))
						)}
					</tbody>
				</Table>
			</Container>
		</>
	)
}

export { Category };
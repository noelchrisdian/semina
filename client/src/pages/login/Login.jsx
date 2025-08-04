import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { CustomAlert } from "../../components/Alert";
import { LoginForm } from "./Form";

const Login = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
	})

	const [alert, setAlert] = useState({
		status: false,
		message: "",
		variant: "danger",
	})

	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		setLoading(true);
		const { email, password } = form;
		try {
			const response = await axios.post("/api/auth/signin", {
				email,
				password,
			})

			localStorage.setItem('token', response.data.data.token);
			setLoading(false);
			navigate("/");
		} catch (error) {
			setLoading(false);
			setAlert({
				status: true,
				message:
					error?.response?.data?.message ||
					"Something went wrong, please try again later",
				variant: "danger",
			})
		}
	}

	const token = localStorage.getItem("token");
	if (token) {
		return <Navigate to="/" replace={true} />;
	}

	return (
		<Container md={12}>
			{alert.status && (
				<CustomAlert
					className="mt-5 mb-3 mx-auto"
					variant={alert.variant}
					message={alert.message}
				/>
			)}
			<Card style={{ width: "50%" }} className="m-auto mt-5">
				<Card.Title className="text-center my-3 fs-4">Login</Card.Title>
				<Card.Body>
					<LoginForm
						form={form}
						loading={loading}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</Card.Body>
			</Card>
		</Container>
	)
}

export { Login };
import { Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomAlert } from "../../components/Alert";
import { login } from "../../redux/auth/action";
import { LoginForm } from "./Form";
import { postData } from "../../utils/fetch";

const Login = () => {
	const dispatch = useDispatch();
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
		const response = await postData("/auth/signin", { email, password });
		if (response?.data?.data) {
			dispatch(login(
				response.data.data.token,
				response.data.data.refreshToken,
				response.data.data.role
			))
			setLoading(false);
			navigate("/");
		}

		setLoading(false);
		setAlert({
			status: true,
			variant: "danger",
			message: response?.response?.data?.message || "Something went wrong, please try again later"
		})
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
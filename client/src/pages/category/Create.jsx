import axios from "axios";
import { CategoryForm } from "./Form";
import { Container } from "react-bootstrap";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomNavbar } from "../../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateCategory = () => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: ""
	})
	const [alert, setAlert] = useState({
		status: false,
		variant: "",
		message: ""
	})
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const handleSubmit = async () => {
		setLoading(true);

		try {
			await axios.post("/api/categories", form, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			navigate("/categories");
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
			setAlert({
				...alert,
				status: true,
				variant: "danger",
				message: error?.response?.data?.message
			})
		}
    }
    
    if (!token) {
		return <Navigate to="/login" replace={true} />;
	}

	return (
		<>
			<CustomNavbar />
			<Container>
				<CustomBreadcrumb
					secondText={"Categories"}
					secondURL={"/categories"}
					thirdText={"Create"}
				/>
				{alert.status && (
					<CustomAlert
						className={"mt-5 mb-3 mx-auto w-100"}
						variant={alert.variant}
						message={alert.message}
					/>
				)}

				<CategoryForm
					form={form}
					loading={loading}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			</Container>
		</>
	)
}

export { CreateCategory }
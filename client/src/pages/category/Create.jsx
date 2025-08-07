import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CategoryForm } from "./Form";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";

const CreateCategory = () => {
	const dispatch = useDispatch();
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
			const response = await postData('/categories', form);
			dispatch(setNotif(
				true,
				'success',
				`Successfully added ${response.data.data.name} category`
			))
			navigate("/categories");
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setAlert({
				...alert,
				status: true,
				variant: "danger",
				message: error?.response?.data?.message
			})
		}
    }

	return (
		<Container>
			<CustomBreadcrumb
				secondText={"Categories"}
				secondURL={"/categories"}
				thirdText={"Add"}
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
	)
}

export { CreateCategory }
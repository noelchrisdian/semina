import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CategoryForm } from "./Form";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { getData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";

const EditCategory = () => {
	const { categoryID } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	useEffect(() => {
		const getCategory = async () => {
			const response = await getData(`/categories/${categoryID}`);
			setForm((prev) => {
				return {
					...prev,
					name: response.data.data.name
				}
			})
		}

		getCategory();
	}, [categoryID])

	const handleSubmit = async () => {
		setLoading(true);
		const response = await putData(`/categories/${categoryID}`, form);
		if (response?.data?.data) {
			dispatch(setNotif(
				true,
				'success',
				`Successfully updated ${response.data.data.name} category`
			))
			navigate("/categories");
			setLoading(false);
		}

		setLoading(false);
		setAlert((alert) => {
			return {
				...alert,
				status: true,
				variant: "danger",
				message: response?.response?.data?.message
			}
		})
    }

	return (
		<Container>
			<CustomBreadcrumb
				secondText={"Categories"}
				secondURL={"/categories"}
				thirdText={"Edit"}
			/>
			{alert.status && (
				<CustomAlert
					className={"mt-5 mb-3 mx-auto w-100"}
					variant={alert.variant}
					message={alert.message}
				/>
			)}
			<CategoryForm
				edit
				form={form}
				loading={loading}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</Container>
	)
}

export { EditCategory }
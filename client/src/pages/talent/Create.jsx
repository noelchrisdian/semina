import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CustomAlert } from "../../components/Alert";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/action";
import { TalentForm } from "./Form";

const CreateTalent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		role: "",
		file: "",
		avatar: ""
	})
	const [alert, setAlert] = useState({
		status: false,
		variant: "",
		message: ""
	})
	const [loading, setLoading] = useState(false);

	const uploadImage = async (file) => {
		const formData = new FormData();
		formData.append("photo", file);

		return await postData("images", formData, true);
	}

	const handleChange = async (e) => {
		if (e.target.name === "avatar") {
			if (["image/jpg", "image/png", "image/jpeg"].includes(e?.target?.files[0]?.type)) {
				const size = parseFloat(e.target.files[0].size / 3_145_728).toFixed(2)

				if (size > 3) {
                    setAlert({
                        ...alert,
						status: true,
						variant: "danger",
						message: `Image size is ${size} MB, max allowed is 2 MB`,
					})

					setForm({
						...form,
						file: "",
						[e.target.name]: ""
					})
				} else {
                    const response = await uploadImage(e.target.files[0]);
					setForm({
						...form,
						file: response.data.data._id,
						[e.target.name]: response.data.data.name
					})
				}
			} else {
                setAlert({
                    ...alert,
					status: true,
					variant: "danger",
					message: "File type is not supported"
				})

				setForm({
					...form,
					file: ""
				})
			}
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
	}

	const handleSubmit = async () => {
		setLoading(true);
		const payload = {
			name: form.name,
			role: form.role,
			image: form.file,
		}
		const response = await postData("/talents", payload);
		if (response?.data?.data) {
			dispatch(setNotif(
                true,
                'success',
                `Successfully added ${response.data.data.name} as talent`
            ))
            setLoading(false);
            navigate('/talents');
		}

		setLoading(false);
		setAlert({
			...alert,
			status: true,
			variant: "danger",
			message: response?.response?.data.message,
		})
	}

	return (
		<Container>
			<CustomBreadcrumb
				secondText={"Talents"}
				secondURL={"/talents"}
				thirdText={"Add"}
			/>
			{alert.status && (
				<CustomAlert
					className={"mt-5 mb-3 mx-auto w-100"}
					variant={alert.variant}
					message={alert.message}
				/>
			)}

			<TalentForm
				form={form}
				loading={loading}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</Container>
	)
}

export { CreateTalent };
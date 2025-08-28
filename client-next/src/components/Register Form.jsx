import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "./Button";
import { postData, putData } from "../utils/fetch";
import { TextInput } from "./Text Input";

const RegisterForm = () => {
	const router = useRouter();
	const { keyword } = router.query;
	const [OTP, setOTP] = useState("");
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "",
	})

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		if (keyword === "otp") {
			const response = await putData(
				`${process.env.NEXT_PUBLIC_API_URL}/participants/active`,
				{
					otp: OTP,
					email: form.email,
				}
			)
			if (response?.data) {
				toast.success("Account activated", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				})

				router.push("/signin");
				return;
			}
		}

		const response = await postData(
			`${process.env.NEXT_PUBLIC_API_URL}/participants/signup`,
			form
		)
		if (response?.data) {
			toast.success("Register successful, please enter the OTP code", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}

		router.push({ pathname: "/signup", query: { keyword: "otp" } });
	}

	return (
		<form action="" className="form-login d-flex flex-column mt-4 mt-md-0">
			{keyword === "otp" ? (
				<TextInput
					label={"OTP"}
					name={"otp"}
					placeholder={"Enter OTP code here"}
					type={"text"}
					value={OTP}
					onChange={(e) => setOTP(e.target.value)}
				/>
			) : (
				<>
					<TextInput
						label={"First Name"}
						name={"firstName"}
						placeholder={"Enter your first name"}
						type={"text"}
						value={form.firstName}
						onChange={handleChange}
					/>
					<TextInput
						label={"Last Name"}
						name={"lastName"}
						placeholder={"Enter your last name"}
						type={"text"}
						value={form.lastName}
						onChange={handleChange}
					/>
					<TextInput
						label={"Email"}
						name={"email"}
						placeholder={"Enter your email"}
						type={"email"}
						value={form.email}
						onChange={handleChange}
					/>
					<TextInput
						label={"Password"}
						name={"password"}
						placeholder={"Enter your password"}
						type={"password"}
						value={form.password}
						onChange={handleChange}
					/>
					<TextInput
						label={"Role"}
						name={"role"}
						placeholder={"ex: Product Designer"}
						type={"text"}
						value={form.role}
						onChange={handleChange}
					/>
				</>
			)}

			<div className="d-grid mt-2">
				<Button action={() => handleSubmit()} variant={"btn-green"}>
					{keyword === "code" ? "Verification" : "Sign Up"}
				</Button>
			</div>
		</form>
	)
}

export { RegisterForm };
import { Form } from "react-bootstrap";
import { CustomButton } from "../../components/Button";
import { CustomInputLabel } from "../../components/Input";

const LoginForm = ({ form, loading, handleChange, handleSubmit }) => {
    return (
			<Form>
				<CustomInputLabel
					label="Email address"
					name="email"
					value={form.email}
					type="email"
					onChange={handleChange}
					placeholder="Enter your email"
				/>

				<CustomInputLabel
					label="Password"
					name="password"
					value={form.password}
					type="email"
					onChange={handleChange}
					placeholder="Enter your password"
				/>
				<CustomButton
					loading={loading}
					disabled={loading}
					action={handleSubmit}
					variant="secondary">
					Submit
				</CustomButton>
			</Form>
		)
}

export { LoginForm };
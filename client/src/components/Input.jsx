import { Form } from "react-bootstrap";

const CustomInput = ({
    name,
    value,
    type,
    onChange,
    placeholder
}) => {
    return (
        <Form.Control
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

const CustomInputLabel = ({
    label,
    name,
    value,
    type,
    onChange,
    placeholder
}) => {
    return (
			<Form.Group className="mb-3">
				<Form.Label>{label}</Form.Label>
				<CustomInput
					name={name}
					value={value}
					type={type}
					placeholder={placeholder}
					onChange={onChange}
				/>
			</Form.Group>
		)
}

export { CustomInput, CustomInputLabel };
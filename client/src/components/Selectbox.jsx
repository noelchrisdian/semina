import Select from 'react-select';
import { Form } from "react-bootstrap";

const Selectbox = ({
    name,
    clearable,
    label,
    options,
    placeholder,
    value,
    handleChange
}) => {
    return (
        <Form.Group>
            {label && (<Form.Label>{label}</Form.Label>)}
            <Select
                name={name}
                placeholder={placeholder}
                options={options}
                value={value}
                isClearable={clearable}
                onChange={handleChange}
            />
        </Form.Group>
    )
}

export { Selectbox };
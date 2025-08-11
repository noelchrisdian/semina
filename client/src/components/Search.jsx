import { Form } from "react-bootstrap";

const Search = ({ disabled, query, handleChange }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Control
                disabled={disabled}
                type="text"
                placeholder="Please enter the keyword here"
                value={query}
                name="query"
                onChange={handleChange}
            />
        </Form.Group>
    )
}

export { Search };
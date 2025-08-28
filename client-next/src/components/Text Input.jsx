const TextInput = ({
    label,
    name,
    placeholder,
    type,
    value,
    onChange
}) => {
    return (
        <div className="d-flex flex-column align-items-start">
            <label className="form-label">{label}</label>
            <input
                className="form-control"
                name={name}
                placeholder={placeholder}
                value={value}
                type={type}
                onChange={onChange}
            />
        </div>
    )
}

export { TextInput };
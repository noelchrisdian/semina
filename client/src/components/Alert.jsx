import { Alert } from "react-bootstrap";

const CustomAlert = ({ className, variant, message }) => {
    return <Alert
        className={className}
        variant={variant}
        style={{width: '50%'}}
    >{message}</Alert>;
}

export { CustomAlert };
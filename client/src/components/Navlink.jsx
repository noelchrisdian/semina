import { Nav } from "react-bootstrap";

const Navlink = ({ action, children }) => {
    return <Nav.Link onClick={action}>{children}</Nav.Link>
}

export { Navlink };
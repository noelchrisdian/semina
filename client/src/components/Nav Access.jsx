import { Nav } from "react-bootstrap";

const Navlink = ({ action, children, roles, role }) => {
	const access = roles.indexOf(role);
	return <>{access >= 0 && <Nav.Link onClick={action}>{children}</Nav.Link>}</>;
}

export { Navlink };
import { Container } from "react-bootstrap";
import { CustomBreadcrumb } from "../../components/Breadcrumb";

const Dashboard = () => {
	return (
		<Container className="mt-3">
			<CustomBreadcrumb />
			<h1>Dashboard</h1>
		</Container>
	)
}

export { Dashboard };
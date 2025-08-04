import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomBreadcrumb = ({ secondText, secondURL, thirdText }) => {
	const navigate = useNavigate();

	return (
		<Breadcrumb className="my-2">
			<Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
			{!thirdText && <Breadcrumb.Item active>{secondText}</Breadcrumb.Item>}
			{thirdText && (
				<Breadcrumb.Item onClick={() => navigate(secondURL)}>
					{secondText}
				</Breadcrumb.Item>
			)}
			{thirdText && <Breadcrumb.Item active>{thirdText}</Breadcrumb.Item>}
		</Breadcrumb>
	)
}

export { CustomBreadcrumb };
import moment from "moment";
import { Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "./Button";

const TableBody = ({
	actionNotDisplay,
	customAction,
	data,
	display,
	deleteAction,
	editURL,
	status,
}) => {
	const navigate = useNavigate();
	return (
		<tbody>
			{status === "process" ? (
				<tr>
					<td colSpan={display.length + 1} style={{ textAlign: "center" }}>
						<div className="flex items-center justify-center">
							<Spinner animation="border" variant="primary" />
						</div>
					</td>
				</tr>
			) : data.length ? (
				data.map((data, index) => {
					return (
						<tr key={index}>
							{Object.keys(data).map(
								(key) =>
									display.includes(key) && (
										<td key={key}>
											{key === "avatar" ? (
												<Image
													height={40}
													width={40}
													roundedCircle
													src={`/api/${data[key]}`}
												/>
											) : key === "date" ? (
												moment(data[key]).format(
													"DD-MM-YYYY, h:mm:ss a"
												)
											) : (
												data[key]
											)}
										</td>
									)
							)}
							{!actionNotDisplay && (
								<td>
									{customAction?.(data._id, data.statusEvent)}
									{editURL && (
										<CustomButton
											variant="success"
											size={"sm"}
											action={() =>
												navigate(`${editURL}/${data._id}`)
											}>
											Edit
										</CustomButton>
									)}
									{deleteAction && (
										<CustomButton
											className={"mx-2"}
											variant="danger"
											size={"sm"}
											action={() => deleteAction(data._id)}>
											Hapus
										</CustomButton>
									)}
								</td>
							)}
						</tr>
					)
				})
			) : (
				<tr>
					<td colSpan={display.length + 1} style={{ textAlign: "center" }}>
						Tidak Ditemukan Data
					</td>
				</tr>
			)}
		</tbody>
	)
}

export { TableBody };
import { Table } from "react-bootstrap";
import { TableBody } from "./Table Body";
import { TableHeader } from "./Table Header";

const CustomTable = ({
    actionNotDisplay,
    data, 
    thead,
    tbody,
    editURL,
    deleteAction,
    customAction,
    status
}) => {
    return (
        <Table striped bordered hover>
            <TableHeader text={thead} />
            <TableBody
                status={status}
                data={data}
                display={tbody}
                editURL={editURL}
                deleteAction={deleteAction}
                actionNotDisplay={actionNotDisplay}
                customAction={customAction}
            />
        </Table>
    )
}

export { CustomTable };
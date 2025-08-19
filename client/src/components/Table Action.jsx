import { Pagination, Table } from "react-bootstrap";
import { CustomPagination } from "./Pagination";
import { TableBody } from "./Table Body";
import { TableHeader } from "./Table Header";
import { CustomTable } from "./Table";

const CustomTableAction = ({
    actionNotDisplay,
    customAction,
    data,
    deleteAction,
    editURL,
    handlePageClick,
    pages,
    status,
    tbody, 
    thead,
    withoutPagination
}) => {
    return (
        <>
            <Table striped bordered hover>
                <TableHeader text={thead} />
                <TableBody
                    actionNotDisplay={actionNotDisplay}
                    customAction={customAction}
                    data={data}
                    deleteAction={deleteAction}
                    display={tbody}
                    editURL={editURL}
                    status={status}
                />
            </Table>
            {!withoutPagination && data.length ? (
                <CustomPagination
                    pages={pages}
                    handlePageClick={handlePageClick}
                />
            ) : ('')}
        </>
    )
}

export { CustomTableAction };
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CustomBreadcrumb } from "../../components/Breadcrumb";
import { CustomTableAction } from "../../components/Table Action";
import { fetchListsEvents } from "../../redux/lists/action";
import { fetchOrders, setDate, setPage } from "../../redux/orders/action";
import { formatDate } from "../../utils/format date";
import { InputDate } from "../../components/Input Date";
import { Search } from "../../components/Search";

const Order = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders)
    const [showed, setShowed] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch, orders.page, orders.date])

    useEffect(() => {
        dispatch(fetchListsEvents());
    }, [dispatch])

    const displayDate = `${orders.date?.startDate ? formatDate(orders.date?.startDate) : ""}${orders.date?.endDate ? ` - ${formatDate(orders.date.endDate)}` : ""}`;

    return (
        <Container className="mt-3">
            <CustomBreadcrumb
                secondText={'Orders'}
            />

            <Row>
                <Col className="cursor-pointer position-relative" onClick={() => setShowed(true)}>
                    <Search disabled query={displayDate} />
                    {showed ? (
                        <InputDate
                            date={orders.date}
                            setShowed={() => setShowed(!showed)}
                            onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
                        />
                    ) : ('')}
                </Col>
                <Col />
                <Col />
            </Row>

            <CustomTableAction
                status={orders.status}
                thead={['Name', 'Email', 'Title', 'Event Date', 'Order Date', 'Venue']}
                data={orders.data}
                tbody={['name', 'email', 'title', 'date', 'orderDate', 'venueName']}
                pages={Math.ceil(orders.pages) || 1}
                actionNotDisplay
                handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
            />
        </Container>
    )
}

export { Order };
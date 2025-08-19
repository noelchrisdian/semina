import { Routes, Route } from "react-router-dom";
import { Order } from "../pages/order/Order";

const OrderRouter = () => {
    return (
        <Routes>
            <Route index element={<Order />} />
        </Routes>
    )
}

export { OrderRouter };
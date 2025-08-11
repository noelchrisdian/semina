import { Routes, Route } from "react-router-dom";
import { CreatePayment } from "../pages/payment/Create";
import { EditPayment } from "../pages/payment/Edit";
import { Payment } from "../pages/payment/Payment";

const PaymentRouter = () => {
    return (
        <Routes>
            <Route index element={<Payment />} />
            <Route path="create" element={<CreatePayment />} />
            <Route path="edit/:paymentID" element={<EditPayment />} />
        </Routes>
    )
}

export { PaymentRouter };
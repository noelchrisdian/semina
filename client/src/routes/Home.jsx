import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";

const HomeRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
} 

export { HomeRouter };
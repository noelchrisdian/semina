import { Navigate, Routes, Route } from "react-router-dom";
import { CategoryRouter } from "./Category";
import { CustomNavbar } from "../components/Navbar";
import { GuestRoute, PrivateRoute } from "../components/Guard";
import { HomeRouter } from "./Home";
import { Login } from "../pages/login/Login";
import { PaymentRouter } from "./Payment";
import { TalentRouter } from "./Talent";

const AppRouter = () => {
	return (
		<Routes>
			<Route
				path="login"
				element={
					<GuestRoute>
					    <Login />
					</GuestRoute>
				}
			/>
			<Route
				path="/"
				element={
					<>
						<CustomNavbar />
						<PrivateRoute />
					</>
				}>
				<Route path="dashboard/*" element={<HomeRouter />} />
				<Route path="categories/*" element={<CategoryRouter />} />
				<Route path="talents/*" element={<TalentRouter />} />
				<Route path="payments/*" element={<PaymentRouter />} />
				<Route
					path=""
					element={<Navigate to={"/dashboard"} replace={true} />}
				/>
			</Route>
		</Routes>
	)
}

export { AppRouter };
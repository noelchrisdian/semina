import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Category } from "./pages/category/Category";
import { CreateCategory } from "./pages/category/Create";
import { EditCategory } from "./pages/category/Edit";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/login/Login";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="/" element={<Dashboard />} />
				<Route path="categories" element={<Category />} />
				<Route path="categories/create" element={<CreateCategory />} />
				<Route path="categories/edit" element={<EditCategory />} />
			</Routes>
		</BrowserRouter>
	)
}

export { App };
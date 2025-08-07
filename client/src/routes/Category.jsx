import { Route, Routes } from "react-router-dom";
import { Category } from "../pages/category/Category";
import { CreateCategory } from "../pages/category/Create";
import { EditCategory } from "../pages/category/Edit";

const CategoryRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Category />} /> 
            <Route path="create" element={<CreateCategory />} /> 
            <Route path="edit/:categoryID" element={<EditCategory />} /> 
        </Routes>
    )
}

export { CategoryRouter };
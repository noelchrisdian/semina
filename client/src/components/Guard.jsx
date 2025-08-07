import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to={'/login'} replace={true} />;
    }

    return children || <Outlet />;
}

const GuestRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    if (token) {
        return <Navigate to={'/'} replace={true} />
    }

    return children || <Outlet />;
}

export { GuestRoute, PrivateRoute };
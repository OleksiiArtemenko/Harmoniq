import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const loginStatus = useSelector((state: any) => state.loginStatus);
    return loginStatus ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
    // render child route elements if user is logged in
    return (currentUser ? <Outlet /> : <Navigate to='/sign-in'/>);
}

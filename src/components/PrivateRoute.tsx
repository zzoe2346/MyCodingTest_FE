import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.tsx";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;

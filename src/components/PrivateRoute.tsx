import React from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from "../context/AuthContext.tsx";

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children}) => {
    const {isLoggedIn, loading} = UserAuth();

    if (loading) {
        console.log('로딩중');
        return <div>Loading...</div>; // 로딩 중일 때 Loading 화면 표시
    }

    if (isLoggedIn) {
        console.log('로그인됨');
        return children; // 로그인 되었을 때 children 렌더링
    } else {
        console.log('로그인안됨');
        return <Navigate to="/login" />; // 로그인 안되었을 때 /login으로 리디렉션
    }
};

export default PrivateRoute;

import React, { useEffect } from 'react';
import { protectedRoutesState } from '../recoil/createUser.recoil';
import { useRecoilState } from 'recoil';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [userAuthenticated, setUserAuthenticated] = useRecoilState(protectedRoutesState);

    useEffect(() => {
      const username = localStorage.getItem('username');
      if (username) setUserAuthenticated(true);
    }, [setUserAuthenticated]);

    if (!userAuthenticated) {
        return <Navigate to='/auth/signin' />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;

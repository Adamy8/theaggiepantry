import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) return <div className="p-8 text-center">Loading…</div>;

    if (!isAuthenticated) {
        // 记录当前路径，登录后回到这里
        loginWithRedirect({ appState: { returnTo: window.location.pathname } });
        return null;
    }

    return children;
};

export default ProtectedRoute;

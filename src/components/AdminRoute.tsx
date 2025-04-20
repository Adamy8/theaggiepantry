import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

type JWTClaims = { scope?: string };

const AdminRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [authorized, setAuthorized] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        if (!isAuthenticated || !getAccessTokenSilently) return;
        (async () => {
            try {
                const token = await getAccessTokenSilently();
                const { scope } = jwtDecode<JWTClaims>(token);
                const scopes = scope?.split(' ') || [];
                setAuthorized(scopes.includes('role:staff'));
            } catch {
                setAuthorized(false);
            }
        })();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading || authorized === null) {
        return <div className="p-8 text-center">Loading…</div>;
    }

    if (!isAuthenticated) {
        loginWithRedirect({ appState: { returnTo: window.location.pathname } });
        return null;
    }

    if (!authorized) {
        navigate('/', { replace: true });
        return null;
    }

    return children;
};

export default AdminRoute;

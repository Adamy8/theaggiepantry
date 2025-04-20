import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const domain   = 'dev-gxwsdjoxum7ey1bl.us.auth0.com';
const clientId = 'gDYxS4ZdkSUFUpa8NTjXqliXRxiCaw2Z';
const audience = 'https://titmouse-crisp-explicitly.ngrok-free.app';

const Auth0ProviderWithNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: { returnTo?: string }) => {
        navigate(appState?.returnTo || window.location.pathname, { replace: true });
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience,
                scope: 'openid profile email role:staff'
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;

import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Auth0ProviderWithNavigate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const onRedirectCallback = (appState?: { returnTo?: string }) => {
        // 如果 loginWithRedirect 时带了 returnTo，就跳回去；否则回到当前路径
        navigate(appState?.returnTo || window.location.pathname, { replace: true });
    };

    return (
        <Auth0Provider
            domain="dev-gxwsdjoxum7ey1bl.us.auth0.com"
            clientId="gDYxS4ZdkSUFUpa8NTjXqliXRxiCaw2Z"
            authorizationParams={{ redirect_uri: window.location.origin }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithNavigate;

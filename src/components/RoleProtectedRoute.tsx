import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 受角色保护的路由包装器
 * @param requiredRoles 允许访问的角色列表
 */
const RoleProtectedRoute: React.FC<{
    requiredRoles: string[];
    children: React.ReactElement;
}> = ({ requiredRoles, children }) => {
    const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();
    const location = useLocation();

    // 仍在加载 Auth0 状态
    if (isLoading) return <div className="p-8 text-center">Loading…</div>;

    //  未登录：跳转 Auth0 登录，回到当前地址
    if (!isAuthenticated) {
        loginWithRedirect({ appState: { returnTo: location.pathname } });
        return null;
    }

    // 已登录：取出角色 claim（根据你的 Auth0 规则）
    const roles: string[] =
        // ↘ 把下面的命名空间改成你在 Auth0 规则 / 动作里设置的自定义 claim
        (user && (user['https://ucdavis.example.com/roles'] as string[])) || [];

    const hasRole = roles.some((r) => requiredRoles.includes(r));

    // 没有所需角色 → 重定向
    if (!hasRole) {
        return <Navigate to="/" replace />;
    }

    //  一切满足，渲染子元素
    return children;
};

export default RoleProtectedRoute;

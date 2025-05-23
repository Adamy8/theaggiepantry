import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { LogOut, ChevronLeft, TimerReset } from 'lucide-react';
import {useAuth0} from "@auth0/auth0-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeSection, setActiveSection } = useAppContext();
  const { logout } = useAuth0();
  
  const isAdminPage = location.pathname.includes('/admin');
  const isRootPage = location.pathname === '/';
  const isHistryPage = location.pathname.includes('/history');
  
  const handleSectionChange = (section: 'pantry' | 'freedge') => {
    setActiveSection(section);
    
    if (location.pathname.includes('/shopper')) {
      navigate(`/shopper/${section}`);
    }
  };
  
  const handleBack = () => {
    if (isAdminPage) {
      navigate('/');
    } else if (location.pathname.includes('/shopper')) {
      navigate('/');
    }
  };

  const handleHistory = () => {
      navigate('/history');
  };
  
  const handleLogout = () => {
    // 清理 Auth0 会话并返回首页
    logout({ logoutParams: { returnTo: window.location.origin } });
    // 如果你想同时重置本地状态，也可以：
    setActiveSection(null as never);   // 视需求可选
  };
  
  if (isRootPage) {
    return null;
  }

  return (
    <header className="bg-[#f7864d] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {!isRootPage && (
            <button 
              onClick={handleBack} 
              className="flex items-center mr-6"
            >
              <ChevronLeft size={24} />
              <span className="ml-1">Back</span>
            </button>
          )}
          <div className="flex items-center space-x-8">
            <h1 className="text-xl text-white font-medium">The Aggie Pantry</h1>
            {!isRootPage && (
              <div className="flex space-x-4">
                <button
                  className={`py-1 px-3 rounded transition-all ${
                    activeSection === 'pantry'
                      ? 'bg-white/10 text-primary font-medium'
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => handleSectionChange('pantry')}
                >
                  Pantry
                </button>
                <button
                  className={`py-1 px-3 rounded transition-all ${
                    activeSection === 'freedge'
                      ? 'bg-white/10 text-primary font-medium'
                      : 'text-white hover:bg-white/10'
                  }`}
                  onClick={() => handleSectionChange('freedge')}
                >
                  Freedge
                </button>
              </div>
            )}
          </div>
        </div>
        
        {!isHistryPage && (
          <button
            onClick={handleHistory}
            className="flex items-center text-white hover:text-secondary transition-colors"
          >
            <span className="mr-2">Your History</span>
            <TimerReset size={18} />
          </button>
        )}

        {!isRootPage && (
          <button
            onClick={handleLogout}
            className="flex items-center text-white hover:text-secondary transition-colors"
          >
            <span className="mr-2">Logout</span>
            <LogOut size={18} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
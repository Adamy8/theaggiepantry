import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  BarChart3, 
  Users,
  Settings
} from 'lucide-react';
import Logo from './Logo';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard size={20} />
    },
    {
      path: '/admin/inventory',
      name: 'Inventory',
      icon: <Package size={20} />
    },
    {
      path: '/admin/suppliers',
      name: 'Suppliers',
      icon: <Truck size={20} />
    },
    {
      path: '/admin/distribution',
      name: 'Distribution',
      icon: <BarChart3 size={20} />
    },
    {
      path: '/admin/volunteers',
      name: 'Volunteers',
      icon: <Users size={20} />
    }
  ];
  
  return (
    <div className="w-64 bg-white h-screen fixed left-0 shadow-md flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <Logo size="small" />
      </div>
      
      <nav className="flex-1 pt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                className={`w-full text-left px-6 py-3 flex items-center space-x-3 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white font-medium'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-neutral-200">
        <button
          className="w-full text-left px-4 py-2 flex items-center space-x-3 text-neutral-600 hover:text-neutral-900 transition-colors"
          onClick={() => navigate('/')}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
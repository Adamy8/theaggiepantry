import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, LayoutDashboard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Logo from '../components/Logo';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveSection } = useAppContext();
  
  const handleShopperClick = (section: 'pantry' | 'freedge') => {
    setActiveSection(section);
    navigate(`/shopper/${section}`);
  };
  
  const handleAdminClick = () => {
    navigate('/admin/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
          </div>
          
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            UC Davis Food Resources
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Providing access to food for all UC Davis students through The Pantry and Freedge initiatives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-primary flex items-center justify-center">
              <UserCircle size={80} className="text-white" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-neutral-900">
                I'm a Shopper
              </h2>
              <p className="text-neutral-600 mb-6">
                Browse available food items from The Pantry and Freedge
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleShopperClick('pantry')}
                  className="btn btn-primary py-3 px-6"
                >
                  Pantry
                </button>
                <button
                  onClick={() => handleShopperClick('freedge')}
                  className="btn btn-secondary py-3 px-6"
                >
                  Freedge
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-neutral-800 flex items-center justify-center">
              <LayoutDashboard size={80} className="text-white" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-neutral-900">
                I'm an Admin
              </h2>
              <p className="text-neutral-600 mb-6">
                Manage inventory, track distribution, and coordinate volunteers
              </p>
              <button
                onClick={handleAdminClick}
                className="btn btn-accent w-full py-3 px-6"
              >
                Access Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-white border-t border-neutral-200">
        <div className="container mx-auto text-center">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} UC Davis Food Resources | The Pantry and Freedge
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
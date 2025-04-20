import React from 'react';
import { UserCircle, LayoutDashboard } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import Logo from '../components/Logo';
import Header from '../components/Header';
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage: React.FC = () => {
  const { setActiveSection } = useAppContext();
  const { loginWithRedirect } = useAuth0();

  const handleShopperClick = (section: 'pantry' | 'freedge') => {
    setActiveSection(section);
    loginWithRedirect({
      appState: { returnTo: `/shopper/${section}` },
    });
  };
  
  const handleAdminClick = () => {
    loginWithRedirect({
      appState: { returnTo: `/admin/dashboard` },
    });
  };
  
  return (
    <div className="min-h-screen bg-[#FDEED8] flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="large" />
            
          </div>
          <div>
      </div>
          
          {/* <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            UC Davis AggiePantry
          </h1> */}
          {/* <p className="text-l text-neutral-600 max-w-2xl mx-auto">
            Providing access to food for all UC Davis students through The Pantry
          </p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-[#FDEED8] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-[#658147] flex items-center justify-center">
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
                  className="btn btn-primary py-3 px-6 bg-[#EC7F47]] hover:bg-[#9b7262]"
                >
                  Pantry
                </button>
                <button
                  onClick={() => handleShopperClick('freedge')}
                  className="btn btn-primary py-3 px-6 bg-[#EC7F47] hover:bg-[#a95c35]"
                >
                  Freedge
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-[#FDEED8] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-[#658147] flex items-center justify-center">
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
                className="btn btn-accent w-full py-3 px-6 bg-[#EC7F47] hover:bg-[#9b7262]"
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
            &copy; {new Date().getFullYear()} UC Davis AggiePantry | The Pantry and Freedge
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
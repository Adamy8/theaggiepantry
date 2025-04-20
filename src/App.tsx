import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopperPage from './pages/ShopperPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryPage from './pages/admin/InventoryPage';
import SupplierPage from './pages/admin/SupplierPage';
import DistributionPage from './pages/admin/DistributionPage';
import VolunteerPage from './pages/admin/VolunteerPage';
import CheckoutPage from './pages/admin/CheckOut';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shopper/:section" element={<ShopperPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/inventory" element={<InventoryPage />} />
          <Route path="/admin/suppliers" element={<SupplierPage />} />
          <Route path="/admin/distribution" element={<DistributionPage />} />
          <Route path="/admin/volunteers" element={<VolunteerPage />} />
          <Route path="/admin/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
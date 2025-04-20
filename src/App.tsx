import { Routes, Route } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shopper/:section" element={<ProtectedRoute> <ShopperPage /> </ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
          <Route path="/admin/inventory" element={<AdminRoute> <InventoryPage /> </AdminRoute>} />
          <Route path="/admin/suppliers" element={<AdminRoute> <SupplierPage /> </AdminRoute>} />
          <Route path="/admin/distribution" element={<AdminRoute> <DistributionPage /> </AdminRoute>} />
          <Route path="/admin/volunteers" element={<AdminRoute> <VolunteerPage /> </AdminRoute>} />
          <Route path="/admin/checkout" element={<AdminRoute> <CheckoutPage /> </AdminRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
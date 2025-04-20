import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopperPage from './pages/ShopperPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import InventoryPage from './pages/admin/InventoryPage';
import SupplierPage from './pages/admin/SupplierPage';
import DistributionPage from './pages/admin/DistributionPage';
import VolunteerPage from './pages/admin/VolunteerPage';
import { AppProvider } from './context/AppContext';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';  // ← 新增

function App() {
  return (
      <AppProvider>
        {/* Router 已经在 main.tsx 里，去掉这里的 <Router> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* 购物者页面 */}
          <Route
              path="/shopper/:section"
              element={
                <ProtectedRoute>
                  <ShopperPage />
                </ProtectedRoute>
              }
          />

          {/* 管理后台页面 */}
          <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
          />
          <Route
              path="/admin/inventory"
              element={
                <ProtectedRoute>
                  <InventoryPage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/admin/suppliers"
              element={
                <ProtectedRoute>
                  <SupplierPage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/admin/distribution"
              element={
                <ProtectedRoute>
                  <DistributionPage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/admin/volunteers"
              element={
                <ProtectedRoute>
                  <VolunteerPage />
                </ProtectedRoute>
              }
          />
        </Routes>
      </AppProvider>
  );
}

export default App;
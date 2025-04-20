import React from 'react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  ShoppingBasket, 
  AlertCircle, 
  Package, 
  TrendingUp,
  Users,
  ShoppingCart,
  Truck,
  Leaf
} from 'lucide-react';
import { 
  inventorySummaryData, 
  categoryDistributionData, 
  distributionData, 
  popularProductsData 
} from '../../data/mockData';

const COLORS = ['#963e70', '#FFBF00', '#6a4781', '#00B5E2', '#EC7F47', '#658147'];

const AdminDashboard: React.FC = () => {
  const { products, volunteers, suppliers } = useAppContext();
  
  const availableProducts = products.filter(p => p.isAvailable && p.section === 'pantry');
  const lowStockProducts = products.filter(p => p.quantity <= 5 && p.quantity > 0 && p.section === 'pantry');
  const activeVolunteers = volunteers.filter(v => v.active);
  const pendingDeliveries = suppliers.filter(s => s.status === 'pending');
  
  const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className={`rounded-full p-3 mr-4 ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-neutral-600 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Dashboard</h1>
          <p className="text-neutral-600">Overview of Pantry statistics and activity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={<ShoppingBasket size={24} className="text-white" />} 
            title="Available Products" 
            value={availableProducts.length.toString()}
            color="bg-primary"
          />
          <StatCard 
            icon={<AlertCircle size={24} className="text-white" />} 
            title="Low Stock Items" 
            value={lowStockProducts.length.toString()}
            color="bg-primary-gold"
          />
          <StatCard 
            icon={<Users size={24} className="text-white" />} 
            title="Active Volunteers" 
            value={activeVolunteers.length.toString()}
            color="bg-accent-green"
          />
          <StatCard 
            icon={<Truck size={24} className="text-white" />} 
            title="Pending Deliveries" 
            value={pendingDeliveries.length.toString()}
            color="bg-accent-teal"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Inventory Summary</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventorySummaryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {inventorySummaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={distributionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="distributed" 
                    stroke="#658147" 
                    name="Items Distributed"
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="received" 
                    stroke="#EC7F47" 
                    name="Items Received" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Categories Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryDistributionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Items">
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={popularProductsData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" name="Items Distributed" fill="#658147" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
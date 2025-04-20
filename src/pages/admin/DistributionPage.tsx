import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  TrendingUp,
  BarChart as BarChartIcon,
  Filter,
  Download
} from 'lucide-react';
import { distributionData } from '../../data/mockData';
import { format, subDays } from 'date-fns';

// Extended distribution data with additional metrics
const extendedDistributionData = distributionData.map(item => ({
  ...item,
  difference: item.received - item.distributed
}));

// Calculate totals
const totals = extendedDistributionData.reduce(
  (acc, item) => {
    acc.distributed += item.distributed;
    acc.received += item.received;
    return acc;
  },
  { distributed: 0, received: 0 }
);

// Calculate averages
const averages = {
  distributed: Math.round(totals.distributed / extendedDistributionData.length),
  received: Math.round(totals.received / extendedDistributionData.length)
};

// Generate data for demographics
const demographicsData = [
  { name: 'Undergraduate', value: 65 },
  { name: 'Graduate', value: 25 },
  { name: 'Faculty/Staff', value: 10 }
];

// Generate data for distribution by day of week
const dayOfWeekData = [
  { name: 'Monday', value: 98 },
  { name: 'Tuesday', value: 85 },
  { name: 'Wednesday', value: 120 },
  { name: 'Thursday', value: 110 },
  { name: 'Friday', value: 95 },
  { name: 'Saturday', value: 50 },
  { name: 'Sunday', value: 40 }
];

const DistributionPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  // Filter data based on date range
  const getFilteredData = () => {
    const today = new Date();
    let daysToSubtract = 7;
    
    if (dateRange === '30d') daysToSubtract = 30;
    if (dateRange === '90d') daysToSubtract = 90;
    
    const startDate = subDays(today, daysToSubtract);
    return extendedDistributionData.slice(-daysToSubtract);
  };
  
  const filteredData = getFilteredData();
  
  // Stats cards
  const StatCard = ({ 
    title, 
    value, 
    change, 
    isPositive = true,
    icon
  }: { 
    title: string, 
    value: number, 
    change: number,
    isPositive?: boolean,
    icon: React.ReactNode
  }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-neutral-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`rounded-full p-3 ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center">
        {isPositive ? (
          <ArrowUpRight size={16} className="text-accent-green mr-1" />
        ) : (
          <ArrowDownRight size={16} className="text-accent-red mr-1" />
        )}
        <span className={isPositive ? 'text-accent-green' : 'text-accent-red'}>
          {change}% {isPositive ? 'increase' : 'decrease'}
        </span>
        <span className="text-neutral-500 text-sm ml-1">from last period</span>
      </div>
    </div>
  );
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-neutral-200 shadow-md rounded">
          <p className="font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Distribution Analytics</h1>
          <p className="text-neutral-600">Track product distribution and inventory flow</p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDateRange('7d')}
              className={`px-3 py-1 rounded-md ${
                dateRange === '7d' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-neutral-700 border border-neutral-300'
              }`}
            >
              7 days
            </button>
            <button
              onClick={() => setDateRange('30d')}
              className={`px-3 py-1 rounded-md ${
                dateRange === '30d' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-neutral-700 border border-neutral-300'
              }`}
            >
              30 days
            </button>
            <button
              onClick={() => setDateRange('90d')}
              className={`px-3 py-1 rounded-md ${
                dateRange === '90d' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-neutral-700 border border-neutral-300'
              }`}
            >
              90 days
            </button>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="p-2 pl-9 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Calendar 
                size={16} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-500" 
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-3 py-2 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <button className="flex items-center px-3 py-2 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Total Items Distributed" 
            value={totals.distributed}
            change={12}
            isPositive={true}
            icon={<TrendingUp size={24} className="text-accent-green" />}
          />
          <StatCard 
            title="Total Items Received" 
            value={totals.received}
            change={8}
            isPositive={true}
            icon={<BarChartIcon size={24} className="text-primary" />}
          />
          <StatCard 
            title="Daily Average Distribution" 
            value={averages.distributed}
            change={3}
            isPositive={false}
            icon={<TrendingUp size={24} className="text-accent-red" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Inventory Flow</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="distributed" 
                    stroke="#002855" 
                    name="Items Distributed"
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="received" 
                    stroke="#78BE20" 
                    name="Items Received" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Distribution by Day of Week</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dayOfWeekData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    name="Items Distributed" 
                    fill="#002855" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Net Inventory Change</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="difference" 
                    name="Net Change" 
                    fill="#00B5E2" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">User Demographics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={demographicsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="value" 
                    name="Percentage" 
                    fill="#FFBF00" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionPage;
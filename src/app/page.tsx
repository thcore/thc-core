'use client'
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  HomeIcon, 
  UserGroupIcon, 
  DocumentIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  LineChart,
  Line,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // 실시간 데이터 시뮬레이션
  const generateRandomData = () => ({
    sales: Math.floor(Math.random() * 1000),
    revenue: Math.floor(Math.random() * 1500),
  });

  const [lineData, setLineData] = useState([
    { name: 'Jan', ...generateRandomData() },
    { name: 'Feb', ...generateRandomData() },
    { name: 'Mar', ...generateRandomData() },
    { name: 'Apr', ...generateRandomData() },
    { name: 'May', ...generateRandomData() },
    { name: 'Jun', ...generateRandomData() },
  ]);

  // 데이터 새로고침 기능
  const refreshData = () => {
    setIsLoading(true);
    setLineData(prevData => 
      prevData.map(item => ({
        name: item.name,
        ...generateRandomData()
      }))
    );
    setTimeout(() => setIsLoading(false), 500);
  };

  // 차트 위의 새로운 컨트롤 패널
  const ChartControls = () => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white font-bold">Sales & Revenue</h2>
      <div className="flex gap-2">
        <select 
          className="bg-gray-700 text-gray-300 px-3 py-1 rounded-md text-sm"
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
        <button 
          onClick={refreshData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <svg 
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke="currentColor" 
              strokeWidth="2" 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          Refresh
        </button>
      </div>
    </div>
  );

  const pieData = [
    { name: 'Mobile', value: 400 },
    { name: 'Desktop', value: 300 },
    { name: 'Tablet', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // 테이블 데이터
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* 사이드바 */}
      <div className={`bg-gray-800 w-64 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <h1 className="text-white text-xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-4">
          <a className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2">
            <HomeIcon className="w-5 h-5 mr-2" />
            Dashboard
          </a>
          <a className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            Analytics
          </a>
          <a className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2">
            <UserGroupIcon className="w-5 h-5 mr-2" />
            Users
          </a>
          <a className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2">
            <DocumentIcon className="w-5 h-5 mr-2" />
            Reports
          </a>
        </nav>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1">
        {/* 상단 네비게이션 바 */}
        <nav className="bg-gray-800 p-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* 프로필 드롭다운 */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <img 
                  src="https://via.placeholder.com/32" 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span>John Doe</span>
                <ChevronDownIcon className="w-4 h-4 ml-1" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                  <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Your Profile</a>
                  <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Settings</a>
                  <a className="block px-4 py-2 text-gray-300 hover:bg-gray-700">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* 메인 콘텐츠 */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-gray-300 font-bold mb-2">Total Users</h2>
              <p className="text-2xl text-white">1,234</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-gray-300 font-bold mb-2">Revenue</h2>
              <p className="text-2xl text-white">$12,345</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-gray-300 font-bold mb-2">Active Users</h2>
              <p className="text-2xl text-white">891</p>
            </div>
          </div>

          {/* 차트 그리드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* 라인 차트 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <ChartControls />
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        dot={{ fill: '#3B82F6' }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        dot={{ fill: '#10B981' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* 바 차트 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-white font-bold mb-4">Monthly Sales</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      labelStyle={{ color: '#9CA3AF' }}
                    />
                    <Bar dataKey="sales" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 영역 차트 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-white font-bold mb-4">Revenue Trend</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      labelStyle={{ color: '#9CA3AF' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#8B5CF6" 
                      fill="#8B5CF6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 파이 차트 */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-white font-bold mb-4">Device Distribution</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      labelStyle={{ color: '#9CA3AF' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 테이블 섹션 */}
          <div className="bg-gray-800 rounded-lg">
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-white font-bold">Recent Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tableData.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
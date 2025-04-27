import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { useAuth } from '../../context/AuthContext';
import StaffCheckout from './StaffCheckout';
import StaffInventory from './StaffInventory';
import StaffReturns from './StaffReturns';
import StaffLogin from './StaffLogin';
import { 
  ShoppingBag, Package, RotateCcw, Settings, 
  LogOut, BarChart3, Users, Clock, ShoppingCart 
} from 'lucide-react';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('checkout');

  const menuItems = [
    { id: 'checkout', label: 'Staff Checkout', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'self-checkout', label: 'Self Checkout', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="h-5 w-5" /> },
    { id: 'returns', label: 'Returns', icon: <RotateCcw className="h-5 w-5" /> },
  ];

  const quickStats = [
    { label: 'Today\'s Sales', value: '$2,459.85', icon: <BarChart3 className="h-6 w-6 text-primary-500" /> },
    { label: 'Customers Served', value: '47', icon: <Users className="h-6 w-6 text-secondary-500" /> },
    { label: 'Avg. Transaction Time', value: '4m 12s', icon: <Clock className="h-6 w-6 text-accent-500" /> },
  ];

  if (!user) {
    return <StaffLogin />;
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'self-checkout') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-8 w-8 text-accent-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Staff Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="btn btn-outline">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </button>
              <button onClick={logout} className="btn btn-accent">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <div className="bg-white rounded-xl shadow-sm">
            <div className="border-b border-gray-200">
              <TabsList className="flex">
                {menuItems.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === item.id
                        ? 'border-accent-500 text-accent-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="checkout">
                <StaffCheckout />
              </TabsContent>
              <TabsContent value="inventory">
                <StaffInventory />
              </TabsContent>
              <TabsContent value="returns">
                <StaffReturns />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default StaffDashboard;
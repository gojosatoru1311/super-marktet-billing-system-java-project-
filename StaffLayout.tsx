import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LogOut, User } from 'lucide-react';

const StaffLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-accent-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <h1 className="text-xl font-bold">QuickCheckout Staff</h1>
          </div>
          
          {isAuthenticated && user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">{user.name}</span>
                <span className="text-sm bg-accent-900 px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </div>
              
              <button 
                onClick={logout}
                className="flex items-center space-x-1 bg-accent-800 hover:bg-accent-900 px-3 py-1.5 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
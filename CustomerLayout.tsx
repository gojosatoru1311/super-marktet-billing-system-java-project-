import { Outlet } from 'react-router-dom';
import { ShoppingCart, HelpCircle, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CustomerLayout = () => {
  const { totalItems, subtotal } = useCart();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-7 w-7 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">QuickCheckout</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-primary-600">
              <Globe className="h-5 w-5 mr-1" />
              <span className="text-sm">English</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-primary-600">
              <HelpCircle className="h-5 w-5 mr-1" />
              <span className="text-sm">Help</span>
            </button>
            
            <div className="flex items-center space-x-2 bg-primary-50 px-3 py-1.5 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-primary-700">{totalItems}</span>
              <span className="text-sm text-primary-700">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 QuickCheckout. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CustomerLayout;
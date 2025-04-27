import { useNavigate } from 'react-router-dom';
import { ShoppingCart, InfoIcon, Book, ArrowRight, ShieldCheck, Users } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Welcome to QuickCheckout
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Fast, easy, and convenient checkout experience for customers and staff
        </p>
      </div>
      
      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Customer Self-Checkout */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center animate-slide-up">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
            <ShoppingCart className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Self-Checkout</h2>
          <p className="text-gray-600 mb-6">
            Quick and easy self-service checkout for customers
          </p>
          <button
            onClick={() => navigate('/details')}
            className="btn btn-primary text-lg px-6 py-3 flex items-center justify-center mx-auto"
          >
            <span>Start Shopping</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>

        {/* Staff Login */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center animate-slide-up" style={{animationDelay: '100ms'}}>
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 mb-6">
            <ShieldCheck className="h-8 w-8 text-accent-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-3">Staff Access</h2>
          <p className="text-gray-600 mb-6">
            Secure login for store staff and management
          </p>
          <button
            onClick={() => navigate('/staff')}
            className="btn btn-accent text-lg px-6 py-3 flex items-center justify-center mx-auto"
          >
            <span>Staff Login</span>
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up" style={{animationDelay: '200ms'}}>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-primary-600" />
            </div>
            <h3 className="font-semibold text-lg">Fast Checkout</h3>
          </div>
          <p className="text-gray-600">
            Quick and efficient self-service checkout process with intuitive interface
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-accent-600" />
            </div>
            <h3 className="font-semibold text-lg">Staff Tools</h3>
          </div>
          <p className="text-gray-600">
            Comprehensive management tools for inventory and transactions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
              <Book className="h-5 w-5 text-secondary-600" />
            </div>
            <h3 className="font-semibold text-lg">Easy to Use</h3>
          </div>
          <p className="text-gray-600">
            User-friendly interface with helpful tutorials and support
          </p>
        </div>
      </div>
      
      {/* Help Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style={{animationDelay: '300ms'}}>
        <button className="card card-hover flex items-center p-5 transition-transform hover:scale-105">
          <Book className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-medium text-gray-900">First Time?</h3>
            <p className="text-sm text-gray-600">View our quick tutorial</p>
          </div>
        </button>
        
        <button className="card card-hover flex items-center p-5 transition-transform hover:scale-105">
          <InfoIcon className="h-6 w-6 text-primary-500 mr-3 flex-shrink-0" />
          <div className="text-left">
            <h3 className="font-medium text-gray-900">Need Assistance?</h3>
            <p className="text-sm text-gray-600">Call for help or support</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
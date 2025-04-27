import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Phone, ArrowRight, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const { loginCustomer } = useAuth();
  
  const [loginMethod, setLoginMethod] = useState<'guest' | 'loyalty' | 'phone'>('guest');
  const [loyaltyId, setLoyaltyId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [registerLoyalty, setRegisterLoyalty] = useState(false);
  
  const handleContinue = () => {
    // Process login based on method
    if (loginMethod === 'loyalty' && loyaltyId) {
      loginCustomer({ loyaltyId });
    } else if (loginMethod === 'phone' && phoneNumber) {
      loginCustomer({ phoneNumber });
    } else if (loginMethod === 'guest') {
      if (registerLoyalty && name) {
        loginCustomer({ name });
      } else {
        loginCustomer({});
      }
    }
    
    navigate('/scanner');
  };
  
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Welcome to QuickCheckout
        </h1>
        <p className="text-gray-600">
          Please select how you'd like to proceed with your shopping
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 animate-slide-up">
        <div className="grid grid-cols-1 gap-4 mb-6">
          <button
            onClick={() => setLoginMethod('guest')}
            className={`flex items-center p-4 rounded-lg border-2 transition-all ${
              loginMethod === 'guest' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <User className={`h-5 w-5 mr-3 ${loginMethod === 'guest' ? 'text-primary-500' : 'text-gray-500'}`} />
            <div className="text-left">
              <h3 className="font-medium">Continue as Guest</h3>
              <p className="text-sm text-gray-600">Quick checkout without an account</p>
            </div>
          </button>
          
          <button
            onClick={() => setLoginMethod('loyalty')}
            className={`flex items-center p-4 rounded-lg border-2 transition-all ${
              loginMethod === 'loyalty' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className={`h-5 w-5 mr-3 ${loginMethod === 'loyalty' ? 'text-primary-500' : 'text-gray-500'}`} />
            <div className="text-left">
              <h3 className="font-medium">Loyalty Card</h3>
              <p className="text-sm text-gray-600">Use your loyalty card for rewards</p>
            </div>
          </button>
          
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex items-center p-4 rounded-lg border-2 transition-all ${
              loginMethod === 'phone' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Phone className={`h-5 w-5 mr-3 ${loginMethod === 'phone' ? 'text-primary-500' : 'text-gray-500'}`} />
            <div className="text-left">
              <h3 className="font-medium">Phone Number</h3>
              <p className="text-sm text-gray-600">Sign in with your phone number</p>
            </div>
          </button>
        </div>
        
        {/* Form for selected method */}
        <div className="mb-6 animate-fade-in">
          {loginMethod === 'loyalty' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loyalty Card Number
              </label>
              <input
                type="text"
                className="input"
                placeholder="Enter your loyalty card number"
                value={loyaltyId}
                onChange={(e) => setLoyaltyId(e.target.value)}
              />
            </div>
          )}
          
          {loginMethod === 'phone' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="input"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}
          
          {loginMethod === 'guest' && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-4">
                <input
                  id="register-loyalty"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={registerLoyalty}
                  onChange={() => setRegisterLoyalty(!registerLoyalty)}
                />
                <label htmlFor="register-loyalty" className="ml-2 block text-sm text-gray-700">
                  Sign up for our loyalty program and get 10% off today
                </label>
              </div>
              
              {registerLoyalty && (
                <div className="animate-slide-down">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="btn btn-primary w-full max-w-xs flex items-center justify-center space-x-2"
          >
            <span>Continue to Checkout</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Benefits */}
      {loginMethod === 'guest' && registerLoyalty && (
        <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up">
          <div className="flex items-center mb-4">
            <UserPlus className="h-6 w-6 text-primary-500 mr-2" />
            <h3 className="text-lg font-medium">Loyalty Program Benefits</h3>
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2"></span>
              <span>Earn points with every purchase</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2"></span>
              <span>Exclusive member-only discounts</span>
            </li>
            <li className="flex items-center">
              <span className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-2"></span>
              <span>Birthday rewards and special offers</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
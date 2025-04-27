import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Cast as Cash, Smartphone, Tag, CheckCircle, ArrowLeft, ShoppingBag, Printer, Mail, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';

type PaymentMethod = 'card' | 'cash' | 'mobile' | 'gift';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const Payment = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [receiptMethod, setReceiptMethod] = useState<'print' | 'email' | 'none'>('print');
  const [receiptEmail, setReceiptEmail] = useState('');
  const [bagCount, setBagCount] = useState(0);
  
  const BAG_PRICE = 0.10;
  const tax = subtotal * 0.0725;
  const bagTotal = bagCount * BAG_PRICE;
  const total = subtotal + tax + bagTotal - discount;
  
  const paymentOptions: PaymentOption[] = [
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay with Visa, Mastercard, Amex, or Discover'
    },
    { 
      id: 'cash', 
      name: 'Cash', 
      icon: <Cash className="h-5 w-5" />, 
      description: 'Pay with cash using the automated cash handler'
    },
    { 
      id: 'mobile', 
      name: 'Mobile Payment', 
      icon: <Smartphone className="h-5 w-5" />, 
      description: 'Apple Pay, Google Pay, or Samsung Pay'
    },
    { 
      id: 'gift', 
      name: 'Gift Card', 
      icon: <Tag className="h-5 w-5" />, 
      description: 'Redeem a store gift card'
    },
  ];
  
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
    } else if (couponCode.toUpperCase() === 'WELCOME') {
      setDiscount(5);
    }
  };
  
  const handleProcessPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };
  
  const handleNewTransaction = () => {
    clearCart();
    navigate('/');
  };
  
  if (isComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 bg-success-50 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-success-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Payment Complete!</h1>
        <p className="text-gray-600 mb-8">
          Your transaction has been successfully processed.
        </p>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Transaction #:</span>
            <span className="font-medium">{Math.floor(Math.random() * 9000000) + 1000000}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Total:</span>
            <span className="font-medium">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium capitalize">{selectedMethod}</span>
          </div>
        </div>
        
        {receiptMethod === 'print' && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8 animate-pulse">
            <Printer className="h-5 w-5 mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-600">Printing receipt...</p>
          </div>
        )}
        
        {receiptMethod === 'email' && receiptEmail && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <Mail className="h-5 w-5 mx-auto mb-2 text-gray-500" />
            <p className="text-sm text-gray-600">
              Receipt sent to {receiptEmail}
            </p>
          </div>
        )}
        
        <button
          onClick={handleNewTransaction}
          className="btn btn-primary flex items-center justify-center mx-auto"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          <span>Start New Transaction</span>
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate('/scanner')}
          className="flex items-center text-gray-600 hover:text-primary-600"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Scanner</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 animate-slide-up">
          <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            {paymentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                className={`flex items-center p-4 rounded-lg border-2 transition-all ${
                  selectedMethod === option.id 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  selectedMethod === option.id 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {option.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-medium">{option.name}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
          
          {/* Payment Form */}
          <div className="mb-8 animate-fade-in">
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="•••• •••• •••• ••••"
                    defaultValue="4111 1111 1111 1111"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="MM/YY"
                      defaultValue="12/26"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="123"
                      defaultValue="123"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {selectedMethod === 'cash' && (
              <div className="p-8 text-center">
                <Cash className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                <p>Please insert cash into the bill acceptor when ready.</p>
                <p className="mt-2 text-sm text-gray-500">
                  This machine gives change automatically.
                </p>
              </div>
            )}
            
            {selectedMethod === 'mobile' && (
              <div className="p-8 text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                <p>
                  Tap your phone on the payment terminal when ready.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Compatible with Apple Pay, Google Pay, and Samsung Pay.
                </p>
              </div>
            )}
            
            {selectedMethod === 'gift' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gift Card Number
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter gift card number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN (if applicable)
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter PIN"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Receipt Preferences */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Receipt Preference</h3>
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="receipt"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  checked={receiptMethod === 'print'}
                  onChange={() => setReceiptMethod('print')}
                />
                <span className="ml-2 text-sm text-gray-700">Print</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="receipt"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  checked={receiptMethod === 'email'}
                  onChange={() => setReceiptMethod('email')}
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="receipt"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  checked={receiptMethod === 'none'}
                  onChange={() => setReceiptMethod('none')}
                />
                <span className="ml-2 text-sm text-gray-700">No Receipt</span>
              </label>
            </div>
            
            {receiptMethod === 'email' && (
              <div className="animate-slide-down">
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your email"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                />
              </div>
            )}
          </div>
          
          {/* Bags */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Reusable Bags</h3>
            <div className="flex items-center">
              <button
                onClick={() => setBagCount(Math.max(0, bagCount - 1))}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="mx-4 w-8 text-center font-medium">
                {bagCount}
              </span>
              
              <button
                onClick={() => setBagCount(bagCount + 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Plus className="h-4 w-4" />
              </button>
              
              <span className="ml-4 text-sm text-gray-600">
                ${BAG_PRICE.toFixed(2)} each
              </span>
            </div>
          </div>
          
          <button
            onClick={handleProcessPayment}
            disabled={isProcessing}
            className="btn btn-primary w-full py-3 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                <span>Process Payment (${total.toFixed(2)})</span>
              </>
            )}
          </button>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1 animate-slide-up" style={{animationDelay: '100ms'}}>
          <div className="bg-white rounded-xl shadow-sm mb-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="max-h-[200px] overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-3 text-sm">
                    <div className="flex items-center">
                      <span>{item.quantity} × </span>
                      <span className="ml-1 truncate">{item.name}</span>
                    </div>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  className="input"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={handleApplyCoupon}
                  className="btn btn-outline ml-2 whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                Try coupon codes: SAVE10, WELCOME
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (7.25%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {bagCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bags ({bagCount}):</span>
                    <span>${bagTotal.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-success-600">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing declaration of Minus and Plus components
const Minus = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

const Plus = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export default Payment;
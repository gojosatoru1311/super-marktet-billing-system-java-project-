import { useState, useRef } from 'react';
import { 
  Search, Receipt, Zap, Package, Clock, ShieldAlert, 
  Tag, Undo, BarChart3, CreditCard, ShoppingBag, PackageOpen 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { findProductByBarcode, MockProduct } from '../../data/mockProducts';

const StaffCheckout = () => {
  const { user } = useAuth();
  const { items, addItem, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const [showAgeVerification, setShowAgeVerification] = useState(false);
  const [isQuickMode, setIsQuickMode] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [override, setOverride] = useState({ active: false, productId: '', newPrice: '' });
  
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  
  const handleScanProduct = () => {
    if (!barcode) {
      setError('Please enter a valid barcode');
      return;
    }
    
    const product = findProductByBarcode(barcode);
    
    if (product) {
      // Simulate age verification for specific products
      if (product.name.includes('Alcohol')) {
        setShowAgeVerification(true);
        return;
      }
      
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        weight: product.weight,
        expirationDate: product.expirationDate,
        isWeightVerified: true, // Always verified in staff mode
      });
      
      setBarcode('');
      setError('');
    } else {
      setError('Product not found. Please try another barcode.');
    }
    
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };
  
  const handleBarcodeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScanProduct();
    }
  };
  
  const handleOverridePrice = () => {
    if (!override.newPrice || isNaN(Number(override.newPrice))) {
      return;
    }
    
    const updatedItems = items.map(item => {
      if (item.id === override.productId) {
        return {
          ...item,
          price: Number(override.newPrice),
        };
      }
      return item;
    });
    
    // Clear cart and re-add the items with the updated price
    clearCart();
    updatedItems.forEach(item => addItem(item));
    
    setOverride({ active: false, productId: '', newPrice: '' });
  };
  
  const handleCompleteTransaction = () => {
    setShowReceipt(true);
    setTimeout(() => {
      setTransactionComplete(true);
    }, 2000);
  };
  
  const handleNewTransaction = () => {
    clearCart();
    setShowReceipt(false);
    setTransactionComplete(false);
    setBarcode('');
    setError('');
    
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {!transactionComplete ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel */}
          <div className="lg:col-span-2">
            {/* Scanner Control */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <ShoppingBag className="h-6 w-6 text-accent-600" />
                  <h2 className="text-xl font-semibold">New Transaction</h2>
                </div>
                
                <div className="flex items-center space-x-2">
                  <label className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      checked={isQuickMode}
                      onChange={() => setIsQuickMode(!isQuickMode)}
                    />
                    <span className="ml-2">Quick Mode</span>
                  </label>
                  
                  <button 
                    onClick={handleCompleteTransaction}
                    disabled={items.length === 0}
                    className="btn btn-accent"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Complete Sale</span>
                  </button>
                </div>
              </div>
              
              {/* Barcode Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Scan Product
                </label>
                <div className="flex">
                  <input
                    ref={barcodeInputRef}
                    type="text"
                    className="input rounded-r-none"
                    placeholder="Scan or enter barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    onKeyDown={handleBarcodeKeyDown}
                    autoFocus
                  />
                  <button
                    onClick={handleScanProduct}
                    className="bg-accent-600 hover:bg-accent-700 text-white px-4 rounded-r-lg flex items-center"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
                
                {error && (
                  <p className="mt-2 text-sm text-error-600">{error}</p>
                )}
                
                <p className="mt-2 text-xs text-gray-500">
                  For demo, try these barcodes: 4011, 8005, 2390, 3456, 9012, 4789
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: <Tag className="h-4 w-4" />, label: 'Apply Discount' },
                  { icon: <Zap className="h-4 w-4" />, label: 'Quick Items' },
                  { icon: <Undo className="h-4 w-4" />, label: 'Void Item' },
                  { icon: <ShieldAlert className="h-4 w-4" />, label: 'Age Verify' },
                ].map((action, index) => (
                  <button key={index} className="btn btn-outline py-2 flex items-center justify-center">
                    {action.icon}
                    <span className="ml-2 text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Items */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-slide-up" style={{animationDelay: '100ms'}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Current Items</h2>
                <span className="text-sm text-gray-500">{items.length} items</span>
              </div>
              
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <PackageOpen className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No items scanned yet.</p>
                  <p className="text-sm">Scan a product to begin.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-500 uppercase border-b border-gray-200">
                      <tr>
                        <th className="py-3 font-medium">Product</th>
                        <th className="py-3 font-medium">Price</th>
                        <th className="py-3 font-medium">Qty</th>
                        <th className="py-3 font-medium text-right">Total</th>
                        <th className="py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 flex items-center">
                            <div className="h-10 w-10 rounded bg-gray-100 overflow-hidden mr-3">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-xs text-gray-500">
                                SKU: {item.id}
                                {item.weight && ` • ${item.weight} lbs`}
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            {override.active && override.productId === item.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={override.newPrice}
                                  onChange={(e) => setOverride({
                                    ...override,
                                    newPrice: e.target.value
                                  })}
                                  className="w-20 p-1 border border-gray-300 rounded"
                                />
                                <button 
                                  onClick={handleOverridePrice}
                                  className="text-xs bg-accent-500 text-white px-2 py-1 rounded"
                                >
                                  Update
                                </button>
                              </div>
                            ) : (
                              <div
                                className="cursor-pointer hover:text-accent-600"
                                onClick={() => user?.role !== 'cashier' && setOverride({
                                  active: true,
                                  productId: item.id,
                                  newPrice: item.price.toString()
                                })}
                                title={user?.role !== 'cashier' ? "Click to override price" : ""}
                              >
                                ${item.price.toFixed(2)}
                              </div>
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              
                              <span className="w-6 text-center font-medium">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-error-500 p-1"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="lg:col-span-1 animate-slide-up" style={{animationDelay: '200ms'}}>
            <div className="bg-white rounded-xl shadow-sm sticky top-6">
              {/* Transaction Summary */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold mb-6">Transaction Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7.25%):</span>
                    <span>${(subtotal * 0.0725).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${(subtotal * 1.0725).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Additional Controls */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: <Receipt className="h-4 w-4" />, label: 'View Receipt' },
                    { icon: <Package className="h-4 w-4" />, label: 'Lookup Item' },
                    { icon: <Clock className="h-4 w-4" />, label: 'Transaction Log' },
                    { icon: <BarChart3 className="h-4 w-4" />, label: 'Reports' },
                  ].map((action, index) => (
                    <button key={index} className="btn btn-outline py-2 flex items-center justify-center">
                      {action.icon}
                      <span className="ml-2 text-sm">{action.label}</span>
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => clearCart()}
                  className="btn btn-outline text-error-600 border-error-200 hover:bg-error-50 w-full mt-4"
                >
                  <Undo className="h-4 w-4 mr-2" />
                  <span>Void Transaction</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-6 animate-fade-in">
          <div className="flex items-center justify-center mb-6 text-success-500">
            <CheckCircle className="h-10 w-10" />
          </div>
          
          <h2 className="text-center text-2xl font-bold mb-8">Transaction Complete</h2>
          
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Transaction #:</span>
              <span className="font-medium">{Math.floor(Math.random() * 90000) + 10000}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Date:</span>
              <span className="font-medium">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Operator:</span>
              <span className="font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment:</span>
              <span className="font-medium">Credit Card</span>
            </div>
          </div>
          
          <div className="space-y-1 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Items:</span>
              <span>{items.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span>${(subtotal * 0.0725).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${(subtotal * 1.0725).toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleNewTransaction}
            className="btn btn-primary w-full"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            <span>Start New Transaction</span>
          </button>
        </div>
      )}
      
      {/* Age Verification Modal */}
      {showAgeVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full animate-slide-up">
            <div className="flex items-center justify-center mb-4 text-warning-500">
              <ShieldAlert className="h-10 w-10" />
            </div>
            
            <h2 className="text-center text-xl font-bold mb-4">Age Verification Required</h2>
            
            <p className="text-center text-gray-600 mb-6">
              This product requires age verification. Please verify customer's ID.
            </p>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAgeVerification(false)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setShowAgeVerification(false);
                  const product = findProductByBarcode(barcode);
                  if (product) {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                      weight: product.weight,
                      expirationDate: product.expirationDate,
                      isWeightVerified: true,
                    });
                    setBarcode('');
                  }
                }}
                className="btn btn-primary flex-1"
              >
                Verify ID (21+)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component imports for Minus, Plus, Trash, and CheckCircle
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

const Trash = ({ className }: { className?: string }) => {
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
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );
};

const CheckCircle = ({ className }: { className?: string }) => {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

export default StaffCheckout;
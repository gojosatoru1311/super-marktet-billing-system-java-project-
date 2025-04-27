import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode as BarCode, Plus, Minus, Trash2, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { findProductByBarcode, MockProduct } from '../../data/mockProducts';

const Scanner = () => {
  const navigate = useNavigate();
  const { items, addItem, removeItem, updateQuantity, subtotal } = useCart();
  const [barcode, setBarcode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  const handleScanProduct = () => {
    if (!barcode) {
      setError('Please enter a valid barcode');
      return;
    }
    
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
        isWeightVerified: product.isWeighed ? false : true,
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

  // Mock camera scanning
  const toggleScanner = () => {
    setIsScanning(!isScanning);
    
    if (!isScanning) {
      // Simulate successful scan after 2 seconds
      setTimeout(() => {
        const randomProduct = 
          [4011, 8005, 2390, 3456, 9012, 4789][Math.floor(Math.random() * 6)].toString();
        setBarcode(randomProduct);
        setIsScanning(false);
        handleScanProduct();
      }, 2000);
    }
  };
  
  const proceedToPayment = () => {
    if (items.length > 0) {
      navigate('/payment');
    } else {
      setError('Please add at least one item to proceed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Scan Your Items
        </h1>
        <p className="text-gray-600">
          Scan the barcode or enter it manually below
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scanner & Barcode Entry */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 animate-slide-up">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Scan Barcode</h2>
            
            {/* Camera Scanner */}
            <div className="mb-6">
              <button
                onClick={toggleScanner}
                className={`w-full p-4 rounded-lg border-2 border-dashed ${
                  isScanning ? 'border-primary-400 bg-primary-50' : 'border-gray-300'
                } flex flex-col items-center justify-center transition-all`}
              >
                <Camera className={`h-8 w-8 mb-2 ${isScanning ? 'text-primary-500 animate-pulse' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">
                  {isScanning ? 'Scanning...' : 'Click to Start Camera'}
                </span>
              </button>
            </div>
            
            {/* Manual Entry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manual Barcode Entry
              </label>
              <div className="flex">
                <input
                  ref={barcodeInputRef}
                  type="text"
                  className="input rounded-r-none"
                  placeholder="Enter barcode number"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  onKeyDown={handleBarcodeKeyDown}
                />
                <button
                  onClick={handleScanProduct}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 rounded-r-lg flex items-center"
                >
                  <BarCode className="h-5 w-5" />
                </button>
              </div>
              
              {error && (
                <p className="mt-2 text-sm text-error-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {error}
                </p>
              )}
              
              <p className="mt-2 text-xs text-gray-500">
                For demo, try these barcodes: 4011, 8005, 2390, 3456, 9012, 4789
              </p>
            </div>
          </div>
          
          {/* Continue Button */}
          <button
            onClick={proceedToPayment}
            className="btn btn-primary w-full flex items-center justify-center mt-4"
            disabled={items.length === 0}
          >
            <span>Proceed to Payment</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm animate-slide-up" style={{animationDelay: '100ms'}}>
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Your Cart</h2>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <BarCode className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p>Your cart is empty. Scan items to add them.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="p-4 flex items-center space-x-4 transition-colors hover:bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)} {item.weight ? `• ${item.weight} lbs` : ''}
                    </p>
                    {item.expirationDate && (
                      <p className="text-xs text-gray-500">
                        Exp: {new Date(item.expirationDate).toLocaleDateString()}
                      </p>
                    )}
                    
                    {!item.isWeightVerified && (
                      <p className="text-xs text-warning-600 flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Please place item in bagging area
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-error-500 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scanner;
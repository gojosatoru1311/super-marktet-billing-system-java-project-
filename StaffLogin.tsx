import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Coffee, AlertCircle, Camera, QrCode as BarCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StaffLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  const barcodeInputRef = useRef<HTMLInputElement>(null);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!employeeId || !password) {
      setError('Please enter both employee ID and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const success = await login(employeeId, password);
    
    setIsLoading(false);
    
    if (success) {
      navigate('/staff/dashboard');
    } else {
      setError('Invalid employee ID or password');
    }
  };

  // Mock camera scanning
  const toggleScanner = () => {
    setIsScanning(!isScanning);
    
    if (!isScanning) {
      // Simulate successful scan after 2 seconds
      setTimeout(() => {
        const mockEmployeeId = 'EMP' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        setEmployeeId(mockEmployeeId);
        setPassword('scanned-password');
        setIsScanning(false);
        
        if (barcodeInputRef.current) {
          barcodeInputRef.current.focus();
        }
      }, 2000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-accent-100 rounded-full flex items-center justify-center">
          <ShieldCheck className="h-8 w-8 text-accent-600" />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Staff Login
        </h1>
        <p className="text-gray-600">
          Please enter your credentials or scan your employee badge
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-slide-up">
        {/* Badge Scanner */}
        <div className="mb-6">
          <button
            onClick={toggleScanner}
            className={`w-full p-4 rounded-lg border-2 border-dashed ${
              isScanning ? 'border-accent-400 bg-accent-50' : 'border-gray-300'
            } flex flex-col items-center justify-center transition-all`}
          >
            <Camera className={`h-8 w-8 mb-2 ${isScanning ? 'text-accent-500 animate-pulse' : 'text-gray-400'}`} />
            <span className="text-sm font-medium">
              {isScanning ? 'Scanning...' : 'Scan Employee Badge'}
            </span>
          </button>
        </div>

        {/* Manual Entry Form */}
        <form onSubmit={handleLogin}>
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <div className="flex">
                <input
                  ref={barcodeInputRef}
                  id="employee-id"
                  type="text"
                  className="input rounded-r-none"
                  placeholder="Enter your employee ID"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggleScanner}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 rounded-r-lg flex items-center"
                >
                  <BarCode className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="bg-error-50 text-error-700 p-3 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="btn btn-accent w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 animate-slide-up" style={{animationDelay: '100ms'}}>
        <div className="flex items-center space-x-3">
          <Coffee className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium">Demo Mode Active</p>
            <p className="text-xs text-gray-500">
              Any employee ID and password combination will work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
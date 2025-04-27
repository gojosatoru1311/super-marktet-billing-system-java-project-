import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CustomerLayout from './layouts/CustomerLayout';
import StaffLayout from './layouts/StaffLayout';
import Welcome from './pages/customer/Welcome';
import CustomerDetails from './pages/customer/CustomerDetails';
import Scanner from './pages/customer/Scanner';
import Payment from './pages/customer/Payment';
import StaffLogin from './pages/staff/StaffLogin';
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffCheckout from './pages/staff/StaffCheckout';
import StaffInventory from './pages/staff/StaffInventory';
import StaffReturns from './pages/staff/StaffReturns';
import PrivateStaffRoute from './components/PrivateStaffRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Customer Routes */}
            <Route path="/" element={<CustomerLayout />}>
              <Route index element={<Welcome />} />
              <Route path="details" element={<CustomerDetails />} />
              <Route path="scanner" element={<Scanner />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            
            {/* Staff Routes */}
            <Route path="/staff" element={<StaffLayout />}>
              <Route index element={<StaffLogin />} />
              <Route path="dashboard" element={
                <PrivateStaffRoute>
                  <StaffDashboard />
                </PrivateStaffRoute>
              } />
              <Route path="checkout" element={
                <PrivateStaffRoute>
                  <StaffCheckout />
                </PrivateStaffRoute>
              } />
              <Route path="inventory" element={
                <PrivateStaffRoute>
                  <StaffInventory />
                </PrivateStaffRoute>
              } />
              <Route path="returns" element={
                <PrivateStaffRoute>
                  <StaffReturns />
                </PrivateStaffRoute>
              } />
            </Route>
            
            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
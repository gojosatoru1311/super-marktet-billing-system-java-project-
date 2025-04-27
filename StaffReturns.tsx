import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, X } from 'lucide-react';
import { mockProducts } from '../../data/mockProducts';

interface Return {
  id: string;
  date: string;
  customer: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    reason: string;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  total: number;
}

const mockReturns: Return[] = [
  {
    id: 'R001',
    date: '2025-04-10',
    customer: 'John Doe',
    items: [
      {
        id: '1',
        name: 'Organic Bananas',
        price: 1.99,
        quantity: 1,
        reason: 'Quality issues',
      },
    ],
    status: 'pending',
    total: 1.99,
  },
  {
    id: 'R002',
    date: '2025-04-09',
    customer: 'Jane Smith',
    items: [
      {
        id: '2',
        name: 'Whole Milk',
        price: 3.49,
        quantity: 2,
        reason: 'Wrong item',
      },
    ],
    status: 'approved',
    total: 6.98,
  },
];

const StaffReturns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredReturns = mockReturns.filter(ret => {
    const matchesSearch = ret.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ret.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || ret.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'approved':
        return 'bg-success-100 text-success-700';
      case 'rejected':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Returns Management</h2>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search by customer name or return ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="input !w-auto"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Return ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReturns.map((ret) => (
                <tr key={ret.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{ret.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(ret.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ret.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ret.items.map(item => (
                        <div key={item.id} className="mb-1">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${ret.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(ret.status)}`}>
                      {ret.status.charAt(0).toUpperCase() + ret.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {ret.status === 'pending' && (
                      <div className="flex justify-end space-x-2">
                        <button className="text-success-600 hover:text-success-900">
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-error-600 hover:text-error-900">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-primary-50 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-primary-800 mb-1">
            Return Policy Reminder
          </h4>
          <p className="text-sm text-primary-700">
            Items can be returned within 30 days of purchase with a valid receipt.
            All returns must be in original condition with tags attached.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffReturns;
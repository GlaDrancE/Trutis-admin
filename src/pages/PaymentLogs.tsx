import React, { useState, useEffect } from 'react';
import { getPaymentLogs } from '../../services/api';
import toast from 'react-hot-toast';
import { PaymentLog } from '../../types/index';

function PaymentLogs() {
  const [logs, setLogs] = useState<PaymentLog[]>([]);

  useEffect(() => {
    loadPaymentLogs();
  }, []);

  const loadPaymentLogs = async () => {
    try {
      const response = await getPaymentLogs();
      console.log(response.data);
      setLogs(response.data);
    } catch (error) {
      toast.error('Failed to load payment logs');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Payment Logs</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="w-full overflow-x-auto">
          <table className="min-w-max w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left whitespace-nowrap">QR Code ID</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Amount</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Status</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Date</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Shop Name</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Owner Name</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Email</th>
                <th className="px-6 py-3 text-left whitespace-nowrap">Phone</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.qrcodeid} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{log.qrcodeid}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${log.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-sm ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(log.date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.shop_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.owner_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PaymentLogs;

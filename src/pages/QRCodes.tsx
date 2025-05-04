import React, { useState, useEffect } from 'react';
import { QrCode, Plus, Search } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { getQRCodes, generateQRCode } from '../../services/api';
import toast from 'react-hot-toast';
import { QRCode } from '../../types/index';
import { Link } from 'react-router-dom';

function QRCodes() {
  const [qrCodes, setQRCodes] = useState<QRCode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredQRCodes, setFilteredQRCodes] = useState<QRCode[]>([]); 
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [formData, setFormData] = useState({
    client_id: '',
    amount: 0,
  });
  const FORMS_BASE_URL = import.meta.env.VITE_FORM_URL;

  useEffect(() => {
    loadQRCodes();
  }, []);

  const loadQRCodes = async () => {
    try {
      const response = await getQRCodes();
      setQRCodes(response.data);
      setFilteredQRCodes(response.data);
    } catch (error) {
      toast.error('Failed to load QR codes');
    }
  };

  const generateID = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    const randomArray = new Uint8Array(4);
    crypto.getRandomValues(randomArray);
    randomArray.forEach(random => {
      randomString += chars[random % chars.length];
    });
    return randomString;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = qrCodes.filter(qr => {
      const qrCodeIdMatch = qr.private_key.toLowerCase().includes(term);
      const clientNameMatch =
        qr.Client && qr.Client.owner_name
          ? qr.Client.owner_name.toLowerCase().includes(term)
          : false;
      return qrCodeIdMatch || clientNameMatch;
    });

    setFilteredQRCodes(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredQRCodes(qrCodes);
  };

  const handleSubmit = async () => {
    try {
      const id = generateID();
      await generateQRCode({ id: id });
      toast.success('QR code generated successfully');
      setIsModalOpen(false);
      loadQRCodes();
      setFormData({ client_id: '', amount: 0 });
    } catch (error) {
      toast.error('Failed to generate QR code');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">QR Codes</h1>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by QR Code ID or Client Name"
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-10 py-2 border border-gray-300 rounded hover:border-gray-400 text-gray-700 placeholder-gray-400"
              aria-label="Search QR codes by ID or client name"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          {/* Generate QR Code Button */}
          <button
            onClick={() => handleSubmit()}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate QR Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQRCodes.length > 0 ? (
          filteredQRCodes.map((qr) => (
            <Link key={qr.id} to={`/qr-codes/${qr.client_id}`} className={`${!qr.client_id && 'pointer-events-none'}`}>
              <div key={qr.id} className={`bg-white p-6 rounded-lg shadow ${qr.client_id ? 'border-2 border-green-400' : 'border-2 border-red-400'}`}>
                <div className="flex justify-center mb-4">
                  <QRCodeCanvas value={`${FORMS_BASE_URL}/${qr.private_key}`} size={200} />
                </div>
                <div className="text-center">
                  <p className="text-gray-600">QRCode Id  : {qr.private_key}</p>
                  {qr.client_id && qr.Client ? (
                    <>
                      <p className="text-gray-600">Client Name: {qr.Client.owner_name}</p>
                      <p className="text-gray-600">Shop Name: {qr.Client.shop_name || 'N/A'}</p>
                    </>
                  ): (
                    <p className="text-gray-600">Client: Not Assigned</p>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600 py-6">
            No QR codes found matching your search.
          </div>
        )}
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Generate QR Code</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Client ID</label>
                <input
                  type="text"
                  value={formData.client_id}
                  onChange={(e) =>
                    setFormData({ ...formData, client_id: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: Number(e.target.value) })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div >
  );
}

export default QRCodes;
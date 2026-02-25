import React, { useState, useEffect } from 'react';
import { getDownloadHistory, clearDownloadHistory } from '../utils/downloadUtils';
import { FaDownload, FaTrash, FaFilePdf, FaVideo } from 'react-icons/fa';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const DownloadsPage = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = () => {
    setDownloads(getDownloadHistory());
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your download history?')) {
      clearDownloadHistory();
      setDownloads([]);
      toast.success('Download history cleared');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Downloads</h1>
          {downloads.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <FaTrash />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {downloads.length === 0 ? (
          <div className="text-center py-12">
            <FaDownload className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No downloads yet</h3>
            <p className="text-gray-600">Your downloaded guides will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guide</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloaded On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {downloads.map((download, index) => (
                  <tr key={download.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {download.guideName.includes('Video') ? (
                          <FaVideo className="text-blue-500" />
                        ) : (
                          <FaFilePdf className="text-red-500" />
                        )}
                        <span className="font-medium">{download.guideName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {format(new Date(download.timestamp), 'PPP p')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        download.guideName.includes('Video') 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {download.guideName.includes('Video') ? 'Video' : 'PDF'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadsPage;
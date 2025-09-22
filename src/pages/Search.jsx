import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useToast from '../hooks/useToast';

function Search() {
  const { documents, setCurrentPreviewFile } = useContext(AppContext);
  const [filters, setFilters] = useState({
    category: '',
    tags: '',
    dateRange: ''
  });
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const { showToast } = useToast();

  useEffect(() => {
    applyFilters();
  }, [documents]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let result = [...documents];
    
    if (filters.category) {
      result = result.filter(doc => doc.category === filters.category);
    }
    
    if (filters.tags) {
      result = result.filter(doc => doc.tags.includes(filters.tags));
    }
    
    if (filters.dateRange) {
      const today = new Date();
      let startDate;
      
      switch (filters.dateRange) {
        case 'today':
          startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
        case 'year':
          startDate = new Date(today);
          startDate.setFullYear(today.getFullYear() - 1);
          break;
      }
      
      if (startDate) {
        result = result.filter(doc => {
          const docDate = new Date(doc.date);
          return docDate >= startDate;
        });
      }
    }
    
    setFilteredDocuments(result);
    showToast('info', 'Filters Applied', `Showing ${result.length} document(s)`);
  };

  const downloadAllAsZip = () => {
    showToast('info', 'Download Started', 'Preparing ZIP file for download...');
    
    setTimeout(() => {
      showToast('success', 'Download Complete', 'All documents have been downloaded as a ZIP file');
    }, 2000);
  };

  const previewFile = (file) => {
    setCurrentPreviewFile(file);
  };

  const downloadFile = (fileName) => {
    showToast('info', 'Download Started', `Downloading ${fileName}...`);
    
    setTimeout(() => {
      showToast('success', 'Download Complete', `${fileName} has been downloaded successfully`);
    }, 1500);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const tagColors = {
    'Important': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'Work': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Personal': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Finance': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Urgent': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Search Documents</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filterCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select 
              id="filterCategory"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Categories</option>
              <option value="personal">Personal</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="filterTags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
            <select 
              id="filterTags"
              name="tags"
              value={filters.tags}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Tags</option>
              <option value="important">Important</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="finance">Finance</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
            <select 
              id="dateRange"
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={applyFilters}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Search Results</h2>
          <button 
            onClick={downloadAllAsZip}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
          >
            <i className="fas fa-download mr-2"></i>Download All as ZIP
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tags</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No documents found
                  </td>
                </tr>
              ) : (
                filteredDocuments.map(doc => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <i className={`fas fa-file-${doc.type === 'image' ? 'image text-green-500' : 'pdf text-red-500'} mr-3`}></i>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        doc.category === 'personal' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                      }`}>
                        {doc.category === 'personal' ? 'Personal' : 'Professional'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                          <span key={tag} className={`px-2 py-1 text-xs rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{formatDate(doc.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => previewFile(doc)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                      >
                        Preview
                      </button>
                      <button 
                        onClick={() => downloadFile(doc.name)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Search;
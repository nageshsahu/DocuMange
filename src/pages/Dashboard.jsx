// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import MonthlyUploadChart from '../components/charts/MonthlyUploadChart';
import CategoryChart from '../components/charts/CategoryChart';
import ErrorBoundary from '../components/common/ErrorBoundary';

function Dashboard() {
  const { documents } = useContext(AppContext);

  // Calculate statistics
  const totalDocuments = documents.length;
  const today = new Date().toISOString().split('T')[0];
  const uploadedToday = documents.filter(doc => doc.date === today).length;

  // Calculate most used tags
  const tagCounts = {};
  documents.forEach(doc => {
    doc.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const sortedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);

  const tagColors = {
    'Important': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    'Work': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'Personal': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Finance': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Urgent': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Documents Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Documents</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-1">{totalDocuments}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500 dark:text-green-400 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i> 12.5%
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from last month</span>
              </div>
            </div>
            <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
              <i className="fas fa-file-alt text-indigo-600 dark:text-indigo-300 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Uploaded Today Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Uploaded Today</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mt-1">{uploadedToday}</p>
              <div className="flex items-center mt-2">
                <span className="text-green-500 dark:text-green-400 flex items-center">
                  <i className="fas fa-arrow-up mr-1"></i> 8.2%
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">from yesterday</span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <i className="fas fa-cloud-upload-alt text-green-600 dark:text-green-300 text-xl"></i>
            </div>
          </div>
        </div>
        
        {/* Most Used Tags Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">Most Used Tags</p>
            <div className="flex flex-wrap gap-2">
              {sortedTags.map(tag => (
                <span key={tag} className={`text-xs px-3 py-1 rounded-full ${tagColors[tag] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Documents Uploaded Per Month</h2>
          <div className="h-64">
            <ErrorBoundary>
              <MonthlyUploadChart documents={documents} />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Category Breakdown</h2>
          <div className="h-64">
            <ErrorBoundary>
              <CategoryChart documents={documents} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
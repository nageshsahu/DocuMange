import React, { useState } from 'react';

function StorageSettings({ settings, setSettings, showToast }) {
  const [formData, setFormData] = useState({
    uploadLocation: settings.uploadLocation || 'Personal Documents',
    maxFileSize: settings.maxFileSize || '10 MB',
    fileCompression: settings.fileCompression || 'none',
    autoDelete: settings.autoDelete || false,
    deleteAfter: settings.deleteAfter || '90',
    excludeTags: settings.excludeTags || []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExcludeTagsChange = (e) => {
    const options = e.target.options;
    const selectedTags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTags.push(options[i].value);
      }
    }
    setFormData(prev => ({ ...prev, excludeTags: selectedTags }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update settings
    setSettings(prev => ({
      ...prev,
      ...formData
    }));
    
    showToast('success', 'Settings Saved', 'Storage settings have been saved successfully');
  };

  // Mock data for storage usage
  const storageData = {
    total: 10, // GB
    used: 2.4, // GB
    breakdown: {
      documents: 1.0, // GB
      images: 0.8, // GB
      other: 0.6 // GB
    }
  };

  const usagePercentage = (storageData.used / storageData.total) * 100;
  const documentsPercentage = (storageData.breakdown.documents / storageData.used) * 100;
  const imagesPercentage = (storageData.breakdown.images / storageData.used) * 100;
  const otherPercentage = (storageData.breakdown.other / storageData.used) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Storage Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Storage Usage</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Storage Used</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {storageData.used} GB of {storageData.total} GB
                </span>
              </div>
              <div className="w-full h-6 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                  style={{ width: `${usagePercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full mr-1"></span> 
                  Documents ({storageData.breakdown.documents} GB)
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> 
                  Images ({storageData.breakdown.images} GB)
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span> 
                  Other ({storageData.breakdown.other} GB)
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Upload Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Upload Location</label>
                <select 
                  name="uploadLocation"
                  value={formData.uploadLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>Personal Documents</option>
                  <option>Work Documents</option>
                  <option>Shared Documents</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max File Size</label>
                <select 
                  name="maxFileSize"
                  value={formData.maxFileSize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option>10 MB</option>
                  <option>25 MB</option>
                  <option>50 MB</option>
                  <option>100 MB</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Compression</label>
                <select 
                  name="fileCompression"
                  value={formData.fileCompression}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Storage Management</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Auto-delete Old Files</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Automatically delete files older than specified period</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="autoDelete"
                    checked={formData.autoDelete}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {formData.autoDelete && (
                <div className="space-y-3 pl-2 border-l-2 border-indigo-500">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delete Files Older Than</label>
                    <select 
                      name="deleteAfter"
                      value={formData.deleteAfter}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exclude Files With Tags</label>
                    <select 
                      multiple
                      value={formData.excludeTags}
                      onChange={handleExcludeTagsChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      size="3"
                    >
                      <option value="important">Important</option>
                      <option value="permanent">Permanent</option>
                      <option value="archive">Archive</option>
                    </select>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            type="submit" 
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default StorageSettings;
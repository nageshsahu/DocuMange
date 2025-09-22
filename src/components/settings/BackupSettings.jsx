import React, { useState } from 'react';

function BackupSettings({ settings, setSettings, showToast }) {
  const [formData, setFormData] = useState({
    autoBackup: settings.autoBackup !== undefined ? settings.autoBackup : true,
    backupFrequency: settings.backupFrequency || 'weekly',
    backupTime: settings.backupTime || '02:00',
    storageProvider: settings.storageProvider || 'local',
    cloudEmail: settings.cloudEmail || '',
    cloudPath: settings.cloudPath || '/DocuManage/Backups'
  });
  const [backupProgress, setBackupProgress] = useState(0);
  const [showBackupProgress, setShowBackupProgress] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update settings
    setSettings(prev => ({
      ...prev,
      ...formData
    }));
    
    showToast('success', 'Settings Saved', 'Backup settings have been saved successfully');
  };

  const connectCloudStorage = () => {
    const provider = formData.storageProvider;
    const email = formData.cloudEmail;
    
    if (!email) {
      showToast('error', 'Error', 'Please enter your email address');
      return;
    }
    
    // Simulate connection process
    showToast('info', 'Connecting...', `Connecting to ${provider}...`);
    
    setTimeout(() => {
      showToast('success', 'Connected', `Successfully connected to ${provider}`);
    }, 2000);
  };

  const createBackup = (type) => {
    setShowBackupProgress(true);
    setBackupProgress(0);
    
    // Simulate backup process
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowBackupProgress(false);
            showToast('success', 'Backup Complete', `${type.charAt(0).toUpperCase() + type.slice(1)} backup created successfully`);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  // Mock backup history data
  const backupHistory = [
    { type: 'Full', size: '2.4 GB', date: 'Today, 2:00 AM' },
    { type: 'Incremental', size: '124 MB', date: 'Yesterday, 2:00 AM' },
    { type: 'Full', size: '2.3 GB', date: '7 days ago' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Backup Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Automatic Backup</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Enable Automatic Backup</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Automatically backup your documents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="autoBackup"
                    checked={formData.autoBackup}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {formData.autoBackup && (
                <div className="space-y-3 pl-2 border-l-2 border-indigo-500">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Backup Frequency</label>
                    <select 
                      name="backupFrequency"
                      value={formData.backupFrequency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Backup Time</label>
                    <input 
                      type="time" 
                      name="backupTime"
                      value={formData.backupTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Backup Location</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Storage Provider</label>
                <select 
                  name="storageProvider"
                  value={formData.storageProvider}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="local">Local Storage</option>
                  <option value="google">Google Drive</option>
                  <option value="dropbox">Dropbox</option>
                  <option value="onedrive">OneDrive</option>
                </select>
              </div>
              
              {formData.storageProvider !== 'local' && (
                <div className="space-y-3 pl-2 border-l-2 border-indigo-500">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Email</label>
                    <input 
                      type="email" 
                      name="cloudEmail"
                      value={formData.cloudEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Folder Path</label>
                    <input 
                      type="text" 
                      name="cloudPath"
                      value={formData.cloudPath}
                      onChange={handleChange}
                      placeholder="/DocuManage/Backups"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <button 
                    type="button"
                    onClick={connectCloudStorage}
                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                  >
                    <i className="fas fa-link mr-1"></i>Connect Account
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Backup History</h3>
            <div className="space-y-3">
              {backupHistory.map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                      <i className="fas fa-cloud-upload-alt text-indigo-600 dark:text-indigo-300"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{backup.type} Backup</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{backup.size} • {backup.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition">
                      Restore
                    </button>
                    <button className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Manual Backup</h3>
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={() => createBackup('full')}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <i className="fas fa-download mr-2"></i>Full Backup
              </button>
              <button 
                type="button"
                onClick={() => createBackup('incremental')}
                className="flex-1 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 py-2 px-4 rounded-lg border border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <i className="fas fa-download mr-2"></i>Incremental Backup
              </button>
            </div>
            
            {showBackupProgress && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                  <span>Backing up...</span>
                  <span>{Math.round(backupProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${backupProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
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

export default BackupSettings;
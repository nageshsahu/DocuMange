import React, { useState } from 'react';

function NotificationSettings({ settings, setSettings, showToast }) {
  const [formData, setFormData] = useState({
    emailNotifications: {
      uploads: settings.emailNotifications?.uploads || false,
      downloads: settings.emailNotifications?.downloads || false,
      security: settings.emailNotifications?.security !== undefined ? settings.emailNotifications.security : true
    },
    pushNotifications: {
      browser: settings.pushNotifications?.browser || false,
      mobile: settings.pushNotifications?.mobile || false
    },
    emailDigest: settings.emailDigest || 'immediate'
  });

  const handleEmailNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [type]: value
      }
    }));
  };

  const handlePushNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [type]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update settings
    setSettings(prev => ({
      ...prev,
      ...formData
    }));
    
    showToast('success', 'Settings Saved', 'Notification settings have been saved successfully');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Notification Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Document Uploads</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified when documents are uploaded</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.emailNotifications.uploads}
                    onChange={(e) => handleEmailNotificationChange('uploads', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Document Downloads</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified when documents are downloaded</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.emailNotifications.downloads}
                    onChange={(e) => handleEmailNotificationChange('downloads', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Security Alerts</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified about security events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.emailNotifications.security}
                    onChange={(e) => handleEmailNotificationChange('security', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Push Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Browser Notifications</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Receive notifications in your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.pushNotifications.browser}
                    onChange={(e) => handlePushNotificationChange('browser', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Mobile Notifications</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Receive notifications on your mobile device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.pushNotifications.mobile}
                    onChange={(e) => handlePushNotificationChange('mobile', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Notification Frequency</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Digest</label>
                <select 
                  value={formData.emailDigest}
                  onChange={(e) => setFormData(prev => ({ ...prev, emailDigest: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="immediate">Immediate</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Digest</option>
                  <option value="never">Never</option>
                </select>
              </div>
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

export default NotificationSettings;
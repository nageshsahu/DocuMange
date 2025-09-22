import React, { useState } from 'react';

function SecuritySettings({ settings, setSettings, showToast }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: settings.twoFactorEnabled || false
  });
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, text: 'None' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check password strength when new password changes
    if (name === 'newPassword') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ strength: 0, text: 'None' });
      return;
    }

    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Contains number
    if (/[0-9]/.test(password)) strength++;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    let strengthText = 'None';
    if (strength <= 2) strengthText = 'Weak';
    else if (strength <= 3) strengthText = 'Medium';
    else strengthText = 'Strong';

    setPasswordStrength({ strength, text: strengthText });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords if provided
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        showToast('error', 'Error', 'Please enter your current password');
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        showToast('error', 'Error', 'New passwords do not match');
        return;
      }
      
      // In a real app, you would verify the current password here
      showToast('success', 'Password Updated', 'Your password has been updated successfully');
    }
    
    // Update two-factor authentication setting
    setSettings(prev => ({
      ...prev,
      twoFactorEnabled: formData.twoFactorEnabled
    }));
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    
    showToast('success', 'Settings Saved', 'Security settings have been saved successfully');
  };

  const getStrengthClass = () => {
    if (passwordStrength.strength <= 2) return 'weak';
    if (passwordStrength.strength <= 3) return 'medium';
    return 'strong';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Security Settings</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <div className={`password-strength ${getStrengthClass()}`}></div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password strength: <span>{passwordStrength.text}</span>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Two-Factor Authentication</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300">Enable 2FA</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="twoFactorEnabled"
                    checked={formData.twoFactorEnabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              {formData.twoFactorEnabled && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">Scan this QR code with your authenticator app:</p>
                  <div className="w-32 h-32 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-qrcode text-4xl text-gray-400 dark:text-gray-500"></i>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Or enter this code manually: ABC123DEF456</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-3">Login Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <i className="fas fa-sign-in-alt text-green-600 dark:text-green-300"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Chrome on Windows</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">New York, USA • Today, 10:30 AM</p>
                  </div>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Current session</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <i className="fas fa-sign-in-alt text-green-600 dark:text-green-300"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Safari on macOS</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco, USA • Yesterday, 3:45 PM</p>
                  </div>
                </div>
                <button className="text-xs text-red-600 dark:text-red-400 font-medium">Sign out</button>
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

export default SecuritySettings;
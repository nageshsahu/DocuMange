import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useToast from '../hooks/useToast';
import GeneralSettings from '../components/settings/GeneralSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import NotificationSettings from '../components/settings/NotificationSettings';
import StorageSettings from '../components/settings/StorageSettings';
import BackupSettings from '../components/settings/BackupSettings';

function Settings() {
  const { settings, setSettings } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('general');
  const { showToast } = useToast();

  const tabs = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { id: 'storage', label: 'Storage', icon: 'fas fa-database' },
    { id: 'backup', label: 'Backup', icon: 'fas fa-cloud-upload-alt' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings settings={settings} setSettings={setSettings} showToast={showToast} />;
      case 'security':
        return <SecuritySettings settings={settings} setSettings={setSettings} showToast={showToast} />;
      case 'notifications':
        return <NotificationSettings settings={settings} setSettings={setSettings} showToast={showToast} />;
      case 'storage':
        return <StorageSettings settings={settings} setSettings={setSettings} showToast={showToast} />;
      case 'backup':
        return <BackupSettings settings={settings} setSettings={setSettings} showToast={showToast} />;
      default:
        return <GeneralSettings settings={settings} setSettings={setSettings} showToast={showToast} />;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Settings Menu</h2>
            <ul className="space-y-2">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center ${
                      activeTab === tab.id
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
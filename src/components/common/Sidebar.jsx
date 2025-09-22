import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(AppContext);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'fas fa-home', label: 'Dashboard' },
    { path: '/upload', icon: 'fas fa-upload', label: 'Upload Documents' },
    { path: '/search', icon: 'fas fa-search', label: 'Search Documents' },
    { path: '/admin', icon: 'fas fa-users-cog', label: 'Admin' },
    { path: '/profile', icon: 'fas fa-user', label: 'User Profile' },
    { path: '/settings', icon: 'fas fa-cog', label: 'Settings' }
  ];

  return (
    <aside className={`sidebar-transition ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 shadow-md flex flex-col`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <div className="bg-indigo-600 text-white p-2 rounded-lg mr-3">
          <i className="fas fa-file-alt text-xl"></i>
        </div>
        {!sidebarCollapsed && <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">DocuManage</span>}
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-300'
                }`}
              >
                <i className={`${item.icon} w-5 mr-3`}></i>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full flex items-center justify-center p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
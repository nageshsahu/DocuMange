import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

function Navbar() {
  const { currentUser, logout } = useContext(AppContext);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search documents..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
        
        <div className="flex items-center ml-4">
          {/* Notifications */}
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
            <i className="fas fa-bell"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* User Profile */}
          <div className="ml-4 relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img 
                src={`https://picsum.photos/seed/${currentUser?.username || 'user'}/40/40.jpg`} 
                alt="User" 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 dark:text-gray-300 hidden md:block">{currentUser?.name || 'User'}</span>
              <i className="fas fa-chevron-down text-gray-500 dark:text-gray-400 text-sm"></i>
            </button>
            
            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-200 dark:border-gray-700">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useToast from '../hooks/useToast';

function Profile() {
  const { currentUser, users, setUsers } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    username: currentUser?.username || '',
    role: currentUser?.role || '',
    newPassword: ''
  });
  const { showToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update current user
    const updatedUser = {
      ...currentUser,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      role: formData.role
    };
    
    // Update password if provided
    if (formData.newPassword) {
      updatedUser.password = formData.newPassword;
    }
    
    // Update user in users array
    const updatedUsers = users.map(user => 
      user.username === currentUser.username ? updatedUser : user
    );
    
    setUsers(updatedUsers);
    
    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Show success message
    showToast('success', 'Profile Updated', 'Your profile has been updated successfully');
    
    // Clear password field
    setFormData(prev => ({ ...prev, newPassword: '' }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">User Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
          <div className="mb-4 md:mb-0 md:mr-6">
            <img 
              src={`https://picsum.photos/seed/${currentUser?.username || 'user'}/150/150.jpg`} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{currentUser?.name || 'User'}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{currentUser?.email || 'user@example.com'}</p>
            <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
              {currentUser?.role || 'User'}
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select 
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Change Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="New password"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
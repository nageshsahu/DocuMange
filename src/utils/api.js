// src/utils/api.js

// Mock API service functions
const api = {
  // OTP Generation
  generateOtp: async (mobileNumber) => {
    console.log('Mock: Generating OTP for', mobileNumber);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Mock: Generated OTP:', otp);
        
        // Store OTP in localStorage for validation
        localStorage.setItem(`otp_${mobileNumber}`, JSON.stringify({
          otp: otp,
          timestamp: Date.now(),
          mobileNumber: mobileNumber
        }));
        
        // Simulate different responses based on mobile number
        if (mobileNumber === '9999999999') {
          // This number is not registered
          resolve({
            status: false,
            message: 'This mobile number is not registered in our system.'
          });
        } else {
          resolve({
            status: true,
            message: 'OTP sent successfully'
          });
        }
      }, 1000);
    });
  },

  // OTP Validation
  validateOtp: async (mobileNumber, otp) => {
    console.log('Mock: Validating OTP for', mobileNumber, 'with OTP:', otp);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retrieve stored OTP data
        const storedOtpData = localStorage.getItem(`otp_${mobileNumber}`);
        
        if (!storedOtpData) {
          resolve({
            status: false,
            message: 'No OTP found for this mobile number'
          });
          return;
        }
        
        const { otp: storedOtp, timestamp } = JSON.parse(storedOtpData);
        
        // Check if OTP is expired (5 minutes)
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (now - timestamp > fiveMinutes) {
          localStorage.removeItem(`otp_${mobileNumber}`);
          resolve({
            status: false,
            message: 'OTP has expired'
          });
          return;
        }
        
        // Validate OTP
        if (otp === storedOtp) {
          // Remove OTP after successful validation
          localStorage.removeItem(`otp_${mobileNumber}`);
          
          // Generate a mock token
          const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
          
          resolve({
            status: true,
            message: 'OTP validated successfully',
            token: token,
            user: {
              mobileNumber: mobileNumber,
              name: 'Mock User',
              email: `user${mobileNumber}@example.com`
            }
          });
        } else {
          resolve({
            status: false,
            message: 'Invalid OTP'
          });
        }
      }, 1000);
    });
  },

  // Email Login
  emailLogin: async (email, password) => {
    console.log('Mock: Email login for', email);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (email === 'user@example.com' && password === 'password') {
          const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
          resolve({
            status: true,
            message: 'Login successful',
            token: token,
            user: {
              email: email,
              name: 'Email User',
              mobileNumber: '1234567890'
            }
          });
        } else {
          resolve({
            status: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  },

  // User Registration
  registerUser: async (userData) => {
    console.log('Mock: Registering user', userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const userExists = existingUsers.some(user => 
          user.mobileNumber === userData.mobile_number || 
          user.email === userData.email
        );
        
        if (userExists) {
          resolve({
            status: false,
            message: 'Mobile number or email already registered'
          });
          return;
        }
        
        // Generate OTP for registration
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('Mock: Generated registration OTP:', otp);
        
        // Store OTP in localStorage
        localStorage.setItem(`regOtp_${userData.mobile_number}`, JSON.stringify({
          otp: otp,
          timestamp: Date.now(),
          userData: userData
        }));
        
        resolve({
          status: true,
          message: 'Registration initiated. Please verify your mobile number.'
        });
      }, 1500);
    });
  },

  // Validate Registration OTP
  validateRegistrationOtp: async (mobileNumber, otp) => {
    console.log('Mock: Validating registration OTP for', mobileNumber);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retrieve stored OTP data
        const storedOtpData = localStorage.getItem(`regOtp_${mobileNumber}`);
        
        if (!storedOtpData) {
          resolve({
            status: false,
            message: 'No registration OTP found for this mobile number'
          });
          return;
        }
        
        const { otp: storedOtp, timestamp, userData } = JSON.parse(storedOtpData);
        
        // Check if OTP is expired (5 minutes)
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        if (now - timestamp > fiveMinutes) {
          localStorage.removeItem(`regOtp_${mobileNumber}`);
          resolve({
            status: false,
            message: 'OTP has expired'
          });
          return;
        }
        
        // Validate OTP
        if (otp === storedOtp) {
          // Remove OTP after successful validation
          localStorage.removeItem(`regOtp_${mobileNumber}`);
          
          // Save user to localStorage
          const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const newUser = {
            ...userData,
            id: Date.now(),
            registeredAt: new Date().toISOString()
          };
          existingUsers.push(newUser);
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
          
          resolve({
            status: true,
            message: 'Registration completed successfully'
          });
        } else {
          resolve({
            status: false,
            message: 'Invalid OTP'
          });
        }
      }, 1000);
    });
  },

  // Documents
  getDocuments: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const documents = JSON.parse(localStorage.getItem('documents') || '[]');
        resolve(documents);
      }, 500);
    });
  },

  uploadDocument: async (document) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const documents = JSON.parse(localStorage.getItem('documents') || '[]');
        const newDocument = {
          ...document,
          id: Date.now() + Math.random()
        };
        documents.push(newDocument);
        localStorage.setItem('documents', JSON.stringify(documents));
        resolve(newDocument);
      }, 1500);
    });
  },

  // Users
  getUsers: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        resolve(users);
      }, 500);
    });
  },

  addUser: async (user) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = {
          ...user,
          id: Date.now() + Math.random(),
          dateAdded: new Date().toISOString().split('T')[0]
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve(newUser);
      }, 1000);
    });
  },

  updateUser: async (username, userData) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(user => 
          user.username === username ? { ...user, ...userData } : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        resolve({ success: true });
      }, 1000);
    });
  },

  deleteUser: async (username) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.filter(user => user.username !== username);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        resolve({ success: true });
      }, 1000);
    });
  }
};

export default api;
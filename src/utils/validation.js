// src/utils/validation.js

export const validateMobileNumber = (mobileNumber) => {
    // Check if mobile number is exactly 10 digits
    return /^\d{10}$/.test(mobileNumber);
  };
  
  export const validateOtp = (otp) => {
    // Check if OTP is exactly 6 digits
    return /^\d{6}$/.test(otp);
  };
  
  export const validateEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const validatePassword = (password) => {
    // Password should be at least 8 characters
    return password.length >= 8;
  };
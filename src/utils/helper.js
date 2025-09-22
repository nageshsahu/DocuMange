// src/utils/helper.js

// Helper to get OTP from localStorage (for testing)
export function getStoredOtp(mobileNumber) {
  const storedOtpData = localStorage.getItem(`otp_${mobileNumber}`);
  if (storedOtpData) {
    const { otp } = JSON.parse(storedOtpData);
    return otp;
  }
  return null;
}

// Add any other helper functions you need
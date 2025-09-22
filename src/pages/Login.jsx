import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useToast from '../hooks/useToast';
import api from '../utils/api'; // Import the api object
import { validateMobileNumber, validateOtp } from '../utils/validation'; // Import validation functions
import { getStoredOtp } from '../utils/helper';

function Login() {
  const { login } = useContext(AppContext);
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const otpInputRefs = useRef([]);

  // Handle mobile number change
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    setMobileNumber(value);
  };

  // Request OTP
  const requestOtp = async () => {
    if (!validateMobileNumber(mobileNumber)) {
      showToast('error', 'Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await api.generateOtp(mobileNumber); // Use api.generateOtp
      console.log('OTP generation response:', response);
      
      if (response.status === true || response.success === true) {
        showToast('info', 'OTP Sent', `An OTP has been sent to ${mobileNumber}`);
        setShowOtpForm(true);
        setTimer(120); // Reset timer
        
        // For testing: Display OTP in console
        const storedOtp = getStoredOtp(mobileNumber);
        if (storedOtp) {
          console.log(`For testing: OTP for ${mobileNumber} is ${storedOtp}`);
          // In development, you might want to show the OTP in an alert for testing
          if (process.env.NODE_ENV === 'development') {
            alert(`For testing: OTP for ${mobileNumber} is ${storedOtp}`);
          }
        }
      } else {
        showToast('error', 'Error', response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      showToast('error', 'Error', 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current is filled
    if (value && index < otp.length - 1) {
      if (otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle OTP key down (for backspace)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      if (otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1].focus();
      }
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpValue = otp.join('');
    
    if (!validateOtp(otpValue)) {
      showToast('error', 'Invalid OTP', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await api.validateOtp(mobileNumber, otpValue); // Use api.validateOtp
      console.log('OTP validation response:', response);
      
      if (response.status === true || response.success === true) {
        if (response.token) {
          // Login with token and user data
          login(response.token, response.user);
          showToast('success', 'Login Successful', 'You have been logged in successfully');
          
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else {
          showToast('error', 'Error', 'Authentication successful but no token received');
        }
      } else {
        showToast('error', 'Error', response.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      showToast('error', 'Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await api.generateOtp(mobileNumber); // Use api.generateOtp
      console.log('OTP resend response:', response);
      
      if (response.status === true || response.success === true) {
        showToast('info', 'OTP Resent', `An OTP has been resent to ${mobileNumber}`);
        setOtp(['', '', '', '', '', '']);
        setTimer(120); // Reset timer
        
        // For testing: Display OTP in console
        const storedOtp = getStoredOtp(mobileNumber);
        if (storedOtp) {
          console.log(`For testing: OTP for ${mobileNumber} is ${storedOtp}`);
          // In development, you might want to show the OTP in an alert for testing
          if (process.env.NODE_ENV === 'development') {
            alert(`For testing: OTP for ${mobileNumber} is ${storedOtp}`);
          }
        }
        
        // Focus first OTP input
        if (otpInputRefs.current[0]) {
          otpInputRefs.current[0].focus();
        }
      } else {
        showToast('error', 'Error', response.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      showToast('error', 'Error', 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Timer countdown
  React.useEffect(() => {
    let interval;
    if (showOtpForm && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpForm, timer]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white p-3 rounded-lg inline-block mb-4">
            <i className="fas fa-file-alt text-2xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Login to DocuManage</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your mobile number to continue</p>
        </div>
        
        {!showOtpForm ? (
          <div>
            <div className="mb-6">
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                id="mobileNumber" 
                value={mobileNumber}
                onChange={handleMobileChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="9876543210"
                maxLength="10"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Enter a 10-digit mobile number</p>
            </div>
            <button 
              onClick={requestOtp}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Request OTP'}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter OTP</label>
              <div className="flex justify-center space-x-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => otpInputRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="otp-input border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-12 h-12 text-center text-xl"
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Didn't receive the code? 
                  <button 
                    onClick={resendOtp} 
                    disabled={resendLoading || timer > 0}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendLoading ? 'Sending...' : timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend'}
                  </button>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expires in {formatTime(timer)}
                </p>
              </div>
            </div>
            <button 
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Submit'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
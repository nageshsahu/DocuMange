import React, { useState, useEffect } from 'react';

const Toast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleToast = (event) => {
      setToast(event.detail);
    };

    window.addEventListener('showToast', handleToast);
    return () => window.removeEventListener('showToast', handleToast);
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={`toast ${toast.type} show`}>
      <i className={`toast-icon fas ${toast.type === 'success' ? 'fa-check-circle' : toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
      <div>
        <div className="font-medium">{toast.title}</div>
        <div className="text-sm">{toast.message}</div>
      </div>
    </div>
  );
};

export default Toast;
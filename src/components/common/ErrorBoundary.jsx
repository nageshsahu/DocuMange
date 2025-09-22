// src/components/common/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
        <p className="text-red-600 dark:text-red-300">There was an error loading this component.</p>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
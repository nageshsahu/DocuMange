// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './context/AppContext';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Upload from './pages/Upload';
// import Search from './pages/Search';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Sidebar from './components/common/Sidebar';
// import Navbar from './components/common/Navbar';
// import Toast from './components/common/Toast';
// import PreviewModal from './components/common/PreviewModal';
// import useDarkMode from './hooks/useDarkMode';
// import './index.css';

// function App() {
//   // Temporarily setting isLoggedIn to true for development
//   // In production, uncomment the original login check below
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Changed from false to true
  
//   // Commenting out login check for now
//   // useEffect(() => {
//   //   const user = localStorage.getItem('currentUser');
//   //   setIsLoggedIn(!!user);
//   // }, []);

//   const darkMode = useDarkMode();

//   return (
//     <AppProvider>
//       <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
//         <Router>
//           {isLoggedIn ? (
//             <>
//               <Sidebar />
//               <div className="flex-1 flex flex-col overflow-hidden">
//                 <Navbar />
//                 <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/login" element={<Navigate to="/" replace />} />
//                     <Route path="/upload" element={<Upload />} />
//                     <Route path="/search" element={<Search />} />
//                     <Route path="/admin" element={<Admin />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/settings" element={<Settings />} />
//                   </Routes>
//                 </main>
//               </div>
//             </>
//           ) : (
//             <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//               <Routes>
//                 <Route path="/" element={<Navigate to="/login" replace />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="*" element={<Navigate to="/login" replace />} />
//               </Routes>
//             </main>
//           )}
//           <Toast />
//           <PreviewModal />
//         </Router>
//       </div>
//     </AppProvider>
//   );
// }

// export default App;










// import React, { useState, useEffect, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './context/AppContext';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Upload from './pages/Upload';
// import Search from './pages/Search';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Sidebar from './components/common/Sidebar';
// import Navbar from './components/common/Navbar';
// import Toast from './components/common/Toast';
// import PreviewModal from './components/common/PreviewModal';
// import useDarkMode from './hooks/useDarkMode';
// import { AppContext } from './context/AppContext';
// import './index.css';

// function App() {
//   // Initialize isLoggedIn state as false
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   // Get the login state from context
//   const { state } = useContext(AppContext);
  
//   // Effect to check if user is logged in
//   useEffect(() => {
//     // Check localStorage for user data
//     const user = localStorage.getItem('currentUser');
//     setIsLoggedIn(!!user);
//   }, [state.user]); // Re-run when context user state changes

//   const darkMode = useDarkMode();

//   return (
//     <AppProvider>
//       <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
//         <Router>
//           {isLoggedIn ? (
//             <>
//               <Sidebar />
//               <div className="flex-1 flex flex-col overflow-hidden">
//                 <Navbar />
//                 <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/login" element={<Navigate to="/" replace />} />
//                     <Route path="/upload" element={<Upload />} />
//                     <Route path="/search" element={<Search />} />
//                     <Route path="/admin" element={<Admin />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/settings" element={<Settings />} />
//                   </Routes>
//                 </main>
//               </div>
//             </>
//           ) : (
//             <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//               <Routes>
//                 <Route path="/" element={<Navigate to="/login" replace />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="*" element={<Navigate to="/login" replace />} />
//               </Routes>
//             </main>
//           )}
//           <Toast />
//           <PreviewModal />
//         </Router>
//       </div>
//     </AppProvider>
//   );
// }

// export default App;





// import React, { useState, useEffect, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AppProvider } from './context/AppContext';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Upload from './pages/Upload';
// import Search from './pages/Search';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import Sidebar from './components/common/Sidebar';
// import Navbar from './components/common/Navbar';
// import Toast from './components/common/Toast';
// import PreviewModal from './components/common/PreviewModal';
// import useDarkMode from './hooks/useDarkMode';
// import { AppContext } from './context/AppContext';
// import './index.css';

// // Create a separate component that can access the context
// function AppContent() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { state } = useContext(AppContext);
  
//   useEffect(() => {
//     const user = localStorage.getItem('currentUser');
//     setIsLoggedIn(!!user);
//   }, [state.user]);

//   const darkMode = useDarkMode();

//   return (
//     <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
//       {isLoggedIn ? (
//         <>
//           <Sidebar />
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <Navbar />
//             <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/login" element={<Navigate to="/" replace />} />
//                 <Route path="/upload" element={<Upload />} />
//                 <Route path="/search" element={<Search />} />
//                 <Route path="/admin" element={<Admin />} />
//                 <Route path="/profile" element={<Profile />} />
//                 <Route path="/settings" element={<Settings />} />
//               </Routes>
//             </main>
//           </div>
//         </>
//       ) : (
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" replace />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           </Routes>
//         </main>
//       )}
//       <Toast />
//       <PreviewModal />
//     </div>
//   );
// }

// function App() {
//   return (
//     <AppProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </AppProvider>
//   );
// }

// export default App;





import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Search from './pages/Search';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import Toast from './components/common/Toast';
import PreviewModal from './components/common/PreviewModal';
import useDarkMode from './hooks/useDarkMode';
import './index.css';

function App() {
  const darkMode = useDarkMode();
  
  // Create a wrapper component that can access the context
  const AppContent = () => {
    const { currentUser } = useContext(AppContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Check if user is logged in by looking at currentUser from context
      setIsLoggedIn(!!currentUser);
    }, [currentUser]);

    return (
      <div className="flex h-screen overflow-hidden">
        {isLoggedIn ? (
          <>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Navbar />
              <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </main>
            </div>
          </>
        ) : (
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        )}
        <Toast />
        <PreviewModal />
      </div>
    );
  };

  return (
    <AppProvider>
      <Router>
        <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
          <AppContent />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
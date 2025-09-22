# 📂 Document Management System (React)

A *full-featured Document Management System (DMS)* built using *React.js*.  
The system is designed for managing documents securely, with features like user authentication, uploading, settings management, charts for analytics, and reusable UI components.  

This project follows *modular architecture* with proper separation of concerns into components, pages, hooks, context, and utils.

---

## 📖 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Future Improvements](#-future-improvements)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Features
- 🔐 *Authentication System*
  - Login, Profile, and Admin access.
- 📁 *Document Upload & Management*
  - Upload forms, validation, and secure storage.
- ⚙ *User & Admin Dashboard*
  - Admin and user-specific views with charts.
- 📊 *Data Visualization*
  - Category-based and monthly upload charts.
- 🌙 *Dark Mode Support*
  - Toggle dark/light themes via custom hooks.
- 🔔 *Notifications*
  - Toast notifications and user alerts.
- ⚡ *Reusable Components*
  - Forms, Modals, Error boundaries, Sidebar, Navbar.
- 🛠 *Utilities*
  - API integration, data validation, helper functions.
- 🧑‍🤝‍🧑 *Scalable Architecture*
  - Context API for global state, custom hooks for reusability.

---

## 🛠 Tech Stack
- *Frontend:* [React.js](https://react.dev/) with JSX
- *State Management:* Context API
- *Styling:* CSS (with modular structure, can extend to Tailwind/SCSS)
- *Charts:* Recharts / Chart.js
- *Routing:* React Router (if used)
- *Testing:* Jest + React Testing Library
- *Build Tool:* Create React App (CRA)
- *Version Control:* Git & GitHub

---

## 📂 Project Structure

docs/
├── node_modules/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── CategoryChart.jsx
│   │   │   └── MonthlyUploadChart.jsx
│   │   ├── common/
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PreviewModal.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Toast.jsx
│   │   ├── forms/
│   │   │   ├── AdminUserForm.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   └── UploadForm.jsx
│   │   └── settings/
│   │       ├── BackupSettings.jsx
│   │       ├── GeneralSettings.jsx
│   │       ├── NotificationSettings.jsx
│   │       ├── SecuritySettings.jsx
│   │       └── StorageSettings.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   ├── useChart.jsx
│   │   ├── useDarkMode.jsx
│   │   ├── useLocalStorage.jsx
│   │   └── useToast.jsx
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Search.jsx
│   │   ├── Settings.jsx
│   │   └── Upload.jsx
│   ├── utils/
│   │   ├── api.js
│   │   ├── helper.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

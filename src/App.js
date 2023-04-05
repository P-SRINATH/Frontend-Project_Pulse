import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import RootLayout from './components/RootLayout'
import ErrorPage from './components/ErrorPage'
import Register from './components/Register';
import Login from './components/Login'
import Home from './components/Home'
import GdoDashboard from './components/gdocomponents/GdoDashboard';
import PmDashboard from './components/projectManagercomponents/PmDashboard';
import SuperAdminDashboard from './components/superadmincomponents/SuperAdminDashboard';
import AdminDashboard from './components/admincomponents/AdminDashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import GetSpecificProjectDetails from './components/GetSpecificProjectDetails';

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      // path
      path: "/",
      // component to be loaded
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      // children of element/ RootLayout
      children: [
        {
          path: "register",         // path of Register 
          element: <Register />    // Register component
        },
        {
          path: "/",
          element: <Home />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />
        },
        {
          path: "resetpassword",
          element: <ResetPassword />
        },
        {
          path: "gdo/:email",
          element: <GdoDashboard />
        },
        {
          path: "projectManager",
          element: <PmDashboard />
        },
        {
          path: "getspecific/:project_id",
          element: <GetSpecificProjectDetails />
        },
        {
          path: "admin",
          element: <AdminDashboard />
        },
        {
          path: "superadmin",
          element: <SuperAdminDashboard />
        }

      ],
    },
  ]);

  return (
    <div className="App">
      {/* Router provider*/}
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;

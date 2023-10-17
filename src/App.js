import './assets/scss/main.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layouts';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrivateRoute from './routes/PrivateRoute';
import React, { Suspense } from 'react';
import Loader from './components/Loader';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Login = React.lazy(() => import('./pages/Login'));
const ForgotPassword = React.lazy(() => import('./components/ForgotPassword'));
const Appointments = React.lazy(() => import('./pages/Appointments'));
const Patients = React.lazy(() => import('./pages/Patients'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const PatientHistory = React.lazy(() => import('./components/PatientHistory'));
const DoctorProfile = React.lazy(() => import('./pages/DoctorProfile'));
const theme = createTheme({
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: {
      fontSize: "30px",
      fontWeight: "700",
    },
    h2: {
      fontSize: "20px",
    },
    font24: {
      fontSize: "24px",
    },
    font22: {
      fontSize: "22px",
    },
    font20: {
      fontSize: "20px",
    },
    font16: {
      fontSize: "16px",
    },
    font14: {
      fontSize: "14px",
    },
    font12: {
      fontSize: "12px",
    },
    body: {
      fontSize: "14px",
    },
  },
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#4596F3",
    },
    secondary: {
      main: "#6c757d",
    },
    dark: {
      main: "#000",
    },
  },
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route element={<Layout />}>
                <Route element={<PrivateRoute />}>
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/patient-history" element={<PatientHistory/>} />
                <Route path="/profile" element={<DoctorProfile />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;

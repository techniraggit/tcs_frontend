import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  InputLabel,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import logoWhite from "../assets/images/eyemy-logo-white.svg";
import LoginImg1 from "../assets/images/login-img1.png";
import LoginImg2 from "../assets/images/login-img2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { sendLogInOtp, validateLoginOtp } from "../apis/doctorApi";
import OtpInput from 'react-otp-input';

function SignInForm() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailOrPhoneValid, setIsEmailOrPhoneValid] = useState(true);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState("");
  const [verifyShow, setVerifyShow] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(value);
  };

  const handleSendOtp = async () => {
    if (!emailOrPhone) {
      setErrorMessage("Email/Phone is required.");
      setIsEmailOrPhoneValid(false);
    } else if (!validateEmail(emailOrPhone) && !validatePhoneNumber(emailOrPhone)) {
      setErrorMessage("Invalid Email or Phone Number.");
      setIsEmailOrPhoneValid(false);
    } else {
      setErrorMessage("");

      try {
        const response = await sendLogInOtp({ username: emailOrPhone });
        setVerifyShow(true);
        // console.log('ppp', response)
        showSnackbar(response?.data?.message, "success");

      } catch (error) {
        showSnackbar(error?.response?.data?.message, "error");
      }
    }
  };

  // varify otp
  const handleVerifyOTP = async () => {
    if (!otp) {
      setOtpError("OTP is required.");
      return;
    }
    try {
      const response = await validateLoginOtp({ username: emailOrPhone, otp });
      if (response?.data?.status) {
        const token = response.data.access_token;
        const name = response.data.first_name;
        localStorage.setItem('name', name);
        localStorage.setItem("token", token);
      }
   
      navigate('/appointments', { state: { loginSuccess: true } });
      showSnackbar(response?.data?.message, "success");
    } catch (error) {
      showSnackbar(error?.response?.data?.message, "error");
    }
  }

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <form className="customForm">
        {verifyShow ?
          <>
            <InputLabel className="customLabel">
              Enter OTP
            </InputLabel>
            <div className="otp-field">
              <OtpInput
                id="otp"
                value={otp}
                onChange={setOtp}
                renderSeparator={<span>-</span>}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
              />
              <p className="error-text" style={{ paddingTop: '10px' }}>{otpError}</p>
            </div>

            <Button
              className="buttonPrimary big"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOTP}
            >
              Varify Otp <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </>
          :
          <>
            <InputLabel className="customLabel" htmlFor="emailOrPhone">
              Email / Phone Number *
            </InputLabel>
            <TextField
              className="customField"
              placeholder="Enter Your Email / Phone Number"
              fullWidth
              id="emailOrPhone"
              type="text"
              error={!isEmailOrPhoneValid}
              helperText={errorMessage}
              value={emailOrPhone}
              onChange={(e) => {
                setEmailOrPhone(e.target.value);
                setIsEmailOrPhoneValid(true);
                setErrorMessage("");
              }}
            />

            <Button
              className="buttonPrimary big"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendOtp}
            >
              Send Otp <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </>
        }
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    </>
  );
}

const Login = () => {

  return (
    <Stack className="login-wrap">
      <Grid
        container
        component="main"
        sx={{ height: "100vh", alignItems: "center" }}
      >
        {/* Left Info Sidebar */}
        <Grid item className="left-wrap">
          <div className="topContentWrap">
            <img src={logoWhite} alt="My Image" />
            <Typography
              mb={10}
              variant="font20"
              component="h4"
              sx={{ color: "#fff", fontWeight: "600", mt: 4, textTransform: 'capitalize' }}
            >
              Get ready for your moment of clarity!
            </Typography>
          </div>
          <div className="img-outer">
            <div className="big-img">
              <img src={LoginImg1} alt="Doctor Image" />
            </div>
            <img className="img2" src={LoginImg2} alt="Patient Image" />
          </div>
        </Grid>
        {/* Right Form Wrappper */}
        <Grid item className="right-wrap">
          <Box sx={{ my: 6, mx: [4, 4, 6] }}>
            <Stack mb={10} sx={{ textAlign: "center", display: "block" }}>
              <Typography variant="h1">Welcome to Doctor Portal </Typography>
            </Stack>

            <div className="form-outer">
              <Typography variant="h1">Sign In</Typography>
              <Typography
                mb={5}
                mt={1}
                variant="body"
                sx={{ color: "#6A6A6A" }}
                component="p"
              >
                Sign In to Get started
              </Typography>

              <SignInForm />

            </div>

          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}


export default Login;
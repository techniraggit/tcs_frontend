import React, { useState, useEffect } from 'react';
import { Button, Typography, Grid, FormControl, Paper, colors } from '@mui/material';
import PatientIcon from '../assets/images/people.svg';
import HeartIcon from '../assets/images/heart.svg';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../assets/scss/appointment-main.scss';
import TimeIcon from '../assets/images/monitor-recorder.png';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DropIcon from '../assets/images/drop-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import NoAppointmentImg from '../assets/images/no-appointment.png';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useLocation } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Appointments = () => {
  const [value, setValue] = useState(0);
  const [days, setDays] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const location = useLocation();
  const { state } = location;
  const loginSuccess = state && state.loginSuccess;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    setDays(event.target.value);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (loginSuccess) {
      showSnackbar("You have been successfully logged in!!", "success");
    }
  }, [loginSuccess]);

  return (
    <div className='appointment-outer'>
      <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Appointment </Typography>

      <Grid container>
        <Grid item xs={12} md={7}>
          <ul className='cards-row'>
            <li>
              <div className='card-box'>
                <Typography variant='font14' sx={{ fontWeight: '600', color: '#425166' }} component="p">Number of Appointments</Typography>
                <div className='count-img-wrap'>
                  <Typography variant='font24' mt={1} mb={0} sx={{ color: '#4DA1FF', fontWeight: '700' }} component="h1">23</Typography>
                  <span className='icon-circle' style={{background:'#4596F3'}}><img src={HeartIcon} alt='Number of Appointments<' /></span>
                </div>
              </div>
            </li>
            <li>
              <div className='card-box'>
                <Typography variant='font14' sx={{ fontWeight: '600', color: '#425166' }} component="p">Patient who haven’t answered </Typography>
                <div className='count-img-wrap'>
                  <Typography variant='font24' mt={1} mb={0} sx={{ fontWeight: '700', color: '#FF6D4A' }} component="h1">03</Typography>
                  <span className='icon-circle'><img src={PatientIcon} alt='Patient who haven’t answered ' style={{filter:'brightness(0) invert(1)'}} /></span>
                </div>
              </div>
            </li>
          </ul>

          <Box className="tab-outer">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Upcoming" {...a11yProps(0)} />
                <Tab label="Completed" {...a11yProps(1)} />
                <Tab label="Rescheduled" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div className='head-wrap'>
                <h2>Patient List</h2>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={days}
                  label="Today"
                  onChange={handleSelectChange}
                  className='select-dropdown'
                  placeholder="Today"
                >
                  <MenuItem value={1}>Today</MenuItem>
                  <MenuItem value={2}>Tomorrow</MenuItem>
                  <MenuItem value={3}>Yesterday</MenuItem>
                </Select>
              </div>
              <ul>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#078539' }}>Confirm</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#2D0CF4' }}>pending</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#F08200' }}>Rescheduled</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>

                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
              </ul>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className='no-data-wrap'>
                <img src={NoAppointmentImg} alt="No Appointment" />
                <p>You don’t have an appointment yet</p>
                <span>You don’t have a doctor’s appointment scheduled a the moment</span>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <div className='head-wrap'>
                <h2>Patient List</h2>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={days}
                  label="Today"
                  onChange={handleSelectChange}
                  className='select-dropdown'
                  placeholder="Today"
                >
                  <MenuItem value={1}>Today</MenuItem>
                  <MenuItem value={2}>Tomorrow</MenuItem>
                  <MenuItem value={3}>Yesterday</MenuItem>
                </Select>
              </div>
              <ul>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#078539' }}>Confirm</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#2D0CF4' }}>pending</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span><span style={{ color: '#F08200' }}>Rescheduled</span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>

                <li>
                  <div>
                    <span className='pat-circle-wrap'>SM</span>
                    <div className='info-text'>
                      <h4>Stacy Mitchell</h4>
                      <p><span style={{ textDecoration: 'underline', cursor: 'pointer' }}>#2J983KT0</span> <span>First Appointment </span></p>
                    </div>
                  </div>
                  <span className='time-wrap'>
                    <img className='icon' src={TimeIcon} alt='Time' />
                    9 : 15 AM
                  </span>
                </li>
              </ul>
            </CustomTabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} pl={3} >
          <div className='custom-card calender-wrap'>
            <h2>Calendar</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </div>

          <div className='custom-card consult-wrap'>
            <h2>Consultation</h2>

            <ul className='person-info'>
              <li>
                <div>
                  <span className='pat-circle-wrap'>SM</span>
                  <div className='info-text'>
                    <h4>Denzel White</h4>
                    <p><span>Male - 28 Years 3 Months</span></p>
                  </div>
                </div>
                <span className='icon-wrap' style={{ cursor: 'pointer' }}>
                  <img src={DropIcon} alt='Icon' />
                </span>
              </li>
            </ul>

            <div className='consult-detail'>
              <ul>
                <li>
                  <span> Last meeting </span>
                  <p>Dr Everly on 21 june 2023 Prescription <span style={{ color: '#1A71FF', cursor: 'pointer' }}>#2J983KT0 </span> </p>
                </li>
                <li>
                  <span> Observation </span>
                  <p>Lorem ipsum dolor sit amet consectetur. Sit id vitae purus platea tristique. Facilisis</p>
                </li>
                <li>
                  <span> Prescription </span>
                  <p> ac nulla neque proin id in. At integer eu mauris laoreet mauris quam nunc varius  </p>
                </li>
              </ul>
            </div>
            <Button className='buttonPrimary big' variant="contained" color="primary" fullWidth>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />  Start call
            </Button>
          </div>
        </Grid>
      </Grid>

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

    </div>
  )
}

export default Appointments
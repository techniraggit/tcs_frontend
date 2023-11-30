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
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../apis/axiosConfig';
import moment from "moment"

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
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [consultationData, setConsultationData] = useState([]);
  const [rescheduledData, setRescheduledData] = useState([]);
  const [noOfAppointments, setNoOfAppointments] = useState(null);
  const [noAnswer, setNoAnswer] = useState(null);
  const [consultationDate, setConsultationDate] = useState(new Date().getFullYear()+"-"+String(new Date().getMonth()+1).padStart(2, '0')+"-"+new Date().getDate());
  const location = useLocation();
  const { state } = location;
  const loginSuccess = state && state.loginSuccess;
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log(pendingData);
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

  useEffect(() => {
    if(consultationDate) {
      axios.get(axios.defaults.baseURL+"/doctor/appointments?date="+consultationDate).then((data)=>{
        console.log('consultaion data', data.data.data);
        setConsultationData(data.data.data);
      });
    }
  },[consultationDate])
  useEffect(() =>{
    axios.get(axios.defaults.baseURL+"/doctor/appointments?search_query=scheduled").then(
      (data) => {
        setNoOfAppointments(data.data.display_data.number_of_appointments);
        console.log(data);
        setPendingData(data.data.data);
        setNoAnswer(data.data.display_data.unanswered_patient);
      }
    );
    axios.get(axios.defaults.baseURL+"/doctor/appointments?search_query=completed").then(
      (data) => {
        setCompletedData(data.data.data);
      }
    );
    axios.get(axios.defaults.baseURL+"/doctor/appointments?search_query=rescheduled").then(
      (data) => {
        console.log(data.data.data);
        setRescheduledData(data.data.data);
      }
    );
  },[]);

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
                  <Typography variant='font24' mt={1} mb={0} sx={{ color: '#4DA1FF', fontWeight: '700' }} component="h1">{noOfAppointments?noOfAppointments:'00'}</Typography>
                  <span className='icon-circle' style={{background:'#4596F3'}}><img src={HeartIcon} alt='Number of Appointments<' /></span>
                </div>
              </div>
            </li>
            <li>
              <div className='card-box'>
                <Typography variant='font14' sx={{ fontWeight: '600', color: '#425166' }} component="p">Patient who haven’t answered </Typography>
                <div className='count-img-wrap'>
                  <Typography variant='font24' mt={1} mb={0} sx={{ fontWeight: '700', color: '#FF6D4A' }} component="h1">{noAnswer!=null?noAnswer:'00'}</Typography>
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
                {/* <Select
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
                </Select> */}
              </div>
              <ul>
                {pendingData.length>0?(
                  <>
                  {pendingData?.map((patient)=>{
                  return (
                    <li>
                    <div>
                      <span className='pat-circle-wrap'>{patient.patient.name.split(" ").map((n)=>n[0]).join("")}</span>
                      <div className='info-text'>
                        <h4>{patient.patient.name}</h4>
                        <p><span>#{patient.patient.patient_id}</span> <span>Scheduled Date</span><span style={{ color: '#078539' }}>{patient.schedule_date.split('T')[0]}</span></p>
                      </div>
                    </div>
                   <div>
                   <span className='time-wrap'>
                      <img className='icon' src={TimeIcon} alt='Time' />
                      {new Date(patient.schedule_date).toLocaleTimeString()}
                    </span>
                    {patient.status != 'expired'?
                      <span className='time-wrap start-call' onClick={()=>{navigate('/meeting/'+patient.room_name)}}>
                          <FontAwesomeIcon icon={faPhone} />  Start call
                      </span> :''}
                   </div>
                  </li>
                  )})}
                  
                  </>
                )
                :(<div className='no-data-wrap'>
                <img src={NoAppointmentImg} alt="No Appointment" />
                <p>You don’t have an appointment yet</p>
                <span>You don’t have a doctor’s appointment scheduled a the moment</span>
              </div>)
                
                }
              </ul>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className='head-wrap'>
                  <h2>Patient List</h2>
              </div>
              <ul>
            {completedData.length != 0?completedData.map((patient)=>{
                  return (
                    <li>
                    <div>
                      <span className='pat-circle-wrap'>{patient.patient.name.split(" ").map((n)=>n[0]).join("")}</span>
                      <div className='info-text'>
                        <h4>{patient.patient.name}</h4>
                        <p><span>#{patient.patient.patient_id}</span> <span>Scheduled Date</span><span style={{ color: '#078539' }}>{patient.schedule_date.split('T')[0]}</span></p>
                      </div>
                    </div>
                    <span className='time-wrap'>
                      <img className='icon' src={TimeIcon} alt='Time' />
                      {new Date(patient.schedule_date).toLocaleTimeString()}
                    </span>
                  </li>
                  )
                }):<div className='no-data-wrap'>
                <img src={NoAppointmentImg} alt="No Appointment" />
                <p>You don’t have an appointment yet</p>
                <span>You don’t have a doctor’s appointment scheduled a the moment</span>
              </div>
                
                }

              </ul>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            <div className='head-wrap'>
                <h2>Patient List</h2>
                {/* <Select
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
                </Select> */}
              </div>
              <ul>
                {rescheduledData.length != 0?rescheduledData.map((patient)=>{
                  return (
                    <li>
                    <div>
                      <span className='pat-circle-wrap'>{patient.patient.name.split(" ").map((n)=>n[0]).join("")}</span>
                      <div className='info-text'>
                        <h4>{patient.patient.name}</h4>
                        <p><span>#{patient.patient.patient_id}</span> <span>Scheduled Date</span><span style={{ color: '#078539' }}>{patient.schedule_date.split('T')[0]}</span></p>
                      </div>
                    </div>
                    <div>
                      <span className='time-wrap'>
                        <img className='icon' src={TimeIcon} alt='Time' />
                        {new Date(patient.schedule_date).toLocaleTimeString()}
                      </span>
                      {patient.status != 'expired'?
                      <span className='time-wrap start-call' onClick={()=>{navigate('/meeting/'+patient.room_name)}}>
                          <FontAwesomeIcon icon={faPhone} />  Start call
                      </span>:''}
                    </div>
                  </li>
                  )
                }):(<div className='no-data-wrap'>
                <img src={NoAppointmentImg} alt="No Appointment" />
                <p>You don’t have an appointment yet</p>
                <span>You don’t have a doctor’s appointment scheduled a the moment</span>
              </div>)
                
                }
              </ul>
            </CustomTabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} pl={3} >
          <div className='custom-card calender-wrap'>
            <h2>Calendar</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar  onChange={(value)=>{setConsultationDate(new Date(value).getFullYear()+"-"+String(new Date(value).getMonth()+1).padStart(2, '0')+"-"+new Date(value).getDate())}} />
            </LocalizationProvider>
          </div>

          <div className='custom-card consult-wrap'>
            <h2>Consultation</h2>
            <div style={{height:'350px', overflowY:'auto'}}>  
            { consultationData.length != 0?(consultationData.map((patient)=>{
              console.log(patient);
              return (<span>  
                <ul className='person-info'>
                  <li>
                    <div>
                      <span className='pat-circle-wrap'>{patient.patient.name.split(" ").map((n)=>n[0]).join("")}</span>
                      <div className='info-text'>
                        <h4>{patient.patient.name}</h4>
                        <p><span>{patient.patient.gender} - {patient.patient.dob}</span></p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className='consult-detail'>
                  <ul>
                    {patient?.schedule_date?
                    <li>
                      <span> Meeting time </span>
                      <p>{moment(patient?.schedule_date).format("DD-MM-YYYY LT")}</p>
                    </li>:''}
                   {patient?.patient?.treatment_undergoing?
                    <li>
                      <span> Prescription </span>
                      <p>{patient?.patient?.treatment_undergoing_text} </p>
                    </li>:''}
                  </ul>
                </div>
                {patient.status != 'expired' && patient?.status !="completed" ?
                <Button className='buttonPrimary big' variant="contained" color="primary" fullWidth onClick={()=>{navigate('/meeting/'+patient.room_name)}}>
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '10px' }} />  Start call
                </Button>
                :<h4>Meeting {patient?.status}</h4>}
              </span>)
            })):
            (<div style={{textAlign:'center', marginTop:'20px'}}>
              No Consultaion for the selected Date
            </div>)
            }
            </div>
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

import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid
} from "@mui/material";
import DoctorImg from '../assets/images/dummy-doctor.svg';
import axios from "../apis/axiosConfig";

const DoctorProfile = () => {
  const[doctor,setDoctor] = useState(null);
  useEffect(()=>{
    axios.get(axios.defaults.baseURL+"/doctor/profile").then((data)=>{
      console.log(data.data.data);
      setDoctor(data.data.data);
    });
  },[]);

  return (
    <div className="profile-outer">
      <Typography
        mb={3}
        variant="font22"
        sx={{ fontWeight: "700" }}
        component="h1"
      >
        Profile
      </Typography>
      <Paper className="customBoxWrap">

        {doctor?(
        <Grid container spacing={2} pb={2}>
          <Grid item xs={12} md={4}>
            <div className="doc-profile">
              <span><img src={`${axios.defaults.baseURL}${doctor.user.profile_image?doctor.user.profile_image:DoctorImg}`} alt="Doctor" /></span>
              <h4>Dr. {doctor.user.first_name} {doctor.user.last_name}</h4>
              <p>{doctor.specialization}</p>
            </div>

            <Grid container pb={2}>
              <Grid item xs={12} md={6} className="item-wrap">
                <h6>Email</h6>
                <p>{doctor.user.email}</p>
              </Grid>
              <Grid item xs={12} md={6} className="item-wrap">
                <h6>Phone</h6>
                <p>{doctor.user.phone_number}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="view-detail">
              <Grid container pb={2}>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic Name</h6>
                  <p>{doctor.clinic_name}</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic  Address </h6>
                  <p>{doctor.clinic_address}</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic Detail</h6>
                  <p>{doctor.clinic_contact_no}</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Working Days</h6>
                  <p>{doctor.doctor_availability[0].working_days.join(',')}</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Working From</h6>
                  <p>{doctor.doctor_availability[0].start_working_hr}</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Working To</h6>
                  <p>{doctor.doctor_availability[0].end_working_hr}</p>
                </Grid>

              </Grid>

              <Typography
                mb={1}
                sx={{ fontWeight: "600", fontSize: "16px", color: '#222B45' }}
                component="h1"
              >
                About Doctor
              </Typography>
              <Typography
                mb={3}
                sx={{ fontWeight: "400", fontSize: "14px", color: '#6B779A' }}
                component="p"
              >
                {doctor.summary}
              </Typography>
            </div>

          </Grid>
        </Grid>):''}
      </Paper>
    </div>
  )
}

export default DoctorProfile
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid
} from "@mui/material";
import DoctorImg from '../assets/images/dummy-doctor.svg';
import axios from "../apis/axiosConfig";
import DocterCard from "../components/DocterCard";

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

        {doctor &&(
          <DocterCard doctorDetails={doctor} />)}
      
      </Paper>
    </div>
  )
}

export default DoctorProfile
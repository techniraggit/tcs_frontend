import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  Button,
  InputLabel,
  Stack
} from "@mui/material";
import DoctorImg from '../assets/images/dummy-doctor.svg';
import TextField from '@mui/material/TextField';
import EditIcon from '../assets/images/edit.svg';
import Loader from '../components/Loader';

const DoctorProfile = () => {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  })
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = () => {

  }

  const handleSubmit = () => {

  }

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
        <Grid container spacing={2} pb={2}>
          <Grid item xs={12} md={4}>
            <div className="doc-profile">
              <span><img src={DoctorImg} alt="Doctor" /></span>
              <h4>Dr. Courtney Henry</h4>
              <p>Optometrist</p>
            </div>

            <Grid container pb={2}>
              <Grid item xs={12} md={6} className="item-wrap">
                <h6>Email</h6>
                <p>Rohitjain@gmail.com</p>
              </Grid>
              <Grid item xs={12} md={6} className="item-wrap">
                <h6>Phone</h6>
                <p>8976543210</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="view-detail">
              <Grid container pb={2}>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic Name</h6>
                  <p>Visicare</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic  Address </h6>
                  <p>A-8, Lajpat nagar, Delhi-110045</p>
                </Grid>
                <Grid item xs={12} md={4} className="item-wrap">
                  <h6>Clinic Detail</h6>
                  <p>73763367,<br />
                    visacre@gmail.com</p>
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
                Dr. Bellamy Nicholas is a top specialist at New Delhi Bridge Hospital at London. He has achieved several awards and recognition for is contribution and service in his own field. He is available for private consultation.
              </Typography>
            </div>

          </Grid>
        </Grid>
      </Paper>

      <Paper direction="column" className="customBoxWrap" style={{ width: '50%'}}>
        <Stack direction="row" spacing={4} sx={{ justifyContent: 'space-between', alignItems: 'flexStart' }}>
          <Typography variant='font16' sx={{ fontWeight: '700', color:'#5B5B5B', mb:'30px !important', }} component="h4"> Change password</Typography>
          {
            !isEdit ?
              <Button onClick={() => setIsEdit(true)} className='buttonPrimary edit-btn small' variant="contained" sx={{ width: 'auto', display: 'block', }}> Edit <img src={EditIcon} alt="Edit" />  </Button>
              :
              <Button onClick={() => {
                setForm({
                  old_password: '',
                  new_password: '',
                  confirm_password: ''
                });
                setIsEdit(false);
              }} className='buttonPrimary cancel-btn small' variant="contained" sx={{ width: 'auto', display: 'block', }}> Cancel</Button>
          }
        </Stack>
        <form className='customForm'>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel className="customLabel" htmlFor="name"> Current Password </InputLabel>
              <TextField
                className="customField"
                placeholder="Enter Current Password"
                value={form.old_password}
                fullWidth
                name="old_password"
                id="old_password"
                autoComplete="off"
                onChange={handleChange}
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className="customLabel" htmlFor="mobile_number"> New Password </InputLabel>
              <TextField
                className="customField"
                placeholder="Enter New Password"
                value={form.new_password}
                fullWidth
                name="new_password"
                id="new_password"
                onChange={handleChange}
                autoComplete="off"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel className="customLabel" htmlFor="mobile_number"> Confirm Password </InputLabel>
              <TextField
                className="customField"
                placeholder="Enter Confirm Password"
                value={form.confirm_password}
                fullWidth
                onChange={handleChange}
                name="confirm_password"
                id="confirm_password"
                autoComplete="off"
                disabled={!isEdit}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit} className='buttonPrimary medium uppercase' variant="contained" sx={{ width: '100%', display: 'block', marginBottom: '30px' }}> Submit </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

    </div>
  )
}

export default DoctorProfile
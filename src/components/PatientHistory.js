import React from 'react';
import DownloadForwordIcon from '../assets/images/document-forward.png';
import CalenderIcon from '../assets/images/calender.svg';
import { Button, Typography, Grid } from "@mui/material";

const PatientHistory = () => {
    return (
        <div className='patient-detail-page'>
            <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Patient history </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6} mb={4}>
                    <div className='custom-card' style={{height:'100%', marginBottom:'0'}}>
                        <div className='head-wrap'>
                            <h5>Patient Information</h5>
                            <span>ID #345345435</span>
                        </div>

                        <ul>
                            <li>
                                <span>Full Name</span>
                                <p>: Andrew Ainsley</p>
                            </li>
                            <li>
                                <span>Phone</span>
                                <p>: 9899772734</p>
                            </li>
                            <li>
                                <span>Email</span>
                                <p>: Andrewainsley@gmail.com</p>
                            </li>
                            <li>
                                <span>Age</span>
                                <p>: 27 </p>
                            </li>
                        </ul>

                    </div>
                </Grid>

                <Grid item xs={12} md={6} mb={4}>
                    <div className='custom-card' style={{height:'100%', marginBottom:'0'}}>
                        <div className='head-wrap'>
                            <h5>Appointment history</h5>
                        </div>

                        <ul>
                            <li>
                                <span>No of Appointment</span>
                                <p>: 02</p>
                            </li>
                            <li>
                                <span>Start date</span>
                                <p>: December 22, 2022</p>
                            </li>
                            <li>
                                <span>Start Time</span>
                                <p>: 10:00 - 10:30 AM (30 minutes)</p>
                            </li>
                        </ul>

                    </div>
                </Grid>
            </Grid>

            <Typography variant="font22" mb={2} sx={{ fontWeight: "700" }} component="h1"> Consultations  </Typography>
            <div style={{marginBottom:'20px'}}>
                <div className='custom-card' style={{ paddingBottom: '0' }}>
                    <div className='head-wrap'>
                        <h5>Prescriptions and Medical Advice</h5>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur. Vitae quis tortor orci nisl eu posuere sollicitudin. Porttitor viverra eu ac enim ultrices lacinia lacus integer diam. Sed ultricies velit id hendrerit arcu purus at maecenas. Vestibulum adipiscing tellus mauris eget maecenas. Laoreet ut suspendisse ut risus nunc iaculis. Dignissim pulvinar mi maecenas nisi dolor amet nunc quis sed. </p>

                    <div className='bottom-bar'>
                        <img src={CalenderIcon} alt="Date" />
                        <span> December 22, 2022 </span>
                        <span style={{ borderRight: '0' }}>10:00 - 10:30 AM (30 minutes)</span>

                        <Button className='buttonPrimary big' variant="contained" color="primary" fullWidth>
                            Send prescription <img src={DownloadForwordIcon} alt="Send Prescription" style={{ paddingLeft: '10px' }} />
                        </Button>
                    </div>
                </div>
                <div className='custom-card' style={{ paddingBottom: '0' }}>
                    <div className='head-wrap'>
                        <h5>Prescriptions and Medical Advice</h5>
                    </div>
                    <p>Lorem ipsum dolor sit amet consectetur. Vitae quis tortor orci nisl eu posuere sollicitudin. Porttitor viverra eu ac enim ultrices lacinia lacus integer diam. Sed ultricies velit id hendrerit arcu purus at maecenas. Vestibulum adipiscing tellus mauris eget maecenas. Laoreet ut suspendisse ut risus nunc iaculis. Dignissim pulvinar mi maecenas nisi dolor amet nunc quis sed. </p>

                    <div className='bottom-bar'>
                        <img src={CalenderIcon} alt="Date" />
                        <span> December 22, 2022 </span>
                        <span style={{ borderRight: '0' }}>10:00 - 10:30 AM (30 minutes)</span>

                        <Button className='buttonPrimary big' variant="contained" color="primary" fullWidth>
                            Send prescription <img src={DownloadForwordIcon} alt="Send Prescription" style={{ paddingLeft: '10px' }} />
                        </Button>
                    </div>
                </div>
            </div>

            <Typography variant="font22" mb={2} sx={{ fontWeight: "700" }} component="h1"> Additional Notes or Instructions </Typography>
            <div className='custom-card'>
                Lorem ipsum dolor sit amet consectetur. Vitae quis tortor orci nisl eu posuere sollicitudin. Porttitor viverra eu ac enim ultrices lacinia lacus integer diam. Sed ultricies velit id hendrerit arcu purus at maecenas. Vestibulum adipiscing tellus mauris eget maecenas. Laoreet ut suspendisse ut risus nunc iaculis. Dignissim pulvinar mi maecenas nisi dolor amet nunc quis sed.
            </div>
        </div>
    )
}

export default PatientHistory
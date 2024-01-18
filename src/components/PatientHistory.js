import React, { useEffect, useState } from 'react';
import DownloadForwordIcon from '../assets/images/document-forward.png';
import CalenderIcon from '../assets/images/calender.svg';
import { Button, Typography, Grid } from "@mui/material";
import axios from '../apis/axiosConfig';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const PatientHistory = () => {
    const params = useParams();
    const [consultationData, setConsultationData] = useState(null);
    const [patientData, setPatientData] = useState(null);
    const [appointmentData, setappointmentData] = useState(null);

    const [appointmentDetail, setappointmentDetail] = useState([]);

    useEffect(() => {
        axios.get(axios.defaults.baseURL + '/doctor/patient_detailed?user_id=' + params.user_id + '&patient_id=' + params.patient_id).then((patientData) => {
            console.log(patientData.data);
            setConsultationData(patientData.data.consultation_data);
            setPatientData(patientData.data.patient_data);
            setappointmentData(patientData.data.appointments_data);
            setappointmentDetail(patientData.data?.appointments_details)
        });
    }, []);
    return (
        <div className='patient-detail-page'>
            <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Patient history </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} mb={4}>
                    <div className='custom-card' style={{ height: '100%', marginBottom: '0' }}>
                        <div className='head-wrap'>
                            <h5>Patient Information</h5>
                            <span>ID #{patientData?.patient_id}</span>
                        </div>

                        <ul>
                            <li>
                                <span>Full Name</span>
                                <p>: {patientData?.name}</p>
                            </li>
                            <li>
                                <span>Phone</span>
                                <p>: {patientData?.phone}</p>
                            </li>
                            <li>
                                <span>Email</span>
                                <p>: {patientData?.email}</p>
                            </li>
                            <li>
                                <span>Age</span>
                                <p>: {patientData?.age} </p>
                            </li>
                        </ul>

                    </div>
                </Grid>

                <Grid item xs={12} md={6} mb={4}>
                    <div className='custom-card' style={{ height: '100%', marginBottom: '0' }}>
                        <div className='head-wrap'>
                            <h5>Appointment history</h5>
                        </div>
                        {appointmentData ?
                            <ul>
                                <li>
                                    <span>No of Appointment</span>
                                    <p>: {appointmentData?.no_of_appointment}</p>
                                </li>
                                <li>
                                    <span>Start date</span>
                                    <p>: {new Date(appointmentData?.date_time).toLocaleDateString()}</p>
                                </li>
                                <li>
                                    <span>Start Time</span>
                                    <p>: {new Date(appointmentData?.date_time).toLocaleTimeString()} - {new Date(new Date(appointmentData.date_time).getTime() + 15 * 60000).toLocaleTimeString()}</p>
                                </li>
                            </ul>
                            : ''}
                    </div>
                </Grid>
            </Grid>

            <Typography variant="font22" mb={2} sx={{ fontWeight: "700" }} component="h1"> Consultations  </Typography>
            <div style={{ marginBottom: '20px' }}>
                {consultationData != null ? consultationData.map((data) => {
                    return (
                        <>
{data?.prescription && <>


    <div className='custom-card' style={{ paddingBottom: '0' }}>
                                <div className='head-wrap'>
                                    <h5>Prescriptions and Medical Advice</h5>
                                </div>
                                <p>{data?.prescription.replace(/(<([^>]+)>)/ig, '')}</p>
                                {/* {data?.appointment?.schedule_date? */}
                                <div className='bottom-bar'>
                                    <div style={{padding:'10px'}}>
                                    <img src={CalenderIcon} alt="Date" />
                                    <span> {new Date(data?.created).toDateString()}</span>
                                    <span style={{ borderRight: '0' }}>{new Date(data?.created).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                {/* :''} */}
                            </div> 
</>}</>
                    )
                }) : ""
                }
            </div>
            {

                appointmentDetail && <>


                    {
                        <>

                            <Typography variant="font22" mb={2} sx={{ fontWeight: "700" }} component="h1"> Additional Notes or Instructions </Typography>

                            {
                                appointmentDetail?.map((item, index) => {
                                    return (
                                        <>
                                            {item['additional_note'] && <>

                                                <div className='custom-card' style={{ paddingBottom: '0' }}>
                                                    <div className="card-body">
                                                        <p className="card-text">{item['additional_note']}</p>



                                                        <div className='bottom-bar'>
                                                            <div style={{padding:'10px'}}>
                                                            <img src={CalenderIcon} alt="Date" />
                                                            <span> {new Date(item['schedule_date']).toDateString()}</span>
                                                            <span style={{ borderRight: '0' }}>{new Date(item['schedule_date']).toLocaleTimeString()}</span>
                                                            </div>
                                                        </div>
                                                        {/* <span> {new Date().toDateString()}</span> */}

                                                    </div>

                                                </div>


                                            </>
                                            }

                                        </>
                                    )

                                })
                            }
                        </>

                    }


                </>

            }


        </div>
    )
}

export default PatientHistory
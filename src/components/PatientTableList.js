import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  InputBase,
  Typography,
  Paper,
  IconButton,
  Grid,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import trashIcon from "../assets/images/trash.svg";
import viewIcon from "../assets/images/eye.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Switch from '@mui/material/Switch';
import NoDataImg from '../assets/images/no-data.png';
import DeleteDialog from "../components/DeleteDialog";
import { getPatientLidting } from '../apis/doctorApi';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";
// import Loader from "../components/Loader";
// import Filter from "../components/Filter";
import moment from "moment";

function PatientTableList(props) {
    const PatientData=props.PatientData
    console.log(props.type,PatientData);
    function dateformat(params) {
        return moment(params).format('YYYY-MM-DD')
        
      }
      const navigate = useNavigate();

    const columns = [
        { id: "id", label: "Sr.No.", minWidth: 40, },
        { id: "patientName", label: "Patient name", minWidth: 140 },
        { id: "mobileNo", label: "Mobile No.", minWidth: 40 },
        { id: "age", label: "Age", minWidth: 110 },
        { id: "email", label: "Email", minWidth: 110 },
        { id: "lastAppointment", label: "last Appointment", minWidth: 110 },
        { id: "action", label: "Action", minWidth: 140, align: "center" },
      ];

  return (
    <div>
          {PatientData  ?
            (<Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {PatientData?.slice(props.Page * props.RowsPerPage, props.Page * props.RowsPerPage + props.RowsPerPage).map((data,index) => (
                  <TableRow
                    key={data.patient.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell> {index+1} </TableCell>
                    <TableCell><span onClick={() => { navigate("/patient-history/"+data.patient.patient_id+"/"+data.patient.user.user_id) }}>{data.patient.name}</span></TableCell>
                    <TableCell>{data?.patient?.phone}</TableCell>
                    <TableCell>{data?.patient?.age}</TableCell>
                    <TableCell>{data?.patient?.email}</TableCell>
                    <TableCell>{dateformat(data.patient.created)}</TableCell>
                    <TableCell>
                      <div className="action-wrap">
                        {/* <IconButton
                          aria-label="view"
                          size="small"
                          onClick={handleDeleteOpen}
                        >
                          <img src={trashIcon} alt="delete" />
                        </IconButton> */}
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => { navigate("/patient-history/"+data.patient.patient_id+"/"+data.patient.user.user_id) }}
                        >
                          <img src={viewIcon} alt="edit" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>)
            :
            (<div className="no-data-wrap">
              <img src={NoDataImg} alt="No Doctor" />
              <h5 className="mt-0">No appointment scheduled yet!</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>)

          }
    </div>
  )
}

export default PatientTableList
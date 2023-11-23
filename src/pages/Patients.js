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
import Loader from "../components/Loader";
import Filter from "../components/Filter";
const columns = [
  { id: "id", label: "Sr.No.", minWidth: 40, },
  { id: "patientName", label: "Patient name", minWidth: 140 },
  { id: "mobileNo", label: "Mobile No.", minWidth: 40 },
  { id: "age", label: "Age", minWidth: 110 },
  { id: "email", label: "Email", minWidth: 110 },
  { id: "lastAppointment", label: "last Appointment", minWidth: 110 },
  { id: "action", label: "Action", minWidth: 140, align: "center" },
];
function createData(id, patientName, mobileNo, age, email, lastAppointment, action) {
  return {
    id,
    patientName,
    mobileNo,
    age,
    email,
    lastAppointment,
    action
  };
}
const rows = [
  createData('#2J983KT0', "Theresa Webb", "(+91) 9899772734", "24", "tim.jennings@example.com", "8/16/13", ""),
  createData('#2J983KT0', "Theresa Webb", "(+91) 9899772734", "24", "tim.jennings@example.com", "8/16/13", ""),
  createData('#2J983KT0', "Theresa Webb", "(+91) 9899772734", "24", "tim.jennings@example.com", "8/16/13", ""),
]


const Patients = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(14);
  const [patientList, setPatientList] = useState();

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteOpen = () => {
    setDeleteDialog(true);
  };
  const handleDeleteClose = () => {
    setDeleteDialog(false);
  };

  useEffect(() => {
    getPatientLidting()
      .then((response) => {
        if ((response.data)) {
          setPatientList(response?.data?.data);
          console.log('patient-listing', response?.data?.data);
        } else {
          console.error("API response is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log("errr", error);
      })
  }, []);


  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  const [search, setSearch] = useState("");
 
  const [value, setValue] = useState(0);
  const [filteredListing, setFilteredListing] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [statusListing, setStatusListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState({});
  const [openRecheduleDialog, setRescheduleDialog] = useState({ open: false });
  const filterData = (data) => {
      // setFilteredListing(appointmentListing.filter((value) => {
      //     return value.patient.name.toLowerCase().includes(data.toLowerCase()) || value.doctor.user.first_name.toLowerCase().includes(data.toLowerCase()) || value.doctor.user.last_name.toLowerCase().includes(data.toLowerCase()) || value.patient.email.toLowerCase().includes(data.toLowerCase()) || value.patient.phone.includes(data);
      // }));

  }

  
  console.log(searchQuery)
  return (
    <div>
      <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Patient </Typography>

      <Paper className="tableMainWrap">
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center" }}
          className="tableFillterWrap"
        >
          <Grid item xs={6} md={6} sx={{ display: "flex" }}>
          <Filter
            search={true}
            searchQuery={searchQuery}
            date={true}
            download={false}
            setSearch={setSearch}
            setSearchQuery={setSearchQuery}
            // filterData={filterData}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />

          <Paper className="tableMainWrap">


                {/* <TableContainer className="customTable">
                    {appointmentListing.length > 0 ?
                        <Table stickyHeader aria-label="sticky table">
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
                                {filteredListing
                                    // .filter((doctor) =>
                                    //     `${doctor.user.first_name} ${doctor.user.last_name}`
                                    //         .toLowerCase()
                                    //         .includes(searchQuery.toLowerCase())
                                    // )
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((data, index) => (
                                        <TableRow
                                            key={data.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell> {page * rowsPerPage + index + 1} </TableCell>


                                            <TableCell>


                                                <Link to={`${data?.appointment_id}`} state={data}>
                                                    {data.patient.name}
                                                </Link>

                                            </TableCell>
                                            <TableCell>{new Date(data.schedule_date).toLocaleTimeString()} {new Date(data.schedule_date).toDateString()}</TableCell>
                                            <TableCell>{data.doctor.user.first_name} {data.doctor.user.last_name}</TableCell>
                                            <TableCell>{data.patient.email}</TableCell>
                                            <TableCell>{data.patient.phone}</TableCell>
                                            <TableCell>
                                                <Select
                                                    className="select-field status"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={selectedType[data.appointment_id]}
                                                    onChange={(event) => {
                                                        handleTypeChange(event, data.appointment_id);
                                                        handleSelectedTypeChange(data.appointment_id, event.target.value); // Call the callback to update selectedType
                                                        // axios.put(axios.defaults.baseURL+"/admin/appointment-list",{"id":data.appointment_id,"status":event.target.value})
                                                        var myHeaders = new Headers();
                                                        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));
                                                        myHeaders.append("Content-Type", "application/json");

                                                        var raw = JSON.stringify({
                                                            "id": data.appointment_id,
                                                            "status": event.target.value
                                                        });

                                                        var requestOptions = {
                                                            method: 'PUT',
                                                            headers: myHeaders,
                                                            body: raw,
                                                            redirect: 'follow'
                                                        };

                                                        fetch(axios.defaults.baseURL + "admin/appointment-list", requestOptions)
                                                            .then(response => response.text())
                                                            .then(result => console.log(result))
                                                            .catch(error => console.log('error', error));
                                                    }}
                                                    name="status"
                                                    fullWidth
                                                >
                                                    {selectedType[data.appointment_id] && (
                                                        <MenuItem value={selectedType[data.appointment_id]}>
                                                            {selectedType[data.appointment_id]}
                                                        </MenuItem>
                                                    )}
                                                    <MenuItem value="Reschedule" onClick={() => {
                                                        handleOpenRescheduleDialog(data.appointment_id);
                                                        logSelectedType();
                                                    }}>
                                                        Reschedule
                                                    </MenuItem>
                                                    <MenuItem value="Cancel" onClick={() => handleCancelAppointment(data.appointment_id)}>Cancel</MenuItem>
                                                </Select>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        :
                      <Loader />
                    }
                </TableContainer> */}
            </Paper>
            <IconButton type="button" className='fillterButton'>
              {/* <img src={fillter} alt="filter" /> */}
            </IconButton>
          </Grid>
        </Grid>
        <TableContainer className="customTable">
          {patientList && patientList.length > 0 ?
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
                {patientList.map((data,index) => (
                  <TableRow
                    key={data.patient.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell> {index+1} </TableCell>
                    <TableCell><span onClick={() => { navigate("/patient-history/"+data.patient.patient_id+"/"+data.patient.user.user_id) }}>{data.patient.name}</span></TableCell>
                    <TableCell>{data.patient.phone}</TableCell>
                    <TableCell>{data.patient.age}</TableCell>
                    <TableCell>{data.patient.email}</TableCell>
                    <TableCell>{formatDate(data.patient.created)}</TableCell>
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
        </TableContainer>
      </Paper>
      <TablePagination
        className="customTablePagination"
        rowsPerPageOptions={[14, 28, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {openDeleteDialog && (
        <DeleteDialog open={openDeleteDialog} onClose={handleDeleteClose} />
      )}

    </div>
  )
}

export default Patients
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
import moment from "moment";
import PatientTableList from "../components/PatientTableList";
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
          setData(response?.data?.data)
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
  // function dateformat(params) {
  //   return moment(params).format('YYYY-MM-DD')

  // }

  const [value, setValue] = useState(0);
  const [filteredListing, setFilteredListing] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [statusListing, setStatusListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState({});
  const [openRecheduleDialog, setRescheduleDialog] = useState({ open: false });
  // console.log(fromDate?.getTime(), toDate, searchQuery);
  // console.log(new Date(fromDate).getTime());
  // setFilteredListing(filteredListing.filter(value=>new Date(value.schedule_date).getTime() <= new Date(toDate).getTime()+ 86400000));

  const [data, setData] = useState([]);
  function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? false : true;
  }

  useEffect(() => {
    // const filteredData = patientList?.filter(item =>
    //   item?.patient?.name?.toLowerCase().includes(searchQuery?.toLowerCase())

    // );
    // console.log('filteredData',filteredData);

    if (searchQuery) {
      setData(data?.filter(item => item?.patient?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      ));
    }
    // setData(filteredData);

  }, [searchQuery])






  useEffect(() => {
    // fromDate, toDate,
    if (fromDate) {
      setData(data?.filter(value => new Date(value?.patient?.name).getTime() >= new Date(fromDate).getTime()));
    }
  }, [fromDate]);
  useEffect(() => {
    if (toDate) {
      setData(data?.filter(value => new Date(value?.patient?.name).getTime() <= new Date(toDate).getTime() + 86400000));
    }
  }, [toDate]);
  // const filterData = (data) => {
  //     // setFilteredListing(appointmentListing.filter((value) => {
  //     //     return value.patient.name.toLowerCase().includes(data.toLowerCase()) || value.doctor.user.first_name.toLowerCase().includes(data.toLowerCase()) || value.doctor.user.last_name.toLowerCase().includes(data.toLowerCase()) || value.patient.email.toLowerCase().includes(data.toLowerCase()) || value.patient.phone.includes(data);
  //     // }));

  // }


  console.log(searchQuery)
  return (
    <div>
      <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Patient </Typography>

      <Paper className="tableMainWrap">
        <Grid
          container
          spacing={2}
          sx={{ alignItems: "center", justifyContent: 'space-between' }}
          className="tableFillterWrap"
        >
          <Grid item xs={6} md={6} sx={{ display: "flex" }}>
            <Paper component="form" className="headerSearchWrap">
              <IconButton
                type="button"
                sx={{ p: "0px", fontSize: "18px", color: "#2B7DCD" }}
                aria-label="search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </IconButton>
              <InputBase
                placeholder="Search Patient..."
                inputProps={{ "aria-label": "Search..." }}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  // props.filterData(e.target.value);
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: 'flex-end' }}>
            <div class="filter-outer">
              <div class="filter-wrap custom-datepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker inputFormat="YYYY-MM-DD" // 13-09-2022
                    label="From Date" value={fromDate} onChange={(newValue) => setFromDate(newValue)} />
                  <DatePicker inputFormat="YYYY-MM-DD" // 13-09-2022
                    label="To Date" value={toDate} onChange={(newValue) => setToDate(newValue)} />
                </LocalizationProvider>
              </div>
            </div>
            <Button className="buttonPrimary small" type="button" style={{ color: '#fff' }}>
              Reset Filter
            </Button>
          </Grid>

        </Grid>
        <TableContainer className="customTable">
          {

            isEmpty(data) &&
            <>

              <PatientTableList PatientData={data} Page={page} RowsPerPage={rowsPerPage} type="fresh" />


            </>

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
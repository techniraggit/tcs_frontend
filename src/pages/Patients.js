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


const Patients = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
          setFilteredResults(response?.data?.data)
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
  const [filteredResults, setFilteredResults] = useState([]);
  console.log(filteredResults.length);


  const [value, setValue] = useState(0);
  const [filteredListing, setFilteredListing] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [statusListing, setStatusListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState({});
  const [openRecheduleDialog, setRescheduleDialog] = useState({ open: false });
  console.log(fromDate, toDate);

  const [data, setData] = useState([]);
  function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? false : true;
  }



  const searchItems = (searchValue) => {
    // setSearchInput(searchValue)
    setSearchQuery(searchValue);

    if (searchQuery !== '') {
      const filteredData = patientList.filter((item) => {
        return Object.values(item?.patient).join().toLowerCase().includes(searchValue.toLowerCase())
      })
      setFilteredResults(filteredData)
    }

    else {
      setFilteredResults(patientList)
    }
  }


  useEffect(() => {
    // fromDate, toDate,
    if (fromDate) {
      let res = filteredResults?.filter(value => new Date(value?.patient?.created).getTime() >= new Date(fromDate).getTime())
      console.log(res);
      setFilteredResults(res);
    }
    if (toDate) {
      setFilteredResults(filteredResults?.filter(value => new Date(value?.patient?.created).getTime() <= new Date(toDate).getTime() + 86400000));
    }
  }, [fromDate, toDate]);

  function onsubmit(params) {
    searchItems('');

    setFromDate(null)
    setToDate(null)
  }
  // console.log(searchQuery)
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
                onChange={(e) => searchItems(e.target.value)}

              />
            </Paper>
          </Grid>

          <Grid item xs={6} md={6} sx={{ display: "flex", justifyContent: 'flex-end' }}>
            <div class="filter-outer">
              <div class="filter-wrap custom-datepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker inputFormat="YYYY-MM-DD" // 13-09-2022
                    label="From Date" value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                  // onChange={(e) => searchItems(e.target.value)}

                  />
                  <DatePicker inputFormat="YYYY-MM-DD" // 13-09-2022
                    label="To Date" value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                  // onChange={(e) => searchItems(e.target.value)}


                  />
                </LocalizationProvider>
              </div>
            </div>
            <Button className="buttonPrimary small" 
            type="submit" 
            onClick={()=>{onsubmit()}}
        
            style={{ color: '#fff' }}>
              Reset Filter
            </Button>
          </Grid>

        </Grid>
        <TableContainer className="customTable">




          <PatientTableList PatientData={filteredResults} Page={page} RowsPerPage={rowsPerPage} type="filter" />




        </TableContainer>
      </Paper>
      <TablePagination
        className="customTablePagination"
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredResults?.length || 0}
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
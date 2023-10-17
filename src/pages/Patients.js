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

const columns = [
  { id: "id", label: "ID", minWidth: 40, },
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
            <Paper component="form" className="headerSearchWrap">
              <IconButton
                type="button"
                sx={{ p: "0px", fontSize: "18px", color: "#2B7DCD" }}
                aria-label="search"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </IconButton>
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "Search..." }}
              // value={searchQuery}
              // onChange={handleChange}
              />
            </Paper>
            {/* <IconButton type="button" className='fillterButton'>
              <img src={fillter} alt="filter" />
            </IconButton> */}
          </Grid>
        </Grid>
        <TableContainer className="customTable">
          {patientList && patientList.length > 0 ?
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
                {patientList.map((data) => (
                  <TableRow
                    key={data.patient.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell> {data.patient.patient_id} </TableCell>
                    <TableCell>{data.patient.name}</TableCell>
                    <TableCell>{data.patient.phone}</TableCell>
                    <TableCell>{data.patient.age}</TableCell>
                    <TableCell>{data.patient.email}</TableCell>
                    <TableCell>{formatDate(data.patient.created)}</TableCell>
                    <TableCell>
                      <div className="action-wrap">
                        <IconButton
                          aria-label="view"
                          size="small"
                          onClick={handleDeleteOpen}
                        >
                          <img src={trashIcon} alt="delete" />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => { navigate("/patient-history") }}
                        >
                          <img src={viewIcon} alt="edit" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
            :
            <div className="no-data-wrap">
              <img src={NoDataImg} alt="No Doctor" />
              <h5 className="mt-0">No appointment scheduled yet!</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>

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
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  Typography,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import trashIcon from "../assets/images/trash.svg";
import viewIcon from "../assets/images/eye.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Switch from '@mui/material/Switch';
import DeleteDialog from "../components/DeleteDialog";
import axios from "../apis/axiosConfig";

const columns = [
  { id: "id", label: "ID", minWidth: 40, },
  { id: "subject", label: "Subject", minWidth: 140 },
  { id: "description", label: "Description ", minWidth: 300 },
  { id: "date", label: "Notification Date", minWidth: 80 },
];
function createData(id, subject, description, date, action) {
  return {
    id,
    subject,
    description,
    date,
    action
  };
}
// const rows = [
//   createData('1', "Theresa Webb", "Lorem ipsum", "8/16/13"),
//   createData('2', "Theresa Webb", "Lorem ipsum", "8/16/13"),
//   createData('3', "Theresa Webb", "Lorem ipsum", "8/16/13"),

// ]


const Notifications = () => {
  const [rows, setRows] = useState(null);
  useEffect(()=>{
    axios.get(axios.defaults.baseURL+'/doctor/notifications').then((data)=>{
      console.log(data.data.notifications);
      setRows(data.data.notifications);
    });
  },[]);
  const [page, setPage] = React.useState(0);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(14);

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

  return (
    <div>
      <Typography variant="font22" mb={4} sx={{ fontWeight: "700" }} component="h1"> Notifications </Typography>

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
              {rows?rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell style={{cursor:'pointer', textDecoration:'underline'}}> {row.id} </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.message}</TableCell>
                  <TableCell>{new Date(row.created).toLocaleDateString()} {new Date(row.created).toLocaleTimeString()}</TableCell>
                </TableRow>
              )):''}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        className="customTablePagination"
        rowsPerPageOptions={[14, 28, 50]}
        component="div"
        count={rows?rows.length:1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      { openDeleteDialog  && (
        <DeleteDialog open={openDeleteDialog} onClose={handleDeleteClose} />
      )}

    </div>
  )
}

export default Notifications
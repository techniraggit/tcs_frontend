import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Filter(props) {
  console.log(props);
  return (
    <div className="filter-outer">

      {props.search && (<>  
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
                            value={props.searchQuery}
                            onChange={(e) => {
                                props.setSearchQuery(e.target.value);
                                // props.filterData(e.target.value);
                            }}
                        />
                    </Paper>
      </>)}
      {props.date && (
        <div className="filter-wrap custom-datepicker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              className="custom-datepicker"
              components={["DatePicker"]}
            >
              <strong>Filter</strong>
              <DemoItem className="custom-datepicker">
                <DesktopDatePicker
                  maxDate={dayjs(props.toDate)}
                  defaultValue={dayjs(props.fromDate)}
                  onChange={(value) => {
                    props.setFromDate(dayjs(value));
                  }}
                />
              </DemoItem>
              <span style={{ color: "#B0AFAF" }}> To </span>
              <DemoItem>
                <DesktopDatePicker
                  minDate={dayjs(props.fromDate)}
                  defaultValue={dayjs(props.toDate)}
                  onChange={(value) => {
                    props.setToDate(dayjs(value));
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      )}

      {props.download && (
        <Button
          className="buttonPrimary small"
          variant="contained"
          fullWidth
          
          sx={{ maxWidth: "150px"}}
          onClick={props.handleDownload}
        >
          Download List
        </Button>
      )}
    </div>
  );
}

export default React.memo(Filter);
import React, {useState} from "react";
import Box from "@mui/material/Box";
import {
  IconButton,
  Grid,
  Avatar,
  Paper,
  InputBase,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import "./../assets/scss/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
  faXmark,
  faBars
} from "@fortawesome/free-solid-svg-icons";
import BellIcon from "./../assets/images/notification-icon.svg";
import Avtaar from "./../assets/images/avtaar.png";
import headerLogo from '../assets/images/eyemyeye-logo.png';
import { Link } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { logOut } from "../apis/doctorApi";
import axios from "../apis/axiosConfig";

function FadeMenu() {
  const [profileMenu, setProfileMenu] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(profileMenu);
  const handleClick = (event) => {
    setProfileMenu(event.currentTarget);
  };
  const handleClose = () => {
    setProfileMenu(null);
  };
  const handleLogOut = () => {
    logOut().then((res) => {
      if (res?.data?.status) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <div className="userInfoWrap">
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="userInfoToggle"
        sx={{ p: "0" }}
      >
        {localStorage.getItem('name')} <FontAwesomeIcon icon={faAngleDown} />
      </Button>
      <Menu
        id="fade-menu"
        className="header-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        profileMenu={profileMenu}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => navigate('/profile', handleClose())}>My profile</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
      <Typography variant="font12" component="p" sx={{ color: "#737791" }}>
        {localStorage.getItem('type')}
      </Typography>
    </div>
  );
}
export default function Header({ menu, handleShowMenu }) {
  const navigate = useNavigate();
  return (
    <Stack className="header" sx={{ background: "#fff", boxShadow: "none" }}>
      <Grid container spacing={2} className="mobile-res" sx={{ alignItems: "center" }}>
        <Grid item xs={5} md={5}>
          {/* <Paper component="form" className="headerSearchWrap">
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "Search..." }}
            />
            <IconButton
              type="button"
              sx={{ p: "0px", fontSize: "18px", color: "#2B7DCD" }}
              aria-label="search"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </IconButton>
          </Paper> */}
        </Grid>
        <Grid item xs={7} md={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div className="mobile-wrap">
              <div className="menu-toggle">
                <span className="bar-wrap" onClick={handleShowMenu}><FontAwesomeIcon icon={faBars} /></span>
              </div>
              <Link className="head-logo" to="/appointments"> <img src={headerLogo} alt="POS EyeMyeye" /></Link>

            </div>
            <div style={{display:'flex', alignItems:'center'}}>
              <IconButton className="notificationButton" onClick={() => navigate('/notifications')}>
                <span className="activeIcon"></span>
                <img src={BellIcon} alt="Notification" />
              </IconButton>
              <Avatar
                className="avatar-wrap"
                alt="Remy Sharp"
                src={`${axios.defaults.baseURL}${localStorage.getItem('image')}`}
                sx={{ width: 46, height: 46, borderRadius: "12px" }}
              />
               <FadeMenu />
            </div>
           
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
}

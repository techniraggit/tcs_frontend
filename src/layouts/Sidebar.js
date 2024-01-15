import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import SidebarLogo from '../assets/images/eyemyeye-logo.png';
import Appointmenticon from '../assets/images/appointment.svg';
import PatientIcon from '../assets/images/patient.svg';
import NotificationIcon from '../assets/images/notification.svg';
import LogoutIcon from '../assets/images/logout.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Sidebar({handleHideMenu}) {
  const location = useLocation();

  return (
    <>
    <span className="close-icon" onClick={handleHideMenu}><FontAwesomeIcon icon={faXmark} /></span>
      <Link className='logo-wrap' to="/appointments"> <img src={SidebarLogo} alt="POS EyeMyeye" /></Link>
      <nav className='retailerSidebar'>
        <ul>
          <li className={`${location.pathname === '/appointments' ? 'active' : ''} `} onClick={handleHideMenu}>
            <Link to="/appointments">
              <img src={Appointmenticon} alt="Appointments" />
                Appointments
            </Link>
          </li>
          <li className={`${location.pathname === '/patients' ? 'active' : ''} `} onClick={handleHideMenu}>
            <Link to="/patients">
              <img src={PatientIcon} alt="Patients" />
                Patients
            </Link>
          </li>
          <li className={`${location.pathname === '/notifications' ? 'active' : ''} `} onClick={handleHideMenu}>
            <Link to="/notifications">
              <img src={NotificationIcon} alt="Notifications" />
                Notifications
            </Link>
          </li>
        </ul>
        <Link to="/" className='logout-wrap'>
          <img src={LogoutIcon} alt="Log out" />
          Log out
        </Link>
      </nav>
    </>
  )
}

export default Sidebar;
import React, { useState } from 'react'
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GoToTop from "../components/GoToTop";
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Layout() {
    const[menu, setMenu] = useState(false)
    const navigate = useNavigate();
    const handleShowMenu = () => {
        setMenu(true)
    }
    const handleHideMenu = () => {
      setMenu(false)
    }
    return (
        <div className={`body-wrapper ${menu ? 'menu-open' : ''}`}>
            <div className={`sidebar ${menu ? 'show' : ''}`}>
                <Sidebar handleHideMenu={handleHideMenu} />
            </div>
            <div className="bodyWrap">
                <Header menu={menu} handleShowMenu={handleShowMenu} />
                <div className="mainContentWrap">
                    <Outlet />
                </div>
            </div>

            {/* <Footer /> */}
            <GoToTop />
          
        </div>

    )
}


export default Layout;
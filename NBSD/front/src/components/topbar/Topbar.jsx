import React from 'react'
import "./topbar.css"
import Logo from "../../asset/NBDS.png";
import { NotificationsNone, Language, Settings } from '@mui/icons-material';


export default function Topbar() {
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="title">Panneau Administratif</span>
                <img src={Logo} className="rounded-lg h-14 w-16 logo" alt="logo"/>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer">
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>

                <div className="topbarIconContainer">
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>

                <div className="topbarIconContainer">
                    <Settings />
                </div>

                {/*<img src={Logo} alt="avatar" className="topAvatar" /> */}
            </div>
        </div>
    </div>
  )
}

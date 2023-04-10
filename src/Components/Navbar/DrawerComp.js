import React, { useState } from 'react'
import { Drawer,List, ListItemButton, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import "./DrawerComp.css";

//Drawer component 
const DrawerComp = () => {
  // state to switch between opening and closing of drawer
  const [openDrawer, setopenDrawer] = useState(false);
  return (
<React.Fragment>
      <Drawer open={openDrawer} onClose={() => setopenDrawer(false)}>
        <List>
          <ListItemButton onClick={() => setopenDrawer(false)}>
            <ul className="navbar-linksTwo">
              <li className="nav-itemtwo">
                <NavLink exact="true" to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink exact="true" to="/my-quiz" className="nav-link">
                  My Quiz
                </NavLink>
              </li>
              <li>
                <NavLink exact="true" to="/play-quiz" className="nav-link">
                  Play Quiz
                </NavLink>
              </li>
            </ul>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setopenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp

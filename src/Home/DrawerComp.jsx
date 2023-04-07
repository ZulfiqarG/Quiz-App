import { Drawer, IconButton, List, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./DrawerComp.css";

const DrawerComp = () => {
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
                <NavLink exact="true" to="/SingleQuiz" className="nav-link">
                  My Quiz
                </NavLink>
              </li>
              <li>
                <NavLink exact="true" to="/PlayQuiz" className="nav-link">
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
  );
};

export default DrawerComp;

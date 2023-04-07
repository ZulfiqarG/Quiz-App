import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Grid,
} from "@mui/material";
import React from "react";
import DrawerComp from "./DrawerComp";
import MyLogo from "../img/Logo.png";
import "./Index.css";
import { NavLink } from "react-router-dom";


const Index = () => {
  //This is for undeline
  const theme = useTheme();
  //  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  //  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Avatar
            alt="Remy Sharp"
            src={MyLogo}
            sx={{ background: "#17c7d9" }}
          />

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", paddingLeft: "10%" }}>
                QuizBoard
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <div className="clsTitle">Welcome To QuizBoard</div>
              <Box sx={{ marginLeft: "auto" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ul className="navbar-links">
                      <li className="nav-item">
                        <NavLink exact="true" to="/" className="nav-link">
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact="true"
                          to="/SingleQuiz"
                          className="nav-link"
                        >
                          My Quiz
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact="true"
                          to="/PlayQuiz"
                          className="nav-link"
                        >
                          Play Quiz
                        </NavLink>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Box>              
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box>
        <Grid>
          <h2>Hellow</h2>
        </Grid>
      </Box>
      {/* <MainBody /> */}
    </React.Fragment>
  );
};
export default Index;

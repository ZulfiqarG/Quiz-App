import { AppBar, Avatar, Toolbar, Typography, useMediaQuery, useTheme, Box, Grid } from "@mui/material";
// import React, { useState } from "react";
import React from "react";
import DrawerComp from "./DrawerComp";
import MyLogo from '../img/Logo.png';
import './Index.css';
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";
// import MainBody from "./MainBody";
// import PlayQuiz from "../Play_Quiz/PlayQuiz";



// const PAGES = ["Home", "PlayQuiz", "Play Quizes"]; 
const Index=()=> {

  // const [btnState, setBtnState] = useState(false);

  // const navigate = useNavigate();
  // const navRefPlayQuiz = React.useRef(null);
  // const navRefMyQuiz = React.useRef(null);
  // const navRefHomeQuiz = React.useRef(null);

  // function handleHome() {
  //   // setBtnState(btnState => !btnState);
  //   navRefHomeQuiz.current.classList.add("Home");
  //   navRefPlayQuiz.current.classList.remove("PlayQuiz");
  //   navRefMyQuiz.current.classList.remove("MyQuiz");
  //   navigate("/MainBody");  
  // }
  // const handleMyQuiz = event => {
  //   navRefMyQuiz.current.classList.add("MyQuiz");
  //   navRefHomeQuiz.current.classList.remove("Home");
  //   navRefPlayQuiz.current.classList.remove("PlayQuiz");
  //   navigate("/SingleQuiz");
  // }
  // const handlePlayquiz = event => {
  //   navRefPlayQuiz.current.classList.add("PlayQuiz");
  //   navRefMyQuiz.current.classList.remove("MyQuiz");
  //   navRefHomeQuiz.current.classList.remove("Home");
  //   navigate("/PlayQuiz");
  // }
  // let toggleClassCheck = btnState ? 'active': '';
  // // this is for hover in tab
  //  const [value, setvalue] = useState();
   
   //This is for undeline
   const theme = useTheme();
  //  console.log(theme);
   const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  //  console.log(isMatch);
  
    return (
       
      <React.Fragment>
        <AppBar>
          <Toolbar>
          <Avatar alt="Remy Sharp" src={MyLogo} sx={{background:'#17c7d9'}}/>
            
            {
              isMatch ? (
                <>
                <Typography sx={{fontSize: "1.5rem", paddingLeft: "10%"}}>
                  QuizBoard
                </Typography>
                <DrawerComp />
                </>
              ) : (
                <>

<div className="clsTitle">Welcome To QuizBoard</div>
                <Box sx={{marginLeft: "auto"}}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    
                <ul className="navbar-links">
                  <li className="nav-item">
                    <NavLink exact="true"  to="/" className="nav-link">Home</NavLink>
                  </li>
                  <li>
                    <NavLink exact="true"  to="/SingleQuiz" className="nav-link">My Quiz</NavLink>
                  </li>
                  <li>
                    <NavLink exact="true"  to="/PlayQuiz" className="nav-link">Play Quiz</NavLink>
                  </li>
                </ul>
                </Grid>
                </Grid>
                </Box>
                {/* <Tabs textColor="inherit" sx={{marginLeft: "auto"}} indicatorColor="secondary">                        
                  <Tab label="Home"  onClick={handleHome} ref={navRefHomeQuiz}/>
                  <Tab label="My Quizes"  onClick={handleMyQuiz} ref={navRefMyQuiz}/>  
                  <Tab label="Play Quizes"  onClick={handlePlayquiz} ref={navRefPlayQuiz}/>                
            </Tabs> */}
            
                </>
              )
            }
            
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
}
export default Index;
import React from 'react'
import { AppBar, Toolbar, useMediaQuery,useTheme, Grid} from '@mui/material'
import { Box } from '@mui/system'
import pic from "../Images/Logo.png";
import DrawerComp from './DrawerComp';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

//Navbar Component
const Navbar = () => {   

   const theme=useTheme();
 const isMatch= useMediaQuery(theme.breakpoints.down("md")); /* returns true or false if the screens size is below md(900px) or not */

 const BoxStyle ={display:'flex'}

  return (
    <div className='navbar' style={{marginBottom:"10px"}}>
      <AppBar elevation={5} sx={{backgroundColor:"#1976d2",height:"70px"}} position="fixed"> 
            <Toolbar>
            
                <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"10px", width:"100%", alignItems:"center"}}component="div">
                    {/*Logo*/}
                    
                    <Box  style={BoxStyle}>                      
                        <img src={pic} alt="logo" width="55" height="50" />
                        <div className='divStyle'>Welcome To QuizBoard</div>
                     </Box>
                   


                    {/* Condition for hamburger menu */}
                    {
                        isMatch ? <DrawerComp/>:
                    //     <>
                    //     {/* Links */}
                    //     <Tabs indicatorColor='primary' value={val} onChange={(e,val)=>setVal(val)}> {/**onChange will return the val of the current tab and which will be set to 'value' for highlighting the current tab with primary color */}
                    //     <Tab label="Home"  component={Link} to={"/"} ></Tab>  
                    //     <Tab label="My Quiz" component={Link} to={"/my-quiz"} ></Tab>
                    //     <Tab label="Play Quiz" component={Link} to={"/play-quiz"}></Tab>
                    //     </Tabs>
                    // </>
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
                          to="/my-quiz"
                          className="nav-link"
                        >
                          My Quiz
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact="true"
                          to="/play-quiz"
                          className="nav-link"
                        >
                          Play Quiz
                        </NavLink>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Box> 
                    }

                </Box>
            
            </Toolbar>

      </AppBar>
      
    </div>
  )
}

export default Navbar

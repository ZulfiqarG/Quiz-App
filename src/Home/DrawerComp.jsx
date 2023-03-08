import { Drawer, IconButton, List, ListItemButton, } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './DrawerComp.css';


const DrawerComp = () => {
    const [openDrawer, setopenDrawer] = useState(false)
  return (
    
    <React.Fragment>
        <Drawer open={openDrawer} onClose={()=>setopenDrawer(false)}>

            <List>            
                    <ListItemButton onClick={()=> setopenDrawer(false)}>
                    
                        {/* <ListItemText>{page}</ListItemText> */}
                        
                    
                <ul className="navbar-linksTwo">
                  <li className="nav-itemtwo">
                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/SingleQuiz" className="nav-link">My Quiz</NavLink>
                  </li>
                  <li>
                    <NavLink exact to="/PlayQuiz" className="nav-link">Play Quiz</NavLink>
                  </li>
                </ul>
                
                        {/* <Grid container spacing={2}>
  <Grid item xs>
  <Typography onClick={handleHome} className="HoverEffect">Home</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography onClick={handleMyQuiz} className="HoverEffect">My Quiz</Typography>
  </Grid>
  <Grid item xs>
    <Typography onClick={handlePlayquiz} className="HoverEffect">Play Quiz</Typography>
  </Grid>
</Grid> */}
                    
                </ListItemButton>       
            </List>
        </Drawer>
        <IconButton sx={{color:'white', marginLeft:'auto'}} onClick={()=> setopenDrawer(!openDrawer)}>
            <MenuIcon />
        </IconButton>
    </React.Fragment>
    
  )
}

export default DrawerComp
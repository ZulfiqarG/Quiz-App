import { Alert, AlertTitle, Box,  Grid, Paper, Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import congratulations from '../img/congratulations.png';
import Error from '../img/404.jpg';
const Result = () => {

    
    const [userData, setUserData] = useState(null)

    useEffect(() => {
      const data = localStorage.getItem('Users')
      setUserData(JSON.parse(data))
    }, [])  

  return (
    <div>      
      {userData ? (
        <>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Paper className="paperStyle">
                <Grid align="center" >
                <img
              src={congratulations}
              alt=""
              className="my-image"
            />
                </Grid>
                <Grid align="center">
                <Typography variant="h5" className="title" align='center'>
                {userData.username}
        </Typography>
                  
                </Grid>
                <Grid align="center">
                  <h2> You've scored {userData.totalscore} out of {userData.outOf}</h2>                  
                </Grid>
                <hr className="hrStyle"></hr>
              </Paper>
            </Grid>            
          </Grid>
        </Box>  
        </>
      ) : (
        <div>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Paper className="paperStyle">
                <Grid align="center" >
                <img
              src={Error}
              alt=""
              className="my-image"
            />
                </Grid>
                <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  There is no Data — <strong>check it out your localstorage!</strong>
</Alert>
                <hr className="hrStyle"></hr>
              </Paper>
            </Grid>            
          </Grid>
        </Box>    
  </div>
      )}
    </div>
  )
}

export default Result
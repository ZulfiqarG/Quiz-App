import React, { useState } from "react";
import { Avatar, Button, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography, Link, Card } from "@mui/material";
import LockClockOutlinedIcon from '@mui/icons-material/LockClockOutlined';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import './Login.css'



 // const paperStyle={padding :20, height: '70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor: '#17adcf'}
    // const hrStyle={opacity:0}
    // const btnStyle={margin: '8px 0'}
  
const Login = () => {
   
   const [Signup, setSignup] = useState(false);
//    console.log(Signup);
   const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
   });
   const handleChange = (e)=> {
    setInputs((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value
    }));
   };
   const handleSubmit =(e)=> {
    e.preventDefault();
    console.log(Inputs);
   }
   const resetState=()=> {
    setSignup(!Signup);
    setInputs({name: "", email: "", password: ""});
   }

    return (
      
        <form onSubmit={handleSubmit}>
          <Card variant="outlined">
        <Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8}>
            <Paper className="paperStyle">
            <Grid align='center'>
           <Avatar style={avatarStyle}><LockClockOutlinedIcon /></Avatar>
            <h2>{Signup ? "Signup" : "Login"}</h2>
           </Grid>
           {Signup && (<TextField id="outlined-basic" type={'text'} label="Name" variant="outlined" fullWidth name="name" value={Inputs.name} onChange={handleChange}>
           </TextField>)}
           <hr className="hrStyle"></hr>
           <TextField id="outlined-basic" type={'email'} label="Email" variant="outlined" fullWidth required name="email" value={Inputs.email} onChange={handleChange}></TextField>
             <hr className="hrStyle"></hr>
           <TextField id="outlined-basic" label="Password" type='password' variant="outlined" fullWidth required name="password" value={Inputs.password} onChange={handleChange}>
           </TextField>
           <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
            </FormGroup>
            <Grid justifyContent="center" container spacing={2}>
            <Grid  item xs={12} md={8} >
           <Button variant="contained" type="submit" fullWidth endIcon={Signup ? <AppRegistrationIcon /> : <ExitToAppIcon />}>{Signup ? "Signup" : "Login"}</Button>            
           </Grid>
           </Grid>
           <hr className="hrStyle"></hr>
          <Typography>
            <Link href="/">Forgot password ?</Link>
           </Typography>
           <hr className="hrStyle"></hr>
            <Typography>
             <Link href="/" onClick={resetState} >Change to {Signup ? "Login" : "Signup"}</Link>
            </Typography>
            </Paper>
          
        </Grid>
      </Grid>
    </Box>
    </Card>
    </form>
  
    );
}

export default Login;
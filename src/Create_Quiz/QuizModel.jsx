import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizModel.css';

const QuizModel = ({closeModal}) => {
    
    const [open, setOpen] = React.useState(true);

    const navigate = useNavigate();
    
    function handleSingleQuiz() {
      navigate("/CreateNewQuiz");
    }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {

    setOpen(true);
  };
  return (

    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Choose Your Quiz Option"}
          <hr />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

          <Grid container spacing={2}>
  <Grid item xs>
  <Button variant="outlined" onClick={handleSingleQuiz}>MCQ(Single Correct)</Button>
  </Grid>
  <Grid item xs={12} md={4}>
  <Button variant="outlined">MCQ(Multiple Correct)</Button>
  </Grid>
  <Grid item xs>
  <Button variant="outlined">MCQ(1 or 2 words)</Button>
  </Grid>
  <Grid item xs={12} md={4}>
  <Button variant="outlined">MCQ(2 or 4 Sentence)</Button>
  </Grid>
</Grid>   
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> closeModal(false)}>Disagree</Button>
          <Button onClick={()=> closeModal(false)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default QuizModel
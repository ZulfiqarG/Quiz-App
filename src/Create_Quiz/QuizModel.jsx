import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizModel.css";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const avatarStyle={backgroundColor: '#d32f2f',cursor: 'pointer'}
const QuizModel = ({ closeModal }) => {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  function handleSingleQuiz() {
    navigate("/CreateNewQuiz");
  }

  const handleClose = () => {
    setOpen(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <div className="headerstyleCrt">
                <Typography variant="h5">
                  
                    Choose Your Quiz Option
                  
                </Typography>
                <Typography variant="h5" align="right">                  
                <Avatar style={avatarStyle} onClick={()=> closeModal(false)}><HighlightOffOutlinedIcon /></Avatar>                  
                </Typography>
              </div>
        </DialogTitle>
        <DialogContent>
          <div id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item xs>
                <Button variant="outlined" onClick={handleSingleQuiz}>
                  MCQ(Single Correct)
                </Button>
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
          </div>          
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizModel;

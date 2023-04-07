import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./PlayQuiz.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import Error from "../img/404.jpg";
import { useNavigate } from "react-router-dom";

function PlayQuiz() {
  //navigate page code here
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/result");
  };

  const [showDialog, setShowDialog] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [subGroups, setSubGroups] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  // Retrieve data from local storage
  const quizData = JSON.parse(localStorage.getItem("myquiz"));

  const [open, setOpen] = React.useState(true);

  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  // Function to start the quiz
  const handleStartQuiz = () => {
    if (!username) {
      toast.error("Please Enter User Name.", { position: "top-center" });
      document.getElementById("username").focus();
      return;
    }
    if (username.length < 5) {
      toast.error("Please insert a UserName with at least 5 characters", { position: "top-center" });
      document.getElementById("username").focus();
      return;
    }

    if (!selectedGroup) {
      toast.error("Please select a group.", { position: "top-center" });
      document.getElementById("SelectOption").focus();
      return;
    }
    //SAVE USER NAME IN NEW LOCALSTORAGE
    const userData = {
      username: username,
      totalscore: 0,
      outOf: 0,
    };
    localStorage.setItem("Users", JSON.stringify(userData));

    // Get the selected group
    const selectedGroupData = quizData.find(
      (group) => group.groupName === selectedGroup
    );

    // Set the subgroups for the selected group
    setSubGroups(selectedGroupData.subGroups);

    // Hide the dialog box
    setShowDialog(false);
    setOpen(false);
  };

  // Function to handle submitting an answer
  const handleAnswerSubmit = (e) => {
    e.preventDefault();

    // Get the current question and answer
    const currentQuestion = subGroups[currentQuestionIndex];
    const selectedAnswer = e.target.elements.answer.value;

    // Check if the answer is correct and update the score
    const isCorrect = selectedAnswer === currentQuestion.correctAns;
    const updatedScore = [...correctAnswers, isCorrect];

    // Update the score and move to the next question
    setCorrectAnswers(updatedScore);

    setCurrentQuestionIndex(currentQuestionIndex + 1);

    // Uncheck the radio button options
    e.target.elements.answer.forEach((option) => {
      option.checked = false;
    });

    // If all questions have been answered, show the results
    if (currentQuestionIndex === subGroups.length - 1) {
      setShowDialog(true);
      setGroupName("");
      setGroupDescription("");

      const userData = {
        username: username,
        totalscore: updatedScore.filter((answer) => answer).length,
        outOf: subGroups.length,
      };
      localStorage.setItem("Users", JSON.stringify(userData));
      setUsername("");
      setSelectedGroup("");
      setSubGroups([]);
      setCurrentQuestionIndex(0);
      setCorrectAnswers([]);

      handleNavigate();
    }
  };

  //GET USERNAME IN LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("Users"));
  const savedUsername = user ? user.username : "";
  return (
    <div>
      {quizData ? (
        quizData.length > 0 ? (
          showDialog ? (
            <div>
              <Modal open={open} className="modal">
                <div className="paper">
                  <Typography variant="h5" className="title" align="center">
                    Title: {groupName}
                  </Typography>
                  <Typography variant="body1" className="description">
                    Description: {groupDescription}
                  </Typography>
                  <hr></hr>
                  <Typography variant="h6" className="title">
                    Enter your Name
                  </Typography>
                  <TextField
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <FormControl fullWidth margin="normal">
                    <Typography variant="h6" className="title">
                      Select your option
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        id="SelectOption"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        value={selectedGroup}
                        onChange={(e) => {
                          const group = quizData.find(
                            (g) => g.groupName === e.target.value
                          );
                          setSelectedGroup(e.target.value);
                          if (group) {
                            setGroupName(group.groupName);
                            setGroupDescription(group.groupDescription);
                          } else {
                            setGroupName("");
                            setGroupDescription("");
                          }
                        }}
                      >
                        <MenuItem value="">-Select Option-</MenuItem>
                        {quizData.map((group) => (
                          <MenuItem key={group.ID} value={group.groupName}>
                            {group.groupName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </FormControl>
                  <Button
                    startIcon={<PlayCircleOutlineIcon />}
                    onClick={handleStartQuiz}
                    variant="contained"
                    className="button"
                  >
                    Start Quiz
                  </Button>
                </div>
              </Modal>
            </div>
          ) : (
            <div>
              <Grid align="center">
                <h2>Started Quizes</h2>
              </Grid>
              <Box>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={8}>
                    <Paper className="paperStyle">
                      <div className="headerstyle">
                        <Typography variant="h5">
                          Subject: {groupName}
                        </Typography>
                        <Typography variant="h5" align="right">
                          User: {savedUsername}
                        </Typography>
                      </div>
                      <hr></hr>
                      <Grid align="left">
                        <h3>
                          {currentQuestionIndex + 1}.{" "}
                          {subGroups[currentQuestionIndex].question}
                        </h3>

                        <form onSubmit={handleAnswerSubmit} className="">
                          <RadioGroup name="answer">
                            <FormControlLabel
                              value={subGroups[currentQuestionIndex].option1}
                              control={<Radio />}
                              label={subGroups[currentQuestionIndex].option1}
                            />
                            <FormControlLabel
                              value={subGroups[currentQuestionIndex].option2}
                              control={<Radio />}
                              label={subGroups[currentQuestionIndex].option2}
                            />
                          </RadioGroup>
                          <hr className="hrStyle"></hr>
                          <div className="headerstyle">
                            <Typography variant="h5">
                              <FormLabel>
                                Question {currentQuestionIndex + 1} /{" "}
                                {subGroups.length}
                              </FormLabel>
                            </Typography>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              className=""
                              align="right"
                              startIcon={<QueuePlayNextIcon />}
                            >
                              {currentQuestionIndex === subGroups.length - 1
                                ? "Submit"
                                : "Next Question"}
                            </Button>
                          </div>
                        </form>
                      </Grid>
                    </Paper>
                    <hr className="hrStyle"></hr>
                  </Grid>
                </Grid>
              </Box>
            </div>
          )
        ) : (
          <div>
            <Box>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                  <Paper className="paperStyle">
                    <Grid align="center">
                      <img src={Error} alt="" className="my-image" />
                    </Grid>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      There is no Data —{" "}
                      <strong>check it out your localstorage!</strong>
                    </Alert>
                    <hr className="hrStyle"></hr>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </div>
        )
      ) : (
        <p>Loading data...</p>
      )}
      <ToastContainer theme="colored" />
    </div>
  );
}

export default PlayQuiz;

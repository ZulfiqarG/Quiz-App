import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  FormControlLabel,
  Button,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import "./SingleQuiz.css";
import { useNavigate } from "react-router-dom";
import Error from "../img/404.jpg";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const SingleQuiz = () => {
  //navigate page code here
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/CreateNewQuiz");
  };

  //TODOtoggle button active inactive Change.

  const [activeQuizIds, setActiveQuizIds] = useState([]);

  const handleChangeActive = (quizId) => {
    setActiveQuizIds((prevState) => {
      const index = prevState.indexOf(quizId);
      if (index > -1) {
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      } else {
        return [...prevState, quizId];
      }
    });
  };

  // const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);

  // Retrieve localstorage data on component mount
  useEffect(() => {
    const quizDataFromLocalStorage =
      JSON.parse(localStorage.getItem("myquiz")) || [];
    setQuizData(quizDataFromLocalStorage);
  }, []);

  // Handle delete button click event
  const handleDeleteButtonClick = (id) => {
    //remove data from local storage using id
    const updatedData = quizData.filter((data) => data.ID !== id);
    localStorage.setItem("myquiz", JSON.stringify(updatedData));
    setQuizData(updatedData);

    // show the id in console
    console.log(`Deleted data with id: ${id}`);
  };

  //-------TODO VIEW FORM AND UPDATE FORM CODING START---------------- //
  const [showForm, setShowForm] = useState(false);
  const [showTable, setshowTable] = useState(true);
  const [showViewtable, setViewtable] = useState(false);
  //UPDATE FORM CODE
  const [formData, setFormData] = useState({
    groupName: "",
    subGroups: [],
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("myquiz");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const showUpdateForm = (quizId) => {
    const quizData = JSON.parse(localStorage.getItem("myquiz"));
    const quizToUpdate = quizData.find((quiz) => quiz.ID === quizId);
    setFormData(quizToUpdate);
    setshowTable(false);
    setShowForm(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const handleSubGroupChange = (e, index) => {
    const { name, value } = e.target;
    const subGroups = [...formData.subGroups];
    subGroups[index][name.split("-")[2]] = value;
    setFormData((prevState) => ({ ...prevState, subGroups }));
  };

  const updateLocalStorage = (event) => {
    event.preventDefault();

    if (formData.groupName === "") {
      alert("Please insert the group name");
      return;
    }

    const updatedFormData = { ...formData };
    let focusOnField = null;
    updatedFormData.subGroups = updatedFormData.subGroups.map((subGroup) => {
      if (subGroup.question === "") {
        focusOnField = "question";
        subGroup.question = "default question"; // set default value
      }
      if (subGroup.option1 === "") {
        focusOnField = "option1";
        subGroup.question = "default option1"; // set default value
      }
      if (subGroup.option2 === "") {
        focusOnField = "option2";
        subGroup.question = "default option2"; // set default value
      }
      if (subGroup.correctAns === "") {
        focusOnField = "correctAns";
        subGroup.question = "default correctAns"; // set default value
      }
      return {
        question: subGroup.question,
        option1: subGroup.option1,
        option2: subGroup.option2,
        checked1: subGroup.checked1,
        checked2: subGroup.checked2,
        correctAns: subGroup.correctAns,
      };
    });
    if (focusOnField) {
      alert("Please fill all required fields");
      return;
    }
    const myquizData = JSON.parse(localStorage.getItem("myquiz"));
    const updatedData = myquizData.map((quiz) => {
      if (quiz.ID === formData.ID) {
        return {
          ID: quiz.ID,
          groupName: updatedFormData.groupName,
          groupDescription: updatedFormData.groupDescription,
          CreatedOn: new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            day: "numeric",
            month: "short",
          }),
          subGroups: updatedFormData.subGroups,
        };
      }
      return quiz;
    });
    localStorage.setItem("myquiz", JSON.stringify(updatedData));
    toast.success("Record Updated Successfull!", {
      position: "top-center",
    });

    window.location.reload();
  };

  //VIEW FORM CODE
  const showViewForm = (quizId) => {
    const quizData = JSON.parse(localStorage.getItem("myquiz"));
    const quizToUpdate = quizData.find((quiz) => quiz.ID === quizId);
    setFormData(quizToUpdate);
    setshowTable(false);
    setViewtable(true);
  };

  const handleBack = () => {
    setshowTable(true);
    setShowForm(false);
    setViewtable(false);
  };
  //------------------------------------END------------------------------------//

  return (
    <div>
      {quizData.length > 0 ? (
        <>
          {showTable && (
            <Box>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={10}>
                  <hr className="hrStyle"></hr>
                  <Grid align="right">
                    <div className="headerstyle">
                      <Typography variant="h5" style={{ fontWeight: "bold" }}>
                        My Quizes
                      </Typography>
                      <Button
                        variant="contained"
                        type="submit"
                        style={{ justifyContent: "center" }}
                        startIcon={<CreateNewFolderIcon />}
                        onClick={handleNavigate}
                      >
                        Create New Quiz
                      </Button>
                    </div>
                  </Grid>
                  <Paper className="paperStyles">
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Quiz.No</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Created on</TableCell>
                            <TableCell align="right">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {quizData.map((quiz, index) => (
                            <TableRow key={quiz.ID}>
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>
                              <TableCell align="right">
                                {quiz.groupName}
                              </TableCell>
                              <TableCell align="right">
                                <FormControlLabel
                                  label={
                                    activeQuizIds.includes(quiz.ID)
                                      ? "Active"
                                      : "Inactive"
                                  }
                                  control={
                                    <IOSSwitch
                                      sx={{ m: 1 }}
                                      checked={activeQuizIds.includes(quiz.ID)}
                                      onChange={() =>
                                        handleChangeActive(quiz.ID)
                                      }
                                    />
                                  }
                                />
                              </TableCell>
                              <TableCell align="right">
                                {quiz.CreatedOn}
                              </TableCell>
                              <TableCell align="right">
                                <Button onClick={() => showUpdateForm(quiz.ID)}>
                                  <Edit />
                                </Button>
                                <Button onClick={() => showViewForm(quiz.ID)}>
                                  <Visibility />
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleDeleteButtonClick(quiz.ID)
                                  }
                                >
                                  <Delete />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          {/* UPDATE DATA */}
          {showForm && (
            <div>
              <form onSubmit={handleSubmit}>
                <Grid align="center">
                  <h2>Update Quizes</h2>
                </Grid>
                <Box>
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={12}>
                      <Paper className="paperStyle">
                        <Typography variant="h6" className="title" align="left">
                          Group Name :
                        </Typography>
                        <TextField
                          type="text"
                          name="groupName"
                          value={formData.groupName}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              groupName: event.target.value,
                            })
                          }
                        />
                        {formData.subGroups.map((subGroup, index) => (
                          <div key={index}>
                            <Grid container item xs={12} md={12} spacing={2}>
                              <Grid item xs={12} md={3}>
                                <Typography
                                  variant="h6"
                                  className="title"
                                  align="left"
                                >
                                  Question: {index + 1}
                                </Typography>
                                <TextField
                                  type="text"
                                  name={`subGroup-${index}-question`}
                                  value={subGroup.question}
                                  onChange={(e) =>
                                    handleSubGroupChange(e, index)
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography
                                  variant="h6"
                                  className="title"
                                  align="left"
                                >
                                  Option1:
                                </Typography>
                                <TextField
                                  type="text"
                                  name={`subGroup-${index}-option1`}
                                  value={subGroup.option1}
                                  onChange={(e) =>
                                    handleSubGroupChange(e, index)
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography
                                  variant="h6"
                                  className="title"
                                  align="left"
                                >
                                  Option2:
                                </Typography>
                                <TextField
                                  type="text"
                                  name={`subGroup-${index}-option2`}
                                  value={subGroup.option2}
                                  onChange={(e) =>
                                    handleSubGroupChange(e, index)
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Typography
                                  variant="h6"
                                  className="title"
                                  align="left"
                                >
                                  CorrectAnswer:
                                </Typography>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                  <Select
                                    name={`subGroup-${index}-correctAns`}
                                    value={subGroup.correctAns}
                                    onChange={(e) =>
                                      handleSubGroupChange(e, index)
                                    }
                                  >
                                    <MenuItem value={subGroup.option1}>
                                      {subGroup.option1}
                                    </MenuItem>
                                    <MenuItem value={subGroup.option2}>
                                      {subGroup.option2}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </div>
                        ))}
                        <div className="headerstyle">
                          <Typography variant="h5">
                            <Button
                              variant="contained"
                              onClick={updateLocalStorage}
                              startIcon={<UpdateIcon />}
                            >
                              {" "}
                              Update Quiz
                            </Button>
                          </Typography>
                          <Typography variant="h5" align="right">
                            <Button
                              variant="contained"
                              onClick={handleBack}
                              startIcon={<ArrowLeftIcon />}
                            >
                              Back
                            </Button>
                          </Typography>
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </div>
          )}
          {/* VIEW DATA */}

          {showViewtable && (
            <div>
              <Grid align="center">
                <h2>View Quizes</h2>
              </Grid>
              <Box>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={12}>
                    <Paper className="paperStyle">
                      <Typography variant="h6" className="title" align="left">
                        Group Name :
                      </Typography>
                      <TextField
                        disabled
                        type="text"
                        name="groupName"
                        value={formData.groupName}
                      />
                      {formData.subGroups.map((subGroup, index) => (
                        <div key={index}>
                          <Grid container item xs={12} md={12} spacing={2}>
                            <Grid item xs={12} md={3}>
                              <Typography
                                variant="h6"
                                className="title"
                                align="left"
                              >
                                Question: {index + 1}
                              </Typography>
                              <TextField
                                type="text"
                                disabled
                                name={`subGroup-${index}-question`}
                                value={subGroup.question}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography
                                variant="h6"
                                className="title"
                                align="left"
                              >
                                Option1:
                              </Typography>
                              <TextField
                                type="text"
                                disabled
                                name={`subGroup-${index}-option1`}
                                value={subGroup.option1}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography
                                variant="h6"
                                className="title"
                                align="left"
                              >
                                Option2:
                              </Typography>
                              <TextField
                                type="text"
                                disabled
                                name={`subGroup-${index}-option2`}
                                value={subGroup.option2}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography
                                variant="h6"
                                className="title"
                                align="left"
                              >
                                CorrectAnswer:
                              </Typography>
                              <TextField
                                type="text"
                                disabled
                                name={`subGroup-${index}-correctAns`}
                                value={subGroup.correctAns}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                      <hr className="hrStyle"></hr>
                      <Button
                        variant="contained"
                        onClick={handleBack}
                        startIcon={<ArrowLeftIcon />}
                      >
                        {" "}
                        Back
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </div>
          )}
        </>
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
      )}
      <ToastContainer theme="colored" />
    </div>
  );
};

export default SingleQuiz;

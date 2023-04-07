import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateNewQuiz.css";

const CreateNewQuiz = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [subGroups, setSubGroups] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      checked1: false,
      checked2: false,
    },
  ]);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupDescriptionChange = (event) => {
    setGroupDescription(event.target.value);
  };

  const handleSubGroupChange = (event, index, key) => {
    const newSubGroups = [...subGroups];
    newSubGroups[index][key] = event.target.value;
    setSubGroups(newSubGroups);
  };

  const handleCheckboxChange = (event, index, key) => {
    const newSubGroups = [...subGroups];
    newSubGroups[index][key] = event.target.checked;

    if (key === "checked1" && event.target.checked) {
      newSubGroups[index].checked2 = false;
    } else if (key === "checked2" && event.target.checked) {
      newSubGroups[index].checked1 = false;
    }

    setSubGroups(newSubGroups);
  };

  const handleAddSubGroup = () => {
    if (subGroups.length < 10) {
      setSubGroups([
        ...subGroups,
        {
          question: "",
          option1: "",
          option2: "",
          checked1: false,
          checked2: false,
          correctAns: "",
        },
      ]);
    } else {
      alert("You can't add more than 10 sub groups!");
    }
  };

  const handleRemoveSubGroup = (indexToRemove) => {
    setSubGroups(
      subGroups.filter((subGroup, index) => index !== indexToRemove)
    );
  };

  //TODO Save data into local storage

  function saveToLocalStorage(formData) {
    let existingData = JSON.parse(localStorage.getItem("myquiz")) || [];
    existingData.push(formData);
    localStorage.setItem("myquiz", JSON.stringify(existingData));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // creating a ID for every todo
    const date = new Date();
    const time = date.getTime();

    //TODO Write alert code here
    if (!groupName) {
      toast.error("Please insert Group Name", { position: "top-center" });
      document.getElementById("groupName").focus();
      return;
    }    
    if (groupName.length < 5) {
      toast.error("Please insert a GroupName with at least 5 characters", {
        position: "top-center",
      });
      document.getElementById("groupDescription").focus();
      return;
    }
    if (!groupDescription) {
      toast.error("Please insert Group Description", {
        position: "top-center",
      });
      document.getElementById("groupDescription").focus();
      return;
    }
    
    for (let i = 0; i < subGroups.length; i++) {
      if (!subGroups[i].question) {
        toast.error(`Please insert Question ${i + 1}`, {
          position: "top-center",
        });
        document.getElementById(`question-${i}`).focus();
        return;
      }
      if (subGroups[i].question.length < 10) {
        toast.error(`Please insert a question with at least 10 characters for Question ${i + 1}`, {
          position: "top-center",
        });
        document.getElementById(`question-${i}`).focus();
        return;
      }      
      if (!subGroups[i].option1) {
        toast.error(`Please insert Option 1 for Question ${i + 1}`, {
          position: "top-center",
        });
        document.getElementById(`option1-${i}`).focus();
        return;
      }
      if (!subGroups[i].option2) {
        toast.error(`Please insert Option 2 for Question ${i + 1}`, {
          position: "top-center",
        });
        document.getElementById(`option2-${i}`).focus();
        return;
      }
    }

    //TODO Save Correct Answer:
    const newSubGroups = subGroups.map((subGroup) => {
      if (subGroup.checked1) {
        return {
          ...subGroup,
          correctAns: subGroup.option1,
        };
      } else if (subGroup.checked2) {
        return {
          ...subGroup,
          correctAns: subGroup.option2,
        };
      } else {
        return subGroup;
      }
    });

    const formData = {
      ID: time,
      groupName: groupName,
      groupDescription: groupDescription,
      CreatedOn: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        day: "numeric",
        month: "short",
      }),
      subGroups: newSubGroups,
    };

    saveToLocalStorage(formData);
    toast.success("Record Saved Successfully", { position: "top-center" });
    //console.log(formData);
    setGroupName("");
    setGroupDescription("");
    setSubGroups([
      {
        question: "",
        option1: "",
        option2: "",
        checked1: false,
        checked2: false,
      },
    ]);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Paper className="paperStyle">
                <Grid align="center">
                  <h2>Create New Quiz</h2>
                </Grid>
                <TextField
                  type="text"
                  label="Group Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  id="groupName"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
                <hr className="hrStyle"></hr>
                <TextField
                  label="Group Descriptions"
                  multiline
                  rows={4}
                  fullWidth
                  value={groupDescription}
                  id="groupDescription"
                  onChange={handleGroupDescriptionChange}
                />
                <hr className="hrStyle"></hr>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper className="paperStyle">
                {subGroups.map((subGroup, index) => (
                  <div key={index}>
                    <Grid align="center">
                      <h2>Question {index + 1}</h2>
                    </Grid>
                    <TextField
                      type={"text"}
                      label="Your Question"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={subGroup.question}
                      id={`question-${index}`}
                      onChange={(event) =>
                        handleSubGroupChange(event, index, "question")
                      }
                    />
                    <hr className="hrStyle"></hr>
                    <Grid justifyContent="left" container spacing={2}>
                      <Grid item xs={12} md={8}>
                        <Box
                          component="div"
                          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            type={"text"}
                            label="Option1"
                            variant="outlined"
                            value={subGroup.option1}
                            id={`option1-${index}`}
                            onChange={(event) =>
                              handleSubGroupChange(event, index, "option1")
                            }
                          />
                          <Checkbox
                            color="success"
                            type="checkbox"
                            checked={subGroup.checked1}
                            onChange={(event) =>
                              handleCheckboxChange(event, index, "checked1")
                            }
                          />
                          <TextField
                            type={"text"}
                            label="Option2"
                            variant="outlined"
                            value={subGroup.option2}
                            id={`option2-${index}`}
                            onChange={(event) =>
                              handleSubGroupChange(event, index, "option2")
                            }
                          />
                          <Checkbox
                            color="success"
                            type="checkbox"
                            checked={subGroup.checked2}
                            onChange={(event) =>
                              handleCheckboxChange(event, index, "checked2")
                            }
                          />
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid align="center">
                      {index > 0 && (
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveSubGroup(index)}
                        >
                          Remove Group
                        </Button>
                      )}
                    </Grid>
                  </div>
                ))}
              </Paper>
              <div className="headerstyleCrt">
                <Typography variant="h5">
                  <Button
                    variant="outlined"
                    startIcon={<ControlPointOutlinedIcon />}
                    onClick={handleAddSubGroup}
                  >
                    Add More Question
                  </Button>
                </Typography>
                <Typography variant="h5" align="right">
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ justifyContent: "center" }}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Typography>
              </div>
              <hr className="hrStyle"></hr>
            </Grid>
          </Grid>
        </Box>
      </form>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default CreateNewQuiz;

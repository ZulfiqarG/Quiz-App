//import {  Card, Checkbox, Grid, Paper, TextField } from "@mui/material";
//import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import "./CreateNewQuiz.css";
//import SingleQuiz from "../My_Quiz/SingleQuiz";

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
      alert("Please insert Group Name");
      document.getElementById("groupName").focus();
      return;
    }
    if (!groupDescription) {
      alert("Please insert Group Description");
      document.getElementById("groupDescription").focus();
      return;
    }
    for (let i = 0; i < subGroups.length; i++) {
      if (!subGroups[i].question) {
        alert(`Please insert Question ${i + 1}`);
        document.getElementById(`question-${i}`).focus();
        return;
      }
      if (!subGroups[i].option1) {
        alert(`Please insert Option 1 for Question ${i + 1}`);
        document.getElementById(`option1-${i}`).focus();
        return;
      }
      if (!subGroups[i].option2) {
        alert(`Please insert Option 2 for Question ${i + 1}`);
        document.getElementById(`option2-${i}`).focus();
        return;
      }
    }

    const formData = {
      ID: time,
      groupName: groupName,
      groupDescription: groupDescription,
      subGroups: subGroups,
    };

    saveToLocalStorage(formData);
    //localStorage.setItem('myquiz', JSON.stringify(formData));
    console.log(formData);
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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log({
  //     groupName,
  //     groupDescription,
  //     subGroups,
  //   });
  //   setGroupName("");
  //   setGroupDescription("");
  //   setSubGroups([
  //     {
  //       question: "",
  //       option1: "",
  //       option2: "",
  //       checked1: false,
  //       checked2: false,
  //     },
  //   ]);
  // };
  return (
    <div>
      <h1>Group Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleGroupNameChange}
          />
        </label>
        <br />
        <label>
          Group Description:
          <textarea
            value={groupDescription}
            id="groupDescription"
            onChange={handleGroupDescriptionChange}
          />
        </label>
        <br />
        {subGroups.map((subGroup, index) => (
          <div key={index}>
            <h3>Sub Group {index + 1}</h3>
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveSubGroup(index)}>
                Remove Sub Group
              </button>
            )}
            <br />
            <label>
              Your Question:
              <input
                type="text"
                value={subGroup.question}
                id={`question-${index}`}
                onChange={(event) =>
                  handleSubGroupChange(event, index, "question")
                }
              />
            </label>
            <br />
            <label>
              Option 1:
              <input
                type="text"
                value={subGroup.option1}
                id={`option1-${index}`}
                onChange={(event) =>
                  handleSubGroupChange(event, index, "option1")
                }
              />
              <input
                type="checkbox"
                checked={subGroup.checked1}
                onChange={(event) =>
                  handleCheckboxChange(event, index, "checked1")
                }
              />
            </label>
            <br />
            <label>
              Option 2:
              <input
                type="text"
                value={subGroup.option2}
                id={`option2-${index}`}
                onChange={(event) =>
                  handleSubGroupChange(event, index, "option2")
                }
              />
              <input
                type="checkbox"
                checked={subGroup.checked2}
                onChange={(event) =>
                  handleCheckboxChange(event, index, "checked2")
                }
              />
            </label>
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddSubGroup}>
          Add Sub Group
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateNewQuiz;

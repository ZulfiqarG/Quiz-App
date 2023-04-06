import { Box, Button, Card, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const Testing = () => {

  const [formData, setFormData] = useState({
    groupName: '',
    subGroups: [],
  });


  const [quizData, setQuizData] = useState([]);

  // Retrieve localstorage data on component mount
  useEffect(() => {
    const quizDataFromLocalStorage = JSON.parse(localStorage.getItem("myquiz")) || [];
    //console.log("Quiz Data from Local Storage: ", quizDataFromLocalStorage);
    setQuizData(quizDataFromLocalStorage);
  }, []);

  useEffect(() => {
    const savedFormData = localStorage.getItem('myquiz');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
      
    }
  }, []);


const [showForm, setShowForm] = useState(false);
const [showTable, setshowTable] = useState(true);
const [showViewtable, setViewtable] = useState(false);
// const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('myquiz')) || {
//   groupName: '',
//   subGroups: [],
// });
//TODOView Data
const showViewForm = (quizId) => {
  const quizData = JSON.parse(localStorage.getItem('myquiz'));
  const quizToUpdate = quizData.find((quiz) => quiz.ID === quizId);
  setFormData(quizToUpdate);
  setshowTable(false);
  setViewtable(true);
  };

const showUpdateForm = (quizId) => {
const quizData = JSON.parse(localStorage.getItem('myquiz'));
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
    subGroups[index][name.split('-')[2]] = value;
    setFormData(prevState => ({ ...prevState, subGroups }));
};

const handleBack = ()=> {

  setshowTable(true);
  setShowForm(false);
  setViewtable(false);

};

// const updateLocalStorage = (event) => {
//   event.preventDefault();
//   localStorage.setItem('myquiz', JSON.stringify(formData));
//   setShowForm(false);
// }

const updateLocalStorage = (event) => {
  event.preventDefault();

  if (formData.groupName === '') {
    alert('Please insert the group name');
    return;
  }


  const updatedFormData = { ...formData };
  let focusOnField = null;
  updatedFormData.subGroups = updatedFormData.subGroups.map((subGroup) => {

    if (subGroup.question === '') {
      focusOnField = 'question';
      subGroup.question = 'default question'; // set default value
    }
    if (subGroup.option1 === '') {
      focusOnField = 'option1';
      subGroup.question = 'default option1'; // set default value
    }
    if (subGroup.option2 === '') {
      focusOnField = 'option2';
      subGroup.question = 'default option2'; // set default value
    }
    if (subGroup.correctAns === '') {
      focusOnField = 'correctAns';
      subGroup.question = 'default correctAns'; // set default value
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
    alert('Please fill all required fields');    
    return;
  }
  // const updatedData = [
  //   {
  //     ID: Date.now(),
  //     groupName: updatedFormData.groupName,
  //     groupDescription: updatedFormData.groupDescription,
  //     subGroups: updatedFormData.subGroups,
  //   },
  // ];
  const myquizData = JSON.parse(localStorage.getItem('myquiz'));
  const updatedData = myquizData.map((quiz) => {
    if (quiz.ID === formData.ID) {
      return {
        ID: quiz.ID,
        groupName: updatedFormData.groupName,
        groupDescription: updatedFormData.groupDescription,
        subGroups: updatedFormData.subGroups,
      };
    }
    return quiz;
  });
  localStorage.setItem('myquiz', JSON.stringify(updatedData));
  alert("Record Update Successfully");
  
  window.location.reload();
}


  return (
    <div>
      {quizData.length > 0 ? (
      <>
      {showTable && (
        
    <table>
      <thead>
        <tr>
          <th>Quiz No.</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {quizData.map((quiz, index) => (         
      <tr key={quiz.ID}>
        <td>{index + 1}</td>
        <td>{quiz.groupName}</td>            
        <td>
          <label>
          <input type="checkbox"  />
          Inactive
          </label>
        </td>
        <td>
          <button onClick={() => showUpdateForm(quiz.ID)}>Edit</button>
          <button onClick={() => showViewForm(quiz.ID)}>View</button>
        </td>
      </tr>          
    ))}       
  </tbody>
</table>
      )}

{showForm && (
  <div>
    <h2>Update Quiz</h2>
    <form onSubmit={handleSubmit}>
    <Card variant="outlined">
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={12}>            
              <Paper className="paperStyle">
              <Typography variant="h6" className="title" align='left'>
           Group Name :
        </Typography>
              <TextField
          type="text" 
          name="groupName" 
          value={formData.groupName} 
          onChange={(event) => 
          setFormData({ ...formData, groupName: event.target.value })}         
        />
        {formData.subGroups.map((subGroup, index) => (
                <div key={index}>
              <Grid container item xs={12} md={12} spacing={2}>
              
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
          Question: {index + 1}
        </Typography>
            <TextField type="text"
              name={`subGroup-${index}-question`}
              value={subGroup.question}
              onChange={(e) => handleSubGroupChange(e, index)}
        />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           Option1:
        </Typography>
            <TextField type="text"
              name={`subGroup-${index}-option1`}
              value={subGroup.option1}
              onChange={(e) => handleSubGroupChange(e, index)}
         />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           Option2:
        </Typography>
            <TextField type="text"
              name={`subGroup-${index}-option2`}
              value={subGroup.option2}
              onChange={(e) => handleSubGroupChange(e, index)}
         />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           CorrectAnswer:
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          name={`subGroup-${index}-correctAns`}
          value={subGroup.correctAns}
          onChange={(e) => handleSubGroupChange(e, index)}
        >          
          <MenuItem value={subGroup.option1}>{subGroup.option1}</MenuItem>
          <MenuItem value={subGroup.option2}>{subGroup.option2}</MenuItem>          
        </Select>        
      </FormControl>        
          </Grid>   
                 
          </Grid>    
          </div>
          ))}      
          <div className="headerstyle">
        <Typography variant="h5"><Button variant="contained" onClick={updateLocalStorage}> Update Quiz</Button></Typography>
        <Typography variant="h5" align="right"><Button variant="contained" onClick={handleBack}>Back</Button></Typography>
      </div>  
          
              </Paper>
            </Grid>            
          </Grid>
        </Box>
      </Card>
    </form>    
  </div>
)}
{/* VIEW DATA */}

{showViewtable && (
  <div>
    <h2>View Quiz</h2>
    <Card variant="outlined">
        <Box>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={12}>            
              <Paper className="paperStyle">
              <Typography variant="h6" className="title" align='left'>
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
          <Typography variant="h6" className="title" align='left'>
          Question: {index + 1}
        </Typography>
            <TextField type="text"
            disabled
              name={`subGroup-${index}-question`}
              value={subGroup.question}              
        />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           Option1:
        </Typography>
            <TextField type="text" disabled
              name={`subGroup-${index}-option1`}
              value={subGroup.option1}              
         />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           Option2:
        </Typography>
            <TextField type="text" disabled
              name={`subGroup-${index}-option2`}
              value={subGroup.option2}              
         />
          </Grid>
          <Grid item xs={12} md={3}>
          <Typography variant="h6" className="title" align='left'>
           CorrectAnswer:
        </Typography>
        <TextField type="text" disabled
              name={`subGroup-${index}-correctAns`}
              value={subGroup.correctAns}           
         />               
          </Grid>                    
          </Grid>    
          </div>
          ))}   
          <hr className="hrStyle"></hr>    
          <Button variant="contained" onClick={handleBack}> Back</Button>
              </Paper>
            </Grid>            
          </Grid>
        </Box>
      </Card>
  </div>
)}
</>
) : (
  <h1>there is no data</h1>
)}
</div>

  )
}

export default Testing

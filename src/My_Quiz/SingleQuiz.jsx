import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

const SingleQuiz = () => {

  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);

  // Retrieve localstorage data on component mount
  useEffect(() => {
    const quizDataFromLocalStorage = JSON.parse(localStorage.getItem("myquiz")) || [];
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


const handlePlayQuizClick = (ids) => {

  const data = JSON.parse(localStorage.getItem('myquiz'));
  if (data) {
    const id = ids;
    console.log(id); // or handle the ID as needed
    

  }
   // send particular quiz id to playQuiz page
   //navigate(`/PlayQuiz/${id}`);
};



  return (
    <div>
    <h1>My Quiz</h1>
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
            
            {/* <button onClick={() => handlePlayQuizClick(quiz.ID)}>Play Quiz</button> */}
            <button onClick={() => navigate(`/PlayQuiz/${quiz.ID}`)}>Play Quiz</button>
            <button>View</button>
            <button>Edit</button>
            <button onClick={()=>handleDeleteButtonClick(quiz.ID)}>Delete</button>
          </td>
          </tr>          
        
        ))}       
      </tbody>
    </table>
    
  </div>

  )
}

export default SingleQuiz
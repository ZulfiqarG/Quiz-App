import React,{ useEffect, useState }  from 'react'
// import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Alert from "../My_Quiz/Alert"


function PlayQuiz() {
 
  const { id } = useParams();

  console.log(id);
  
  const quizData = JSON.parse(localStorage.getItem('myquiz'));
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleSubmit = (event, data) => {
    event.preventDefault();
    setSelectedQuiz(data);
  };

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Group Name</th>
          <th>Group Description</th>
          <th>Sub Groups</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {quizData.map((data) => (
          <tr key={data.ID}>
            <td>{data.ID}</td>
            <td>{data.groupName}</td>
            <td>{data.groupDescription}</td>
            <td>
              <ul>
                {data.subGroups.map((subgroup, index) => (
                  <li key={index}>
                    <div>{subgroup.question}</div>
                    <div>
                      <label>
                        <input type="radio" checked={subgroup.checked1} readOnly />
                        {subgroup.option1}
                      </label>
                    </div>
                    <div>
                      <label>
                        <input type="radio" checked={subgroup.checked2} readOnly />
                        {subgroup.option2}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <button onClick={(event) => handleSubmit(event, data)}>Submit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
          {selectedQuiz && (
        <Alert
          ID={selectedQuiz.ID}
          groupName={selectedQuiz.groupName}
          groupDescription={selectedQuiz.groupDescription}
          subGroups={selectedQuiz.subGroups}
        />
      )}

    </div> 
    
  );
}


export default PlayQuiz
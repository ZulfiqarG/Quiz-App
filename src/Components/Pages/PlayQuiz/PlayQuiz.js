import React from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getName, playQuiz } from '../../../Redux/Actions/Actions';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  CardActionArea, TextField } from '@mui/material';
import "./PlayQuiz.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//react functional component named PlayQuiz
const PlayQuiz = () => {

  const quiz = useSelector((state) => state.reducer.quiz); //for getting the data from the redux store
  const name = useRef();  //ref for getting the name of the user/player.
  const dispatch = useDispatch(); //for dispatching action
  const navigate = useNavigate(); //for navigating to other page
  
  const play = (id) => {  //this function will run when the card is clicked. 
    if (name.current.value === "") {
      toast.error("Please enter a name!", { position: "top-center" });
      return;
    }
    if(name.current.value.length<5 || name.current.value>50){
      toast.error("Enter a valid name between 5 and 50 characters!", { position: "top-center" });
      return;
    }
    else{

      
      dispatch(getName(name.current.value)); 
      dispatch(playQuiz(id));
      navigate("/quiz");
    }
  }



  return (
    
    <div style={{marginTop:"100px"}}>
      <div className="mainContainer">
        <div className="heading">
          <h1 >PLAY QUIZ</h1>
        </div>

        <div className="quiz-description" style={{textAlign:"center",fontFamily:"sans-serif"}}>
         <h4>Enter your name and select the quiz you want to play.</h4>  
  

        <div className="input-name">
          <div className="quiz-name">
          <Typography variant="h6" className="title">
                    Enter your Name
                  </Typography>                                   
           {/* <input type="text" ref={name} placeholder={"....."} autoFocus className="name-input-text" /> */}
           <TextField  focused placeholder={"....."} inputRef={name}/>
          </div>
        </div>
          <div className="created-quiz">
            {/**if the number of quizzes is 0 then show "There are Currently No Quiz!", else shoe quiz cards */}
            {quiz.length === 0
              ? <p style={{ color: "black", fontFamily:"sans-serif",fontStyle:"italic" }}>
              There are Currently No Quiz!
            </p>
              :<div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
                {quiz.filter((el) => el.isActive === true)
                  .map((el) => (
                   <Card onClick={()=>{play(el.id)}} sx={{ width: 250, marginTop:"20px", textDecoration:"none",backgroundImage: "-webkit-linear-gradient(160deg, #FFDEE9 0%, #80D0C7 100%)",borderRadius:"10px", boxShadow:"2px 2px 4px black" }} key={el.id}>
                  <CardActionArea>
                  <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                      <h4>{el.title}</h4>
                    <p>{el.description}</p>
                      </Typography>
                                   
                      </CardContent>
                  </CardActionArea>
                </Card>
                
                  ))}
                  </div>
                  }
          </div>
        </div>

        <ToastContainer theme="colored" />
      </div>
    </div>
  )
}

export default PlayQuiz;

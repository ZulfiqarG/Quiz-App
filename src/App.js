import { Route, Routes } from "react-router-dom";
import Index from "./Home/Index";
import PlayQuiz from "./Play_Quiz/PlayQuiz";
import MainBody from "./Home/MainBody";
import QuizModel from "./Create_Quiz/QuizModel";
import SingleQuiz from "./My_Quiz/SingleQuiz";
import CreateNewQuiz from "./Create_Quiz/CreateNewQuiz";
import Login from "./Authentication/Login";
import Result from "./Result_Quiz/Result";

function App() {
  return (
    
    <div className="App">
      <Index />
      <Routes>     
        <Route path="/" element={<MainBody />} />        
        <Route path="QuizModel" element={<QuizModel />}/>
        <Route path="SingleQuiz" element={<SingleQuiz />}/>        
        <Route path="PlayQuiz" element={<PlayQuiz />}/>
        <Route path="CreateNewQuiz" element={<CreateNewQuiz />}/>        
        <Route path="Login" element={<Login />}/>               
        <Route path="Result" element={<Result />}/>
      </Routes>      
    </div>
    
  );
}

export default App;

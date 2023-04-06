// import Login from "./Authentication/Login";
import { Route, Routes } from "react-router-dom";
import Index from "./Home/Index";
import PlayQuiz from "./Play_Quiz/PlayQuiz";
import MainBody from "./Home/MainBody";
import QuizModel from "./Create_Quiz/QuizModel";
import SingleQuiz from "./My_Quiz/SingleQuiz";
import CreateNewQuiz from "./Create_Quiz/CreateNewQuiz";
import SingleQuizEdit from "./My_Quiz/SingleQuizEdit";
import Login from "./Authentication/Login";
import Alert from "./My_Quiz/Alert";
import Testing from "./ProjectOne/Testing";
import Result from "./Result_Quiz/Result";

function App() {
  return (
    
    <div className="App">
    {/* <Login /> */}
    
      {/* <Index />
      <MainBody />
      <PalyQuiz /> */}
      <Index />
      <Routes>
      {/* <Route path="/" element={<Index />}/> */}
        <Route path="/" element={<MainBody />} />
        {/* <Route path="PlayQuiz"exact element={<PlayQuiz />}/> */}
        <Route path="QuizModel" element={<QuizModel />}/>
        <Route path="SingleQuiz" element={<SingleQuiz />}/>
        {/* <Route path="PlayQuiz/:id" exact element={<PlayQuiz />}/> */}
        <Route path="PlayQuiz" element={<PlayQuiz />}/>
        <Route path="CreateNewQuiz" element={<CreateNewQuiz />}/>
        <Route path="SingleQuizEdit" element={<SingleQuizEdit />}/>
        <Route path="Login" element={<Login />}/>
        <Route path="Alert" element={<Alert />}/>
        <Route path="Testing" element={<Testing />}/>
        <Route path="Result" element={<Result />}/>
      </Routes>
      
      {/* <MainBody /> */}
    </div>
    
  );
}

export default App;

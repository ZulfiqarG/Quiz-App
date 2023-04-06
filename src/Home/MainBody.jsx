import CardCover from '@mui/joy/CardCover';
import { Grid } from '@mui/material'
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Box from '@mui/joy/Box';
import React, { useState } from 'react';
import './MainBody.css';
import image1 from '../img/Cube.jpg';
import image2 from '../img/image2.jpg';
import image3 from '../img/image3.jpg';
import QuizModel from '../Create_Quiz/QuizModel';
import { useNavigate } from 'react-router-dom';


const MainBody = () => {

  const navigate = useNavigate();


  const goMyQuizes =()=> {

    navigate("/SingleQuiz");
  }

  const goPlayQuizes =()=> {

    navigate("/PlayQuiz");
  }

  const [openModal, setOpenModal] = useState(false);
  return (
    
    <Box component="ul" className='boxStyle'>
      <Grid container spacing={3}>
        <Grid item xs>
        <Card component="li" className='cardStyle'>
        <CardCover>
          <img 
            src={image1}
            srcSet={image1}
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent onClick={()=> setOpenModal(true)}>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Create New Quizes
          </Typography>
        </CardContent>
      </Card>
        </Grid>
        <Grid item xs={12} md={12}>
        <Card component="li" className='cardStyle'>
        <CardCover>
          <img
            src={image2}
            srcSet={image2}
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent onClick={goMyQuizes}>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            My Quizes
          </Typography>
        </CardContent>
      </Card>
        </Grid>
        <Grid item xs>
        <Card component="li" className='cardStyle'>
        <CardCover>
          <img
            src={image3}
            srcSet={image3}
            loading="lazy"
            alt=""
          />
        </CardCover>
        <CardContent onClick={goPlayQuizes}>
          <Typography
            level="h6"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Paly Quizes
          </Typography>
        </CardContent>
      </Card>
        </Grid>
      </Grid>
      {openModal && <QuizModel closeModal={setOpenModal} />}
    </Box>
  )
}

export default MainBody
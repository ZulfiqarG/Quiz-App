import { Typography, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SingleQuizEdit = (items, removeItem, editItem) => {

    const navigate = useNavigate();

  return (
    <div>
     {items.map((item) => {
       const {id, title} = item;
       return (
         <ul key={id}>
           <li>{title}</li>
           <div>
             <Button type='button' className='edit-btn' onClick={()=> editItem(id)}>
             <EditIcon />
             </Button>
             <Button type='button' className='delete-btn' onClick={()=> removeItem(id)}>
             <DeleteIcon />
             </Button>
           </div>
         </ul>
       )
     })}
     </div>
  )
}

export default SingleQuizEdit
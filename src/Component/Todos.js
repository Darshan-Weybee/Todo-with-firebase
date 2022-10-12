import React from "react";
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {db} from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import "./todo.css"


function Todos({arr}) {
    console.log(arr);
    return (
        <List className="todo__list" style={{margin: "0.5rem"}}>
            <ListItem>
                <ListItemAvatar />
                <ListItemText primary={arr.item.todo} secondary={arr.item.todo}/>
                <DeleteIcon fontSize="large" style={{opacity:0.7}} onClick={() => {deleteDoc(doc(db,'Todos',arr.id))}} />
            </ListItem>
        </List>
    )
}

export default Todos
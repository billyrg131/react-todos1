import React from 'react';
import { CheckCircle, Delete, Edit } from '@mui/icons-material';


export default function DisplayTodo({todo, toggleComplete, handleDelete, handleEdit}){
    const[newTitle, setNewTitle]= React.useState(todo.title);
    const handleChange = (e) => {
        e.preventDefault();
        if(todo.complete === true){
            setNewTitle(todo.title)
        }
        else{
            todo.title = "";
            setNewTitle(e.target.value) 
        }
    }
    return(
        <div>
            <div className="todo">
                <input 
                className="list" 
                type="text" 
                value={todo.title === "" ? newTitle: todo.title}
                style={{textDecoration: todo.completed && "line-through"}}
                onChange={handleChange}
                />
                <div className='actions_container'>
                    <button className="btn-complete" variant="success" onClick={()=>toggleComplete(todo)}>
                        <CheckCircle id="i"/>
                    </button>
                    <button className="btn-edit" variant="info" onClick={()=>handleEdit(todo, newTitle)}>
                        <Edit id="i"/>
                    </button>
                    <button className="btn-delete" variant="danger" onClick={()=>handleDelete(todo.id)}>
                        <Delete id="i"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

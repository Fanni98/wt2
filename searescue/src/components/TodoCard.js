import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



const TodoCard = (props) => {
    const todo = props.todo;
    //console.log(todo)
    return(
        <div
            id={todo._id}
            className="card-container"
            draggable
            onDragOver={props.onDragOver == undefined ? null : props.onDragOver}
            onDragStart={props.onDragStart == undefined ? null : props.onDragStart}
            style={
                todo.background == undefined ? null : {backgroundColor: todo.background}
            }
        >
            <div className="desc">
                <h2>
                    { todo.title }     
                </h2>

                <p>
                    { todo.task }     
                </p>
 
                <hr />
                <Link to={`/show-todo/${todo._id}`}>
                    Részletek
                </Link>    
            </div>      
        </div>
        
        
    )
};

export default TodoCard;
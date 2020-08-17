import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';



const TodoCardAdmin = (props) => {
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
                <br />
                <br />  
                <br />
                <br /> 
                <h1 className="user">
                    { todo.userName }     
                </h1>
            </div>      
        </div>
        
        
    )
};

export default TodoCardAdmin;
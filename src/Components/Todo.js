import React, {useState} from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import Form from './Form';

function Todo({todos, completeTodo, removeTodo, updateTodo}) {
    const [editar,setEditar] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(editar.id, value)
        setEditar({
            id: null,
            value: ''
        });
    };

    if (editar.id) {
        return <Form editar={editar} onSubmit={submitUpdate} />;
    }


    return todos.map((todo, index) =>(
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            <div className="icons">
            <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className="delete-icon"/>
            </div>
        </div>
    ));
};

export default Todo

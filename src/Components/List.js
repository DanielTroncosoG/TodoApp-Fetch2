import React, {useState} from 'react';
import Form from './Form';
import Todo from './Todo';

function List() {
    const [todos, setTodos] = useState([]);
    let [numbers, setNumber] = useState(0);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const nuevoTodos = [todo, ...todos];

        setTodos(nuevoTodos);
        setNumber (numbers + 1)


    };

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)
        setTodos(removeArr);
        setNumber(numbers -1)
    }; 

    const completeTodo = id  => {
        let updatedTodos = todos.map(todo =>{
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
        <div className="container ">
            <h1 className="text-center">TodoList</h1>
            <div className="row my-5">
                <div className="col-md-6 offset-md-3">
                    <ul className="list-group"><Form onSubmit={addTodo}/>
                        {
                            numbers > 0 ?
                            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
                            :
                            <li className="list-group-item">Sin todos, agrega un todo</li>
                        }
                        <li className="list-group-item shadows"><small className="text-muted">Faltan {numbers} todos</small></li>
                        
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}

export default List

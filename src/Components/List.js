import React, {useState, useEffect} from 'react';
import Form from './Form';
import Todo from './Todo';

function List() {
    const [todos, setTodos] = useState([]);
    let [numbers, setNumber] = useState(0);


    let url = 'https://assets.breatheco.de/apis/fake/todos/user/DanielTroncosoG';

    useEffect(()=>{
		getList(url);
	}, []);

    const newAPI = (url) => {
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({}),
			headers:{
			  'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => {
				console.log('Success:', response);
				getList(url);
			});
    };
    const refreshAPI = (url) => {
		fetch(url, {
				method: 'DELETE',
			}).then(res => res.json())
				.catch(error => console.error('Error:', error))
				.then(response => {
					console.log('Success:', response)
					createAPI(url);
				});
    };
    const getTodos = async (url) => {
        try {
            const response = await fetch(url, { 
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
            if (response.status === 404) throw new Error("Pagina No encontrada");
            const data = await response.json();
        	setTodos([...data]);
			setNumber(data.length);
        } catch (error) {
            console.log(error);
        }
    };
    const PushTodos = async (url, item) => {
        try {
            const response = await fetch(url, {
				method: 'PUT',
				body: JSON.stringify(item),
				headers: { 'Content-Type': 'application/json' }
			});
            if (response.status === 404) throw new Error("Pagina No encontrada");
            const data = await response.json();
			console.log(data);
			getList(url);
        } catch (error) {
            console.log(error);
        }
    };
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
    const deleteAll = () => {
		cleanAPI(url);
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
                        <button type="button" className="btn btn-danger" onClick={deleteAll}>Erase all</button>
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}

export default List

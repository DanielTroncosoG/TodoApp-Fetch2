import React, {useRef} from 'react'

function Form() {
    let input = useRef();
    const preventSubmit = (e) => {
		e.preventDefault();
		let listUpdated = [
			...toDoList,
			{"label": input.current.value, "done": false}
		];
		console.log(input.current.value);
		PushItemList(url, listUpdated)
	}
    return (
        <form className="todo-form" onSubmit={preventSubmit}>
            <input placeholder='Ingresa un TODO' value={input} name='text' className="todo-input" onChange={preventChange}/>
            <button className="todo-button">Ingresa tu 'TODO'</button>
        </form>
    )
}

export default Form

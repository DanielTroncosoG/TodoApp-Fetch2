import React, {useState} from 'react'

function Form(props) {
    const [input, setInput] = useState('');
    const preventChange = e =>{
        setInput(e.target.value);
    };
    const preventSubmit = e => {
        e.preventDefault();
    
        props.onSubmit({
          id: Math.floor(Math.random() * 10000),
          text: input
        });
        setInput('');
      };
    return (
        <form className="todo-form" onSubmit={preventSubmit}>
            <input placeholder='Ingresa un TODO' value={input} name='text' className="todo-input" onChange={preventChange}/>
            <button className="todo-button">Ingresa tu 'TODO'</button>
        </form>
    )
}

export default Form

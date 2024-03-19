import React from "react";
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const TodoContext = createContext();

function useTodo() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodo must be used within a TodoProvider");
    }
    return context;
}

export async function fetchTodos(setTodos) {
    const data = await fetch('http://localhost:3000/todo')
        .then(response => response.json())
        .then(data => {
            return data
        })
        .catch(error => {
            console.error('There was an error!', error);
            setLoading(false)
        });
    const data1 = await JSON.parse(JSON.stringify(data))
    setTodos(() => [...data1])

}

export async function addTodo(title) {
    const data = {
        title: title,
        completed: false
    }
    const response = await fetch('http://localhost:3000/todo/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
   
}

export async function deleteTodo(id) {
    const response = await fetch('http://localhost:3000/todo/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
}

export async function updataComplete(id, completed) {
    const response = await fetch('http://localhost:3000/todo/completed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, completed: completed })
    })
}


export async function updataTitle(id, title) {
    const response = await fetch('http://localhost:3000/todo/updateTitle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, title: title })
    })
}






export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);

    const [loading, setLoading] = useState(false)

    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('efff') 
        init()
    }, [])

    async function init(){
       const data =  await fetch("http://localhost:3000/todo")
            .then((res) => res.json())
            .then((data) => {
                return data
            })
            .catch((err) => {
                console.log(err)
            })

        setTodos([...data])
        // console.log(todos)
    }

    



    return (
        <TodoContext.Provider value={
            {
                todos,
                setTodos,
                init,
            }
        }>
            {children}
        </TodoContext.Provider>
    );
}



export {
    TodoContext,
    useTodo
}
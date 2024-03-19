
import { useEffect, useMemo, useState } from "react";
import { useTodo, deleteTodo, updataComplete, updataTitle } from "../hooks/useTodo";
import Modal from "./UpdataTitle.modal";
import { useToast } from "../toast";
import TodoEmpty from "./TodoEmpty";
import Pagination from "./Pagination";
import MeunIcon from "./Icon/MeunIcon";
export default function TodoList() {
    const [sort, setSort] = useState('idup')
    const [filter, setFilter] = useState(localStorage.getItem('filter') || 'all')

    const filterTriggerOptions = [
        { label: 'All', value: 'all' },
        { label: 'Done', value: 'done' },
        { label: 'Not Done', value: 'notdone' },
    ]

    function handleFilterChange(e) {
        setFilter(e.target.value)
    }


    const [search, setSearch] = useState('')

    function handleSearchChange(e) {
        setSearch(e.target.value)
    }


    const [isEmtpy, setIsEmtpy] = useState(false)



    const { todos, init } = useTodo()
    const modal = Modal()
    const { msg } = useToast()

    async function handleDelete(e, id) {
        e.preventDefault()
        await deleteTodo(id)
        await init()
        msg().warning('delete success!!!')

    }

    async function handleUpdataTitle(e, id, title) {
        // e.preventDefault()
        // e.stopPropagation()

        await updataTitle(id, title)
        await init()
        msg().success('updata success!!!')

    }



    async function handleUpdataCompleted(e, id, completed) {

        e.preventDefault()
        completed = !completed
        await updataComplete(id, completed)
        await init()
        console.log(id)
        console.log('completed')
    }


    function showpop(e, id, title) {
        e.preventDefault()
        console.log('pop')
        modal.pop(handleUpdataTitle, id, title)
    }


    const todoGrp = todos.map((todo, index) => {

        if (!todo.title.includes(search)) {
            return
        }

        if (filter === 'done' && !todo.completed) {
            return
        }
        if (filter === 'notdone' && todo.completed) {
            return
        }



        return (
            <div key={todo.id} className="
                grid grid-cols-8 w-full
            border-gray-400 p-2  select-none cursor-pointer border-b-2 border-dotted  hover:bg-gray-300/30   relative  group"  >
                <div className=" col-span-1  ">
                    <div className=" absolute top-[.2] left-[1rem] group-hover:animate-id-fade-out group-hover:opacity-0 ">
                        {todo.id}
                    </div>
                    <div>
                        <div className="absolute top-[.2] left-[1rem]   opacity-0 group-hover:animate-icon-fade-in  group-hover:opacity-100  hover:text-blue-400"
                            onClick={(e) => {
                                e.preventDefault()
                                // console.log(todo.id)
                            }}
                        
                        >
                            <MeunIcon size={'1.5rem'}  />
                        </div>
                    </div>

                </div>

                <div className="
                col-span-5
                "
                    onClick={(e) => showpop(e, todo.id, todo.title)}
                >{todo.title}</div>
                <div
                    onClick={(e) => handleUpdataCompleted(e, todo.id, todo.completed)}
                >{todo.completed ? 'Done' : 'Not Done'}</div>
                <div className=" text-end  "

                    onClick={(e) => handleDelete(e, todo.id)}
                >
                    <span
                        className="
                         bg-red-500
                         px-2
                         rounded-lg
                         text-[.8rem]
                        "
                    >
                        DEL
                    </span>
                </div>
            </div>
        )
    })







    const todolist = useMemo(() => {
        const arr = []
        if (sort === 'idup') {
            todos.sort((a, b) => b.id - a.id)
            todoGrp.forEach((todo) => {
                if (todo !== undefined) {

                    arr.push(todo)
                }
            })
            if (arr.length === 0) {
                console.log('empty')
                if (isEmtpy === false) {
                    setIsEmtpy(true)
                }
            } else {
                if (isEmtpy === true) {
                    setIsEmtpy(false)
                }
            }


            return todoGrp
        }
        if (sort === 'iddown') {
            todos.sort((a, b) => a.id - b.id)


            return todoGrp
        }
        if (arr.length === 0) {
            console.log('empty')
            if (isEmtpy === false) {
                setIsEmtpy(true)
                return <TodoEmpty />
            }
        }




    }, [sort, todoGrp, isEmtpy])


    useEffect(() => {
        localStorage.setItem('filter', filter)
        const filters = localStorage.getItem('filter')
        setFilter(filters)
    }, [filter])

    return (
        <>
            <div className="animate-translateY-10"  >
                <div className=" mt-2">
                    <span
                        onClick={() => { sort === 'idup' ? setSort('iddown') : setSort('idup') }}
                        className=" bg-gray-300/30 px-2 rounded-lg text-[.8rem]  cursor-pointer mr-2"
                    >
                        Sort by ID  :  {sort === 'idup' ? 'up' : 'down'}
                    </span>
                    <select
                        onChange={handleFilterChange}
                        className=" bg-gray-300/30 px-2 rounded-lg text-[.8rem]  cursor-pointer  mr-2 "
                        value={filter}
                    >
                        {filterTriggerOptions.map((option, index) => {
                            
                            return (
                                <option
                                    key={index} value={option.value}
                                    className="bg-gray-300/30 text-black rounded-md"
                                >
                                    {option.label}
                                </option>
                            )
                        })}
                    </select>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearchChange(e)}
                        className="bg-gray-300/30 px-2 rounded-lg text-[.7rem]  cursor-pointer  focus:outline-none  "
                        placeholder="title search..."
                    />
                    <span className="
                        bg-gray-300/30 px-2 rounded-lg text-[.8rem]  cursor-pointer ml-2
                    ">
                        total : {todos.length}
                    </span>
                </div>
                <Pagination isEmtpy={isEmtpy} todolist={todolist} filter={filter} />


            </div>

        </>
    )
}
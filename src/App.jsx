import { TodoProvider } from "./hooks/useTodo";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import Child from "./components/Child";
import { useEffect } from "react";
import { useToast } from "./toast"


function ReactIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width={256} height={256} fill="#242938" rx={60}></rect><path fill="#00d8ff" d="M128.001 146.951c10.304 0 18.656-8.353 18.656-18.656c0-10.303-8.352-18.656-18.656-18.656c-10.303 0-18.656 8.353-18.656 18.656c0 10.303 8.353 18.656 18.656 18.656"></path><path stroke="#00d8ff" strokeWidth={8.91} d="M128.002 90.363c25.048 0 48.317 3.594 65.862 9.635C215.003 107.275 228 118.306 228 128.295c0 10.409-13.774 22.128-36.475 29.649c-17.162 5.686-39.746 8.654-63.523 8.654c-24.378 0-47.463-2.786-64.819-8.717C41.225 150.376 28 138.506 28 128.295c0-9.908 12.41-20.854 33.252-28.12c17.61-6.14 41.453-9.812 66.746-9.812z" clipRule="evenodd"></path><path stroke="#00d8ff" strokeWidth={8.91} d="M94.981 109.438c12.514-21.698 27.251-40.06 41.249-52.24c16.864-14.677 32.914-20.425 41.566-15.436c9.017 5.2 12.288 22.988 7.463 46.41c-3.645 17.707-12.359 38.753-24.238 59.351c-12.179 21.118-26.124 39.724-39.931 51.792c-17.471 15.272-34.362 20.799-43.207 15.698c-8.583-4.946-11.865-21.167-7.747-42.852c3.479-18.323 12.21-40.812 24.841-62.723z" clipRule="evenodd"></path><path stroke="#00d8ff" strokeWidth={8.91} d="M95.012 147.578c-12.549-21.674-21.093-43.616-24.659-61.826c-4.293-21.941-1.258-38.716 7.387-43.72c9.009-5.216 26.052.834 43.934 16.712c13.52 12.004 27.403 30.061 39.316 50.639c12.214 21.098 21.368 42.473 24.929 60.461c4.506 22.764.859 40.157-7.978 45.272c-8.574 4.964-24.265-.291-40.996-14.689c-14.136-12.164-29.26-30.959-41.933-52.849Z" clipRule="evenodd"></path></g></svg>
  )
}




function App() {
  const { msg } = useToast()
  useEffect(() => {
    // success('Welcome to Todo App')
    msg().info('Welcome to Todo App')

  }, [])

  return (

    <>


      <div className=" mb-2 select-none">
        <h1 className=" animate-translateY-10 text-2xl bg-blue-500 w-fit px-2 rounded-sm flex flex-row text-center justify-center items-center ">
          <span className=" mr-2">{ReactIcon()}</span>  Todo App

        </h1>

      </div>

      <TodoProvider>
        <div>
          <TodoCreate />
          <TodoList />
        </div>
      </TodoProvider>
      
    </>
  )
}

export default App;
import { useState } from "react";
import { addTodo,useTodo } from "../hooks/useTodo";
import { useToast } from "../toast";
import useValidator from "../hooks/useValidator";
function TodoCreate() {
  const [text, setText] = useState('');
  const {init} = useTodo()
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const {msg} = useToast()
  const {validateTitle} = useValidator()
  const handleCreate =async (title) => {
    if(!validateTitle(title)){
      msg().error('你他妈填个屁啊！')
      return
    }
    await addTodo(title.trim());
    setText('');
    await init()
    msg().success('insert success')
    
  };

  return (
    <div >
      <input value={text} onChange={handleChange} onKeyUp={
        (e) => {
          if (e.key === 'Enter') {
            handleCreate(text)
          }
      }}
        className="border border-gray-400 p-2 rounded-lg w-full  text-black"
      />
      <button  className="
        bg-blue-500
        text-white
        p-2
        rounded-lg
        w-full
        mt-2
        hover:bg-blue-600
        transition
        duration-200
        ease-in-out
        transform
        hover:scale-102
        "  type="button
      "
      
      onClick={()=>handleCreate(text)}
      >insert</button>
    </div >
  );
}

export default TodoCreate;
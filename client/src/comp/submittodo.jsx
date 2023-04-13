import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SubmitTodo = ({getTodo,indexx}) => {
    const[todo,setTodo] = useState("");
    const submitTodo = async()=>{
        const res = await fetch('http://localhost:4000/todos',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({todo,indexx})
        })
        if(res.status===201){
            setTodo("")
            toast.success("Added new todo!")
            getTodo();
        }else{
            toast.error("Failed to add todo!")
        }
    }
  return (
    <div style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center","minWidth":"50rem"}}>
        <h1 style={{"color":"red","fontFamily":"sans-serif","textAlign":"center"}}>Hey lets manage your todos as you wish! 😎</h1>
        <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter your Todo' /><br />
        <button style={{"marginTop":"2rem"}} onClick={submitTodo}>Add Todo</button>
        <ToastContainer position='top-center' style={{"fontSize":"1.2rem","fontFamily":"arial","fontWeight":"600"}}  />
    </div>
  )
}

export default SubmitTodo
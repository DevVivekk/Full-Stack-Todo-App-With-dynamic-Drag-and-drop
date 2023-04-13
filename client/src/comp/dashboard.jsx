import React, { useEffect, useState } from 'react'
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'
import SubmitTodo from './submittodo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Dashboard = () => {
    const [items,setItems] = useState([])
    const [index,setIndex] = useState("")
    const [id,setId] = useState("")
    const getTodo = async()=>{
        const res = await fetch('/gettodo',{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }
        })
        const data = await res.json();
        setItems(data);
    }
    console.log(items)
  
    useEffect(()=>{
        getTodo()
    },[])

    const updateIndex = async(id)=>{
        const res = await fetch(`/puttodo/${id}`,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({index})
        })
        if(res.status===201){
            toast.success("Sucessfully updated!")
        }else{
            toast.error("Failed!")
        }
    }
    
    const handleDropEnd = (results)=>{
        if(!results.destination) return ;
        setIndex(results.destination.index)
        setId(results.draggableId)
        console.log("results.destination.index",results.destination.index)
        let tempUser = Array.from(items);
        let [selectedrows] = tempUser.splice(results.source.index,1)
        tempUser.splice(results.destination.index,0,selectedrows)
        setItems(tempUser)
    }
    useEffect(()=>{
        if(index===""){
            console.log("no index")
        }else{
            updateIndex(id)
        }
    },[index])
  return (
    <>
    <SubmitTodo getTodo={getTodo} />
    <div style={{"display":"flex","flexDirection":"column","justifyContent":"center","alignItems":"center","width":"100vw","minWidth":"50rem","backgroundImage":"linear-gradient(120deg, white,pink)","color":"black","textAlign":"center","marginTop":"5rem"}}>
    <DragDropContext onDragEnd={(results)=>handleDropEnd(results)}>
    <Droppable droppableId='dropId' >
      {
        (provided)=>(
            <div ref={provided.innerRef} {...provided.droppableProps}>
            {
            items?.length>0? items.map((item,index)=>{
                return(
                    <Draggable draggableId={item._id.toString()} index={index} key={index}>
                      {
                        (provided)=>(
                           <h1 className='todo' {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>{item.todo}</h1>
                        )
                      }
                    </Draggable>
                )
                
            })
            :<h1>No Todo Found! Please add todo.</h1>
        }
        {provided.placeholder}
        </div>
        )
      }
    </Droppable>
    </DragDropContext>
    </div>
    <ToastContainer position='top-center' style={{"fontSize":"1.2rem","fontFamily":"arial","fontWeight":"600"}}  />
    </>
  )
}

export default Dashboard
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
  return (
    <div className='home'>
        <h1>Hey👋! Welcome to MERN Stack todo Dashboard!</h1>
        <button onClick={()=>navigate('/mydashboard')}>View my Dashboard</button>
    </div>
  )
}

export default Home
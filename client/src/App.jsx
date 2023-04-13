import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './comp/home'
import Dashboard from './comp/dashboard'
function App() {

  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/mydashboard' element={<Dashboard />}></Route>
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App

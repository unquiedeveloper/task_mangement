import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile"
import {Toaster} from "react-hot-toast"
import axios from "axios"

const App = () => {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [tasks , setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskType, setTaskType] = useState("Tasks")

  useEffect(()=>{
    const handleGetUser = async()=>{
      try {
        const {data} = await axios.get("http://localhost:3000/api/v1/user/me",{withCredentials:true});
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        console.log("user is not authenticatedd");
        setIsAuthenticated(false);
        setUser([]);
        
      }
    }
    handleGetUser();
  },[isAuthenticated])

  return (
    <BrowserRouter> 
    <Header setTasks={setTasks} tasks={tasks} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setTaskType={setTaskType} />
     <Routes>
      <Route path='/' element={<Home isAuthenticated={isAuthenticated} tasks={tasks} setTasks={setTasks} TaskType={taskType} />} />
      <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
      <Route path='/register' element={<Register isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>}/>
      <Route path='/profile' element={<Profile user={user} isAuthenticated={isAuthenticated}/>}/>
     </Routes>
     <Toaster/>
    </BrowserRouter>

  
  )
}

export default App

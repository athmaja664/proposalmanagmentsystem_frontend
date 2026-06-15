import './App.css'
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import Preloader from './components/Preloader';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Proposals from './pages/admin/Proposals';
import CreateProposal from './pages/admin/CreateProposal';
import PasswordGate from './pages/client/PasswordGate';
import ProposalSuccess from './pages/client/ProposalSuccess';
import ProposalViewer from './pages/client/ProposalViewer';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './pages/PageNotFound'
import AuditLogs from './pages/admin/AuditLogs';
//import Projects from './pages/admin/projects';
// import AddClient from './pages/admin/AddClient';
// import AddProject from './pages/admin/AddProject';

function App() {
 const [isLoading,setIsLoading]=useState(false)

  useEffect(()=>{
 setTimeout(()=>{
      setIsLoading(true)
 },3000)
  },[])

  return (
    <>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
        {/* <Route path='addclient' element={<AddClient/>}/>
       <Route path='addproject' element={<AddProject/>}/> */}
        <Route path='proposals' element={<Proposals />} />
        <Route path='createproposal' element={<CreateProposal />} />
        {/* <Route path='projects' element={<Projects/>}></Route> */}
        <Route path="/auditlogs" element={<AuditLogs/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='*' element={<PageNotFound/>}/>
         <Route path='/view/:token' element={isLoading?<PasswordGate />:<Preloader/>} />
        <Route path='success' element={<ProposalSuccess />} />
        <Route path='proposalview' element={<ProposalViewer />} />
      
      </Routes>
       
    </>
  )
}

export default App

import './App.css'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
//import Register from './pages/admin/Register';
import Proposals from './pages/admin/Proposals';
import CreateProposal from './pages/admin/CreateProposal';
import PasswordGate from './pages/client/PasswordGate';
import ProposalSuccess from './pages/client/ProposalSuccess';
import ProposalViewer from './pages/client/ProposalViewer';
import ProtectedRoute from './components/ProtectedRoute';
function App() {


  return (
    <>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='/' element={<Login />} />
        {/* <Route path='register' element={<Register />} /> */}
        <Route path='proposals' element={<Proposals />} />
        <Route path='createproposal' element={<CreateProposal />} />
        <Route path='clientlogin' element={<PasswordGate />} />
        <Route path='success' element={<ProposalSuccess />} />
        <Route path='proposalview' element={<ProposalViewer />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App

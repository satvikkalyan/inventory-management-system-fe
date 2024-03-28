import { Route,BrowserRouter as Router,Routes } from 'react-router-dom';
import './App.css';
import PasswordRecovery from "./Pages/forgot-password/PasswordRecovery"
import HomePage from './Pages/HomePage';
import Register from './Pages/Login_register/Register';
function App() {
  return (
    <>
    <Router>
      <Routes>
     <Route path="/" element={<HomePage></HomePage>} ></Route>
     <Route path="/register" element={<Register></Register>}></Route>
     </Routes>
     </Router>
     </>
  );
}

export default App;

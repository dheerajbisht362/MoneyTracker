import './App.css';
import { Route, Routes } from "react-router-dom"
import Login from './routes/login';
import Navbar from './components/navbar';
import MoneyTracker from './routes/moneyTracker';
import "bootstrap/dist/css/bootstrap.min.css"

function Root() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<MoneyTracker />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Root;

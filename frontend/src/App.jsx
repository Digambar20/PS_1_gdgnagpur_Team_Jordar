import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        
        <Route path="/patient/dashboard" element={<PatientDashboard />} />

       
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./components/Home_Landing_page/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import PatientDashboard from "./components/patientDashboard/PatientDashboard";
import DoctorDashboard from "./components/doctorDashboard/DoctorDashboard";
import RequestAppointment from "./components/patientDashboard/RequestAppointment";
import ProtectedRoute from "./ProtectedRoute";
import AddNewPatient from "./components/doctorDashboard/AddNewPatients";
import AllPatients from "./components/doctorDashboard/AllPatients";
import PatientDetails from "./components/doctorDashboard/PatientDetails";
import ViewAppointments from "./components/doctorDashboard/ViewAppointments";
import AddMedicine from "./components/doctorDashboard/AddMedicine";
import ViewMedicines from "./components/doctorDashboard/ViewMedicine";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/request-appointment"
          element={<RequestAppointment />}
        />
        <Route path="/doctor/patient/new" element={<AddNewPatient />} />
        <Route path="/doctor/patients" element={<AllPatients />} />
        <Route path="/doctor/patients/:id" element={<PatientDetails />} />
        <Route path="/doctor/appointments" element={<ViewAppointments />} />
        <Route path="/doctor/medicines/add" element={<AddMedicine />} />

        <Route path="/doctor/medicines" element={<ViewMedicines />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

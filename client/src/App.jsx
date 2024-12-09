import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import TaskPage from "./pages/TaskPage";
// import ProfilePage from "./pages/ProfilePage";
import SignUp from "./components/Auth/sign up/SignUp";
import Login from "./components/Auth/login/Login";
import NotificationChecker from "./components/Nav/NotificationChecker";
import User from "./components/Nav/User";
import Inbox from "./pages/Inbox";
import Timer from "./components/Nav/Timer";
import TaskCard from "./components/Project/TaskCard";

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/tasks" element={<TaskCard />} />
        {/* <Route path="/taskscard" element={<TasksCard />} /> */}
        <Route path="/dashboards" element={<DashboardPage />} />
        <Route path="/notifications" element={<NotificationChecker />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/user" element={<User />} />
        <Route path="/inbox" element={<Inbox />} />
      </Routes>
    </Router>
  );
};

export default App;

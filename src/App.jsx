import React from 'react';
import "./App.css";
import SideBar from "./pages/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PomodoroTimer from "./pages/PomodoroTimer";
import AnalogClock from "./pages/AnalogClock";
import Todo from "./pages/Todo";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <SideBar />
          <div className="content">
            <Routes>
              <Route path="/" element={<><Home /><AnalogClock /></>} />
              <Route path="/todo" element={<><Todo /><AnalogClock /></>} />
              <Route path="/pomodoro" element={<><PomodoroTimer /><AnalogClock /></>} />
              <Route path="*" element={<div className='not_found'>Path not found</div>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

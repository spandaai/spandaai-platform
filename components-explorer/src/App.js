import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComponentsDashboard from './ComponentsDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ComponentsDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
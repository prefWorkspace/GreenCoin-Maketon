import React ,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';



// Pages
import Contents from './pages/contents/contents'; 
import Community from './pages/community/community'; 

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <Contents />} />
      <Route exact path="/Community" component={() => <Community />} />

    </Router>
  );
}

export default App;

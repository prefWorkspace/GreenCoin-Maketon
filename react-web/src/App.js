import React ,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';



// Pages
import Contents from './pages/contents/contents'; 

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <Contents />} />

    </Router>
  );
}

export default App;

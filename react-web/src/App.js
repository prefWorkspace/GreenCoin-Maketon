import React ,{useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';



// Pages
import Contents from './pages/contents/contents'; 
import Community from './pages/community/community'; 
import ViewNotice from './pages/community/detail/viewNotice';
import WriteNotice from './pages/community/detail/writeNotice';
import SelectArea from './pages/intro/selectArea';
import SelectInterest from './pages/intro/selectInterest';

function App() {
  return (
    <Router>
      <Route exact path="/" component={() => <Contents />} />
      <Route exact path="/Community" component={() => <Community />} />
      <Route exact path="/ViewNotice" component={() => <ViewNotice />} />
      <Route exact path="/WriteNotice" component={() => <WriteNotice />} />
      <Route exact path="/SelectArea" component={() => <SelectArea />} />
      <Route exact path="/SelectInterest" component={() => <SelectInterest />} />
    </Router>
  );
}

export default App;

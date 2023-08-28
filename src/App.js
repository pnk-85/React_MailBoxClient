import React from 'react';
import './App.css';
import Resistration from './Components/Pages/Resistration';
import Profile from './Components/Pages/Profile';
import ForgetPassword from './Components/Pages/ForgetPassword';
import { Route } from 'react-router-dom/cjs/react-router-dom';

function App() {
  return (
    <div className="App">
      <switch>
        <Route exact path={'/profile'}>
          <Profile />
        </Route>
        <Route exact path={'/'}>
          <Resistration />
        </Route>
        <Route exact path={'/forgetpassword'}>
          <ForgetPassword />
        </Route>
      </switch>
    </div>
  );
}

export default App;

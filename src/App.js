import React,{useEffect} from 'react';
import './App.css';
import Resistration from './Components/Pages/Resistration';
import Profile from './Components/Pages/Profile';
import ForgetPassword from './Components/Pages/ForgetPassword';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Compose from './Components/Compose';
import { useSelector, useDispatch } from 'react-redux';
import LandingPage from './Components/Pages/LandingPage';
import Navbar from './Components/Navbar';
import { authActions } from './Components/Store/auth';





function App() {

  const auth = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
  })


  return (
    <div className="App">
      <Navbar />
      <switch>
        <Route exact path={'/profile'}>
          <Profile />
        </Route>
        <Route exact path={'/composemail'}>
          {auth && <Compose />}
        </Route>
        <Route exact path={'/'}>
          {!auth && <Resistration />}
          {auth && <LandingPage />}
        </Route>
        <Route exact path={'/forgetpassword'}>
          <ForgetPassword />
        </Route>
      </switch>
    </div>
  );
}

export default App;

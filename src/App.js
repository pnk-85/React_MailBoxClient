import React,{useEffect} from 'react';
import './App.css';
import Resistration from './Components/Pages/Resistration';
import Profile from './Components/Pages/Profile';
import ForgetPassword from './Components/Pages/ForgetPassword';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Compose from './Components/Compose';
import { useSelector, useDispatch } from 'react-redux';
import LandingPage from './Components/Pages/LandingPage';
import axios from 'axios';
import Navbar from './Components/Navbar';
import { authActions } from './Components/Store/auth';
import { receivedActions } from './Components/Store/recieved';



function App() {

  const auth = useSelector(state => state.auth.isAuthenticated);
  const email = useSelector(state => state.auth.email);
  const dispatch = useDispatch();
  let emailRegEx;

  useEffect(() => {
    if(localStorage.getItem('token')){
      dispatch(authActions.login());
    }

    if(auth){
    emailRegEx = localStorage.getItem('email').replace(/[^a-zA-Z0-9]/g, "");

    axios.get(`https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${emailRegEx}/received.json`) 
    .then((res) => {
      console.log('getdata', res);
      if(res.data) {
        const firebaseIDs = Object.keys(res.data);
        console.log('firebaseIDs', firebaseIDs);

        const newItems = [];
        Object.values(res.data).forEach((el) => {
          console.log("el.body", el.body);
          newItems.push({
            ...el.body,
            id: firebaseIDs[newItems.length],
            key: firebaseIDs[newItems.length],
          })
        })
        dispatch(receivedActions.getReceivedMail(newItems));
            console.log("newItems", newItems);
            console.log("object", newItems[0].data);
      }
    })
  }
  },[auth]);



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

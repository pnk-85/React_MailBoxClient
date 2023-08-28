import axios from "axios";
import React,{useRef, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/auth";


const Resistration = () => {
    const dispatch = useDispatch();
    const [errorShow, setErrorShow] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);
    const history = useHistory();

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const switchHandler = () => {
        setIsLogIn(!isLogIn);
        setErrorShow(false);
    };

    const goToForgetPassword = () => {
        history.push('/forgetpassword');
    }

    const signUpHandler = (e) => {
        e.preventDefault();
        setErrorShow(false);

        if( 
            emailRef.current.value &&
            passwordRef.current.value &&
            confirmPasswordRef.current.value
        ){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBAgN5C7TPZyHC9W05x27irF2m-Q73eOw`,
            {
                email : emailRef.current.value,
                password : passwordRef.current.value,
                returnSecureToken : true,
            })
            .then((res) => {
                setIsLogIn(!isLogIn);
                console.log('user succesfully signed up');
            })
            .catch((error) => {
                alert(error.response.data.error.message);
            });
        }else {
            setTimeout(() => {
                setErrorShow(false);
            }, 2000);
        }
    };

    const logInHandler = (e) => {
        e.preventDefault();
        setErrorShow(false);
        if (emailRef.current.value && passwordRef.current.value) {
          localStorage.setItem("email", emailRef.current.value);
          axios
            .post(
              `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBAgN5C7TPZyHC9W05x27irF2m-Q73eOw`,
              {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                returnSecureToken: true,
              }
            )
            .then((res) => {
              console.log("user has logged in successfully");
              localStorage.setItem("token", res.data.idToken);
              dispatch(authActions.login());
              history.push("/");
    
              if (res.data.displayName && res.data.profilePicture) {
              } else {
              }
            })
            .catch((error) => {
              alert(error.response.data.error.message);
            });
        } else {
          setTimeout(() => {
            setErrorShow(false);
          }, 3000);
          setErrorShow(true);
        }
      };



    return (
        <div
      className="container-fluid"
      style={{ height: "100vh", paddingTop: "100px" }}
    >
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 p-3  text-white text-center ">
          <div
            className={`${
              isLogIn ? "bg-info p-3 rounded-2 " : "bg-warning p-3 rounded-2 "
            }`}
          >
            <h3>{isLogIn ? "Sign Up" : "Login"}</h3>
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-md-5 mx-auto mt-3 border border-3 border-info rounded-3 p-3 ">
          <form>
            <div className="form-group">
              <label className="fw-bolder float-start">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                ref={emailRef}
              />
            </div>
            <div className="form-group mt-3 ">
              <label className="form-label fw-bolder float-start">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                autoComplete="on"
                ref={passwordRef}
              />
            </div>
            {isLogIn && (
              <div className="form-group mt-3">
                <label className="form-label fw-bolder float-start">
                  Confirm Password
                </label>
                <input
                  type="password"  
                  placeholder="Confirm Password"
                  className="form-control"
                  ref={confirmPasswordRef}
                />
              </div>
            )}

            <div className="d-grid ">
              {errorShow && (
                <h4 className="text-center mt-3 text-danger">
                  All Fields Are Mandatory !!!
                </h4>
              )}
              {isLogIn && (
                <button
                  className="btn btn-info mt-3 p-2 fw-bold rounded-pill"
                  onClick={signUpHandler}
                >
                  Sign Up
                </button>
              )}
              {!isLogIn && (
                <button className="btn btn-warning mt-3 p-2 rounded-pill fw-bold"
                onClick={logInHandler}
                >
                  Login
                </button>
              )}
              {!isLogIn && (
                <button
                className="btn btn-link fw-bold"
                onClick={goToForgetPassword}
                >
                    Forget Password
                </button>
              )}
            </div>
          </form>
          <div className="d-grid">
            <button
              className="btn btn-outline-success mt-3 p-2 rounded fw-bold"
              onClick={switchHandler}
            >
              {isLogIn ? " Have an account?? Login " : "create acount"}
            </button>
          </div>
        </div>
      </div>{" "}
    </div>

    );
};

export default Resistration;
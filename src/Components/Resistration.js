import axios from "axios";
import React,{useRef, useState} from "react";


const Resistration = () => {
    const [errorShow, setErrorShow] = useState(false);
    const [isLogIn, setIsLogIn] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const switchHandler = () => {
        setIsLogIn(!isLogIn);
        setErrorShow(false);
    };

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
                <button className="btn btn-warning mt-3 p-2 rounded-pill fw-bold">
                  Login
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
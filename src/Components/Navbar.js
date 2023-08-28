import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { authActions } from "./Store/auth";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Navbar = () => {
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const history = useHistory();
    const dispatch = useDispatch();
  
    const logoutHandler = () => {
      history.push("/");
      dispatch(authActions.logout());
    };
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <NavLink class="nav-link " aria-current="page" to="/">
                Home
              </NavLink>
              <a class="nav-link" href="#">
                Features
              </a>
              <a class="nav-link" href="#">
                Pricing
              </a>
            </div>
            <div>
              {auth && (
                <button className="btn btn-danger ms-5" onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
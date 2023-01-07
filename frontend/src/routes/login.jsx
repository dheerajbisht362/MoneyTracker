import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function (props) {
  let [authMode, setAuthMode] = useState("login")

  let [signup, setSignup] = useState({
    email: "",
    name: "",
    password: "",
  })
  let [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login")
  }

  const handleLoginFormChange = (event)=>{
    event.preventDefault();
    const target = event.target;
    setLogin({
        ...login,
      [target.name]: target.value,
    });
  }

  const handleSignupFormChange = (event)=>{
    event.preventDefault();
    const target = event.target;
    setSignup({
        ...signup,
      [target.name]: target.value,
    });
  }

  const handleSignup=(e)=>{
    e.preventDefault()
    console.log("signup",signup)
    axios.post('http://localhost:4000/user/signup', signup)
      .then(function (response) {
        alert(response);
        console.log(response.data)
      })
      .catch(function (error) {
        alert(error.response.data);
      });
  }
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    console.log("login", login)
    axios.post('http://localhost:4000/user/login', login)
    .then(function (response) {
      alert(response.data.message);
      localStorage.setItem("user",JSON.stringify(response.data.data))
      navigate("/", { replace: true, state: { user: response.data.data}})
    })
    .catch(function (error) {
      alert(error);
    });
  }

  if (authMode === "login") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                value={login.email} onChange={handleLoginFormChange}
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                value={login.password} onChange={handleLoginFormChange}
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button onClick={handleLogin} type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Log In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              value={signup.name} 
              type="email"
              className="form-control mt-1"
              placeholder="e.g Vimal Elichi"
              onChange={handleSignupFormChange}
              name="name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={signup.email} 
              onChange={handleSignupFormChange}
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={signup.password} 
              onChange={handleSignupFormChange}
              name="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={handleSignup} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

//where the components and routes are configured.

import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import Landing from './components/landing.component'
import Acad_Admin_Login from './components/ad_login.component'
import Acad_Admin_SignUp from './components/ad_signup.component'
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              The Student Portal
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Landing />} />

              <Route path="/student/sign-in" element={<Login />} />

              <Route path="/student/sign-up" element={<SignUp />} />

              <Route path="/acad_ad/sign-in" element={< Acad_Admin_Login />} />

              <Route path="/acad_ad/sign-up" element={<Acad_Admin_SignUp />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
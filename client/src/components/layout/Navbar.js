import React from 'react'

function Navbar() {

  return (
    <>
      <nav className='green'>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Chat</a>
          <a href="#" data-target="mobile-demo"
            className="sidenav-trigger">
            <i className="material-icons">menu</i></a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/Login">Login</a></li>
            <li><a href="/Signup">Signup</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><a href="/Login">Login</a></li>
        <li><a href="/Signup">Signup</a></li>
        <li><a href="collapsible.html">Logout</a></li>
        <li><a href="mobile.html">Mobile</a></li>
      </ul>
    </>
  )
}

export default Navbar
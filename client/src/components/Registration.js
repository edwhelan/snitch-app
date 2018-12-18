import React, { Component } from 'react';
import Login from './Login';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  _logIn = (email, password) => {
    console.log(`You are about to log in as ${email}`)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  }

  render() {
    return (
      <div>LOGIN HERE I GUESS
        <ul>
          <li><Login /></li>
          <li>Register</li>
          <li>Logout</li>
        </ul>
        {/* <Login />
      <NewUser /> */}
      </div>

    )
  }
}

export default Registration;
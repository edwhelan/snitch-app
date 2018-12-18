import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      displayname: '',
    }
  }
  async componentDidMount() {
    await fetch('/api/loggedin')
      .catch(err => {
        console.log(err)
      })
      .then(r => {
        return (r.json())
      })
      .then(data => {
        if (data) {
          this.setState({
            displayname: data.displayname,
            loggedIn: true
          })
        } else {
          console.log('move along');
        }
      })
  }

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? <Logout /> : <Login />}
          </li>
          <li>Register</li>
        </ul>
        {/* <Login />
      <NewUser /> */}
      </div>
    )
  }
}

export default Registration;
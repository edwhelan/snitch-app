import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import NewUser from './NewUser';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      displayname: '',
      loginOpen: false,
      registerOpen: false,
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

  _isClickedLogin = () => {
    console.log("clicked it")
    this.setState({
      loginOpen: !this.state.loginOpen
    })
  }
  _isClickedRegister = () => {
    console.log("clicked it")
    this.setState({
      registerOpen: !this.state.registerOpen
    })
  }

  render() {
    return (
      <div className='navbar'>
        <ul className='nav-ul'>
          <li>Naughty Or Nice 678-673-3936</li>
          {/* {this.state.loggedIn ? <li className='nav-logout'><Logout /></li> : <><li className='nav-login'><Login /></li> <li className='nav-register'><NewUser /></li></>} */}
          {this.state.loggedIn ? <li className='nav-logout'><Logout /></li> : <><li><button onClick={this._isClickedLogin}>Login</button></li><li>{this.state.loginOpen ? <Login /> : <></>}</li><li><button onClick={this._isClickedRegister}>Register</button></li><li>{this.state.registerOpen ? <NewUser /> : <></>}</li></>}
          <li><i class="fas fa-sleigh"></i></li>
        </ul>
      </div>
    )
  }
}

export default Registration;
import React from 'react'


const Login = (props) => {
  return (
    <div className='login-form'>
      <form action='/api/login' method='POST'>
        <label>
          Email address:
      <input type='email' name='email' required />
        </label><br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label> <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
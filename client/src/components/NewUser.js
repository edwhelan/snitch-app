import React from 'react'

const NewUser = (props) => {
  return (
    <form action="/register" method="POST">
      <label>
        Email address:<br />
        <input type="email" name="email" required />
      </label>
      <br />
      <label>
        Display name:<br />
        <input type="text" name="displayName" required />
      </label>
      <br />
      Phone Number:<br />
      <label>
        <input type="text" name="phoneNumber" required />
      </label>
      <br />
      <label>
        Password:<br />
        <input type="password" name="password" required />
      </label>
      <br />
      <input type="submit" value="Register" />
    </form >
  )
}

export default NewUser;
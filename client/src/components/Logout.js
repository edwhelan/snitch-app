import React from 'react';
// log out button for registration Component
const Logout = (props) => {
  return (
    <form action='/logout' method='POST' className="logoutButton">
      <input type="submit" value="Logout" />
    </form>
  )
}

export default Logout;
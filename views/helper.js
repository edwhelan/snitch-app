//REGISTER VIEW
function registrationForm() {
  return `
  <div class='registration-form'>
  <form action="/register" method="POST">
      <label>
          Email address:<br>
          <input type="email" name="email" required>
      </label>
      <br>
      <label>
          Display name:<br>
          <input type="text" name="displayName" required>
      </label>
      <br>
          Phone Number:<br>
          <input type="text" name="phoneNumber" required>
      </label>
      <br>
      <label>
          Password:<br>
          <input type="password" name="password" required>
      </label>
      <br>
      <input type="submit" value="Register">
  </form>    
  </div>
  `
}
//LOGIN VIEW
function loginForm() {
  return `
  <div class='login-form'
  <form action="/login" method="POST">
      <label>
          Email address:<br>
          <input type="email" name="email" required>
      </label>
      <br>
      <label>
          Password:<br>
          <input type="password" name="password" required>
      </label>
      <br>
      <input type="submit" value="Login">
  </form>
  </div>
  `;
}
// LOGOUT BUTTON
function logoutButton() {
  return `
    <form action='/logout' method='POST' class="logoutButton">
      <input type="submit" value="Logout">
    </form>
  `;
}


module.exports = {
  registrationForm,
  loginForm,
  logoutButton,
}
//HEADER AREA 
function header(isLoggedIn = false) {
  return `
    <header>
    <h1>Naughty or Nice</h1>
    ${isLoggedIn ? logoutButton() : none()}
    </header>
  `
}

function none() {
  return ``;
}

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
  <div class='login-form'>
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

function drawPicture(data, value, id) {
  return new Promise(
    (resolve, reject) => {
      console.log(value)
      resolve(`
      <div class='image-in-row' key='${id}'>
      <img srcset=${data} />
      <i class="fas fa-arrow-up"></i>
      ${value}
      <i class="fas fa-arrow-down"></i>
      </div>
      `)
    }
  )
}

// SHOW ALL THE PICTURES
function showPictures(images) {
  return Promise.all(images.map(img => {
    return drawPicture(img.image, img.votevalue, img.id)
  }))
}

module.exports = {
  header,
  registrationForm,
  loginForm,
  logoutButton,
  showPictures,
  drawPicture,
}
//HEADER AREA 
function header(isLoggedIn = false) {
  return `
    <header>
    <h1>1-800-SNITCH</h1>
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

var http = require('follow-redirects').http;
var https = require('follow-redirects').https;

function getAddress(source) {
  return (
    new Promise(
      (resolve, reject) => {
        https.get(source, (res) => {
          const { statusCode } = res;
          const contentType = res.headers['content-type'];
          console.log(`This is your content type : ${contentType}`)
          console.log(`This is your statusCode : ${statusCode}`)
          console.log(res.responseUrl)
          resolve(drawPicture(res.responseUrl))
        })
      }
    )
  )

}

function drawPicture(source) {
  console.log(`this is your routed address : ${source}`);
  return `
  <img src='${source}' />
  `;
}


// SHOW ALL THE PICTURES
function showPictures(images) {


  return Promise.all(images.map(img => {
    // console.log(`ITS WORKING!${drawPicture(img.image)}`
    return getAddress(img.image)
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
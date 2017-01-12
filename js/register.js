// Register a new user
$('.register-btn').click(() => {

  var username = $('input[type="username"]').val();
  var password = $('input[type="password"]').val();

  firebase.auth()
  .createUserWithEmailAndPassword(username, password)
  .then(() => {
    $('form')[0].reset();
  })
  .catch(({code, message}) => {
    var errorMsg = `${code}: ${message}`;
    console.log(errorMsg);
    alert(errorMsg);
  });
});

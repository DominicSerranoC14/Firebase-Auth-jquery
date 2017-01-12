// Login functionality
$('.login-form').submit(function(evt) {
  // Prevent form submission
  evt.preventDefault();

  var username = $('input[type="username"]').val();
  var password = $('input[type="password"]').val();

  firebase.auth().signInWithEmailAndPassword(username, password)
  .then((user) => {
    console.log(user);
    $('form')[0].reset();
  })
  .catch(({code, message}) => {
    var errorMsg = `${code}: ${message}`;
    console.log(errorMsg);
    alert(errorMsg);
  });
});

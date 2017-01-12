// Initialize Firebase
// TODO: Replace with your project's customized code snippet
firebase.initializeApp({
  apiKey: "AIzaSyBQvqQ7kzTaktfR9Wj6BWFL8Ddbb0j1ug0",
  authDomain: "mjd-fb-todo.firebaseapp.com",
  databaseURL: "https://mjd-fb-todo.firebaseio.com",
  storageBucket: "mjd-fb-todo.appspot.com",
  messagingSenderId: "799666624150"
});

// Will listen for change in auth state
firebase.auth().onAuthStateChanged(() => {
  if (firebase.auth().currentUser !== null) {
    var currentUser = firebase.auth().currentUser;
    if (currentUser.providerData[0].providerId !== 'password') {
      $('.main-page').append(`<p><img class="profile-img" src="${currentUser.providerData[0].photoURL}"></p>`)
    }
    $('.main-page').removeClass('hidden');
    $('.login-page').addClass('hidden');
    $('.main-page h1').text(`Welcome ${currentUser.email}`);
  } else {
    $('.main-page').addClass('hidden');
    $('.login-page').removeClass('hidden');
  };
});

// Login functionality
$('form').submit(function(evt) {
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
  });
});

// Register a current user
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
  });
})

// Sign out the current user
$('.logout-btn').click(() => {
  firebase
  .auth()
  .signOut()
  .then(() => console.log('successfully logged out'))
});

$('.google-signin').click(() => {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log("result", result);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
});

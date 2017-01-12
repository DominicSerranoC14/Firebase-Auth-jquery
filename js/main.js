// Will listen for change in auth state
firebase.auth().onAuthStateChanged(() => {
  var currentUser = "";
  $('.todo-list').html('');
  $('.profile-image-p').remove();

  if (firebase.auth().currentUser !== null) {

    currentUser = firebase.auth().currentUser;

    $.ajax({
      url: `https://mjd-fb-todo.firebaseio.com/todo/${currentUser.uid}.json`
    })
    .then(userTodoList => {
      for (var key in userTodoList) {
        $('.todo-list').append(`<li>${userTodoList[key].todo}</li>`)
      };
    });

    if (currentUser.providerData[0].providerId !== 'password') {
      $('.main-page .header').append(`<p class="profile-image-p"><img class="profile-img" src="${currentUser.providerData[0].photoURL}"></p>`)
    }
    $('.main-page').removeClass('hidden');
    $('.login-page').addClass('hidden');
    $('.main-page h1').text(`Welcome ${currentUser.email}`);
  } else {
    $('.main-page').addClass('hidden');
    $('.login-page').removeClass('hidden');
  };
});

// Logout functionality
// Sign out the current user
$('.logout-btn').click(() => {
  firebase
  .auth()
  .signOut()
  .then(() => console.log('successfully logged out'))
});

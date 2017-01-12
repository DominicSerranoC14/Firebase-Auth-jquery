// Function for todo submission
$('.main-page form').submit((evt) => {

  evt.preventDefault();

  // Get the users todo task and current user UID
  var task = $('.todo-input').val();
  var uid = firebase.auth().currentUser.uid;
  $('.todo-input').val('');

  $.ajax({
    type: 'POST',
    url: `https://mjd-fb-todo.firebaseio.com/todo/${uid}.json`,
    data: JSON.stringify({ todo: task, uid: uid })
  })
  .then((res) => {
    if (res.name) {
      $.ajax({
        url: `https://mjd-fb-todo.firebaseio.com/todo/${uid}.json`
      })
      .then(userTodoList => {
        $('.todo-list').html('');
        for (var key in userTodoList) {
          $('.todo-list').append(`<li>${userTodoList[key].todo}</li>`)
        };
      });
    }
  });

});

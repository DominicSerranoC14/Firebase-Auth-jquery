$('form').submit(function(evt) {
  // Prevent form submission
  evt.preventDefault();

  var username = $('input[type="username"]').val();

  $('.main-page h1').append(`Welcome ${username}`);

  $('.main-page').removeClass('hidden');
  $('.login-page').addClass('hidden');
});

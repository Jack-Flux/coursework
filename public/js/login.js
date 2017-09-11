$(document).ready(() => {
  Materialize.updateTextFields();
  $('#register').click(() => {
    $('#signup').removeClass('hide');
    $('#login').addClass('hide');
  });
  $('#registered').click(() => {
    $('#login').removeClass('hide');
    $('#signup').addClass('hide');
  });
});


$(document).ready(function () {
  var emailData = [];
  var link = '1';
  var ajax = $.ajax({
     type: "GET",
     url: "/public/data/data.json",
     dataType: "json",
     success: function(data){
       $('#question').text(data.questions[0].question);
      data.questions[0].answers.forEach(function(item){
        $('#answers').append('<a href="#'+item.link+'" class="collection-item">'+item.text+'</a>');
      });
      $('#preloader').addClass('hide');
      $('#question, #answers').removeClass('hide');
     }
   });

  $('.collection').on('click', '.collection-item', function(e) {
    e.preventDefault();
    $('#preloader').removeClass('hide');
    $('#question, #answers').addClass('hide');
    var question = $('#question').text();
    var answer = $(this).text();
    emailData.push({"link": link, "question": question, "answer": answer});
    var link = $(this).attr('href').substring(1);
    var data = $.parseJSON(ajax.responseText);
    // if finish
    if (data.questions[link] === true) {
      $('#preloader').addClass('hide');
      var emailJson = {
        'data': emailData
      };
      $.ajax({
        type: 'POST',
        url: '/mail',
        contentType: 'application/json',
        data: JSON.stringify(emailJson),
        success: function(data) {
          $('#finish').removeClass('hide');
        },
        error: function(xhr, str) {
          $('#error').removeClass('hide');
        }
      });
    } else {
      $('#answers').empty();
      $('#question').text(data.questions[link].question);
        data.questions[link].answers.forEach(function(item){
        $('#answers').append('<a href="#'+item.link+'" class="collection-item">'+item.text+'</a>');
      });
      $('#question, #answers').removeClass('hide');
      $('#preloader').addClass('hide');
    }
  })
});

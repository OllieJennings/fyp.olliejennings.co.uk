


initCircles = function () {
  // selected the left-col and create colu
  $('.circle').append("<div class='innerCircle'></div>");


  $.each(['c3', 'c5', 'c6', 'c20', 'c10'], function (index, ele) {
    $('.' + ele).children().first().css('width', '90%');
    $('.' + ele).children().first().css('height', '90%');

    $('.' + ele).children().first().css('margin', '-45% 0 0 -45%');
  });


  $.each(['c1', 'c11', 'c9', 'c16', 'c7', 'c17'], function (index, ele) {
    $('.' + ele).children().first().css('height', '70%');
    $('.' + ele).children().first().css('width', '70%');
    $('.' + ele).children().first().css('margin', '-35% 0 0 -35%');
  });

  $.each(['c18', 'c24', 'c14', 'c8'], function (index, ele) {
    $('.' + ele).children().first().css('height', '20%');
    $('.' + ele).children().first().css('width', '20%');
    $('.' + ele).children().first().css('margin', '-10% 0 0 -10%');
  });
}

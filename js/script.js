let isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i); },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
let body = document.querySelector('body');
if (isMobile.any()) {
  body.classList.add('touch');
  let arrow = document.querySelectorAll('.arrow');
  for (i = 0; i < arrow.length; i++) {
    let thisLink = arrow[i].previousElementSibling;
    let subMenu = arrow[i].nextElementSibling;
    let thisArrow = arrow[i];

    thisLink.classList.add('parent');
    arrow[i].addEventListener('click', function () {
      subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
    });
  }
} else {
  body.classList.add('mouse');
}

$(document).ready(function () {

  //Swipe speed:
  var tolerance = 100; //px.
  var speed = 650; //ms.

  //Elements:
  var interactiveElements = $('input, button, a');
  var itemsLength = $('.panel').length;
  var active = 1;

  //Background images:
  for (i = 1; i <= itemsLength; i++) {
    var $layer = $(".panel:nth-child(" + i + ")");
    var bgImg = $layer.attr("data-img");
    $layer.css({
      "background": "url(" + bgImg + ") no-repeat center / cover"
    });
  };

  //Transitions:
  setTimeout(function () {
    $(".panel").css({
      "transition": "cubic-bezier(.4,.95,.5,1.5) " + speed + "ms"
    });
  }, 200);

  //Presets:
  $(".panel:not(:first)").addClass("right");

  //Swipe:
  function swipeScreen() {
    $('.swipe').on('mousedown touchstart', function (e) {

      var touch = e.originalEvent.touches;
      var start = touch ? touch[0].pageX : e.pageX;
      var difference;

      $(this).on('mousemove touchmove', function (e) {
        var contact = e.originalEvent.touches,
          end = contact ? contact[0].pageX : e.pageX;
        difference = end - start;
      });

      //On touch end:
      $(window).one('mouseup touchend', function (e) {
        e.preventDefault();

        //Swipe right:
        if (active < itemsLength && difference < -tolerance) {
          $(".panel:nth-child(" + active + ")").addClass("left");
          $(".panel:nth-child(" + (active + 1) + ")").removeClass("right");
          active += 1;
          btnDisable();
        };

        // Swipe left:
        if (active > 1 && difference > tolerance) {
          $(".panel:nth-child(" + (active - 1) + ")").removeClass("left");
          $(".panel:nth-child(" + active + ")").addClass("right");
          active -= 1;
          btnDisable();
        };

        $('.swipe').off('mousemove touchmove');
      });

    });
  };
  swipeScreen();

  //Prevent swipe on interactive elements:
  interactiveElements.on('touchstart touchend touchup', function (e) {
    e.stopPropagation();
  });

  //Buttons:
  $(".btn-prev").click(function () {
    // Swipe left:
    if (active > 1) {
      $(".panel:nth-child(" + (active - 1) + ")").removeClass("left");
      $(".panel:nth-child(" + active + ")").addClass("right");
      active -= 1;
      btnDisable();
    };
  });

  $(".btn-next").click(function () {
    //Swipe right:
    if (active < itemsLength) {
      $(".panel:nth-child(" + active + ")").addClass("left");
      $(".panel:nth-child(" + (active + 1) + ")").removeClass("right");
      active += 1;
      btnDisable();
    };
  });

  function btnDisable() {
    if (active >= itemsLength) {
      $(".btn-next").prop("disabled", true);
      $(".btn-prev").prop("disabled", false);
    }
    else if (active <= 1) {
      $(".btn-prev").prop("disabled", true);
      $(".btn-next").prop("disabled", false);
    }
    else {
      $(".btn-prev, .btn-next").prop("disabled", false);
    };
  };

});

$(document).ready(function () {
  $('.slider').slick({
    arrows: true,
    dots: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 800,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
});


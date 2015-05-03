(function($) {
  'use strict';

/*=================================================
ie10 viewport fix
=================================================*/

  (function() {
    'use strict';
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.querySelector('head').appendChild(msViewportStyle)
    }
  })();

/*=================================================
detect
=================================================*/

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var isIE9;
    
    function _platformDetect() {

      if (isMobile) {
        $('body').addClass('is-mobile');
      }

      if ($('html').hasClass('ie9')) {
        isIE9 = true;
      }
    }

/*=================================================
preloader
=================================================*/

  function _preloader() {

    $('#preloader-img').fadeOut(__preloaderFadeOut);
    $('#preloader').delay(__preloaderDelay).fadeOut(__preloaderFadeOut, function(){
      // function that after preloader
    });

  }

/*=================================================
fullpage
=================================================*/

  function _fullPage() {

    if (isMobile) { // mobile config // do not edit

      var __navigation = false;
      var __autoScrolling = false;
      var __scrollBar = true;
      var __scrollOverflow = false;

    } else { // desktop config // do not edit

      var __navigation = true;
      var __autoScrolling = true;
      var __scrollBar = false;
      var __scrollOverflow = true;

    }

    var __menuanchor = [];
    var $menu = $('#menu');
    var firstAnchor = $menu.find('li:first').data('menuanchor');
    $menu.find('li').each(function() { // set menu anchor form html

      var $this = $(this);
      var menuanchor;

      if ($this.data('menuanchor')) {
        menuanchor = $this.data('menuanchor')
      }
      __menuanchor.push(menuanchor)

    });

    $('#fullpage').fullpage({

      menu: '#menu',
      anchors: __menuanchor,
      navigation: __navigation,
      navigationPosition: 'left',
      showActiveTooltips: false,
      scrollingSpeed: __scrollingSpeed,
      autoScrolling: __autoScrolling,
      fitToSection: false,
      scrollBar: __scrollBar,
      easing: 'easeInExpo', // jquery easing
      easingcss3: 'cubic-bezier(1.000, 0.000, 0.465, 0.880)', // css easing
      scrollOverflow: __scrollOverflow,
      recordHistory: __recordHistory,
      paddingTop: '0',
      paddingBottom: '0',

      onLeave: function(index, nextIndex, direction) { //onLeave

        $(this).find('.animate').each(function() {

          var $this = $(this);

          if (direction == 'up') {
            $this.removeClass('in up down').addClass('up');
          }
          if (direction == 'down') {
            $this.removeClass('in up down').addClass('down');
          }

        });

          if (index >= 2 && direction == 'up') {
            $('#home').find('.animate.in').removeClass('in');
          }

      },

      afterLoad: function(anchorLink, index) { // afterLoad

        $(this).find('.animate').each(function() {

          var $this = $(this);

          if (!isMobile && !isIE9) {
            var delay = 0;

            if ($this.data('delay')) {
              delay = $this.data('delay');
            }

            var delayTime = $('body').hasClass('is-loaded') ? delay : __preloaderFadeOut - 800 + delay;

            setTimeout(function() {
              $this.addClass('in');
              $('body').addClass('is-loaded');
            }, delayTime);
          }

        });

        $('.section:not(".active")').find('.animate').each(function() {
          $(this).removeClass('in');
        });

      },
      
      afterRender: function(index) {

        $('.animate').addClass('up');

        $('#home').find('.animate').each(function() {

          var $this = $(this);
          var delay = 0;

          if ($this.data('delay')) {
            delay = $this.data('delay');
          }

          if ($('body').hasClass('fp-viewing-' + firstAnchor)) {
            setTimeout(function() {
              $this.addClass('in');
              $('body').addClass('is-loaded');
            }, __preloaderFadeOut + 200 + delay);
          }

        });
      },

      afterResize: function(){},

      afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},

      onSlideLeave: function(anchorLink, index, slideIndex, direction){}

    });
  }

/*=================================================
pricing table
=================================================*/

  function _pricingTable() {

    if ($('#pricing').find('pricing-table')) {
      var $pricingTable = $('.pricing-table');

      $pricingTable.on('mouseenter mouseleave', function(e) {
        $pricingTable.addClass('active');
        $pricingTable.not(this).removeClass('active');
      });
    }

  }

/*=================================================
click link
=================================================*/

  function _clickLink() {
    $('a[href="#"]').on('click',function(e) {
      e.preventDefault();
    });
  }

/*=================================================
nav menu
=================================================*/

  function _navMenu() {

    var $navToggle = $('#nav-toggle');
    var $navMenu = $('.nav-menu');

    $navToggle.on('click', function(e) {
      $(this).add($navMenu).toggleClass('active');
    });

    var $menuLink = $('#menu').find('a');

    $menuLink.on('click', function() {
      $navMenu.add($navToggle).removeClass('active');
    });
  }

/*=================================================
padding
=================================================*/


  function _padding() {
    $('.section-entry').css({
      'padding-top': 100 + 'px',
      'padding-bottom': 100 + 'px'
    });
  }

/*=================================================
progress bar
=================================================*/

  function _progressBar() {

    var $progressBar = $('.progress-bar');

    $progressBar.each(function(i) {

      var $this = $(this);

      $this.appear(function() {

        var $percent = $this.find('span');
        var percent = $this.attr('aria-valuenow');

        $this.animate({'width' : percent + '%'});
        $percent.delay(__progressBarSpeed / 2).animate({'opacity' : 1}, __progressBarSpeed / 2);
        $percent.countTo({
          from: 0,
          to: percent,
          speed: __progressBarSpeed,
          refreshInterval: 50
        });

      });

    });
  }

/*=================================================
lightbox
=================================================*/

  function _lightbox() {
    $('.work-row').each(function() {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true,
          navigateByImgClick: true
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.', // error message
          titleSrc: 'title'
        },
        zoom: {
          enabled: true,
          duration: 300 // zoom duration time
        }
      });
    });
  }

/*=================================================
form validation
=================================================*/

  function _formValidation(emailAddress) {
    var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return emailRegex.test(emailAddress);
  }

/*=================================================
subscribe form (mailchimp)
=================================================*/

  function _mailChimp() {

    var $form = $("#subscribe-form");
    var $subscribeNotice = $('.subscribe-notice');
    var $subscribeEmail = $('#subscribe-email');
    var $btnSubscribe = $('.btn-subscribe');

    $form.ajaxChimp({
      callback: _mailChimpStatus,
      language: "eng",
      type: "POST",
      url: __mailChimpUrl
    });

    function _mailChimpStatus (resp) {

      if (resp.result === "error") {
        $('#subscribe-email').focus();
      }
      else if (resp.result === "success") {
        $form[0].reset();
        $subscribeEmail.blur();
      }

    }

  }

/*=================================================
subscribe form (php)
=================================================*/

  function _subscribeForm() {

    var $form = $('#subscribe-form');
    var $subscribeEmail = $('#subscribe-email');

    $subscribeEmail.prop('type', 'text');

    $form.on('submit', function(e) {

      var subscribeEmailVal = $subscribeEmail.val();
      var $subscribeNotice = $('.subscribe-notice');
      var $btnSubscribe = $('.btn-subscribe');

      e.preventDefault();

      $btnSubscribe.prop('disabled', true);

      if (!_formValidation(subscribeEmailVal)) {
        $subscribeNotice.stop(true).hide().html('<i class="fa fa-close error"></i> email address is invalid').fadeIn();
        $btnSubscribe.prop('disabled', false);
        $('#subscribe-email').focus();
      }
      else {
        $.ajax({
          type: 'POST',
          url: 'php/subscribe.php',
          data: {
            email: subscribeEmailVal
          },
          success: function() {

            $subscribeNotice.stop(true).hide().html('<i class="fa fa-check valid"></i> thank you for subscribing').fadeIn();
            $btnSubscribe.prop('disabled', false);
            $form[0].reset();
            $subscribeEmail.blur();

          }
        });
      }
      return false;

    });

  }

/*=================================================
contact form
=================================================*/

  function _contactForm() {

    var $form = $('#contact-form');

    $form.on('submit', function(e) {

      var $input = $form.find('input, textarea');
      var contactNameVal = $('#contact-name').val();
      var contactEmailVal = $('#contact-email').val();
      var contactMessageVal = $('#contact-message').val();
      var $contactNotice = $('.contact-notice');
      var $formNotice = $form.find('.form-notice');
      var $submitButton = $form.find('button[type="submit"]');

      e.preventDefault();

      $submitButton.prop('disabled', true);

      if (contactNameVal == "" || contactEmailVal == "" || contactMessageVal == "") {

        $contactNotice.stop(true).hide().html('<i class="fa fa-close error"></i> all fields are required').fadeIn(500);
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(500, function() {
          $(this).delay(2500).fadeOut(function() {
            $submitButton.prop('disabled', false);
          });
        });

        $input.each(function() {
          if (this.value === '') {
            this.focus();
            return false;
          }
        });

      }

      else if (!_formValidation(contactEmailVal)) {

        $contactNotice.stop(true).hide().html('<i class="fa fa-close error"></i> email address is invalid').fadeIn(500);
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(500, function() {
          $(this).delay(2500).fadeOut(function() {
            $submitButton.prop('disabled', false);
          });
        });
        $('#contact-email').focus();

      }
      else {

        $.ajax({
          type: 'POST',
          url: 'php/contact.php',
          data: {
            name: contactNameVal,
            email: contactEmailVal,
            message: contactMessageVal
          },
          success: function() {

            $contactNotice.stop(true).hide().html('<i class="fa fa-check valid"></i> message have been sent').fadeIn(500);
            $formNotice.stop(true).hide().removeClass('fa-close error-bg').addClass('fa-check valid-bg').fadeIn(500, function() {
              $(this).delay(2500).fadeOut(function() {
                $submitButton.prop('disabled', false);
              });
            });
            $form[0].reset();
            $input.blur();

          }
        });

      }
      return false;

    });
  }

/*=================================================
countdown
=================================================*/

  function _countdown() {

    var $countdownContainer = $('#countdown');

    if (__countdown) {
      $countdownContainer.downCount({
        date: __countdownDate,
        offset: __countdownTimezone
      }, function() {
        alert('We Are Ready!'); // countdown callback
      });
    } else {
      $countdownContainer.hide();
    }

  }

/*=================================================
header style toggle
=================================================*/

  function _headerStyleToggle() {

    var $body = $('body');
    $body.addClass('no-static-bg');

    if (__staticBackground) {
      $body.removeClass('no-static-bg').addClass('static-bg');
    } else if (__videoHeader) {
      _videoHeader();
    } else if (__slideshowHeader) {
      _slideshow();
    }
    if (!__overlay) {
      $('.overlay').hide();
    }

  }

/*=================================================
slideshow
=================================================*/

  // image set
  var slideShowImageSet = [];

  for (var i = 1; i <= __imageNumber; i++) {
    slideShowImageSet.push('img/bg/bg-' + (i < 10 ? '0' + i : i) + '.jpg');
  }

  // slideshow
  function _slideshow() {

    var __slideshowImageSet = slideShowImageSet.map(function(val) {
      return {'src' : val};
    });

    if (!isMobile) {
      $('body').vegas({
        preload: true,
        timer: false,
        shuffle: __slideshowShuffle,
        delay: __slideshowDelay,
        transitionDuration: __slideshowTransitionDuration,
        animationDuration: __slideshowAnimationDuration,
        slides: __slideshowImageSet,
        animation: __slideshowAnimation,
        transition: __slideshowTransition
      });
    }

    if (isMobile) {
      $('body').vegas({
        preload: true,
        timer: false,
        shuffle: __slideshowShuffle,
        delay: __slideshowDelay,
        slides: __slideshowImageSet
      });
    }

  }

/*=================================================
youtube video background header
=================================================*/

  function _videoHeader() {

    var $body = $('body');

    if (isMobile) {
      $body.backstretch('img/bg/video-mobile.jpg'); // set a background image for mobile
    }
    else {
      var $bgVideo = $('#bg-video');
      var $volume = $('#volume');
      $('#video-control').show();

      $body.backstretch('img/bg/video-desktop.jpg'); // before video start, set a background image for desktop
      $bgVideo.attr('data-property', "{videoURL: __youtubeUrl, showControls: false, autoPlay: true, loop: true, mute: __videoMute, startAt: __videoStartTime, stopAt: __videoEndTime, quality: 'default', containment: 'body'}");
      $bgVideo.YTPlayer();
      
      if (__videoMute) {
        $volume.addClass('fa-volume-off');
      } else {
        $volume.addClass('fa-volume-up');
      }

      $('#play').on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-play fa-pause', function() {
          ($this.hasClass('fa-play')) ? $bgVideo.pauseYTP() : $bgVideo.playYTP();
        });
      });
      
      $volume.on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-volume-off fa-volume-up', function() {
          ($this.hasClass('fa-volume-off')) ? $bgVideo.muteYTPVolume() : $bgVideo.unmuteYTPVolume();
        });
      });
    }

  }

/*=================================================
audio
=================================================*/

  function _audioPlayer() {

    if (__audio && isMobile) {
      var $audioPlayer = document.getElementById('audio-player');
      var $audioPlay = $('#audio-play');
      $('#audio-control').show();
      $audioPlay.addClass('fa-play');
      $audioPlayer.pause();
      $audioPlay.on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-play fa-pause', function() {
          ($this.hasClass('fa-play')) ? $audioPlayer.pause() : $audioPlayer.play();
        });
      });
    }

    if (__audio && !__videoHeader && !isMobile) {
      var $audioPlayer = document.getElementById('audio-player');
      var $audioPlay = $('#audio-play');
      $('#audio-control').show();
      $audioPlay.addClass('fa-pause');
      $audioPlayer.play();
      $audioPlay.on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-play fa-pause', function() {
          ($this.hasClass('fa-play')) ? $audioPlayer.pause() : $audioPlayer.play();
        });
      });
    }

  }

/*=================================================
window on load
=================================================*/

  $(window).on('load', function() {

    _preloader();
    _padding();

  });

/*=================================================
document on ready
=================================================*/

  $(document).on('ready', function() {

    _platformDetect();
    _fullPage();
    _countdown();
    _headerStyleToggle();
    _lightbox();
    _contactForm();
    _progressBar();
    _pricingTable();
    _navMenu();
    _clickLink();
    if (__mailChimpVersion) {
      _mailChimp();
    } else {
      _subscribeForm();
    }
    _audioPlayer();

  });

/*=================================================
window on resize
=================================================*/

  $(window).on('resize', function() {

  }).trigger('resize');

})(jQuery);
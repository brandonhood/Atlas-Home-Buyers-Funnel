(function($) {

    // Menu
    $('.header-with-menu .header-menu-icon').click(function () {
        $('.header-with-menu .header-menu-overlay').toggleClass('active');
    });
    $('.header-with-menu .header-menu-close').click(function () {
        $('.header-with-menu  .header-menu-overlay').removeClass('active');
    });

    // Popup Form
    if (($('.popup-form-trigger').length > 0) && ($('#popup-form-container').length > 0)) {
        $('.popup-form-trigger').on('click', function () {
            $('#popup-form-container').fadeIn(500);
            $('html, body').addClass('scroll-lock');
        });

        $('.popup-close').on('click', function () {
            $('#popup-form-container').fadeOut(500);
            $('html, body').removeClass('scroll-lock');
        });

    }

    // Slick Slider (jQuery) - Remove these if not in use 
    if ($('.testimonials .slider')) {
        $('.testimonials .slider').slick({
            lazyLoad: 'ondemand',
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 600,
            dots: true,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 5000,
            prevArrow: $('.prev'),
            nextArrow: $('.next')
        });
    }

    // Sticky Header
    $(window).on("scroll load", function () {
        if ($(window).scrollTop() >= 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Smooth Scroll To Anchor
    $(document).on('click', 'a[href*="#"]', function (event) {
        event.preventDefault();
        var target = $(this).attr('href');

        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);
        }
    });
    
    $(window).on('load', function () {
        // Components loading animations
        $('.view-animation').viewportChecker({
            classToAdd: 'animated',
            offset: 20
        });

        // Lazyload
        $('.lazyload').Lazy({
            effect: 'fadeIn',
            visibleOnly: true,
            onError: function (element) {
                console.log('error loading ' + element.data('src'));
            }
        });

        //COUNTDOWN
        if ($('.kk-countdown-timer').length > 0) {
            var date = new Date();
            var startMinutes = date.getMinutes();
            var startSeconds = date.getSeconds();
            var remainingSeconds = 59 - startSeconds;
            var remainingMinutes = 0;

            if (startMinutes < 15) { remainingMinutes = 15 - startMinutes - 1; }
            else if (startMinutes < 30) { remainingMinutes = 30 - startMinutes - 1; }
            else if (startMinutes < 45) { remainingMinutes = (45 - startMinutes - 1); }
            else { remainingMinutes = (60 - startMinutes - 1); }


            var count = (remainingMinutes * 60 + remainingSeconds);
            var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

            function timer() {
                count = count - 1;
                if (count == -1) {
                    clearInterval(counter);
                    return;
                }

                var seconds = count % 60;
                var minutes = Math.floor(count / 60);
                minutes %= 60;

                var minuteString = ' minutes and ';
                if (minutes == 1) { minuteString = ' minute and '; }
                var secondString = ' seconds';
                if (seconds == 1) { secondString = ' second'; }

                document.querySelectorAll(".training-text .time-left").forEach(function (selected, index) {
                    if (seconds < 1 && minutes < 1) {
                        selected.innerHTML = $(selected).parent().parent().data('end-text');
                    }
                    if (minutes < 1) {
                        selected.innerHTML = seconds + secondString; // watch for spelling
                    } else {
                        selected.innerHTML = minutes + minuteString + seconds + secondString; // watch for spelling
                    }
                });
            }
        }
    });

    $(document).ready(function () {
        // Remove all the extra style & scripts of form
        $('.form-container style').remove();

        // Hide labels for single line text fields
        $('.form-container input[type=text], input[type=email], input[type=tel]').each(function () {
            $(this).parent().find('label').hide();
        });


        // Add Default Icons
        $('.form-container input[type="text"], textarea, select').parent('div').append('<i class="color-brand far fa-comment-dots"></i>');
        
        // Specific icons
        $('.form-container input[name*="name"], input[name*="Name"]').parent('div').append('<i class="color-brand far fa-user-circle"></i>');

        $('.form-container input[type="email"], input[name*="email"], input[name*="Email"], input[type="email"]').parent('div').append('<i class="color-brand far fa-envelope"></i>');

        $('.form-container input[type = "tel"], input[name*="phone"], input[name*="Phone"], input[name*="mobile"], input[name*="Mobile"], input[name*="landline"], input[name*="Landline"], input[type="tel"]').parent('div').append('<i class="color-brand fas fa-mobile-alt"></i>');

        $('.form-container input[name*="location"], input[name*="Location"], input[name *= "place"], input[name *= "Place"], input[name *= "city"], input[name *= "City"], input[name *= "suburb"], input[name *= "Suburb"], input[name *= "address"], input[name *= "Address"], input[name *= "country"], input[name *= "Country"], input[name *= "state"], input[name *= "State"], input[name *= "provinance"], input[name *= "Provinance"]').parent('div').append('<i class="color-brand fas fa-map-marker-alt"></i>');

        // Remove Default icons from name, email, phone, location
        $('.form-container input[name*="email"], input[name*="Email"], input[name*="phone"], input[name*="Phone"], input[name*="mobile"], input[name*="Mobile"], input[name*="landline"], input[name*="Landline"], input[name*="name"], input[name*="Name"], input[name*="location"], input[name*="Location"], input[nam*="place"], input[name*="Place"], input[name*="city"], input[name*="City"], input[name*="suburb"], input[name*="Suburb"], input[name*="address"], input[name*="Address"], input[name*="country"], input[name*="Country"], input[name*="state"], input[name*="State"], input[name*="provinance"], input[name*="Provinance"]').parent('div').find('i.fa-comment-dots').remove();

        $('input[type=radio], input[type=checkbox]').parent('div').find('i').remove();


        // Infusion Form Specific
        if (($('.form-container form.infusion-form').length > 0)) {

            // $('.form-container script').remove();

            // Adding * to all required fields
            // $('.form-container form .infusion-submit button').attr('class', '').attr('id', '');

            $("form.infusion-form .infusion-field, form.infusion-form .infusion-option").each(function () {
                var label = $(this).find('label').html();

                if (label && label.includes('*')) {
                    $(this).find('input, textarea, select').attr('required', true);
                } else {
                    var placeholder = $(this).find('input, textarea, select')[0].placeholder;

                    if (placeholder && placeholder.includes('*')) {
                        $(this).find('input, textarea, select').attr('required', true);
                    }
                }
            });
        }
    });
    // Form Validations
    // jQuery.validator.setDefaults({
    //     debug: true,
    //     ignore: '',
    //     success: validateExtraFields()
    // });

    jQuery.validator.addMethod("emailExt", function (value, element, param) {
        return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
    }, 'Please Enter a valid email');

    // $('form.infusion-form').validate();

    // function validateExtraFields() {

    //     $('form.infusion-form').validate({

    //         rules: {
    //             inf_field_Email: {
    //                 emailExt: true
    //             },
    //             inf_field_Phone1: {
    //                 number: true,
    //                 minlength: 8,
    //                 maxlength: 11
    //             }
    //         },
    //         submitHandler: function (form) {
    //             $(this).find(".form-thank-you").html("Thank you for your information!");
    //             $(this).find(".form-thank-you").show();

    //             form.submit();
    //         },
    //         invalidHandler: function (event, validator) {
    //             // 'this' refers to the form
    //             var errors = validator.numberOfInvalids();
    //             if (errors) {
    //                 var message =
    //                     errors == 1
    //                         ? "You missed 1 field. It has been highlighted"
    //                         : "You missed " +
    //                         errors +
    //                         " fields. They have been highlighted";
    //                 $(this).find("div.form-error").html(message);
    //                 $(this).find("div.form-error").show();
    //             } else {
    //                 $(this).find("div.form-error").hide();
    //             }
    //         }
    //     });
    // }

})( jQuery );

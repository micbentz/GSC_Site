console.log('hello world');

const UF_BLUE = '#00529b'
const UF_BLUE_RANGE = ['#f0f8ff', '#8ac8ff', '#007ff0', '#00529b', '#002546', '#001324'];
const MODAL_BACKGROUND = '#808080';
const GSC_EMAIL = 'gatorsalsaclub@gmail.com';

$(document).ready(function () {

    /**
     * RESPONSIVE CONTAINER FOR HEADER
     */
     $(window).on('resize', function() {
        var win = $(this);
        if (win.width() < 930) {
            console.log('resizing');
            let newHeight = win.width() * 0.5;
            $('header').height(newHeight);
            // console.log('setting header height to: ' + newHeight);
        }
     });

    /**
     * OVERLAY
     */

    // load in the overlay so that it can be shown later
    $('.overlay-container').load('./request_overlay/request_overlay.html', function() {
        // Create the datepicker
        $('#datepicker').datepicker();
    });

    // trigger the overlay
    $('.trigger-modal').click(function() {
       showOverlay();
    });

    // event listener to close the overlay
    $('.overlay-container').on('click','#close',function() {
        hideOverlay();
    });

    // event listener to check if click happens outside the overlay
    $(document).on('click','.overlay', function(event) {
        if (event.target.className === 'overlay') {
            hideOverlay();
        }
    });

    // on submitting the form
    $('.overlay-container').on('click','#submit', function(event) {
        event.preventDefault();
        
        // user inputs
        let organization = $("input[name='org']").val();
        let request = $("select[name='request']").val();
        let date = $("input[name='date']").val();
        let emailBody = $("textarea[name='message']").val();

        // check if the form is valid
        if (validForm(organization, request, date, emailBody)) {
            let subject = `${organization} inquiring about ${request} on ${date}`;
            console.log(`Form is valid. Subject line is: ${subject}`);
            window.location = 'mailto:' + GSC_EMAIL + '?subject=' + subject + '&body=' +   emailBody;
            hideOverlay();
        } else {
            // validate inputs
            $('input, textarea').each(function() {
                if ($(this).val().length < 1) {
                    $(this).addClass('error');
                } else {
                    $(this).removeClass('error');
                }
            });
        }
    });

    // event listener to check for input changes
    $('.overlay-container').on('change' ,'.overlay-content', function() {
       checkInputs();
    });

    // check if the form is valid
    function validForm(...results) {
        console.log('checking if the form is valid');
        results.forEach((cur) => {
            // console.log(cur.length);
            if (cur.length < 3) {
                console.log(`${cur} is not valid`);
                return false;
            }
        });
        return true;
    }

    // check if the inputs are valid
    function checkInputs() {
        $('input, textarea').blur(function() {
            if ($(this).val().length < 1) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
    }

    // shows the overlay
    function showOverlay() {
        $('.overlay').css('display','block');
        $('.overlay-content').slideDown(1000, function() {
            console.log('finished FADING IN');
        });
    }

    // hides the overlay
    function hideOverlay() {
        $('.overlay-content').slideUp(1000, function() {
            $('.overlay').css('display','none');
        });
        $('input, textarea').each(function() {
            $(this).removeClass('error');
        });
    }
});

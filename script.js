console.log('hello world');

const UF_BLUE = '#00529b'
const MODAL_BACKGROUND = '#808080';
const GSC_EMAIL = 'gatorsalsaclub@gmail.com';

$(document).ready(function () {
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
        results.forEach((cur) => {
            console.log(cur.length);
            if (cur.length < 3) result = false;
        });
        return result;
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

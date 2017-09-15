console.log('hello world');

const UF_BLUE = '#00529b'
const MODAL_BACKGROUND = '#808080';
const GSC_EMAIL = 'gatorsalsaclub@gmail.com';

$(document).ready(function () {
    /**
     * OVERLAY
     */

    // Load in the overlay so that it can be shown later
    $('.overlay-container').load('./request_overlay/request_overlay.html', function() {
        // Create the datepicker
        $('#datepicker').datepicker();
    });

    // 
    $('.trigger-modal').click(function() {
       showOverlay();
    });

    // Hide the overlay
    $('.overlay-container').on('click','#close',function() {
        hideOverlay();
    });

    // Capturing clicks outside the overlay content
    // to hide the overlay
    $(document).on('click','.overlay', function(event) {
        // console.log(event);
        if (event.target.className === 'overlay') {
            hideOverlay();
        }
    });

    // Sending email
    $('.overlay-container').on('click','#submit', function(event) {
        event.preventDefault();
        let organization = $("input[name='org']").val();
        let request = $("select[name='request']").val();
        let date = $("input[name='date']").val();
        let emailBody = $("textarea[name='message']").val();
        let subject = `${organization} inquiring about ${request} on ${date}`;
        console.log(subject);
        // window.location = 'mailto:' + GSC_EMAIL + '?subject=' + subject + '&body=' +   emailBody;
        hideOverlay();
    });

    function showOverlay() {
        $('.overlay').css('display','block');
        $('.overlay-content').slideDown(1000, function() {
            console.log('finished FADING IN');
        });
        // $('.main').hide();
    }

    function hideOverlay() {
        $('.overlay-content').slideUp(1000, function() {
            $('.overlay').css('display','none');
        });
        // $('.main').show();
    }
});

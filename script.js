console.log('hello world');

const UF_BLUE = '#00529b'
const MODAL_BACKGROUND = '#808080';

$(document).ready(function () {



    /**
     * OVERLAY
     */

    // Load in the overlay so that it can be shown later
    $('.overlay-container').load('./request_survey/request_survey.html');

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
        console.log(event);
        if (event.target.className === 'overlay') {
            hideOverlay();
        }
    });

    function showOverlay() {
        $('.overlay').css('display','block');
        $('.overlay-content').slideDown(1000, function() {
            console.log('finished FADING IN');
        });
        $('.main').hide();
    }

    function hideOverlay() {
        $('.overlay-content').slideUp(1000, function() {
            $('.overlay').css('display','none');
        });
        $('.main').show();
    }
});

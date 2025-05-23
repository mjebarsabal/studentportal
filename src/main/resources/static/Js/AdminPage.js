$(document).ready(function() {
    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('.main-content > div').hide();
        var target = $(this).data('target');
        $(target).show();
    });

    $('#btn').click(function() {
        $('.sidebar').toggleClass('active');
        $('.main-content').toggleClass('shifted');
    });

});


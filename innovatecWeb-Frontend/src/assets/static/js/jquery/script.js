$(document).ready(function () {

    M.AutoInit();

    // --- Validate if exist the class indicators --- //
    $('.slider').slider();
    sliderInterval = setInterval(() => {
        if ($('.slider').find('ul').hasClass('indicators')) {
        } else {
            $('.slider').slider();
            if (!$('.slider').find('div').hasClass('progress')) {
                const progress = $('<div>').addClass('progress');
                const indeterminate = $('<div>').addClass('indeterminate blue');
                progress.append(indeterminate);
                $('.slider').append(progress)
            }
        }
    }, 1000);

    setInterval(() => {
        $('.collapsible').collapsible();
    }, 1000);

    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, {
        accordion: false
    });

});
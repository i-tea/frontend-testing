var $ = jQuery.noConflict();
//window.$ = $;
//require('bootstrap');

(function( $ ) {
    $(document).ready(function() {
        $('.feature-products-row').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
        });
    });
    
})(jQuery);
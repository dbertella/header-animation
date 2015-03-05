'use strict';

app.directive('scrollingAnimation', function () {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            window.onscroll = function () {
                var windowTop = angular.element(window).scrollTop(),
                    bodyTop = angular.element(document.querySelector('body')).offset().top,
                    offset = bodyTop - windowTop;
                if (offset < 0) {
                    element.addClass('scrolling');
                } else {
                    element.removeClass('scrolling');
                }

            }
        }
    };
});

'use strict';

app.directive('videoThumb', ['$timeout', function ($timeout) {

    return {
        restrict: 'E',
        scope: {
            video: '=',
            dir: '@'
        },
        template: '<img ng-src="/media/image/thumb/{{dir}}/{{ video.ImageUrl }}" alt="{{video.Title}}" />',
        link: function (scope, el, attrs) {
            
            el.on('click', function () {
                angular.element('.animate-content').addClass('hide');
                el.closest('.animate-content').addClass('animated');
                scope.dir = '1350x900';
                var pos = el[0].getBoundingClientRect();
                var translateTop = 140 - pos.top,
                    translateLeft = 256 - pos.left;

                el.find('img').css('transform', 'translate3d(' + translateLeft + 'px, ' + translateTop + 'px, 0) scale(3)');
            });
        }
    };
}]);

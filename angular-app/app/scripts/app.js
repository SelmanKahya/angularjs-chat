'use strict';

angular.module('angularAppApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute']).config(function ($routeProvider) {
    $routeProvider

        // One and the only route: /
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })

        .otherwise({
            redirectTo: '/'
        });

});

'use strict';

angular.module('angularAppApp').factory('userService', function($http) {
    return {
        online : function(callback){
            $http({method: 'GET', url: 'http://localhost:3000/users'}).success(function(response, status, headers, config) {
                callback(response);
            });
        }
    }
});
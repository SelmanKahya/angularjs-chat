'use strict';

angular.module('angularAppApp').factory('chatService', function($http) {
    return {

        // returns sockjs object
        socket : function(){
            return new SockJS('http://localhost:3000/chat', null, {debug: true});
        },

        // returns the list of online users
        onlineUsers : function(callback){
            $http({method: 'GET', url: 'http://localhost:3000/users'}).success(function(response, status, headers, config) {
                callback(response);
            });
        }

    }
});
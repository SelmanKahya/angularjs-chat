'use strict';

angular.module('angularAppApp').factory('chatService', function($http) {
    return {

        // RETURNS SockJS object
        socket : function(){
            return new SockJS('http://localhost:3000/chat', null, {debug: true});
        }

    }
});
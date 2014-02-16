'use strict';

// var server = "http://localhost:3000/chat";
var server = "http://chat-selmanh.rhcloud.com/chat";

angular.module('angularAppApp').factory('chatService', function($http) {
    return {

        // RETURNS SockJS object
        socket : function(){
            return new SockJS(server, null, {debug: true});
        }

    }
});

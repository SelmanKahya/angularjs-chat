'use strict';

var server = "http://localhost:3000/chat";
// var server = "http://angularjs-chat-server.aws.af.cm/chat";

angular.module('angularAppApp').factory('chatService', function($http) {
    return {

        // RETURNS SockJS object
        socket : function(){
            return new SockJS(server, null, {debug: true});
        }

    }
});
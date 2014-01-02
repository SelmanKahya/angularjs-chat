'use strict';

angular.module('angularAppApp').controller('MainCtrl', function ($scope, $route) {

    $scope.messageText = "";
    $scope.history = "";

    $scope.chat = {

        socket: null,

        status : {
            error: null,
            started: false
        },

        data : {
            username: '',
            history: ''
        }
    }

    // checks the username and init chat room
    $scope.init = function(){
        if($scope.username){
            var socket = new SockJS('http://localhost:3000/chat', null, {debug: true});
            socket.onopen = $scope.onOpen;
            socket.onmessage = $scope.onMessage;
            socket.onerror = $scope.onError;
            socket.onclose = $scope.onError;
            $scope.chat.socket = socket;
        }
    }

    $scope.quit = function() {
        $scope.chat.socket.close();
        $route.reload();
    };

    // successfully connected to the server
    $scope.onOpen = function(e) {
        $scope.chat.data.username = $scope.username;
        $scope.chat.status.started = true;
        $scope.chat.status.error = null;
        $scope.chat.socket.send(JSON.stringify({type: 'introduce', data: $scope.chat.data.username}));
        $scope.$apply();
    };

    // message came from the server
    $scope.onMessage = function(e) {
        $scope.chat.data.history += e.data + '\n';
        $scope.scrollBottom();
        $scope.$apply();
    };

    // sends the message
    $scope.onError = function(e) {
        // stop chat, show error message to the user
        $scope.chat.status.error = e.reason;
        $scope.chat.status.started = false;

        // print error
        console.log('onerror: ', e);
        $scope.$apply();
    };

    // sends the message
    $scope.sendMessage = function() {
        $scope.chat.socket.send(JSON.stringify({type: 'message', data: $scope.messageText}));
        $scope.messageText = "";
        $scope.scrollBottom();
    };

    // scroll to the bottom, after new line concat
    $scope.scrollBottom = function(){
        angular.element("#chat-history").animate({
            scrollTop: angular.element("#chat-history")[0].scrollHeight - angular.element("#chat-history").height()
        }, 500)
    }
});

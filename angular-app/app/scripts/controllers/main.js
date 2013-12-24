'use strict';

angular.module('angularAppApp').controller('MainCtrl', function ($scope) {

    var sock = new SockJS('http://localhost:3000/chat');

    $scope.messageText = "";
    $scope.history = "";

    $scope.chat = {
        username: '',
        started: false
    }

    // checks the username and init chat room
    $scope.start = function(){
        if($scope.username){
            $scope.chat.username = $scope.username;
            $scope.chat.started = true;
        }
    }

    // sends the message
    $scope.sendMessage = function() {
        sock.send(JSON.stringify({type: 'message', data: $scope.messageText}));
        $scope.history += '\n' + $scope.history;
        $scope.messageText = "";
    };
});

'use strict';

angular.module('angularAppApp').controller('MainCtrl', function ($scope) {

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
});

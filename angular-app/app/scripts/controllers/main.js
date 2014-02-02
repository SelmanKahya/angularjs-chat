'use strict';

angular.module('angularAppApp').controller('MainCtrl', function ($scope, $route, $timeout, chatService) {

    // TODO:
    // Create a class: request
    // Use it in send(type, data) function

    // TODO:
    // Create a class: response
    // Use it in onMessage(message) function

    // REQUEST TYPE
    // This needs to defined in the server as well
    // All requests and responses should carry request type information
    var REQUEST_TYPE = {
        NEW_MESSAGE: 1,
        USER_JOINED: 2,
        USER_DISCONNECTED: 3,
        USER_LIST : 4
    }

    // Chat object - holds all the information
    $scope.chat = {

        socket: null,

        status : {
            error: null,
            starting: false,
            started: false
        },

        data : {
            users: [],
            username: '',
            history: '',
            messageText: ''
        }
    }

    /////////////////////////////////////////////////
    // HELPER FUNCTION - init
    // Checks the username and create the socket object
    $scope.init = function(){

        if($scope.username){

            // create SockJS object
            var socket = chatService.socket();

            // socket events
            socket.onopen = $scope.onOpen;
            socket.onmessage = $scope.onMessage;
            socket.onerror = $scope.onError;
            socket.onclose = $scope.onError;

            // assigning socket object
            $scope.chat.socket = socket;

            // starting the chat
            $scope.chat.status.starting = true;

        }

    }

    /////////////////////////////////////////////////
    // HELPER FUNCTION - send
    // Sends a message to the server
    $scope.send = function(type, data) {
        $scope.chat.socket.send(JSON.stringify({type: type, data: data}));
    };

    /////////////////////////////////////////////////
    // HELPER FUNCTION - scrollBottom
    // After a new line added to chat history text area, scroll to the bottom to see it.
    // Otherwise, new messages in the chat window won't be shown to the user.
    $scope.scrollBottom = function() {
        angular.element("#chat-history").scrollTop(angular.element("#chat-history")[0].scrollHeight - angular.element("#chat-history").height());
    };

    /////////////////////////////////////////////////
    // SOCKJS EVENT: ON.OPEN
    // Client successfully connected to the server
    $scope.onOpen = function(e) {

        // socket created successfully
        $scope.chat.status.starting = false;
        $scope.chat.status.started = true;
        $scope.chat.status.error = null;

        // let the server know new user's user name
        $scope.chat.data.username = $scope.username;
        $scope.send(REQUEST_TYPE.USER_JOINED, $scope.chat.data.username);

        // call apply to keep the UI updated
        $scope.$apply();

    };

    /////////////////////////////////////////////////
    // SOCKJS EVENT: ON.MESSAGE
    // There is a message coming from the server, handle carefully
    $scope.onMessage = function(message) {

        var response = angular.fromJson(message.data);

        if(response.type == REQUEST_TYPE.NEW_MESSAGE || response.type == REQUEST_TYPE.USER_JOINED || response.type == REQUEST_TYPE.USER_DISCONNECTED){
            // incoming chat message
            $scope.chat.data.history += response.data + '\n';
            $scope.scrollBottom();
            $scope.$apply();
        }

        else if(response.type == REQUEST_TYPE.USER_LIST){
            // retrieving list of the users from the server
            var users = angular.fromJson(response.data);
            $scope.chat.data.users = users;
            console.log(users);
            $scope.$apply();
        }

    };

    /////////////////////////////////////////////////
    // SOCKJS EVENT: ON.ERROR
    // IF there is an error, hide chat console, show the error message to the user
    $scope.onError = function(e) {

        // stop chat, show error message to the user
        $scope.chat.status.error = e.reason;
        $scope.chat.status.started = false;

        // print error
        console.log('onerror: ', e);
        $scope.$apply();

    };

    /////////////////////////////////////////////////
    // EVENT: SEND BUTTON CLICK
    // Client sending a message to the server
    $scope.sendButtonClicked = function() {

        if($scope.chat.data.messageText != ''){

            // send a message in a proper format
            $scope.send(REQUEST_TYPE.NEW_MESSAGE, $scope.chat.data.messageText);

            // clear message box in the UI
            $scope.chat.data.messageText = '';
            
        }

    };

    /////////////////////////////////////////////////
    // EVENT: QUIT BUTTON CLICK
    // Close socket, reload the page, so that user can start chatting again
    $scope.quit = function() {
        $scope.chat.socket.close();
        $route.reload();
    };
});

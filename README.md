angularjs-chat
==============

A simple chat application written in AngularJS - using SockJS (not using server-side socket library such as Socket.io).

-- For a complete overview of the project and features, see http://selmanh.github.io/angularjs-chat/

## About

Currently, I am working on my Master's degree final project (Chrome Application - soon to be published on Chrome Store, you can find the source code here: [link](https://github.com/Selmanh/smart-read)) and one of my assignments was to develop a multi-player word guessing game. 

While I was looking for options to create a multi-player game with chat support in AngularJS, I realized that, in so many projects, NodeJS was serving the AngularJS application using ExpressJS as a web application framework, and it was using server-side socket libraries such as Socket.IO.

After carefully considering a few other alternatives, I decided to use SockJS which doesn't force to serve AngularJS files from the server. After playing around with it, I thought it might be useful for others to have a working application that use both AngularJS and SockJS and decided to create this application. 

## Details

I created a NodeJS server for this project. SockJS has implementations for other langugages as well, see https://github.com/sockjs.

### Dependencies

- AngularJS, [sockjs-client](https://github.com/sockjs/sockjs-client)

- NodeJS, [express](expressjs.com), [sockjs-client-node](https://github.com/sockjs/sockjs-node)

- Package managers ([Bower](http://bower.io/), [NPM](https://npmjs.org/)) and finally [Grunt](http://gruntjs.com/)


### SockJS

Taken from its readme:
> SockJS is a browser JavaScript library that provides a WebSocket-like object. SockJS gives you a coherent, cross-browser, Javascript API which creates a low latency, full duplex, cross-domain communication channel between the browser and the web server.

> Under the hood SockJS tries to use native WebSockets first. If that fails it can use a variety of browser-specific transport protocols and presents them through WebSocket-like abstractions.

For more details about the SockJS project, see https://github.com/sockjs/sockjs-client.

### Issues

I am sure you can break the live server (http://angularjs-chat-server.aws.af.cm/), but please, just try not to do that :) This is a simple project to show you how to use AngularJS and SockJS to create interactive applications. 

I tested the application using 2 browsers on the same computer. Sometimes when you quit chat on one browser, the connection on the other browser gets broken. Feel free to fix the issue :)


### Installing Modules

* First you need to install node_modules. Cd to node-server folder.  ``` $cd node-server ```

* Execute ``` $sudo npm install ```

* Then, you need to install dependencies for our Angular application. Cd to angular-app folder.  ``` $cd angular-app ```

* Execute ``` $sudo npm install ```

* And execute ``` $sudo bower install ```


### Running the app

* Change directory to node-server folder  ``` $cd node-server ```

* Start the Node server: ``` $node app ```

* Open another console and cd to angular-app folder  ``` $cd angular-app ```

* Now, you can start the grunt server: ``` $grunt serve ```

* It will open the AngularJS app in your default browser. Have fun :)


## Contact

 - Selman Kahya - ([website](http://www.selmanh.com)) - (hey@selmanh.com)

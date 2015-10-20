/*
	THIS IS A LOGIN CLASS, IT SHOULD BE INHERITED.
	NB: DO NOT ADD TO THIS CLASS OR FILE UNLESS YOU ARE AUTHORIZED TO.
*/

var User = function(){
	//first inherit Ifirst/base class
	Ifirst.call(this);

	//Login with facebook, Twitter and Google Plus
	this.thirdPartyLogin = function(provider) {
	    var deferred = $.Deferred();

	    this.getRef().authWithOAuthPopup(provider, function (err, user) {
	        if (err) {
	            deferred.reject(err);
	        }

	        if (user) {
	            deferred.resolve(user);
	        }
	    });

	    return deferred.promise();
	};

	//Login with email and password
	this.authWithPassword = function(userObj) {
	    var deferred = $.Deferred();
	    
	    this.getRef().authWithPassword(userObj, function onAuth(err, user) {
	        if (err) {
	            deferred.reject(err);
	        }

	        if (user) {
	            deferred.resolve(user);
	        }

	    });

	    return deferred.promise();
	};

	//Create new user
	this.createUser = function(userObj) {
	    var deferred = $.Deferred();
	    this.getRef().createUser(userObj, function (err) {

	        if (!err) {
	            deferred.resolve();
	        } else {
	            deferred.reject(err);
	        }

	    });

	    return deferred.promise();
	};

	//Create new user and login
	this.createUserAndLogin = function(userObj) {
        return createUser(userObj)
            .then(function () {
            return authWithPassword(userObj);
        });
    };

    //handle returned promise
    this.handleAuthResponse = function(promise, route) {
        $.when(promise)
            .then(function (authData) {

            // goto route

        }, function (err) {

            // throw error

        });
    };

    this.login = function(){
    	return "LOGIN!"
    };


};
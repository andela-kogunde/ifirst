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
		//show loading notification // can be modified.
		var loadingNotify = $.notify(
		{
			title: '<strong>Loading</strong>',
			message: '...'
		}, 
		{ 
			type: 'info',
			allow_dismiss: false,
			showProgressbar: true
		});
        
        $.when(promise)
            .then(function (authData) {
           		
           		var user = {};
           		if(authData != undefined){
	            	switch(authData.provider){
	            		case "facebook":
	            			sessionStorage.uid = authData.uid;

				            user.uid = authData.uid; 
				            user.name = authData.facebook.displayName; 
				            user.imageURL = authData.facebook.profileImageURL

				            sessionStorage.setItem("userone",JSON.stringify(user));
			            	var theUser = new User(); theUser.getRef().child("users").child(user.uid).child("profile_information").set(user);

	            			break;
	            		case "twitter":
	            			sessionStorage.uid = authData.uid;

				            user.uid = authData.uid; 
				            user.name = authData.twitter.displayName; 
				            user.imageURL = authData.twitter.profileImageURL

				            sessionStorage.setItem("userone",JSON.stringify(user));
			            	var theUser = new User(); theUser.getRef().child("users").child(user.uid).child("profile_information").set(user);

	            			break;
	            		case "password":
	            			//fetch user info from firebase users
	            			break;

	            	};
	            	theUser.routeTo(route);
	            } else {
	            	//redirect user to profile setup
	            };

        }, function (err) {

            // //show error notification // can be modified.
			$.notify(
			{
				title: '<strong> Oops! </strong>',
				message: err.message
			}, 
			{ 
				type: 'danger',
				allow_dismiss: true
			});

            loadingNotify.close();

        });
    };


};
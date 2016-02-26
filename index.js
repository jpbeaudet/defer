// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// index.js
// Development of a defered twisted web style node.js promise implementation.
// version 1.0.0

module.exports = {
// add a promise condition that will check the input value of a callback and determine 
// if it launch the fallback(rejection) callback(success) or errback(err)
// each promise will be resolved in order of declaration. each test must pass in order to get success (callback)	
		// params: true/false must be either true or false
		// params: <int/float >int/float int/float must be greater lower or equal to value
		// params: =string string must equal exacty the string value or contain the string value
"addPromise": function(){
	  for (var i = 0; i < arguments.length; i++) {
		   if (arguments[i][0] != undefined && arguments[i][0] != null ){ 
		   console.log(arguments[i]);
		   console.log("addPromises got: "+typeof(arguments[i][1]));
		   
		   // add operator and verufy that it is valid
		   var operator = arguments[i][0];
		   switch(operator) {
		    // is equal to
		    case "=":
				this.promises_validator.push(operator);
		        break;
			// is not equal to
		    case "!=":
				this.promises_validator.push(operator);
		        break;
		    // is lower than    
		    case "<":
				this.promises_validator.push(operator);
		        break;
		    // is not lower than
		    case "!<":
				this.promises_validator.push(operator);
		        break;
		    // is greater then
		    case ">":
				this.promises_validator.push(operator);
		        break;
		    // is not greater than
		    case "!>":
				this.promises_validator.push(operator);
		        break;
		    // is type
		    case "?":
				this.promises_validator.push(operator);
		        break;
		    // is not type
		    case "!?":
				this.promises_validator.push(operator);
		        break;
		    default:
				var err = new Error("defer.js: addPromises argument first value must be a valid operator : ", operator);
				console.log(err);	
				return err;
		   }
		   // add value
		   this.promises.push(arguments[i][1]);	
		   this.promises_resolved.push(false);
		   // add type
		   this.promises_type.push(typeof(arguments[i][1]));
		   }else{
				var err = new Error("defer.js: Each addPromises argument must be an array [operator, value]", arguments.callee.caller.toString());
				console.log(err);	
				return err;			   
		   }
	  }  
},
/// on promise rejection
"addFallback":function(_fb){
	if(typeof(_fb)== "function"){
		this.fallbacks.push(_fb);
		var len = this.fallbacks.length;
		this.fallbacks[len -1].resolved= false;
		return true;
		}else{
			var err = new Error("defer.js: defered fallback is not a function", arguments.callee.caller.toString());
			console.log(err);	
			return err;
		}		
},
// resolve promise will rsolve the promise condition and return either true/false 
// if true then the callback fire 
// if false then the falback fire 
// if err the errback fires
"resolvePromise": function(value){
	   var success = false;
	  for (var i = 0; i < this.promises.length; i++) {

		   // promise is a boolean
		   if (this.promises_type[i] == "boolean"){
           if(this.promises[i] == true){this.promises_resolved[i] = true; this.promises.success = true;}else{this.promises_resolved[i] = false; success = false;};
		   }
		   // promise is a string that must be contained or must be exactly equal
		   if (typeof(this.promises[i]) == "string"){
			   console.log("validator = "+ this.promises_validator[i]);
			   if (this.promises_validator[i] == "="){
				   if (value === this.promises[i]){this.promises_resolved[i] = true;success = true;}else{this.promises_resolved[i] = false; success = false;};
			   }else{
				   var str = value.toString();
				   console.log(typeof(str));
				   var res = str.search(this.promises[i]);
				   if (res.length>0){this.promises_resolved[i] = true;success = true;}else{this.promises_resolved[i] = false; success = false;};
			   }
		   }	
		  if (this.promises_validator[i] == "<"){
			  console.log("value = "+value+ " is type: "+typeof(value));
              var comparator = Number(this.promises[i].slice(1));
		   if (value  < comparator){
			   console.log(comparator+" < value Success");			   
			   this.promises_resolved[i] = true;success = true;
			   }else{
				console.log(comparator +" < value Fail"); 
				this.promises_resolved[i] = false; success = false;};
		  }else if(
				  
			  this.promises_validator[i] == ">"){
			  console.log("value = "+value+ " is type: "+typeof(value));
              var comparator = Number(this.promises[i].slice(1));
		   if ( value > comparator){
			   console.log(comparator +" > value Success");
			   this.promises_resolved[i] = true;success = true;
			   }else{
					console.log(comparator +" > value Fail"); 
			this.promises_resolved[i] = false; success = false;};
		  }
			   // promise is greater or lower than int/float or exactly the equal value		   
		   if (this.promises_type[i] == "int" || this.promises_type[i] =="float" ||  typeof(arguments[i])=="number" ){
		   if ( this.promises[i] == value){this.promises_resolved[i] = true;success = true;}else{this.promises_resolved[i] = false; success = false;};
			  			   
		   }		   
		  if(i == (this.promises.length-1)){
			  console.log("Promise success: "+success);
			  if(success == true){return true;}else{return false;}
		  }
	  }
},
//*  base constructor that will return the sample defer object
"Deferred": function(){
	this.callbacks=[];
	this.errbacks= [] ;
	this.defered_list_cb= [] ;
	this.defered_list_eb= [] ;
	this.promises=[];
	this.promises_type=[];
	this.promises_validator=[];
	this.fallbacks =[];
	this.promises_resolved = [];
	return this;
},
//* add callback to defer object
"addCallback": function(_cb){
	if(typeof(_cb)== "function"){
	this.callbacks.push(_cb);
	var len = this.callbacks.length;
	this.callbacks[len -1].resolved= false;
	return true;
	}else{
		var err = new Error("defer.js: defered callback is not a function", arguments.callee.caller.toString());
		console.log(err);	
		return err;
	}
},
// * add errback to defer object
"addErrback": function(_eb){
	if(typeof(_eb)== "function"){
	this.errbacks.push(_eb);
	var len = this.errbacks.length;
	this.errbacks[len -1].resolved= false;
	return true;
	}else{
		var err = new Error("defer.js: defered errback is not a function", arguments.callee.caller.toString());
		console.log(err);	
		return err;
	}
},
// * function that will handle the return value and send the result to resolve to check if the result is a success or a fail
"returnValue": function(value){
	var err = new Error("defer.js: callback returned a wrong value", arguments.callee.caller.toString());
	if (value && value != undefined && value != null){
		//console.log("callbacks = " +this.callbacks);
		for (var i = 0; i < this.callbacks.length; i++) {
			var ok = false;
			if(this.promises.length != 0){ok = this.resolvePromise(value);console.log("The promise was accepted callback will fire");}else{
				ok = true;}			
			if(ok){ 
			
			//console.log("callbacks nb "+ i+" "+this.callbacks[i]);
			//console.log("callbacks.resolved nb "+ i+" "+this.callbacks[i].resolved);
			if(this.callbacks[i].resolved != true && i <  this.callbacks.length){
				this.callbacks[i].resolved = true;
				if(this.callbacks[i+1] && this.callbacks[i+1].resolved !=true){
				var next = this.callbacks[i](value); 				
				return this.returnValue(next);
				}else{
					return this.callbacks[i](value);	
					break;	
				}			
			}
		}else{
			console.log("The promise was rejected fallback will fire");
			this.promises.resolved = true;
			if(this.fallbacks[i] != null || this.fallbacks[i] != undefined){return this.fallbacks[i](value);
			}else{
				var err = new Error("defer.js promise rejected: No fallbacks were provided", arguments.callee.caller.toString());
				console.log(err);
				return err;
			}
			

		}
		}
	}else{	// if value was undefined or null and any other err conditions i will need in future
		if(this.errbacks.lenght < 2){	
			this.errbacks[0].resolved =true;
			return this.errbacks[0](err, value);
		}else{
		for (x in this.errbacks){
			if(this.errbacks[x].resolved != true){
				this.errbacks[x](err, value);
                this.errbacks[x].resolved = true;
				break;
				}
				}		
			}
		}

},
// defered list constructor
"defered_list": function(value){
	this.defered_list_cb= [] ;
	this.defered_list_eb= [] ;
	this.defered_list_cb_args=[];
	this.defered_list_eb_args=[];
	this.promises=[];
	this.promises_type=[];
	this.promises_validator=[];
	this.promises_resolved = [];
	this.fallbacks =[];
	return this;	
},
// defered_list add callback
"defered_list_addCallback": function( _cb, args){
	if(typeof(_cb)== "function"){
	//console.log("defered_list_cb  = "+_cb)
	this.defered_list_cb.push(_cb);
	this.defered_list_cb_args.push(args);
	//console.log("defered_list_cb after = "+this.defered_list_cb)
	var len = this.defered_list_cb.length;
	this.defered_list_cb[len-1].resolved= false;
	return true
	}else{
		var err = new Error("defer.js: defered_list callback is not a function", arguments.callee.caller.toString());
		console.log(err);	
		return err;
	}
},
//defered list add errback
"defered_list_addErrback": function( _eb, args){
	if(typeof(_eb)== "function"){
	this.defered_list_eb.push(_eb);
	this.defered_list_eb_args.push(args);
	var len = this.defered_list_eb.length;
	this.defered_list_eb[len -1].resolved= false;
	return true;
	}else{
		var err = new Error("defer.js: defered_list errback is not a function", arguments.callee.caller.toString());
		console.log(err);
		return err;
	}
},
// resolve the call back simultaneously and return errback if one of the value is wrong
"defered_list_returnValue": function(value){
	//console.log("defered_list_cb  = "+this.defered_list_cb );
	for (var i = 0; i < this.defered_list_cb.length; i++) {	
		//console.log("defered_list_cb[i]  = "+i+" "+this.defered_list_cb[i] )
		if (value && value != undefined && value != null){
		var ok = false;
		if(this.promises.length != 0){ok = this.resolvePromise(value);
		console.log("The promise was accepted callback will fire");
		}else{
			ok = true; }			
		if(ok){ 
		var args = this.defered_list_cb_args[i];
		//this.defered_list_cb[i](args[0]);
		this.defered_list_cb[i].apply(this,args);
		}else{
			console.log("The promise was rejected fallback will fire");
			this.promises.resolved = true;
			return this.fallbacks[i](value);

		}
		}else{
		var err = new Error("defer.js: defered_list_cb callback returned a wrong value", arguments.callee.caller.toString());
		var args = this.defered_list_eb_args[i];
		//args.push(err)
		this.defered_list_eb[i].apply(this,err,args);};
	}	
}

};
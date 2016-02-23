// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// index.js
// Development of a defered twisted web style node.js promise implementation.
// version 1.0.0

module.exports = {
// *  base constructor that will return the sample defer object
"Deferred": function(){
	this.callbacks=[];
	this.errbacks= [] ;
	this.defered_list_cb= [] ;
	this.defered_list_eb= [] ;
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
		var args = this.defered_list_cb_args[i];
		//this.defered_list_cb[i](args[0]);
		this.defered_list_cb[i].apply(this,args);
		}else{
		var err = new Error("defer.js: defered_list_cb callback returned a wrong value", arguments.callee.caller.toString());
		var args = this.defered_list_eb_args[i];
		//args.push(err)
		this.defered_list_eb[i].apply(this,err,args);};
	}	
}

};
// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// defer.js
// Development of a defered twisted web style node.js promise implementation.
// * first dev priority
// ** second round of dev
// *** optional or nice to have

var defer = module.exports = {
// *  base constructor that will return the sample defer object
"Deferred": function(){
	this.callbacks=[];
	this.errbacks= [] ;
	this.conditions= [] ;
	return this;
},
//* add callback to defer object
"addCallback": function(_cb){
	this.callbacks.push(_cb);
	var len = this.callbacks.length;
	this.callbacks[len -1].resolved= false;
	
},
// * add errback to defer object
"addErrback": function(_eb){
	this.errbacks.push(_eb);
	var len = this.errbacks.length;
	this.errbacks[len -1].resolved= false;
},
// * function that will handle the return value and send the result to resolve to check if the result is a success or a fail
"returnValue": function(value){
	var err = new Error("defer.js: callback returned a wrong value", arguments.callee.caller.toString());
	if (value && value != undefined && value != null){
		console.log("callbacks = " +this.callbacks)
		for (i = 0; i < this.callbacks.length; i++) {
			console.log("callbacks nb "+ i+" "+this.callbacks[i])
			console.log("callbacks.resolved nb "+ i+" "+this.callbacks[i].resolved)
			if(this.callbacks[i].resolved != true && i <  this.callbacks.length){
				this.callbacks[i].resolved = true;
				//this.errbacks[i].resolved = true;
				//if(this.callbacks[i+1] && this.callbacks[i+1].resolved !=true){var next = this.callbacks[i](value); this.callbacks[i+1](next)}
				//this.callbacks[i](value);
				this.event = "callback nb " +i+" returned : "+value;
				if(this.callbacks[i+1] && this.callbacks[i+1].resolved !=true){
				var next = this.callbacks[i](value); 				
				//this.callbacks[i].resolved = true;
				//this.errbacks[i].resolved = true;
				return this.returnValue(next);
				}else{
					this.callbacks[i](value);	
					break;	
				}			
			}
		}
	}else{	// if value was undefined or null and any other err conditions i will need in future
		this.event.error = err;
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
"defered_list": function(){
	
},
// defered_list add callback
"defered_list_addCallback": function(value, _cb){
	
},
//defered list add errback
"defered_list_addErrback": function(value, _eb){
	
},
"defered_listReturnValue": function(value){
	
},
// *** status object for progress and event emitter
"event": function(){
	this.status = "status";
}		
};
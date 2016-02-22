// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// defer.js
// Development of a defered twisted web style node.js promise implementation.
// * first dev priority
// ** second round of dev
// *** optional or nice to have

var defer = module.exports = {
// *  base constructor that will return the sample defer object
"init": function(){
	this.callbacks=[];
	this.errbacks= [] ;

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
// *** append multiple callback for a defered list
"append": function(defered_list, def){
	var deflist = {};
	if (defered_list != undefined){
		defered_list.append(def);
	}else{
		deflist.append(def);
	}
},
// * function that will handle the return value and send the result to resolve to check if the result is a success or a fail
"returnValue": function(value){
	var err = new Error("defer.js: callback returned a wrong value", arguments.callee.caller.toString())
	if (value && value != undefined && value != null){
		for (x in this.callbacks){
			if(this.callbacks[x].resolved != true){
				this.callbacks[x].resolved = true;
				this.errbacks[x].resolved = true;
				this.callbacks[x](value);
				this.event = "callback nb " + x+" returned : "+value;
				break;
			}
		}
	}else{

		this.event.error = err;
		if(this.errbacks.lenght < 2){			
			return this.errbacks[0](err, value);
		}else{
		for (x in this.errbacks){
			if(this.errbacks[x].resolved != true){
				this.errbacks[x](err, value);

				break;
			}
		}		
		}
	}
},
// ** add conditions for the value of promises. The conditions will be parsed in order
//, if only one provided it will run for all callbacks
"addCondition": function(condition){
	this.conditions = condition;
},
// ** function that will determine if result is true or false and return the signal for callback  or errback
"resolve": function(){
}
,
// *** status object for progress and event emitter
"event": function(){
	this.status = "status";
}		
};
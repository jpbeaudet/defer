# Defer.js
### A very ligthweigth twisted.web type implementation for node.js for full async progamming

#### install: (not packaged yet. Coming very soon !)
    npm defer
#### sample usage:
The difference between chained defers and defered lists is that chain defer wil take the output value of the last callback to the next and defered_lists will take args as argument and will input those args on the callback or errback
##### add callbacks and errback
    var defer = require('./index.js')
    // var defer = require('defer')
    function _cb(value){
	var ret = value *2;
	console.log("ret1: "+ ret);
	return ret;
    }
    function _eb(err, value){
	console.log("err : "+ err);
	return err;
    }
    function _main(a){	
    var d = defer.Deferred();
    var b =2;
    var ret = a+b;
    d.addCallback(_cb);
    d.addCallback(_cb);
    d.addErrback(_eb);
    d.returnValue(ret);
    }
    _main(1);
    >> Will output 6 and 12

####% add defered_list callbacks and errbacks
    var defer = require("./index.js");
    // var defer =  require('defer');
    
    function _cb(value){
	    var ret = value *2;
	    console.log("ret1: "+ ret);
	    return ret;
    }
    function _fb(value){
	var ret = value +1;
	console.log("ret fb: "+ ret);
	return ret;
    }
    function _cb222(value, value2){
	    var ret = value *2+value2;
	    console.log("ret222: "+ ret);
	    return ret;
    }
    function _cb2(value){
	    var ret = value *2;
	    console.log("ret2: "+ ret);
	    return ret;
    }
    function _cb3(value){
	    var ret = value *2;
	    console.log("ret3: "+ ret);
	    return ret;
    }
    function _cb4(value){
	    var ret = value *2;
	    console.log("ret4: "+ ret);
	    return ret;
    }
    function _eb(err, value){
	    console.log("err : "+ err);
	    return err;
    }
    function _eb2(err, value){
	    console.log("err : "+ err);
	    return err;
    }
    //Let's chain our callbacks that must pass its return value to the next one
    // <defered object>.defered_list_addCallback(callback)
    // <defered object>.defered_list_addErrback(errback)
    // will fire in case of a undefined or null value or not function cb or err
    function _main(a){
		var d = defer.Deferred();
		var b =2;
		var ret = a+b;
		d.addCallback(_cb);
		d.addCallback(_cb2);
		d.addCallback(_cb3);
		d.addCallback(_cb4);
		d.addErrback(_eb);
		d.addErrback(_eb2);
		d.returnValue(ret);
    }
    _main(1);// output 6 12 24 48

    //Let's pile our callbacks that must be resolved independently ans will take their own arguments
    // <defered object>.defered_list_addCallback(callback, [args])
    // <defered object>.defered_list_addErrback(errback, [args])
    // will fire in case of a undefined or null value or not function cb or err
    function _main2(a){
		var dl = defer.defered_list();
		var b =2;
		var ret = a+b;
		dl.defered_list_addCallback(_cb222, [1,2]);
		dl.defered_list_addCallback(_cb2 , [1]);
		dl.defered_list_addCallback(_cb3, [1]);
		dl.defered_list_addCallback(_cb4, [1]);
		dl.defered_list_addErrback(_eb, [1]);
		dl.defered_list_addErrback(_eb2, [1]);
		dl.defered_list_returnValue(ret);
	}
	_main2(1);// output 4 2 2 2
    //Let's use callbacks and fallbacks and errbacks in the same logic
    function _main3(a){
	console.log("Starting main3 example function");		
	var d = defer.Deferred();
	var b =2;
	var ret = a+b;
	d.addCallback(_cb);
	d.addFallback(_fb);
	d.addPromise("<6");
	d.addErrback(_eb);
	d.returnValue(ret);
	}
    _main3(1);// output promise has succeded value (1+2) was lower than 6 and then it fired_fb that added 1 = output 4
#### Tests:
##### Install mocha globally to use it from terminal
    npm install mocha -g
##### then do the following command in the node-modules root 
    mocha

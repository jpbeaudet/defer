# Defer.js
## A very ligthweigth twisted.web type of promise implementation for node.js for full async progamming

### install:
    npm defer
### sample usage:
##### The difference between chained defers and defered lists is that chain defer wil take the output value of the last callback to the next and defered_lists will take args as argument and will input those args on the callback or errback
#### add callbacks and errback
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
    d.addErrback(_eb);
    d.returnValue(ret);
    }
    _main(1);

#### add defered_list callbacks and errbacks
    function _cb(value){
	var ret = value *2;
	console.log("ret1: "+ ret);
	return ret;
    }
    function _eb(err, value){
	console.log("err : "+ err);
	return err;
    }
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
    _main2(1);
#### declare your callbacks and errback and then add it to either a defered_list (defer.defered_list_cb_addCallback) or a chain defer (defer.adCallback)
    var defer = require('defer')
    var defer = require("./defer.js");

    function _cb(value){
	var ret = value *2;
	console.log("ret1: "+ ret);
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
    _main(1);
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
    _main2(1);

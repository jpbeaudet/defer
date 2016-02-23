// test place for defer.js

var defer = require("./index.js");

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
function _main(a){
	console.log("Starting main1 example function");
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
function _main2(a){
	console.log("Starting main2 example function");	
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
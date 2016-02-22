// test place for defer.js

var defer = require("./defer.js");

function _cb(value){
	var ret = value *2;
	console.log("ret1: "+ ret);
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
d.addErrback(_eb);

d.returnValue(ret);
}
_main(1);
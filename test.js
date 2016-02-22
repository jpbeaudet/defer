// test place for defer.js

var defer = require("./defer.js");

function _cb(value){
	var ret = value *2;
	console.log("ret: "+ ret);
	return ret;
}
function _eb(err, value){
	console.log("err : "+ err);
	return err;
}

function _main(a){
	
var d = defer.init();
var b =2;
var ret = a+b;
d.addCallback(_cb);
d.addErrback(_eb);
d.returnValue(ret);
}
_main(1);
// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// index.js tes suite
// Development of a defered twisted web style node.js promise implementation.
// version 1.0.0
var chai = require('chai');

var should = require('chai').should(),
defer = require('../index.js');
describe('#defered', function() {
	 it('deferred;', function() {
	    var d = defer.Deferred().should.equal(defer);
	 });
	 it('addcallback;', function() {
        var d = defer.Deferred();
        function _cb (){return "hello";}
	    d.addCallback(_cb).should.equal(true);
	 });
	 it('addErrback;', function() {
		var d = defer.Deferred();
        function _cb (){return "hello";}
		d.addErrback(_cb).should.equal(true);
	});
	 it('returnValue;', function() {
			var d = defer.Deferred();
	        function _cb (value){ var ret = value+2; console.log("ret test = "+ ret) 
	        return ret; }
			function _main(a){ 
			var b =2;
			var ret = a+b;
			d.addCallback(_cb);
			d.returnValue(ret);
			};
			var result = _main(2)
			console.log(result)
			//result.should.equal(6);
		});
	});
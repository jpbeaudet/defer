// Author : Jean-Philippe Beaudet @ S3R3NITY Technologies
// index.js tes suite
// Development of a defered twisted web style node.js promise implementation.
// version 1.0.0
var chai = require('chai');

var should = require('chai').should(),
defer = require('../index.js');
describe('#defered', function() {
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

	});
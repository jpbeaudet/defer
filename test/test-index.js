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
	 it('returnValue-chain callbacks;', function() {
			var d = defer.Deferred();
	        function _cb (value){ var ret = value+2; ret.should.equal(6);
	        return ret; }
	        function _cb2 (value){ var ret = value+2; ret.should.equal(8);
	        return ret; }
			function _main(a){ 
			var b =2;
			var ret = a+b;
			d.addCallback(_cb);
			d.addCallback(_cb2);
			d.returnValue(ret);
			};
			_main(2);
		});
	});
describe('#defered_lists', function() {
	 it('deferred_list;', function() {
	   var dl = defer.defered_list().should.equal(defer);
	 });
	 it('defered_list_addCallback;', function() {
	   var dl = defer.defered_list();
       function _cb (){return "hello";}
	    dl.defered_list_addCallback(_cb).should.equal(true);
	 });
	 it('defered_list_addErrback;', function() {
	   var dl = defer.defered_list();
       function _cb (){return "hello";}
	    dl.defered_list_addErrback(_cb).should.equal(true);
	});
	 it('returnValue-deferred list;', function() {
		    var dl = defer.defered_list();
	        function _cb (value){ var ret = value+2; ret.should.equal(6);
	        return ret; }
	        function _cb2 (value){ var ret = value+2; ret.should.equal(6);
	        return ret; }
			function _main(a){ 
			var b =2;
			var ret = a+b;
		    dl.defered_list_addCallback(_cb);
		    dl.defered_list_addCallback(_cb2);
			dl.returnValue(ret);
			};
			_main(2);
		});
	});
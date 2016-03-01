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
describe('#promises', function() {
	 it('addPromise;', function() {
		 function _cb (value){return "hello";}
		 function _fb (value){return "Bye";}
		 var d = defer.Deferred();
			d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["=","hello"]);
			d.promises_type[0].should.equal("string");
			(d.promises.length).should.equal(1);
	 });
	 it('addFallbacks;', function() {
		 function _cb (value){return "hello";}
		 function _fb (value){return "Bye";}
		 var d = defer.Deferred();
			d.addCallback(_cb);
			d.addFallback(_fb);
			(d.fallbacks.length).should.equal(1);
			d.fallbacks[0].should.equal(_fb);
	 });
	 it('resolvePromises and fallbacks on deferred;', function() {
		 function _cb (value){value.should.equal("hello"); }
		 function _fb (value){value.should.equal("bye");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["=","hello"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main("hello");
		//testing fallbacks on promises rejection
		  function _main2(a){ 
				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["=","hello"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2("bye");
	 });
	 it('resolvePromises and fallbacks on deferred_list;', function() {
		 function _cb (value){value.should.equal("hello"); }
		 function _fb (value){value.should.equal("bye");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success
		 function _main(a){  
		 var ret = a;
		 var dl = defer.defered_list();
		 dl.defered_list_addCallback(_cb);
		 dl.addFallback(_fb);
		 dl.addPromise(["=","hello"]);
		 dl.defered_list_addErrback(_eb);
		 dl.returnValue(ret);
		 }
		_main("hello");
		//testing fallbacks on promises rejection
		 function _main2(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["=","hello"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main2("bye");
	 });
	});

describe('#promises logical operator', function() {

	 //it('addPromises_args;', function() {

	 //});	 
	 it('equal_to;', function() {
		 function _cb (value){value.should.equal("hello"); }
		 function _fb (value){value.should.equal("bye");}
		 function _eb (value){return "Ouch!";}
		 function _main(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["=","hello"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main("hello");
		//testing fallbacks on promises rejection
		function _main2(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["=","hello"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
		    _main2("bye");
	 });
	 it('not_equal_to;', function() {
		 function _cb (value){value.should.equal("bye"); }
		 function _fb (value){value.should.equal("hello");}
		 function _eb (value){return "Ouch!";}
		 function _main(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["!=","hello"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main("hello");
		//testing fallbacks on promises rejection
		function _main2(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!=","hello"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main2("bye");
	 });

	 it('greater_than;', function() {

	 });
	 it('not_greater_than;', function() {

	 });
	 it('lower_than;', function() {

	 });
	 it('not_lower_than;', function() {

	 });
});

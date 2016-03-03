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
	 
	 it('equal_to;', function() {
		 function _cb (value){value.should.equal("Yay"); }
		 function _fb (value){value.should.equal("Nay");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["!=","Nay"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main("Yay");
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["!=","Nay"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2("Nay");		 
		 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["=","Yay"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11("Yay");
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["=","Yay"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
		    _main22("Nay");
	 });
	 it('not_equal_to;', function() {
		 function _cb (value){value.should.equal("bye"); }
		 function _fb (value){value.should.equal("hello");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["!=","hello"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main("hello");
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["!=","hello"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2("bye");		 
		 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["!=","hello"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11("hello");
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!=","hello"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22("bye");
	 });

	 it('greater_than;', function() {
		 function _cb (value){value.should.equal(3); }
		 function _fb (value){value.should.equal(1);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise([">",2]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(3);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise([">",2]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(1); 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise([">",2]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(1);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise([">",2]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(3);

	 });
	 it('not_greater_than;', function() {
		 function _cb (value){value.should.equal(1); }
		 function _fb (value){value.should.equal(3);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["!>",2]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(1);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["!>",2]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(3); 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["!>",2]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(1);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!>",2]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(3);
	 });
	 it('lower_than;', function() {
		 function _cb (value){value.should.equal(1); }
		 function _fb (value){value.should.equal(3);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["<",2]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(1);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["<",2]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(3); 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["<",2]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(1);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["<",2]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(3);
	 });
	 it('not_lower_than;', function() {
		 function _cb (value){value.should.equal(3); }
		 function _fb (value){value.should.equal(1);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["!<",2]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(3);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["!<",2]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(1); 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["!<",2]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(3);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!<",2]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(1);
	 });
	 it('lower_or_equal;', function() {
		 function _cb (value){value.should.equal(2); }
		 function _fb (value){value.should.equal(3);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["<=",2]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(2);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["<=",2]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(3); 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["<=",2]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(2);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["<=",2]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(3);
	 });
	 it('is_type;', function() {
		 function _cb_string (value){value.should.equal("yay"); }
		 function _cb_bool (value){value.should.equal(_main2("Nay")); }
		 function _fb_int (value){value.should.equal("Nay");}
		 function _fb_float (value){value.should.equal("mana");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb_string);
		 d.addFallback(_fb_int);
		 d.addPromise(["?","string"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main("yay");
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb_string);
			d.addFallback(_fb_int);
			d.addPromise(["?","int"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2("Nay"); 
		//testing fallbacks on promises success for deferred lists
		 function _main22(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb_bool);
			 dl.addFallback(_fb_float);
			 dl.addPromise(["?","function"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main22(_main2("Nay"));
		//testing fallbacks on promises rejection for deferred lists
		function _main3(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb_bool);
			dl.addFallback(_fb_float);
			dl.addPromise(["?","float"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main3("mana");		 
	 });
	 it('is_in;', function() {
		 function _cb (value){value.should.equal("Yay"); }
		 function _fb (value){value.should.equal("Nay");}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["*","Yay world"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main("Yay");
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["*","Yay world"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2("Nay");		 
		 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["*","Yay world"]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11("Yay");
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["*","Yay world"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22("Nay");
	 });
	 it('is true/false;', function() {
		 function _cb (value){value.should.equal(true); }
		 function _fb (value){value.should.equal(false);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["is",true]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(true);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["is",true]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(false);		 
		 
		//testing fallbacks on promises success for deferred lists
		 function _main11(a){  
			 var ret = a;
			 var dl = defer.defered_list();
			 dl.defered_list_addCallback(_cb);
			 dl.addFallback(_fb);
			 dl.addPromise(["is",true]);
			 dl.defered_list_addErrback(_eb);
			 dl.returnValue(ret);
			 }
			_main11(true);
		//testing fallbacks on promises rejection for deferred lists
		function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["is",true]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(false);	
		function _main33(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!is",false]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main33(false);	
	 });
});
describe('#promises multiple args', function() {
	 
	 it('promises multiple args deferred();', function() {
		 function _cb (value){value.should.equal(true); }
		 function _fb (value){value.should.equal(false);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["is",true], ["?","boolean"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(true);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["is",true], ["?","boolean"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(false);	
	 });
	 it('promises multiple args deferred list();', function() {
		 function _cb (value){value.should.equal(true); }
		 function _fb (value){value.should.equal(false);}
		 function _eb (value){return "Ouch!";}
		 //testing fallbacks on promises rejection for deferred lists
		 function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["is",true], ["!?","string"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(true);	
		 function _main33(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["!is",false], ["?","boolean"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main33(false);			 
	 });
	 it('chained promises deferred();', function() {
		 function _cb (value){value.should.equal(true); }
		 function _fb (value){value.should.equal(false);}
		 function _eb (value){return "Ouch!";}
		//testing callbacks on promises success for deferred()
		 function _main(a){  
		 var ret = a;
		 var d = defer.Deferred();
		 d.addCallback(_cb);
		 d.addFallback(_fb);
		 d.addPromise(["is",true]);
		 d.addPromise(["?","boolean"]);
		 d.addErrback(_eb);
		 d.returnValue(ret);
		 }
		_main(true);
		//testing fallbacks on promises rejection for deferred()
		  function _main2(a){ 				 
			var ret = a;
			var d = defer.Deferred();
		    d.addCallback(_cb);
			d.addFallback(_fb);
			d.addPromise(["is",true]);
			d.addPromise(["!?","int"]);
			d.addErrback(_eb);
			d.returnValue(ret);
			}
			_main2(false);	 
	 });
	 it('chained promises deferred list();', function() {
		 function _cb (value){value.should.equal(true); }
		 function _fb (value){value.should.equal(false);}
		 function _eb (value){return "Ouch!";}
		 //testing fallbacks on promises rejection for deferred lists
		 function _main22(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["is",true]);
			dl.addPromise(["!?","function"]);
			dl.addPromise(["?","boolean"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main22(true);	
		 function _main33(a){  
			var ret = a;
			var dl = defer.defered_list();
			dl.defered_list_addCallback(_cb);
			dl.addFallback(_fb);
			dl.addPromise(["is",true]);
			dl.addPromise(["!?","function"]);
			dl.addPromise(["?","boolean"]);
			dl.defered_list_addErrback(_eb);
			dl.returnValue(ret);
			}
			_main33(false);		 
	 });

});
	 
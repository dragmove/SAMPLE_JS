//global variables
var project = {}; ( function() {
	requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl : 'js',
		//except, if the module ID starts with "app",
		//load it from the js/app directory. paths
		//config is relative to the baseUrl, and
		//never includes a ".js" extension since
		//the paths config could be for a directory.
		paths : {
			com : './com',
			vendor : './vendor'
		}
	});

	// Start the main app logic.
	var importFileArr = new Array();
	importFileArr.push('jquery');
	importFileArr.push('com/dragmove/debug/Debug');
	importFileArr.push('com/dragmove/util/NodeUtil');
	requirejs(importFileArr, initialize);

	//variables
	var _this = this;

	function initialize($, Debug, NodeUtil) {
		$(document).ready(function() {
			init();
		});
		
		function init() {
			NodeUtil.setCustomOverflowEllipsis($(".ellipsis"), "...");
			
			//original - http://docs.tinyfactory.co/jquery/2012/08/11/text-overflow-ellipsis-using-jquery.html
			//$(".ellipsis").ellipsis();
		}

		/* original - http://docs.tinyfactory.co/jquery/2012/08/11/text-overflow-ellipsis-using-jquery.html
		 (function($) {
		 $.fn.ellipsis = function() {
		 return this.each(function() {
		 var el = $(this);

		 console.log("this :", this);

		 if(el.css("overflow") == "hidden") {
		 var text = el.html();
		 var multiline = el.hasClass('multiline');
		 var t = $(this.cloneNode(true)).hide().css('position', 'absolute').css('overflow', 'visible').width( multiline ? el.width() : 'auto').height( multiline ? 'auto' : el.height());

		 el.after(t);

		 function height() {
		 return t.height() > el.height();
		 };

		 function width() {
		 return t.width() > el.width();
		 };

		 var func = multiline ? height : width;

		 while(text.length > 0 && func()) {
		 text = text.substr(0, text.length - 1);
		 t.html(text + "...");
		 }

		 el.html(t.html());
		 t.remove();
		 }
		 });
		 };
		 })(jQuery);
		 */
	}
}());

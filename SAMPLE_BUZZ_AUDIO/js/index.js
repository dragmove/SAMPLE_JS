//global variables
var project = {};

(function() {
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
	importFileArr.push('vendor/buzz/buzz');
	requirejs(importFileArr, initialize);
	
	//variables
	var _this = this;
	
	function initialize($) {
		//documentation
		//http://buzz.jaysalvat.com/documentation/buzz/
		
		var _container;
		var _$rect_1;
		var _$rect_2;
		
		var mySound_1 = new buzz.sound("data/sound/sound_1", {
			formats: ["ogg", "mp3", "m4a"],
			preload: true,
			autoplay: false,
			loop: false
		});
		var mySound_2 = new buzz.sound("data/sound/sound_2", {
			formats: ["ogg", "mp3", "m4a"],
			preload: true,
			autoplay: false,
			loop: false
		});
		
		$(document).ready(function() {
			init();
		});
		
		function init() {
			_container = $(".container").get(0);
			
			_$rect_1 = $(".rect_1");
			_$rect_1.bind("mouseover", rect1MouseInteraction);
			_$rect_1.bind("mouseout", rect1MouseInteraction);
			_$rect_1.bind("click", rect1MouseInteraction);
			
			_$rect_2 = $(".rect_2");
			_$rect_2.bind("mouseover", rect2MouseInteraction);
			_$rect_2.bind("mouseout", rect2MouseInteraction);
			_$rect_2.bind("click", rect2MouseInteraction);
			
			function rect1MouseInteraction($evt) {
				switch($evt.type) {
					case "mouseover" :
						console.log("rect_1");
					break;
					
					case "mouseout" :
						
					break;
					
					case "click" :
						mySound_1.play(); //.fadeIn().loop();
						
						/*
						mySound_1.pause();
						mySound_1.togglePlay();
						
						mySound_1.loop();
						mySound_1.unloop();
						
						mySound_1.mute();
						mySound_1.unmute();
						*/
						
						if(mySound_1.isPaused()) {
							console.log("mySound_1 is paused");
						}
						
						if(mySound_1.isEnded()) {
							console.log("mySound_1 is ended");
						}
						
						/*
						.bind("timeupdate", function() {
							var timer = buzz.toTimer(this.getTime());
							document.getElementById( "timer" ).innerHTML = timer;
						});
						*/
					break;
				}
			}
			
			function rect2MouseInteraction($evt) {
				switch($evt.type) {
					case "mouseover" :
						console.log("rect_2");
					break;
					
					case "mouseout" :
						
					break;
					
					case "click" :
						mySound_2.play(); //.fadeIn().loop();
						/*
						.bind("timeupdate", function() {
							var timer = buzz.toTimer(this.getTime());
							document.getElementById( "timer" ).innerHTML = timer;
						});
						*/
					break;
				}
			}
		}
	}
}());

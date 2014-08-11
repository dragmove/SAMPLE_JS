//global variables
var project = {};
( function() {
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
	importFileArr.push('com/dragmove/util/FormUtil');
	requirejs(importFileArr, initialize);

	//variables
	var _this = this;
	var _input_1;

	function initialize($, Debug, FormUtil) {
		$(document).ready(function() {
			init();
		});
		
		function init() {
			/*
			var $inputs = $("input");
			FormUtil.setCustomPlaceholder($inputs);
			*/
			/*
			//original - http://docs.tinyfactory.co/jquery/2012/12/18/HTML5-Placeholder-In-ie7-and-ie8-fix.html
			
			//Assign to those input elements that have 'placeholder' attribute
			$('input[placeholder]').each(function() {
				var input = $(this);
				$(input).val(input.attr('placeholder'));

				$(input).focus(function() {
					if(input.val() == input.attr('placeholder')) {
						input.val('');
					}
				});

				$(input).blur(function() {
					if(input.val() == '' || input.val() == input.attr('placeholder')) {
						input.val(input.attr('placeholder'));
					}
				});
			});
			*/
			
			/* restrict Number(0 ~ 9) */
			var _$input_1 = $(".registration_1");
			_input_1 = _$input_1.get(0);
			_input_1.style.imeMode = "disabled";
			
			_$input_1.bind("keypress", inputKeyHandler);
			_$input_1.bind("keyup", inputKeyHandler);
		}
		
		function inputKeyHandler($evt) {
			switch($evt.type) {
				case "keypress" :
					//console.log("$evt.which :", $evt.which);
					if($evt.which) {
						if($evt.which > 36 && $evt.which < 41 || $evt.which == 46 || $evt.which == 8) return; //left, top, right, down, delete, backspace
						if($evt.which > 47 && $evt.which < 58) return; //0 ~ 9
						$evt.preventDefault(); //must require
					}
				break;
				
				case "keyup" :
					if($evt.which) {
						if($evt.which > 36 && $evt.which < 41 || $evt.which == 46 || $evt.which == 8) return; //left, top, right, down, delete, backspace
						if($evt.which > 47 && $evt.which < 58) return; //0 ~ 9
						setInputCustomImeModeDisabled($evt.currentTarget);
					}
				break;
			}
		}
		
		function setInputRestrictNumber(_input) {
			var numberPattern = /\d/g;
			_input.value = _input.value.replace(numberPattern, "");
		}
		
		function setInputCustomImeModeDisabled(_input) { 
			var korPattern = /[\ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
			_input.value = _input.value.replace(korPattern, "");
		}
	}

}());

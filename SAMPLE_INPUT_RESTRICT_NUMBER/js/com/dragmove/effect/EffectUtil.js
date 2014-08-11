/*
 * The MIT License
 *
 * Copyright (c) 2013 dragmove
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

define(function(require, exports, module) {
	/**
	 * EffectUtil
	 * @class EffectUtil
	 * @constructor
	 */

	var EffectUtil = exports;
	var StringUtil = require('com/dragmove/util/StringUtil');
	var ControlUtil = require('com/dragmove/util/ControlUtil');
	
	/**
	 * Text TypeWrite Motion. need jQuery Library (html tag String can't apply typeWriter motion.)
	 * 
	 * @class EffectUtil.TypeWriter
	 * @constructor
	 * @param {String} _txt
	 * @param {DOM} _textNode
	 * @param {Number} _typingTimerGap
	 * @param {Boolean} _flag_startTimer
	 * @requires jQuery, StringUtil, ControlUtil
	 * @example
	<!-- DOM -->
	<body>
		<div id="typeWriterMotionContainer">target textNode</div>
	</body>
	
	var typeStr = "매일 자신이 하기 싫은 일을 2가지 하는 것은 영혼을 위해서는 좋다. - 달과 6펜스";  
	var _textNode = document.getElementById("typeWriterMotionContainer").firstChild; //select textNode
	
	var _typeWriterEffect = new EffectUtil.TypeWriter(typeStr, _textNode, 40, false);
	
	$(_typeWriterEffect).bind(_typeWriterEffect.EFFECT_COMPLETE, completeTypeWriterEffect);
	_typeWriterEffect.start();
	
	function completeTypeWriterEffect() {
		console.log("completeTypeWriterEffect");
	};
	 */
	EffectUtil.TypeWriter = function(_txt, _textNode, _typingTimerGap, _flag_startTimer) {
		var _this = this;

		//Event
		_this.EFFECT_COMPLETE = "TypeWriter_EFFECT_COMPLETE";

		//public function
		_this.destroy = function(_object) {
			if(_timer) {
				_timer.stop();
				_timer.destroy();
				_timer = null;
			}
			textArr = null;
			textIndex = 0;
			motionChaIndex = 0;
			accumulateStr = "";
			flag_useTimerExperience = false;
			flag_motionComplete = false;
		};

		_this.start = function(_flag_startMotionFromBeginning) {
			if(!flag_useTimerExperience)
				flag_useTimerExperience = true;
			if(_flag_startMotionFromBeginning) {
				flag_motionComplete = false;
				textIndex = 0;
				motionChaIndex = 0;
				accumulateStr = "";
				_txtNode.nodeValue = "";
				if(_timer) {
					_timer.stop();
					_timer.start();
				}
			} else {
				if(_timer) {
					_timer.stop();
					_timer.start();
				}
			}
		};

		_this.stop = function() {
			if(_timer)
				_timer.stop();
		};
		//variables
		var _timer;
		var _txtNode;
		var textArr;
		var textIndex = 0;
		var motionChaIndex = 0;
		var accumulateStr = "";
		var flag_useTimerExperience = false;
		var flag_motionComplete = false;

		//implement
		if(_txt == undefined || _txt == "") {
			//if(console) console.log("[com.dragmove.effect.effectUtil.TypeWriter] TypeWriter effect를 실행하기 위한 _txt value가 존재하지 않습니다.");
			return null;
		}
		_txtNode = _textNode;
		textArray = StringUtil.breakSetenceStr(_txt);

		if(_timer) {
			_timer.stop();
			_timer.destroy();
			_timer = null;
		}
		_timer = new ControlUtil.SimpleTimer(_typingTimerGap, this, performTypingMotion);
		if(_flag_startTimer)
			_timer.start();

		//private function
		function performTypingMotion() {
			if(flag_motionComplete) {
				//console.log("[com.dragmove.effect.effectUtil.TypeWriter] TypeWriter effect가 start() Function 사용 이후, 진행 완료된 상태입니다.");
				flag_useTimerExperience = false;
				if(_timer)
					_timer.stop();
				return;
			}
			var motionChaArr = textArray[textIndex];
			var characterLength = motionChaArr.length;
			var _str = motionChaArr[motionChaIndex];
			_txtNode.nodeValue = accumulateStr + _str;
			motionChaIndex++;
			if(characterLength <= motionChaIndex) {
				accumulateStr += _str;
				motionChaIndex = 0;
				textIndex++;
				if(textIndex >= textArray.length) {
					flag_useTimerExperience = false;
					flag_motionComplete = true;
					if(_timer) _timer.stop();
					
					//dispatch effect complete event
					var paramObj = {};
					paramObj.type = _this.EFFECT_COMPLETE;
					$(_this).trigger(paramObj);
				}
			}
		}

		return _this;
	};
	
	/**
	 * Transition Entrace - Expansion. need TweenMax, jQuery Library (TEST COMPLETE - IE7,8,9, Chrome, Firefox, Safari, mobile Safari. iphone4, ipad3, galaxyS3)
	 * 
	 * @class EffectUtil.EntranceExpansion
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<div class="imageContainer">
		<img class="circle" width="200" height="200" src="./img/circle.png" alt="" />
	</div> 
	
	var _$imageContainer = $(".imageContainer");
	var _$circle = $(".circle", _$imageContainer);
	
	//Entrance Expansion example
	var _entranceExpansion = new EntranceExpansion();
	
	var initOpt = {
		container:_$imageContainer.get(0),
		imgInContainer:_$circle.get(0)
	};
	_entranceExpansion.init(initOpt);
	
	var entranceOpt = {
		delay:2,
		speed:1.5,
		ease:Cubic.easeInOut
	}
	_entranceExpansion.entrance(entranceOpt);
	 */
	EffectUtil.EntranceExpansion = function() {
		/*
		 * TEST COMPLETE - IE7,8,9, Chrome, Firefox, Safari, mobile Safari. iphone4, ipad3, galaxyS3 
		 */
		var _this = this;
		
		_this.entrance = function(_object) {
			var delay = (_object.delay) ? _object.delay : 0;
			var speed = _object.speed;
			var easeStr = _object.ease;
			
			var _img = _$img.get(0);
			if(_img) {
				TweenMax.killTweensOf(_img);
				TweenMax.to(_img, speed, {delay:delay, css:{top:imageTop, left:imageLeft, width:imageWidth, height:imageHeight}, ease:easeStr});
			}
		};
		
		_this.exit = function() {
		};
		
		var _$container;
		var _$img;
		var imageTop;
		var imageLeft;
		var imageWidth;
		var imageHeight;
		
		_this.init = function(_object) {
			_$container = $(_object.container);
			_$img = $(_object.imgInContainer);
			
			imageTop = parseFloat(_$img.css("top"));
			imageLeft = parseFloat(_$img.css("left"));
			imageWidth = _$img.attr("width");
			imageHeight = _$img.attr("height");
			
			/*
			 * problem) when _$img width:0, height:0 setting, can't expansion tween motion on mobile safari. so, set width:1px, height:1px
			 */
			_$img.css({width:1, height:1}); 
			_$img.css({top:imageTop + imageHeight/2, left:imageLeft + imageWidth/2});
		};
		
		_this.destroy = function() {
			if(!_$img) return;
			var _img = _$img.get(0);
			if(_img) {
				TweenMax.killTweensOf(_img);
				_img = null;
			}
		};
		
		return _this;
	};
	
	return EffectUtil;
});

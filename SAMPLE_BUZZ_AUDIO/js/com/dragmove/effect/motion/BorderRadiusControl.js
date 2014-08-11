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
	 * ClipRectMask
	 * @class ClipRectMask
	 * @constructor
	 * 
	 * @example
	<!-- DOM -->
	<div class="container">
		<div class="rect"></div>
	</div>
	
	<!-- CSS -->
	.container { position:relative; }
	.rect {
		position:relative;
		top:0;
		left:0;
		width:100px;
		height:100px;
		background-color:#f00;
		
		border:1px solid #f00;
		border-radius:50px;
		-moz-border-radius:50px;
		-webkit-border-radius:50px;
	}
	
	<!-- JS -->
	var _rect;
	var _controlBorderRadius;
	
	$(document).ready(function() {
		init();
	});
	
	function init() {
		_rect = $(".rect").get(0);
		
		_controlBorderRadius = new BorderRadiusControl();
		var initOpt = {
			target:_rect,
			borderTopLeftRadius:50,
			borderTopRightRadius:50,
			borderBottomLeftRadius:50,
			borderBottomRightRadius:50
		};
		_controlBorderRadius.init(initOpt);
		
		_controlBorderRadius.entrance({
			borderTopLeftRadius:0,
			borderTopRightRadius:0,
			borderBottomLeftRadius:0,
			borderBottomRightRadius:0,
			delay:0,
			speed:0.75,
			easeStr:"Cubic.easeInOut",
			isRandom:false,
			randomSpeedGap:0.25
		});
	}
	
	function completeClipRectMaskMotion($evt) {
		switch($evt.type) {
			case _clipRectMask.COMPLETE :
				console.log("completeClipRectMaskMotion");
			break;
		}
	}
	
	
	 */
	var BorderRadiusControl = function() {
		var _this = this;
		
		/**
		* BorderRadiusControl instance motion complete event
		* 
		* @property COMPLETE
		* @type {String}
		* @default "BorderRadiusControl_COMPLETE"
		*/
		_this.COMPLETE = "BorderRadiusControl_COMPLETE";
		
		/**
		 * entrance BorderRadiusControl motion
		 *
		 * @method entrance
		 * @param {Object} object Object include borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius, delay, speed, TweenMax easeStr, isRandom, randomSpeedGap. ex) {borderTopLeftRadius:0, borderTopRightRadius:0, borderBottomLeftRadius:0, borderBottomRightRadius:0, delay:0, speed:0.75, easeStr:"Cubic.easeInOut", isRandom:true, randomSpeedGap:0.25}
		 * @return {Void}
		 */
		_this.entrance = function(_object) {
			var delay = (_object.delay) ? object.delay : 0;
			var speed = _object.speed;
			var easeStr = _object.ease;
			var isRandom = false;
			var randomSpeedGap = 0;
			
			if(_object.isRandom) {
				isRandom = true;
				randomSpeedGap = (_object.randomSpeedGap) ? _object.randomSpeedGap : 0;
				
				var randomSpeedArr = [];
				for(var i=0; i<NUM_BORDER_RADIUS; i++) {
					randomSpeedArr.push(speed + getRandomPositiveNegative() * parseFloat(getRandomFloatMinToMax(0, randomSpeedGap).toFixed(3)));
				}
				
				var maxIndex = getMaxNumberPositionByArr(randomSpeedArr);
				var completeFuncArr = [];
				for(var i=0; i<NUM_BORDER_RADIUS; i++) {
					if(i != maxIndex) {
						completeFuncArr.push(null);
					}else{
						completeFuncArr.push(_complete)
					}
				}
				
				TweenMax.to(_contents, randomSpeedArr[0], {delay:delay, css:{borderTopLeftRadius:_object.borderTopLeftRadius}, ease:easeStr, onComplete:completeFuncArr[0]});
				TweenMax.to(_contents, randomSpeedArr[1], {delay:delay, css:{borderTopRightRadius:_object.borderTopRightRadius}, ease:easeStr, onComplete:completeFuncArr[1]});
				TweenMax.to(_contents, randomSpeedArr[2], {delay:delay, css:{borderBottomLeftRadius:_object.borderBottomLeftRadius}, ease:easeStr, onComplete:completeFuncArr[2]});
				TweenMax.to(_contents, randomSpeedArr[3], {delay:delay, css:{borderBottomRightRadius:_object.borderBottomRightRadius}, ease:easeStr, onComplete:completeFuncArr[3]});
			}else{
				TweenMax.to(_contents, speed, {
					delay:delay, 
					css:{
						borderTopLeftRadius:_object.borderTopLeftRadius,
						borderTopRightRadius:_object.borderTopRightRadius,
						borderBottomLeftRadius:_object.borderBottomLeftRadius,
						borderBottomRightRadius:_object.borderBottomRightRadius
					}, 
					ease:easeStr, onComplete:_complete});
			}
		};
		
		var NUM_BORDER_RADIUS = 4;
		var _contents = null;
		var _borderRadiusObj = {tl:0, tr:0, bl:0, br:0};
		
		/**
		 * init BorderRadiusControl instance
		 *
		 * @method init
		 * @param {Object} object Object include target, borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius. ex) {target:DOM, borderTopLeftRadius:50, borderTopRightRadius:50, borderBottomLeftRadius:50, borderBottomRightRadius:50}
		 * @return {Void}
		 */
		_this.init = function(_object) {
			_contents = _object.target;
			_borderRadiusObj.tl = (_object.borderTopLeftRadius) ? _object.borderTopLeftRadius : parseFloat($(_contents).css("borderTopLeftRadius"));
			_borderRadiusObj.tr = (_object.borderTopRightRadius) ? _object.borderTopRightRadius : parseFloat($(_contents).css("borderTopRightRadius"));
			_borderRadiusObj.bl = (_object.borderBottomLeftRadius) ? _object.borderBottomLeftRadius : parseFloat($(_contents).css("borderBottomLeftRadius"));
			_borderRadiusObj.br = (_object.borderBottomRightRadius) ? _object.borderBottomRightRadius : parseFloat($(_contents).css("borderBottomRightRadius"));
			
			$(_contents).css("borderTopLeftRadius", _borderRadiusObj.tl + "px");
			$(_contents).css("borderTopRightRadius", _borderRadiusObj.tr + "px");
			$(_contents).css("borderBottomLeftRadius", _borderRadiusObj.bl + "px");
			$(_contents).css("borderBottomRightRadius", _borderRadiusObj.br + "px");
		};
		
		/**
		 * destroy BorderRadiusControl instance
		 *
		 * @method destroy
		 * @return {Void}
		 */
		_this.destroy = function() {
			if(_contents) {
				TweenMax.killTweensOf(_contents);
				_contents = null;
			}
			_borderRadiusObj = {tl:0, tr:0, bl:0, br:0};
		};
		
		function getRandomPositiveNegative() {
			var distinguishInt = Math.round(Math.random());
			if(distinguishInt > 0) return 1;
			return -1;
		}
		
		function getRandomFloatMinToMax(_minValueFloat, _maxValueFloat) {
			return _minValueFloat + Math.random() * (_maxValueFloat - _minValueFloat);
		}
		
		function getMaxNumberPositionByArr(_array) {
			if(_array.length <= 1) return 0;
			var tempPosition = 0;
			var tempNumber = _array[0];
			for(var i=1, max=_array.length; i<max; ++i) {
				var comparisonNumber = _array[i];
				tempNumber = Math.max(tempNumber, comparisonNumber);
				if(tempNumber == comparisonNumber) tempPosition = i;
			}
			return tempPosition;
		};
		
		function _complete() {
			$(_this).trigger( {type:_this.COMPLETE} );
		}
		
		return _this;
	};
	
	return BorderRadiusControl;
});

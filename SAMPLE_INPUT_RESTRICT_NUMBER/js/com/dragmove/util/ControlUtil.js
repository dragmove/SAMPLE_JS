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
	 * ControlUtil
	 * @class ControlUtil
	 * @constructor
	 */
	var ControlUtil = exports;

	/**
	 * SimpleTimer
	 * @class ControlUtil.SimpleTimer
	 * @constructor
	 * @param {Number} _gapTime timer gap
	 * @param {Object} _callbackScope scope object
	 * @param {Function} _callbackFunc callback function
	 * @param {Array} _callbackFuncArgumentsArr callback function arguments array
	 * @example
	//EXAMPLE 1. perform function
	function timerTestFunc() {
		console.log('private timerTestFunc');
	}
	
	var _function = timerTestFunc; //단일 function
	var _simpleTimer = new ControlUtil.SimpleTimer( 1000, this, _function );
	_simpleTimer.start();
	//_simpleTimer.stop();
	
	//EXAMPLE 2. perform Object function include arguments
	var _functionObj = {};
	_functionObj.timerTestFuncIncludeArgument = function(_param_1, _param_2, _param_3) {
		console.log('function Object function included Object : ', _param_1, _param_2, _param_3);
	};
	
	var _function = _functionObj.timerTestFuncIncludeArgument; //객체에 귀속된 function
	var _simpleTimer = new ControlUtil.SimpleTimer( 1000, this, _function, [0, "dragmove", {x:100, y:200}] );
	_simpleTimer.start();
	//_simpleTimer.stop();
	
	//EXAMPLE 3. perform function include arguments
	function timerTestFuncIncludeArgument(_param_1, _param_2, _param_3) {
		console.log('private function : ', _param_1, _param_2, _param_3);
	}
	
	var _function = timerTestFuncIncludeArgument; //단일 function
	var _simpleTimer = new ControlUtil.SimpleTimer( 1000, this, _function, [0, "dragmove", {x:100, y:200}] );
	_simpleTimer.start();
	//_simpleTimer.stop();
	 */
	ControlUtil.SimpleTimer = function(_gapTime, _callbackScope, _callbackFunc, _callbackFuncArgumentsArr) {
		var _this = this;

		//variables
		var gapTime = _gapTime;
		var callbackScope = _callbackScope;
		var callbackFunc = _callbackFunc;
		var callbackFuncArgumentsArr = _callbackFuncArgumentsArr;
		var _timer;
		
		//setTimeout
		var flag_protectRepeatTimeout = false;

		//public function
		_this.destroy = function() {
			destroyInternalTimer();
			gapTime = null;
			callbackScope = null;
			callbackFunc = null;
			callbackFuncArgumentsArr = null;
			_timer = null;
			flag_protectRepeatTimeout = false;
		};

		_this.start = function() {
			destroyInternalTimer();
			_timer = setTimeout(performTimeout, gapTime);
			flag_protectRepeatTimeout = true;
		};

		_this.stop = function() {
			flag_protectRepeatTimeout = false;
			destroyInternalTimer();
		};
		
		//private function
		function performTimeout() {
			if(!callbackFuncArgumentsArr) {
				_callbackFunc.call(callbackScope);
			} else {
				_callbackFunc.apply(callbackScope, callbackFuncArgumentsArr);
			}
			repeatTimeout();
		}

		function repeatTimeout() {
			if(!flag_protectRepeatTimeout)
				return;
			destroyInternalTimer();
			_timer = setTimeout(performTimeout, gapTime);
		}

		function destroyInternalTimer() {
			if(_timer) {
				clearTimeout(_timer);
				_timer = null;
			}
		}
		
		return _this;
	};
	
	return ControlUtil;
});

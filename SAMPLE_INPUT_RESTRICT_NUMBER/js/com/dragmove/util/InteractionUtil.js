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
	 * InteractionUtil
	 * @class InteractionUtil
	 * @constructor
	 */

	var InteractionUtil = exports;

	/**
	 * 전달받은 mouseEvent가 발생한 위치를 캡쳐하여, _functionGetReturnedMouseEventXYPosition Function에 x,y parameter 전달.
	 * Javascript Cookbook 161p 참고.
	 *
	 * @static
	 * @method getMouseEventPosition
	 * @param {MouseEvent} _mouseEvent native DOM MouseEvent
	 * @param {Function} _functionGetReturnedMouseEventXYPosition number value
	 * @return {Void} call function _functionGetReturnedMouseEventXYPosition
	 * @example
	 */
	InteractionUtil.getMouseEventPosition = function(_mouseEvent, _functionGetReturnedMouseEventXYPosition) {
		_mouseEvent = _mouseEvent || window.event;
		var x = 0;
		var y = 0;
		if(_mouseEvent.pageX) {//FireFox, Chrome, Safari
			x = _mouseEvent.pageX;
			y = _mouseEvent.pageY;
		} else if(_mouseEvent.clientX) {//IE 7, 8, 9
			var offsetX = 0;
			var offsetY = 0;
			if(document.documentElement.scrollLeft) {
				offsetX = document.documentElement.scrollLeft;
				offsetY = document.documentElement.scrollTop;
			} else if(document.body) {
				offsetX = document.body.scrollLeft;
				offsetY = document.body.scrollTop;
			}
			x = _mouseEvent.clientX + offsetX;
			y = _mouseEvent.clientY + offsetY;
		}
		//call parameter function
		_functionGetReturnedMouseEventXYPosition(x, y);
	};
	
	/**
	 * document mouse drag select 방지
	 *
	 * @static
	 * @method preventDocumentMouseDragSelect
	 * @param {Boolean} _flag
	 * @return {Void}
	 * @example
	 */
	InteractionUtil.preventDocumentMouseDragSelect = function(_flag) {
		if(_flag) {
			document.ondragstart = function(){ return false; };
			document.onselectstart  = function(){ return false; };
			if(document.body.style.MozUserSelect != undefined ) document.body.style.MozUserSelect = "none";
		}else{
			document.ondragstart = null;
			document.onselectstart  = null;
			if(document.body.style.MozUserSelect != undefined ) document.body.style.MozUserSelect = "auto";
		}
	};
	
	return InteractionUtil;
});

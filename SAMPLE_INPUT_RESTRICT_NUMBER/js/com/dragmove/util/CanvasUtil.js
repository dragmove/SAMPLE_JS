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
	 * CanvasUtil
	 * @class CanvasUtil
	 * @constructor
	 */

	var CanvasUtil = exports;

	/**
	 * return window x,y to canvas point
	 *
	 * @static
	 * @method convertPointWindowToCanvas
	 * @param {Canvas} _canvas
	 * @param {Number} _x 
	 * @param {Number} _y
	 * @return {Object} Returns Object include x, y
	 * @example
	 */
	CanvasUtil.convertPointWindowToCanvas = function(_canvas, _x, _y) {
		var canvasRect = _canvas.getBoundingClientRect();
		var returnObj = {};
		returnObj.x = _x - canvasRect.left * (_canvas.width / canvasRect.width);
		returnObj.y = _y - canvasRect.top * (_canvas.height / canvasRect.height);
		return returnObj;
	};
	
	return CanvasUtil;
});

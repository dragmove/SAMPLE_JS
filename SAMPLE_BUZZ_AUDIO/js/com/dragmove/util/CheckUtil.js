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
	 * CheckUtil
	 * @class CheckUtil
	 * @constructor
	 */
	
	var CheckUtil = exports;

	/**
	 * get object is available
	 *
	 * @static
	 * @method available
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.available = function($object) {
		var flag = true;
		if($object == null || $object == undefined) return false;
		return flag;
	};
	
	/**
	 * get object type is Array
	 *
	 * @static
	 * @method isArray
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isArray = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == Array);
	};
	
	/**
	 * get object type is Function
	 *
	 * @static
	 * @method isFunction
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isFunction = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == Function);
	};
	
	/**
	 * get object type is String
	 *
	 * @static
	 * @method isString
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isString = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == String);
	};
	
	/**
	 * get object type is Number
	 *
	 * @static
	 * @method isNumber
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isNumber = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == Number);
	};
	
	/**
	 * get object type is Boolean
	 *
	 * @static
	 * @method isBoolean
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isBoolean = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == Boolean);
	};
	
	/**
	 * get object type is Object
	 *
	 * @static
	 * @method isObject
	 * @param {Object} $object check target object
	 * @return {Boolean} Returns true or false
	 * @example
	 */
	CheckUtil.isObject = function($object) {
		if(!CheckUtil.available($object)) return false;
		return ($object.constructor == Object);
	};
	
	return CheckUtil;
});

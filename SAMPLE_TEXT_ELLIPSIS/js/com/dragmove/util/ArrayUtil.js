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
	 * ArrayUtil
	 * @class ArrayUtil
	 * @constructor
	 */

	var ArrayUtil = exports;

	/**
	 * Number type value들이 담긴 Array 내부의 값 중 value값과 가장 가까운 값을 찾아내고 그 index 값을 반환합니다.
	 * 동일한 오차일 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다. 
	 *
	 * @static
	 * @method getNearArrayPositionByValue
	 * @param {Array} array include number elements
	 * @param {Number} value number value
	 * @return {Number} Returns int
	 * @example
	var array = [100,200,300,400,500];
	var value = 180;
	console.log(ArrayUtil.getNearArrayPositionByValue(array , value));  //return 1 (200)
	
	var array = [100,400,200,300,50];
	var value = 40;
	console.log(ArrayUtil.getNearArrayPositionByValue(array , value));  //return 4 (50)
	
	var array = [-100,-200,-300,100,500];
	var value = -180;
	console.log(ArrayUtil.getNearArrayPositionByValue(array , value));  //return 1 (-200)
	 */
	ArrayUtil.getNearArrayPositionByValue = function(array, value) {
		var nearIndex = -1;
		var minValue = Math.abs(value - array[0]);
		for(var i = 0, max = array.length; i < max; i++) {
			if(minValue >= Math.abs(value - array[i])) {
				minValue = Math.abs(value - array[i]);
				nearIndex = i;
			}
		}
		return nearIndex;
	};
	
	/**
	 * Array 내부의 객체의 Number type 속성의 크기를 비교하여, 속성 크기의 순서대로 정렬된 Array를 반환.
	 *
	 * @static
	 * @method getArrangedArrByElementNumberTypeProperty
	 * @param {Array} _array array include object elements
	 * @param {String} _elementNumberTypePropertyNameStr string value
	 * @return {Array} Returns array include object elements
	 * @example
	var elementArr = [{y:10}, {y:0}, {y:30}, {y:20}, {y:420}, {y:40}];
	var arrangeArr = ArrayUtil.getArrangedArrByElementNumberTypeProperty(elementArr, "y");
	
	var _element;
	for(var i = 0; i < arrangeArr.length; ++i) {
		_element = arrangeArr[i];
		console.log("_element.y :", _element.y);
	}
	 */
	ArrayUtil.getArrangedArrByElementNumberTypeProperty = function(_array, _elementNumberTypePropertyNameStr) {
		var tarray = _array;
		var returnArr = [];
		var _elementObj;
		var _compareElementObj;
		var comparisonCount = 0;
	
		var tarrayLenth = tarray.length;
		for(var i=0; i<tarrayLenth; ++i) {
			_elementObj = tarray[i];
			if(!_elementObj.hasOwnProperty(_elementNumberTypePropertyNameStr)) {
				//console.log("[ArrayUtil.getArrangedArrByElementNumberTypeProperty] - Array 내부의 객체에 _elementNumberTypePropertyNameStr 문자열과 일치하는 속성이 존재하지 않습니다. null을 반환합니다."); 
				break;
				return null;
			}else{
				if(typeof _elementObj[_elementNumberTypePropertyNameStr] != "number") {
					//console.log("[ArrayUtil.getArrangedArrByElementNumberTypeProperty] - Array 내부의 객체의 _elementNumberTypePropertyNameStr 속성은 Number type이 아닙니다. null을 반환합니다.");
					break;
					return null;
				}
			}
			if(returnArr.length <= 0) {
				returnArr.push(_elementObj);
			}else{
				comparisonCount = 0;
				for(var k=0; k<returnArr.length; ++k) {
					_compareElementObj = returnArr[k]; 
					if(_compareElementObj != _elementObj) {
						if(_compareElementObj[_elementNumberTypePropertyNameStr] > _elementObj[_elementNumberTypePropertyNameStr]) {
							break;
						}else{
							comparisonCount++;
						}
					}
				}
				returnArr.splice(comparisonCount, 0, _elementObj);
			}
		}
		return returnArr;
	};
	
	/**
	 * Number type value들이 담긴 Array 내부의 값 중 가장 큰 값을 반환.
	 *
	 * @static
	 * @method getMaxNumberByArr
	 * @param {Array} _array array include number elements
	 * @return {Number} Returns number
	 * @example
	var numArr = [10, 30, 20, 120, 55];
	console.log(ArrayUtil.getMaxNumberByArr(numArr)); //display 120
	 */
	ArrayUtil.getMaxNumberByArr = function(_array) {
		_array.sort(function numberOrder(a, b) { return a - b; });
		return _array[_array.length - 1];
	};
	
	/**
	 * Number type value들이 담긴 Array 내부의 값 중 가장 작은 값을 반환
	 *
	 * @static
	 * @method getMinNumberByArr
	 * @param {Array} _array array include number elements
	 * @return {Number} Returns number
	 * @example
	var numArr = [10, 30, 20, 120, 55];
	console.log(ArrayUtil.getMinNumberByArr(numArr)); //display 10
	 */
	ArrayUtil.getMinNumberByArr = function(_array) {
		_array.sort(function numberOrder(a, b) { return a - b; });
		return _array[0];
	};
	
	/**
	 * Number type value들이 담긴 Array 내부의 값 중 가장 큰 값이 있는 위치값을 반환(같은 값이 존재할 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다.)
	 *
	 * @static
	 * @method getMaxNumberPositionByArr
	 * @param {Array} _array array include number elements
	 * @return {Number} Returns number
	 * @example
	var numArr = [10, 30, 20, 120, 55];
	console.log(ArrayUtil.getMaxNumberPositionByArr(numArr)); //가장 큰 값인 120의 위치인 3 이 반환
	 */
	ArrayUtil.getMaxNumberPositionByArr = function(_array) {
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
	
	/**
	 * Number type value들이 담긴 Array 내부의 값 중 가장 작은 값이 있는 위치값을 반환(같은 값이 존재할 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다.)
	 *
	 * @static
	 * @method getMinNumberPositionByArr
	 * @param {Array} _array array include number elements
	 * @return {Number} Returns number
	 * @example
	var numArr = [10, 30, 20, 120, 55];
	console.log(ArrayUtil.getMinNumberPositionByArr(numArr)); //가장 작은 값인 10의 위치인 0 이 반환
	*/
	ArrayUtil.getMinNumberPositionByArr = function(_array) {
		if(_array.length <= 1) return 0;
		var tempPosition = 0;
		var tempNumber = _array[0];
		for(var i=1, max=_array.length; i<max; ++i) {
			var comparisonNumber = _array[i];
			tempNumber = Math.min(tempNumber, comparisonNumber);
			if(tempNumber == comparisonNumber) tempPosition = i;
		}
		return tempPosition;
	};
	
	/**
	 * Array 내부의 원소를 random하게 Mix합니다.
	 *
	 * @static
	 * @method randomSort
	 * @param {Array} _array array include number elements
	 * @return {Void}
	 * @example
	var testArr = [10, 30, 20, 120, 55];
	ArrayUtil.randomSort(testArr);
	console.log(testArr);
	*/
	ArrayUtil.randomSort = function(_array) {
		_array.sort(
			function( _elementA, _elementB) {
				var _num = Math.random() - .5;
				var value = ( _num > 0 )? 1 : -1;
				return value;
			}
		);
	};
	
	/**
	 * Array.indexOf function. (IE can't call indexOf() method of Array Class.)
	 *
	 * @static
	 * @method indexOf
	 * @param {Array} $array array
	 * @param {Object} $targetObj object in array
	 * @return {Void}
	 * @example
	var testArr = [10, 30, 20, 120, 55];
	console.log(ArrayUtil.indexOf(testArr, 10)); //return 0;
	*/
	ArrayUtil.indexOf = function($array, $targetObj) {
		for(var i=0, max=$array.length; i<max; i++) {
			if ($array[i] == $targetObj) {
				return i;
			}
		}
		return -1;
	};
	
	/**
	 * Array 내부에 $targetObj가 존재하는지를 true/false로 반환.
	 *
	 * @static
	 * @method getFlagExistEqualValue
	 * @param {Array} $array array
	 * @param {Object} $targetObj object in array
	 * @return {Boolean} returns true or false
	 * @example
	*/
	ArrayUtil.getFlagExistEqualValue = function($array, $targetObj) {
		for(var i=0,max=$array.length; i<max; i++) {
			if ($array[i] == $targetObj) {
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Array 내부의 모든 값에 parseFloat 연산을 행하여 반환.
	 *
	 * @static
	 * @method getConvertValueToNumberTypeArr
	 * @param {Array} $array array
	 * @return {Array} returns array
	 * @example
	var testArr = [10px, 30px, 20px, 120px, 55px];
	console.log(ArrayUtil.getConvertValueToNumberTypeArr(testArr)); //return [10, 30, 20, 120, 55];
	*/
	ArrayUtil.getConvertValueToNumberTypeArr = function($array) {
		var array = $array.concat();
		for(var i=0, max=array.length; i<max; i++) {
			array[i] = parseFloat(array[i]);
		}
		return array;
	};
	
	/**
	 * Array 내부의 모든 원소를 오름차순 정렬하여 반환.
	 *
	 * @static
	 * @method getAscendingSortedArr
	 * @param {Array} $array array
	 * @return {Array} returns array
	 * @example
	*/
	ArrayUtil.getAscendingSortedArr = function($array) {
		var array = $array.concat();
		array.sort(function(a, b) { return a - b; })
		return array;
	};
	
	/**
	 * Array 내부의 모든 원소를 내림차순 정렬하여 반환.
	 *
	 * @static
	 * @method getDescendingSortedArr
	 * @param {Array} $array array
	 * @return {Array} returns array
	 * @example
	*/
	ArrayUtil.getDescendingSortedArr = function($array) {
		var array = $array.concat();
		array.sort(function(a, b) { return b - a; })
		return array;
	};
	
	/**
	 * Array 내부의 모든 원소를 새로운 배열에 담아 출력하되, 중복된 값이 존재하는 원소에 대해서는 1번만 담아 출력합니다.
	 *
	 * @static
	 * @method getPickOutOnlyValueArr
	 * @param {Array} $array array
	 * @return {Array} returns array
	 * @example
	var array = [1, 1, 1, 2, 3, 4, 4, 5]; 가 존재할 경우, 반환되는 array는 [1, 2, 3, 4, 5]의 값을 가집니다.
	*/
	ArrayUtil.getPickOutOnlyValueArr = function($array) {
		var array = $array.concat();
		_targetObj = array.shift(); //1st value
		
		var returnArr = new Array();
		returnArr.push(_targetObj); //set 1st value in returnArr
		
		var _targetObj;
		for(var i=0, max=array.length; i<max; i++) {
			_targetObj = array.shift();
			if(ArrayUtil.getFlagExistEqualValue(returnArr, _targetObj)) {
				continue;
			}else{
				returnArr.push(_targetObj);
			}
		}
		return returnArr;
	};
	
	return ArrayUtil;
});
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
	 * MathUtil
	 * @class MathUtil
	 * @constructor
	 */

	var MathUtil = exports;
	
	/**
	 * 밑변의 길이와 밑변의 예각을 이용하여, 직각 삼각형의 높이 반환
	 *
	 * @static
	 * @method getHeightFromTriangleBaseLineAngle
	 * @param {String} _baseLineWidth
	 * @param {String} _degreeAngle
	 * @return {Number} Returns number
	 * @example
	var BASELINE_WIDTH = 100; //직각 삼각형의 밑변의 길이
	var ANGLE = 30; //직각 삼각형의 빗변과 접하는 밑변의 예각
	var triangleHeight = MathUtil.getHeightFromTriangleBaseLineAngle(BASELINE_WIDTH, ANGLE); 
	console.log(triangleHeight);
	 */
	MathUtil.getHeightFromTriangleBaseLineAngle = function(_baseLineWidth, _degreeAngle) {
		var degreeToRadian = _degreeAngle * Math.PI / 180;
		return _baseLineWidth * Math.tan(degreeToRadian);
	};
	
	/**
	 * linePoint_1 과 linePoint_2를 지나는 직선 상의, somePoint가 직교하는 Point Object를 반환.
	 *
	 * @static
	 * @method getCrossPointBetweenTwoPointsLineAndSomePoint
	 * @param {Object} _somePoint Object include x, y
	 * @param {Object} _linePoint_1 Object include x, y
	 * @param {Object} _linePoint_2 Object include x, y
	 * @return {Object} Returns Object include x, y
	 * @example
	var _linePoint_1 = {x:0, y:0};
	var _linePoint_2 = {x:100, y:100};
	var _somePoint = {x:50, y:100};
	var _crossPoint = MathUtil.getCrossPointBetweenTwoPointsLineAndSomePoint(_somePoint, _linePoint_1, _linePoint_2);
	console.log(_crossPoint); // (0,0)좌표와 (100,100)좌표를 지나는 직선 상에서, (50,100)의 Point가 직교하는 위치인 (75, 75)의 위치를 반환합니다.
	 */
	MathUtil.getCrossPointBetweenTwoPointsLineAndSomePoint = function(_somePoint, _linePoint_1, _linePoint_2) {
		if(_linePoint_1.x == _linePoint_2.x && _linePoint_1.y == _linePoint_2.y) return null; //_linePoint_1과 _linePoint_2의 위치가 같습니다. null을 반환합니다.
		var denominator = _linePoint_2.x - _linePoint_1.x;
		var numerator = _linePoint_2.y - _linePoint_1.y;
		if(denominator == 0) return {x:_linePoint_1.x, y:_somePoint.y};
		if(numerator == 0) return {x:_somePoint.x, y:_linePoint_1.y};
		
		var twoPointsLineSlope = numerator / denominator;
		var somePointLineSlope = -1/twoPointsLineSlope;
		var returnPoint = {};
		returnPoint.x = (somePointLineSlope*_somePoint.x - twoPointsLineSlope*_linePoint_1.x + _linePoint_1.y - _somePoint.y) / (somePointLineSlope - twoPointsLineSlope);
		returnPoint.y = somePointLineSlope * (returnPoint.x - _somePoint.x) + _somePoint.y;
		return returnPoint;
	};
	
	/**
	 * radian value를 호도각 value로 변환
	 *
	 * @static
	 * @method radianToDegree
	 * @param {Number} radian
	 * @return {Number} Returns number 
	 * @example
	var _pi = Math.PI;
	console.log(MathUtil.radianToDegree(_pi)); //PI의 호도각 value인 180 출력
	 */
	MathUtil.radianToDegree = function(radian) {
		return radian * 180 / Math.PI;
	};
	
	/**
	 * 호도각 value를 radian value로 변환 출력
	 *
	 * @static
	 * @method degreeToRadian
	 * @param {Number} degree
	 * @return {Number} Returns number 
	 * @example
	var _rotationValue = 180;
	console.log(MathUtil.degreeToRadian(_rotationValue)); //호도각 180도의 radian value인 3.141592653589793 출력
	 */
	MathUtil.degreeToRadian = function(degree) {
		return degree * Math.PI / 180;
	};
	
	/**
	 * 두 point 사이의 거리 반환
	 *
	 * @static
	 * @method getDistanceBetweenTwoPoints
	 * @param {Object} point1_x Object include x, y
	 * @param {Object} point1_y Object include x, y
	 * @param {Object} point2_x Object include x, y
	 * @param {Object} point2_y Object include x, y
	 * @return {Number} Returns number
	 * @example
	var _point_1 = {x:0, y:0};
	var _point_2 = {x:100, y:100};
	console.log(MathUtil.getDistanceBetweenTwoPoints(_point_1.x, _point_1.y, _point_2.x, _point_2.y));
	 */
	MathUtil.getDistanceBetweenTwoPoints = function(point1_x, point1_y, point2_x, point2_y) {
		var distance = Math.sqrt( Math.pow( point1_x - point2_x, 2 ) + Math.pow( point1_y - point2_y, 2 ) );
		return distance;
	};
	
	/**
	 * 두 point 사이의 거리를 백분율로 환산하여, 특정 percent에 해당하는 위치를 point로 반환 
	 *
	 * @static
	 * @method getPercentagePointBetweenTwoPoints
	 * @param {Object} point1_x Object include x, y
	 * @param {Object} point1_y Object include x, y
	 * @param {Object} point2_x Object include x, y
	 * @param {Object} point2_y Object include x, y
	 * @param {Number} percentage 0.0 ~ 1.0
	 * @return {Number} Returns number 
	 * @example
	var _point_1 = {x:0, y:0};
	var _point_2 = {x:100, y:100};
	console.log(MathUtil.getDistanceBetweenTwoPoints(_point_1.x, _point_1.y, _point_2.x, _point_2.y)); //두 point 사이의 80 percent의 위치인 x=80, y=20 Point 반환
	 */
	MathUtil.getPercentagePointBetweenTwoPoints = function(point1_x, point1_y, point2_x, point2_y, percentage) {
		var diffX = point2_x - point1_x;
		var diffY = point2_y - point1_y;
		return {x:diffX * percentage + point1_x, y:diffY * percentage + point1_y};
	};
	
	/**
	 * 특정 각도를 Flash System의 각도 단위인 -179 ~ 180 으로 변화하여 반환 
	 *
	 * @static
	 * @method getAngleBasedOnSystem
	 * @param {Object} _degree 
	 * @return {Number} Returns number 
	 * @example
	console.log(MathUtil.getAngleBasedOnSystem(710)); //-10 반환 (710도는 -10도로 변환)
	 */
	MathUtil.getAngleBasedOnSystem = function(_degree) {
		var degree = _degree % 360; 
		if(180 < degree) return degree - 360;
		return degree;
	};
	
	/**
	 * _standardPoint를 기준점으로, _targetPoint를 _degree만큼 회전시켰을 때의 point 위치를 반환 
	 *
	 * @static
	 * @method getAngleBasedOnSystem
	 * @param {Object} _standardPoint Object include x, y
	 * @param {Object} _targetPoint Object include x, y
	 * @param {Object} _degree 
	 * @return {Object} Returns Object include x, y 
	 * @example
	var _axisPoint = {x:100, y:100};
	var _targetRotatePoint = {x:200, y:100};
	console.log(MathUtil.getRotatedPointAroundStandardPoint(_axisPoint, _targetRotatePoint, 90));  
	//_standardPoint(100, 100)을 기준점으로 _targetPoint(200, 100)를 90도 회전시킨 point(100, 200) 반환
	 */
	MathUtil.getRotatedPointAroundStandardPoint = function(_standardPoint, _targetPoint, _degree) {
		var tempPosX = _targetPoint.x;
		var _x = _standardPoint.x + (_targetPoint.x - _standardPoint.x) * Math.cos(MathUtil.degreeToRadian(_degree)) - (_targetPoint.y - _standardPoint.y) * Math.sin(MathUtil.degreeToRadian(_degree));
		var _y = _standardPoint.y + (tempPosX - _standardPoint.x) * Math.sin(MathUtil.degreeToRadian(_degree)) + (_targetPoint.y - _standardPoint.y) * Math.cos(MathUtil.degreeToRadian(_degree));
		return {x:_x, y:_y};
	};
	
	/**
	 * 특정 point({x: _standardPointX, y:_standardPointY} 형태의 Object)를 기준점으로, _radius value를 반지름으로 가지는 원 내부의 random한 Point를 반환 
	 *
	 * @static
	 * @method getRandomSurroundPoint
	 * @param {Number} _standardPointX number
	 * @param {Number} _standardPointY number
	 * @param {Object} _radius number
	 * @return {Object} Returns Object include x, y 
	 * @example
	var _axisPoint = {x:100, y:100};
	console.log(MathUtil.getRandomSurroundPoint(_axisPoint.x, _axisPoint.y, 100)); //_axisPoint를 기준으로 100의 반지름을 가지는 원 내부의 random한 위치의 Point 반환
	 */
	MathUtil.getRandomSurroundPoint = function(_standardPointX, _standardPointY, _radius) {
		var radian = Math.random() * Math.PI * 2;
		var distance = Math.random() * _radius;
		var _x = _standardPointX + distance * Math.cos(radian);
		var _y = _standardPointY + distance * Math.sin(radian);
		return {x:_x, y:_y};
	};
	
	/**
	 * 최소값 int 이상, 최대값 int 이하의 random int value 반환 
	 *
	 * @static
	 * @method getRandomSurroundPoint
	 * @param {Number} _minValueInt number int type
	 * @param {Number} _maxValueInt number int type
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.getRandomIntMinToMax(10, 15));
	 */
	MathUtil.getRandomIntMinToMax = function(_minValueInt, _maxValueInt) {
		return _minValueInt + Math.floor( Math.random() * (_maxValueInt - _minValueInt + 1));
	};
	
	/**
	 * 최소 Float 이상, 최대 Float 미만의 random Float value 반환 
	 *
	 * @static
	 * @method getRandomFloatMinToMax
	 * @param {Number} _minValueFloat number float type
	 * @param {Number} _maxValueFloat number float type
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.getRandomFloatMinToMax(10.5, 20.9));
	 */
	MathUtil.getRandomFloatMinToMax = function(_minValueFloat, _maxValueFloat) {
		return _minValueFloat + Math.random() * (_maxValueFloat - _minValueFloat);
	};
	
	/**
	 * parameter float value의 양수 판별 여부 반환. (0은 양수로 간주합니다.) 
	 *
	 * @static
	 * @method getFlagPositiveNumber
	 * @param {Number} _valueFloat number float type
	 * @return {Boolean} Returns true or false 
	 * @example
	console.log(MathUtil.getFlagPositiveNumber(15)); //return true
	 */
	MathUtil.getFlagPositiveNumber = function(_valueFloat) {
		if(_valueFloat >= 0) return true;
		return false;
	};
	
	/**
	 * 1 또는 -1 int value을 random하게 반환 
	 *
	 * @static
	 * @method getRandomPositiveNegative
	 * @return {Number} Returns 1 or -1 
	 * @example
	console.log(MathUtil.getRandomPositiveNegative()); //return 1 or -1
	 */
	MathUtil.getRandomPositiveNegative = function() {
		var distinguishInt = Math.round(Math.random());
		if(distinguishInt > 0) return 1;
		return -1;
	};
	
	/**
	 * parameter로 전달되는 모든 float value들의 합을 반환 
	 *
	 * @static
	 * @method sum
	 * @param {Arguments} _valueFloatArgs float arguments 
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.sum(10, 20, 30, 40)); //10, 20, 30, 40의 합인 100 반환
	 */
	MathUtil.sum = function(_valueFloatArgs) {
		var _sum = 0;
		for( var i=0, max=arguments.length; i<max; i++){
			_sum += arguments[i];
		}
		return _sum;
	};
	
	/**
	 * parameter로 전달되는 모든 float value들의 평균을 반환 
	 *
	 * @static
	 * @method average
	 * @param {Arguments} _valueFloatArgs float arguments 
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.average(10, 20, 30, 40)); //10, 20, 30, 40의 평균인 25 반환
	 */
	MathUtil.average = function(_valueFloatArgs) {
		var _sum = 0;
		for( var i=0, max=arguments.length; i<max; i++){
			_sum += arguments[i];
		}
		return _sum / arguments.length;
	};
	
	/**
	 * Math.Ceil(float value) 이하의 random Int 반환 (paramter float value가 0 이하일 경우는 float value 초과, 0 이하의 random Int 반환) 
	 *
	 * @static
	 * @method randomCeilInt
	 * @param {Number} _valueFloat number 
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.randomCeilInt(10));
	 */
	MathUtil.randomCeilInt = function( _valueFloat ) {
		var _valueInt = Math.ceil( Math.random() * _valueFloat ); 
		return _valueInt;
	};
	
	/**
	 * float value를  Ceil 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환 
	 *
	 * @static
	 * @method ceilUnit
	 * @param {Number} _valueFloat number 
	 * @param {Number} _unitInTheTens number
	 * @return {Number} Returns Number 
	 * @example
	var testNumber = 12345.12345;
	console.log(MathUtil.ceilUnit(testNumber, 0.1)); //소수점 첫째 자리에서 ceil 연산. 12345.2
	console.log(MathUtil.ceilUnit(testNumber, 100)); //100 단위에서 ceil 연산. 12400
	 */
	MathUtil.ceilUnit = function(_valueFloat, _unitInTheTens) {
		return Math.ceil(_valueFloat / _unitInTheTens) * _unitInTheTens;
	};
	
	/**
	 * float value를  round 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환 
	 *
	 * @static
	 * @method roundUnit
	 * @param {Number} _valueFloat number 
	 * @param {Number} _unitInTheTens number
	 * @return {Number} Returns Number 
	 * @example
	var testNumber = 12345.12345;
	console.log(MathUtil.roundUnit(testNumber, 0.1)); //소수점 첫째 자리에서 round 연산. 12345.1
	console.log(MathUtil.roundUnit(testNumber, 100)); //100 단위에서 round 연산. 12300
	 */
	MathUtil.roundUnit = function(_valueFloat, _unitInTheTens) {
		return Math.round(_valueFloat / _unitInTheTens) * _unitInTheTens;
	};
	
	/**
	 * float value를  floor 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환 
	 *
	 * @static
	 * @method floorUnit
	 * @param {Number} _valueFloat number 
	 * @param {Number} _unitInTheTens number
	 * @return {Number} Returns Number 
	 * @example
	var testNumber = 12345.12345;
	console.log(MathUtil.floorUnit(testNumber, 0.1)); //소수점 첫째 자리에서 round 연산. 12345.1
	console.log(MathUtil.floorUnit(testNumber, 100)); //100 단위에서 round 연산. 12300
	 */
	MathUtil.floorUnit = function(_valueFloat, _unitInTheTens) {
		return Math.floor(_valueFloat / _unitInTheTens) * _unitInTheTens;
	};
	
	/**
	 * 지정된 최소 ~ 최대값 사이의 특정 value를, 다른 최소 ~ 최대값 영역 사이의 value로 치환하여 출력. 
	 *
	 * @static
	 * @method getRemapValue
	 * @param {Number} _targetValueFloat number 
	 * @param {Number} _minValueFloat number
	 * @param {Number} _maxValueFloat number
	 * @param {Number} _remapMinValueFloat number
	 * @param {Number} _remapMaxValueFloat number
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.getRemapValue(80, 0, 100, 1000, 1500)); //0 ~ 100 사이의 80은, 1000 ~ 1500 사이의 1400 으로 치환.
	 */
	MathUtil.getRemapValue = function(_targetValueFloat, _minValueFloat, _maxValueFloat, _remapMinValueFloat, _remapMaxValueFloat) {
		return (_targetValueFloat - _minValueFloat) * (_remapMaxValueFloat - _remapMinValueFloat) / (_maxValueFloat - _minValueFloat) + _remapMinValueFloat;
	};
	
	/**
	 * int value를 나눌 수 있는 100 미만의 최소 소수 반환(100 미만의 소수로 나눌 수 없을 경우, -1 반환) 
	 *
	 * @static
	 * @method getDivisibleMinPrimeNumberUnderOneHundred
	 * @param {Number} _uintValue number 0 or more
	 * @return {Number} Returns Number 
	 * @example
	console.log(MathUtil.getDivisibleMinPrimeNumberUnderOneHundred(153)); //153을 나눌 수 있는 최소 소수 3 출력
	console.log(MathUtil.getDivisibleMinPrimeNumberUnderOneHundred(211)); //211을 나눌 수 있는 100 미만의 소수가 존재하지 않으므로, -1 출력
	 */
	MathUtil.getDivisibleMinPrimeNumberUnderOneHundred = function(_uintValue) {
		if(_uintValue < 0) return -1;
		var returnValue = -1;
		for(var i=2; i<100; ++i) {
			if(_uintValue % i == 0) {
				returnValue = i;
				break;
			}
		}
		return returnValue;
	};
	
	/**
	 * int value의 짝수 여부 반환(0은 짝수로 간주) 
	 *
	 * @static
	 * @method getFlagEvenInt
	 * @param {Number} _valueInt number
	 * @return {Boolean} Returns true or false 
	 * @example
	console.log(MathUtil.getFlagEvenInt(-2)); // 짝수. true 반환
	console.log(MathUtil.getFlagEvenInt(135)); // 홀수. false 반환
	 */
	MathUtil.getFlagEvenInt = function(_valueInt) {
		if(_valueInt%2 == 0) return true;
		return false;
	};
	
	return MathUtil;
});
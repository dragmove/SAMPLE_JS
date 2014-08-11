var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.util) dragmove.util = {};
if(!dragmove.util.InteractionUtil) dragmove.util.InteractionUtil = {};
if(!dragmove.util.NodeUtil) dragmove.util.NodeUtil = {};
if(!dragmove.util.BrowserUtil) dragmove.util.BrowserUtil = {};
if(!dragmove.util.CheckUtil) dragmove.util.CheckUtil = {};
if(!dragmove.util.DataUtil) dragmove.util.DataUtil = {};
if(!dragmove.util.JQueryUtil) dragmove.util.JQueryUtil = {};
if(!dragmove.util.ArrayUtil) dragmove.util.ArrayUtil = {};
if(!dragmove.util.MathUtil) dragmove.util.MathUtil = {};
if(!dragmove.util.DisplayUtil) dragmove.util.DisplayUtil = {};
if(!dragmove.util.StringUtil) dragmove.util.StringUtil = {};
if(!dragmove.util.SystemUtil) dragmove.util.SystemUtil = {};
if(!dragmove.util.ControlUtil) dragmove.util.ControlUtil = {};
if(!dragmove.util.WebkitUtil) dragmove.util.WebkitUtil = {};

var InteractionUtilDM;
var NodeUtilDM;
var BrowserUtilDM;
var CheckUtilDM;
var DataUtilDM;
var JQueryUtilDM;
var ArrayUtilDM;
var MathUtilDM;
var DisplayUtilDM;
var StringUtilDM;
var SystemUtilDM;
var ControlUtilDM;
var WebkitUtilDM;

if(!InteractionUtilDM) {
	InteractionUtilDM = dragmove.util.InteractionUtil;
}else{
	throw new Error("InteractionUtil already exists");
}
if(!NodeUtilDM) {
	NodeUtilDM = dragmove.util.NodeUtil;
}else{
	throw new Error("NodeUtilDM already exists");
}
if(!BrowserUtilDM) {
	BrowserUtilDM = dragmove.util.BrowserUtil;
}else{
	throw new Error("BrowserUtilDM already exists");
}
if(!CheckUtilDM) {
	CheckUtilDM = dragmove.util.CheckUtil;
}else{
	throw new Error("CheckUtilDM already exists");
}
if(!DataUtilDM) {
	DataUtilDM = dragmove.util.DataUtil;
}else{
	throw new Error("DataUtilDM already exists");
}
if(!JQueryUtilDM) {
	JQueryUtilDM = dragmove.util.JQueryUtil;
}else{
	throw new Error("JQueryUtilDM already exists");
}
if(!ArrayUtilDM) {
	ArrayUtilDM = dragmove.util.ArrayUtil;
}else{
	throw new Error("ArrayUtilDM already exists");
}
if(!MathUtilDM) {
	MathUtilDM = dragmove.util.MathUtil;
}else{
	throw new Error("MathUtilDM already exists");
}
if(!DisplayUtilDM) {
	DisplayUtilDM = dragmove.util.DisplayUtil;
}else{
	throw new Error("DisplayUtilDM already exists");
}
if(!StringUtilDM) {
	StringUtilDM = dragmove.util.StringUtil;
}else{
	throw new Error("StringUtilDM already exists");
}
if(!SystemUtilDM) {
	SystemUtilDM = dragmove.util.SystemUtil;
}else{
	throw new Error("SystemUtilDM already exists");
}
if(!ControlUtilDM) {
	ControlUtilDM = dragmove.util.ControlUtil;
}else{
	throw new Error("ControlUtilDM already exists");
}
if(!WebkitUtilDM) {
	WebkitUtilDM = dragmove.util.WebkitUtil;
}else{
	throw new Error("WebkitUtilDM already exists");
}

/*
dragmove.util.WebkitUtil.transition(_target, {left:100, top:40}, 0.1, 0, "cubic-bezier(0.59, 0.1, 0.15, 0.59)"); 
-webkit-Animiation을 이용해서, 다시 만들어야 한다.

_propertyObject : 
delay
left, top, 

-webkit-transform property : 
rotate, scaleX, scaleY, skewX, skewY
(exclude translate property)
*/
/*
dragmove.util.WebkitUtil.transition = function(_targetElement, _propertyObject, _duration, _timingFunctionStr) {
	//const
	var WEBKIT_TRANSFORM_STR = "-webkit-transform"; //rotate, scaleX, scaleY, skewX, skewY
	
	//variables
	var flag_useWebkitTransition = false;
	var delayTime = 0;
	
	//implement
	var transitionStr = "";
	if(_propertyObject.delay) delayTime = _propertyObject.delay; //define delay
	
	//transform
	var transformStr = "";
	var _transformObj;
	if(_propertyObject.rotate || _propertyObject.scale || _propertyObject.scaleX || _propertyObject.scaleY || _propertyObject.skewX || _propertyObject.skewY) flag_useWebkitTransition = true;
	if(flag_useWebkitTransition) {
		//define transform
		//_transformObj = {};
		//if(_propertyObject.rotate) _transformObj.rotate = _propertyObject.rotate;
		//if(_propertyObject.scaleX) _transformObj.scaleX = _propertyObject.scaleX;
		//if(_propertyObject.scaleY) _transformObj.scaleY = _propertyObject.scaleY;
		//if(_propertyObject.skewX) _transformObj.skewX = _propertyObject.skewX;
		//if(_propertyObject.skewY) _transformObj.skewY = _propertyObject.skewY;
		
		transitionStr += WEBKIT_TRANSFORM_STR + " ";
		transitionStr += _duration + "s ";
		transitionStr += delayTime + "s ";
		transitionStr += _timingFunctionStr.toString();
		transitionStr += ",";
		//_targetElement.style["-webkit-transition"] = transitionStr;

		if(_propertyObject.rotate) transformStr += "rotate(" + _propertyObject.rotate + "deg)"
		if(_propertyObject.scale) transformStr += " scale(" + _propertyObject.scale + ")"
		if(_propertyObject.scaleX) transformStr += " scaleX(" + _propertyObject.scaleX + ")"
		if(_propertyObject.scaleY) transformStr += " scaleY(" + _propertyObject.scaleY + ")"
		if(_propertyObject.skewX) transformStr += " skewX(" + _propertyObject.skewX + "deg)"
		if(_propertyObject.skewY) transformStr += " skewY(" + _propertyObject.skewY + "deg)"
		console.log("transformStr : " + transformStr);
		_targetElement.style["-webkit-transform"] = transformStr;
	}

	//transition
	var propertyNameArr = [];
	var valueArr = [];
	var propertyNameStr;
	for(var i in _propertyObject) {
		propertyNameStr = i.toString();
		switch(propertyNameStr) {
			case "delay" :
			case "rotate" :
			case "scale" :
			case "scaleX" :
			case "scaleY" :
			case "skewX" :
			case "skewY" :
				continue;
			break;

			default :
				transitionStr += propertyNameStr + " ";
			break;
		}
		transitionStr += _duration + "s ";
		transitionStr += delayTime + "s ";
		transitionStr += _timingFunctionStr.toString();
		transitionStr += ",";

		propertyNameArr.push(propertyNameStr);
		valueArr.push(_propertyObject[propertyNameStr]);
	}
	if(transitionStr != "") transitionStr = transitionStr.substr(0, transitionStr.lastIndexOf(",")); //delete last ,
	_targetElement.style["-webkit-transition"] = transitionStr;
	console.log("transitionStr : " + transitionStr);
	
	//pure transition setting
	for(var i=0, max=propertyNameStr.length; i<max; i++) {
		
		//top, right, bottom, left, width, height
		_targetElement.style[propertyNameArr[i]] = valueArr[i] + "px"; //left, top

		//background-color, background-positionX, background-positionY, border
	}


	//private function
	function getPropertyTypeToPixel(){
		return ["width" , "height" , "left" , "top" , "right" , "bottom" 
	            , "marginTop" , "marginBottom" , "marginLeft" , "marginRight" , "paddingTop" , "paddingBottom" , "paddingLeft" , "paddingRight"
	            , "borderTopWidth" ,"borderBottomWidth" ,"borderLeftWidth" , "borderRightWidth" 
	            , "fontWeight" , "fontSize"
	            , "backgroundPositionX" , "backgroundPositionY"];
	};
	function getPropertyTypeToColor(){
		return ["color" , "backgroundColor" , "borderTopColor" , "borderBottomColor" , "borderLeftColor" , "boderRightColor"];
	};
};
*/







/*
simple timer

//EXAMPLE 0. perform function
function timerTestFunc() {
	console.log('private timerTestFunc');
}
var _function = timerTestFunc; //단일 function
var _simpleTimer = new dragmove.util.ControlUtil.SimpleTimer( 1000, this, _function );
_simpleTimer.start();
//_simpleTimer.stop();

//EXAMPLE 1. perform Object function include arguments
var _functionObj = {};
_functionObj.timerTestFuncIncludeArgument = function(_param_1, _param_2, _param_3) {
	console.log('function Object function included Object : ', _param_1, _param_2, _param_3);
};
var _function = _functionObj.timerTestFuncIncludeArgument; //객체에 귀속된 function
var _simpleTimer = new dragmove.util.ControlUtil.SimpleTimer( 1000, this, _function, [0, "dragmove", {x:100, y:200}] );
_simpleTimer.start();
//_simpleTimer.stop();

//EXAMPLE 2. perform function include arguments
function timerTestFuncIncludeArgument(_param_1, _param_2, _param_3) {
	console.log('private function : ', _param_1, _param_2, _param_3);
}
var _function = timerTestFuncIncludeArgument; //단일 function
var _simpleTimer = new dragmove.util.ControlUtil.SimpleTimer( 1000, this, _function, [0, "dragmove", {x:100, y:200}] );
_simpleTimer.start();
//_simpleTimer.stop();
*/

dragmove.util.ControlUtil.SimpleTimer = function(_gapTime, _callbackScope, _callbackFunc, _callbackFuncArgumentsArr) {
	var _this = this;

	//variables
	var gapTime = _gapTime;
	var callbackScope = _callbackScope;
	var callbackFunc = _callbackFunc;
	var callbackFuncArgumentsArr = _callbackFuncArgumentsArr;
	var _timer; //setTimeout
	var flag_protectRepeatTimeout = false;

	//public function
	_this.destroy = function() {
		destroyInternalTimer();
		gapTime = null;
		callbackScope = null;
		callbackFunc = null;
		callbackFuncArgumentsArr = null;
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
		}else{
			_callbackFunc.apply(callbackScope, callbackFuncArgumentsArr);
		}
		repeatTimeout();
	}
	function repeatTimeout() {
		if(!flag_protectRepeatTimeout) return;
		destroyInternalTimer();
		 _timer = setTimeout(performTimeout, gapTime);
	}
	function destroyInternalTimer() {
		if(_timer) {
			clearTimeout(_timer);
			_timer = null;
		}
	}
};

/*
전달받은 mouseEvent가 발생한 위치를 캡쳐하여, _functionGetReturnedMouseEventXYPosition Function에 x,y parameter 전달.
Javascript Cookbook 161p 참고.

document.onclick = function(mouseEvent) {
	dragmove.util.InteractionUtil.getMouseEventPosition(mouseEvent, getMouseEventPositionXY);
}
function getMouseEventPositionXY(x, y) {
	alert("x : " + x + ", y : " + y);
}
*/
dragmove.util.InteractionUtil.getMouseEventPosition = function(_mouseEvent, _functionGetReturnedMouseEventXYPosition) {
	_mouseEvent = _mouseEvent || window.event;
	var x = 0; var y = 0;
	if(_mouseEvent.pageX) { //FireFox, Chrome, Safari
		x = _mouseEvent.pageX;
		y = _mouseEvent.pageY;
	} else if (_mouseEvent.clientX) { //IE 7, 8, 9
		var offsetX = 0; var offsetY = 0;
		if (document.documentElement.scrollLeft) {
			offsetX = document.documentElement.scrollLeft;
			offsetY = document.documentElement.scrollTop;
		}else if(document.body) {
			offsetX = document.body.scrollLeft;
			offsetY = document.body.scrollTop;
		}
		x = _mouseEvent.clientX + offsetX;
		y = _mouseEvent.clientY + offsetY;
	}
	//call parameter function
	_functionGetReturnedMouseEventXYPosition(x, y);
};

/*
button 역할을 할 객체에 mouseover, mouseout, click의 3가지 기본 mouseEvent를 처리할 mouseEventHandler 간편 등록.
InteractionUtilDM
testButtonInteraction();

function testButtonInteraction() {
	dragmove.util.InteractionUtil.makeSimpleButtonInteraction(document.getElementById("buttonElement"), buttonMouseInteraction);
}
function buttonMouseInteraction(evt) {
	switch(evt.type) {
		case "mouseover" :
			//mouseover interaction
		break;

		case "mouseout" :
			//mouseout interaction
		break;

		case "click" :
			//click interaction
			evt = evt || window.event;
			//dragmove.event.EventUtil.cancelPropagation(evt);
			//dragmove.event.EventUtil.removeEventListener(document.getElementById("buttonElement"), buttonMouseInteraction);
		break;
	}
}
*/
dragmove.util.InteractionUtil.makeSimpleButtonInteraction = function(_targetButtonObj, _mouseEventHandler) {
	if(!dragmove.event) return false;
	if(!dragmove.event.EventUtil) return false;
	
	dragmove.event.EventUtil.addEventListener(_targetButtonObj, "mouseover", _mouseEventHandler);
	dragmove.event.EventUtil.addEventListener(_targetButtonObj, "mouseout", _mouseEventHandler);
	dragmove.event.EventUtil.addEventListener(_targetButtonObj, "click", _mouseEventHandler);
	return true;
};

/*
button 역할을 할 객체에 mouseover, mouseout, click의 3가지 기본 mouseEvent를 처리할 mouseEventHandler 간편 해제.
*/
dragmove.util.InteractionUtil.removeSimpleButtonInteraction = function(_targetButtonObj, _mouseEventHandler) {
	if(!dragmove.event) return false;
	if(!dragmove.event.EventUtil) return false;
	
	dragmove.event.EventUtil.removeEventListener(_targetButtonObj, "mouseover", _mouseEventHandler);
	dragmove.event.EventUtil.removeEventListener(_targetButtonObj, "mouseout", _mouseEventHandler);
	dragmove.event.EventUtil.removeEventListener(_targetButtonObj, "click", _mouseEventHandler);
	return true;
};

/*
document mouse drag select 방지
*/
dragmove.util.InteractionUtil.preventDocumentMouseDragSelect = function(_flag) {
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


/*
밑변의 길이와 밑변의 예각을 이용하여, 직각 삼각형의 높이 반환
var BASELINE_WIDTH = 100; //직각 삼각형의 밑변의 길이
var ANGLE = 30; //직각 삼각형의 빗변과 접하는 밑변의 예각
var triangleHeight = dragmove.util.MathUtil.getHeightFromTriangleBaseLineAngle(BASELINE_WIDTH, ANGLE); 
console.log(triangleHeight);
*/
dragmove.util.MathUtil.getHeightFromTriangleBaseLineAngle = function(_baseLineWidth, _degreeAngle) {
	var degreeToRadian = _degreeAngle * Math.PI / 180;
	return _baseLineWidth * Math.tan(degreeToRadian);
};

/*
linePoint_1 과 linePoint_2를 지나는 직선 상의, somePoint가 직교하는 Point Object를 반환.
var _linePoint_1 = {x:0, y:0};
var _linePoint_2 = {x:100, y:100};
var _somePoint = {x:50, y:100};
var _crossPoint = dragmove.util.MathUtil.getCrossPointBetweenTwoPointsLineAndSomePoint(_somePoint, _linePoint_1, _linePoint_2);
console.log(_crossPoint); // (0,0)좌표와 (100,100)좌표를 지나는 직선 상에서, (50,100)의 Point가 직교하는 위치인 (75, 75)의 위치를 반환합니다.
*/
dragmove.util.MathUtil.getCrossPointBetweenTwoPointsLineAndSomePoint = function(_somePoint, _linePoint_1, _linePoint_2) {
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

/*
radian value 를 호도각 value로 변환
var _pi = Math.PI;
console.log(dragmove.util.MathUtil.radianToDegree(_pi)); //PI의 호도각 value인 180 출력
*/
dragmove.util.MathUtil.radianToDegree = function(radian) {
	return radian * 180 / Math.PI;
};

/*
호도각 value를 radian value로 변환 출력
var _rotationValue = 180;
console.log(dragmove.util.MathUtil.degreeToRadian(_rotationValue)); //호도각 180도의 radian value인 3.141592653589793 출력
*/
dragmove.util.MathUtil.degreeToRadian = function(degree) {
	return degree * Math.PI / 180;
};

/*
두 point 사이의 거리 반환
var _point_1 = {x:0, y:0};
var _point_2 = {x:100, y:100};
console.log(dragmove.util.MathUtil.getDistanceBetweenTwoPoints(_point_1.x, _point_1.y, _point_2.x, _point_2.y));
*/
dragmove.util.MathUtil.getDistanceBetweenTwoPoints = function(point1_x, point1_y, point2_x, point2_y) {
	var distance = Math.sqrt( Math.pow( point1_x - point2_x, 2 ) + Math.pow( point1_y - point2_y, 2 ) );
	return distance;
};

/*
//두 point 사이의 80 percent의 위치인 x=80, y=20 Point 반환
var _point_1 = {x:0, y:20};
var _point_2 = {x:100, y:20};
console.log(dragmove.util.MathUtil.getPercentagePointBetweenTwoPoints(_point_1.x, _point_1.y, _point_2.x, _point_2.y, 0.8));
*/
dragmove.util.MathUtil.getPercentagePointBetweenTwoPoints = function(point1_x, point1_y, point2_x, point2_y, _percentage) {
	var diffX = point2_x - point1_x;
	var diffY = point2_y - point1_y;
	return {x:diffX * _percentage + point1_x, y:diffY *_percentage + point1_y};
};

/*
특정 각도를 Flash System의 각도 단위인 -179 ~ 180 으로 변화하여 반환
console.log(dragmove.util.MathUtil.getAngleBasedOnSystem(710)); //-10 반환 (710도는 -10도로 변환)
*/
dragmove.util.MathUtil.getAngleBasedOnSystem = function(_degree) {
	var degree = _degree % 360; 
	if(180 < degree) return degree - 360;
	return degree;
};

/*
_standardPoint를 기준점으로, _targetPoint를 _degree만큼 회전시켰을 때의 point 위치를 반환
var _axisPoint = {x:100, y:100};
var _targetRotatePoint = {x:200, y:100};
console.log(dragmove.util.MathUtil.getRotatedPointAroundStandardPoint(_axisPoint, _targetRotatePoint, 90));  
//_standardPoint(100, 100)을 기준점으로 _targetPoint(200, 100)를 90도 회전시킨 point(100, 200) 반환
*/
dragmove.util.MathUtil.getRotatedPointAroundStandardPoint = function(_standardPoint, _targetPoint, _degree) {
	var tempPosX = _targetPoint.x;
	var _x = _standardPoint.x + (_targetPoint.x - _standardPoint.x) * Math.cos(dragmove.util.MathUtil.degreeToRadian(_degree)) - (_targetPoint.y - _standardPoint.y) * Math.sin(dragmove.util.MathUtil.degreeToRadian(_degree));
	var _y = _standardPoint.y + (tempPosX - _standardPoint.x) * Math.sin(dragmove.util.MathUtil.degreeToRadian(_degree)) + (_targetPoint.y - _standardPoint.y) * Math.cos(dragmove.util.MathUtil.degreeToRadian(_degree));
	return {x:_x, y:_y};
};

/*
특정 point({x: _standardPointX, y:_standardPointY} 형태의 Object)를 기준점으로, _radius value를 반지름으로 가지는 원 내부의 random한 Point를 반환
var _axisPoint = {x:100, y:100};
console.log(dragmove.util.MathUtil.getRandomSurroundPoint(_axisPoint.x, _axisPoint.y, 100)); //_axisPoint를 기준으로 100의 반지름을 가지는 원 내부의 random한 위치의 Point 반환
*/
dragmove.util.MathUtil.getRandomSurroundPoint = function(_standardPointX, _standardPointY, _radius) {
	var radian = Math.random() * Math.PI * 2;
	var distance = Math.random() * _radius;
	var _x = _standardPointX + distance * Math.cos(radian);
	var _y = _standardPointY + distance * Math.sin(radian);
	return {x:_x, y:_y};
};

/*
최소값 int 이상, 최대값 int 이하의 random int value 반환
console.log(dragmove.util.MathUtil.getRandomIntMinToMax(10, 15));
*/
dragmove.util.MathUtil.getRandomIntMinToMax = function(_minValueInt, _maxValueInt) {
	return _minValueInt + Math.floor( Math.random() * (_maxValueInt - _minValueInt + 1));
};

/*
최소 Float 이상, 최대 Float 미만의 random Float value 반환
console.log(dragmove.util.MathUtil.getRandomFloatMinToMax(10.5, 20.9));
*/
dragmove.util.MathUtil.getRandomFloatMinToMax = function(_minValueFloat, _maxValueFloat) {
	return _minValueFloat + Math.random() * (_maxValueFloat - _minValueFloat);
};

/*
parameter float value의 양수 판별 여부 반환. (0은 양수로 간주합니다.)
console.log(dragmove.util.MathUtil.getFlagPositiveNumber(15)); //return true
*/
dragmove.util.MathUtil.getFlagPositiveNumber = function(_valueFloat) {
	if(_valueFloat >= 0) return true;
	return false;
};

/*
1 또는 -1 int value을 random하게 반환
console.log(dragmove.util.MathUtil.getRandomPositiveNegative()); //return 1 or -1
*/
dragmove.util.MathUtil.getRandomPositiveNegative = function() {
	var distinguishInt = Math.round(Math.random());
	if(distinguishInt > 0) return 1;
	return -1;
};

/*
parameter로 전달되는 모든 float value들의 합을 반환
console.log(dragmove.util.MathUtil.sum(10, 20, 30, 40)); //10, 20, 30, 40의 합인 100 반환
*/
dragmove.util.MathUtil.sum = function(_valueFloatArgs) {
	var _sum = 0;
	for( var i=0, max=arguments.length; i<max; i++){
		_sum += arguments[i];
	}
	return _sum;
};

/*
parameter로 전달되는 모든 float value들의 평균을 반환
console.log(dragmove.util.MathUtil.average(10, 20, 30, 40)); //10, 20, 30, 40의 평균인 25 반환
*/
dragmove.util.MathUtil.average = function(_valueFloatArgs) {
	var _sum = 0;
	for( var i=0, max=arguments.length; i<max; i++){
		_sum += arguments[i];
	}
	return _sum / arguments.length;
};

/*
Math.Ceil(float value) 이하의 random Int 반환 (paramter float value가 0 이하일 경우는 float value 초과, 0 이하의 random Int 반환)
console.log(dragmove.util.MathUtil.randomCeilInt(10));
*/
dragmove.util.MathUtil.randomCeilInt = function( _valueFloat ) {
	var _valueInt = Math.ceil( Math.random() * _valueFloat ); 
	return _valueInt;
};

/*
float value를  Ceil 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환
var testNumber = 12345.12345;
console.log(dragmove.util.MathUtil.ceilUnit(testNumber, 0.1)); //소수점 첫째 자리에서 ceil 연산. 12345.2
console.log(dragmove.util.MathUtil.ceilUnit(testNumber, 100)); //100 단위에서 ceil 연산. 12400
*/
dragmove.util.MathUtil.ceilUnit = function(_valueFloat, _unitInTheTens) {
	return Math.ceil(_valueFloat / _unitInTheTens) * _unitInTheTens;
};

/*
float value를  round 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환
var testNumber = 12345.12345;
console.log(dragmove.util.MathUtil.roundUnit(testNumber, 0.1)); //소수점 첫째 자리에서 round 연산. 12345.1
console.log(dragmove.util.MathUtil.roundUnit(testNumber, 100)); //100 단위에서 round 연산. 12300
*/

dragmove.util.MathUtil.roundUnit = function(_valueFloat, _unitInTheTens) {
	return Math.round(_valueFloat / _unitInTheTens) * _unitInTheTens;
};

/*
float value를  floor 연산을 적용, 특정 10 단위 or 특정 소수점 단위로 변환하여 반환
var testNumber = 12345.12345;
console.log(dragmove.util.MathUtil.floorUnit(testNumber, 0.1)); //소수점 첫째 자리에서 round 연산. 12345.1
console.log(dragmove.util.MathUtil.floorUnit(testNumber, 100)); //100 단위에서 round 연산. 12300
*/

dragmove.util.MathUtil.floorUnit = function(_valueFloat, _unitInTheTens) {
	return Math.floor(_valueFloat / _unitInTheTens) * _unitInTheTens;
};

/*
지정된 최소 ~ 최대값 사이의 특정 value를, 다른 최소 ~ 최대값 영역 사이의 value로 치환하여 출력.
console.log(dragmove.util.MathUtil.getRemapValue(80, 0, 100, 1000, 1500)); //0 ~ 100 사이의 80은, 1000 ~ 1500 사이의 1400 으로 치환.
*/
dragmove.util.MathUtil.getRemapValue = function(_targetValueFloat, _minValueFloat, _maxValueFloat, _remapMinValueFloat, _remapMaxValueFloat) {
	return (_targetValueFloat - _minValueFloat) * (_remapMaxValueFloat - _remapMinValueFloat) / (_maxValueFloat - _minValueFloat) + _remapMinValueFloat;
};

/*
int value를 나눌 수 있는 100 미만의 최소 소수 반환(100 미만의 소수로 나눌 수 없을 경우, -1 반환)
console.log(dragmove.util.MathUtil.getDivisibleMinPrimeNumberUnderOneHundred(153)); //153을 나눌 수 있는 최소 소수 3 출력
console.log(dragmove.util.MathUtil.getDivisibleMinPrimeNumberUnderOneHundred(211)); //211을 나눌 수 있는 100 미만의 소수가 존재하지 않으므로, -1 출력
*/
dragmove.util.MathUtil.getDivisibleMinPrimeNumberUnderOneHundred = function(_uintValue) {
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

/*
int value의 짝수 여부 반환(0은 짝수로 간주)
console.log(dragmove.util.MathUtil.getFlagEvenInt(-2)); // 짝수. true 반환
console.log(dragmove.util.MathUtil.getFlagEvenInt(135)); // 홀수. false 반환
*/
dragmove.util.MathUtil.getFlagEvenInt = function(_valueInt) {
	if(_valueInt%2 == 0) return true;
	return false;
};


/*
DOM 객체의 height value 반환
_target = document.getElementById("container");
console.log(dragmove.util.DisplayUtil.getElementHeight(_target));
*/
dragmove.util.DisplayUtil.getElementHeight = function(_targetElement) {
	var height = 0;
	var _rect = _targetElement.getBoundingClientRect();
	if(_rect.height) { //FireFox, Chrome, Safari, IE9
		height = _rect.height;
	}else{ //IE7, IE8
		height = _rect.bottom - _rect.top;
	}
	return height;
};

/*
width, height, backgroundColor를 설정한 div 객체를 생성하여 반환합니다.

var _rectDiv = dragmove.util.DisplayUtil.drawRectDiv(100, 100, "#ff0000");
_rectDiv.style.left = "30px";
_rectDiv.style.top = "10px";
document.body.appendChild(_rectDiv);
*/
dragmove.util.DisplayUtil.drawRectDiv = function(_width, _height, _colorStr) {
	var _spriteDiv = document.createElement("div");
	_spriteDiv.style.position = "absolute";
	_spriteDiv.style.top = 0;
	_spriteDiv.style.left = 0;
	_spriteDiv.style.width = _width + "px";
	_spriteDiv.style.height = _height + "px";
	_spriteDiv.style.backgroundColor = _colorStr;
	return _spriteDiv;
};

/*
element의 opacity를 0~1 사이에서 설정합니다. (IE, etc Browser 모두 처리)

var _rectDiv = dragmove.util.DisplayUtil.drawRectDiv(100, 100, "#ff0000");
document.body.appendChild(_rectDiv);
dragmove.util.DisplayUtil.setElementOpacity(_rectDiv, 0.5);
*/
dragmove.util.DisplayUtil.setElementOpacity = function(_element, _opacity) {
	if(_opacity > 1) _opacity = 1;
	if(_opacity < 0) _opacity = 0;
	_element.style.opacity = _opacity; //not IE
	_element.style.filter = "alpha(opacity=" + (_opacity*100) + ")"; //IE
};

/*
element의 background-position을 설정합니다.

var _targetElement = document.getElementById("navigation");
dragmove.util.DisplayUtil.setElementBackgroundPosition(_targetElement, 100, 200); //단위 미입력시, px로 처리합니다.
dragmove.util.DisplayUtil.setElementBackgroundPosition(_targetElement, "100px", 200); //px 포함 String 입력 가능.
dragmove.util.DisplayUtil.setElementBackgroundPosition(_targetElement, "50%", 200); //% 포함 String 입력 가능.
dragmove.util.DisplayUtil.setElementBackgroundPosition(_targetElement, null, 200); //null value 지정시, _targetElement의 기존 background-position-x value 사용.
dragmove.util.DisplayUtil.setElementBackgroundPosition(_targetElement, 100, null); //null value 지정시, _targetElement의 기존 background-position-y value 사용.
*/
dragmove.util.DisplayUtil.setElementBackgroundPosition = function(_element, _backgroundPosX, _backgroundPosY) {
	var backgroundPosXParamStr = String(_backgroundPosX);
	var backgroundPosYParamStr = String(_backgroundPosY);
	var bgPosXValueStr;
	var bgPosYValueStr;
	var bgPosXUnitStr;
	var bgPosYUnitStr;
	var backgroundPositionArr = dragmove.util.NodeUtil.getElementStyle(_element, "backgroundPosition", "background-position").split(" ");
	
	if(backgroundPosXParamStr != "null" && backgroundPosXParamStr != "undefined" && backgroundPosXParamStr != "") {
		if(backgroundPosXParamStr.indexOf("px") != -1) {
			bgPosXValueStr = backgroundPosXParamStr.split("px").join("") + "px";
			bgPosXUnitStr ="px";
		}
		if(backgroundPosXParamStr.indexOf("%") != -1) {
			bgPosXValueStr = backgroundPosXParamStr.split("%").join("") + "%";
			bgPosXUnitStr = "%";
		}
		if(!bgPosXUnitStr) bgPosXValueStr = backgroundPosXParamStr + "px";
	}else{
		bgPosXValueStr = backgroundPositionArr[0]; //don't input value
	}
	if(backgroundPosYParamStr != "null" && backgroundPosYParamStr != "undefined" && backgroundPosYParamStr != "") {
		if(backgroundPosYParamStr.indexOf("px") != -1) {
			bgPosYValueStr = backgroundPosYParamStr.split("px").join("") + "px";
			bgPosYUnitStr ="px";
		}
		if(backgroundPosYParamStr.indexOf("%") != -1) {
			bgPosYValueStr = backgroundPosYParamStr.split("%").join("") + "%";
			bgPosYUnitStr = "%";
		}
		if(!bgPosYUnitStr) bgPosYValueStr = backgroundPosYParamStr + "px";
	}else{
		bgPosYValueStr = backgroundPositionArr[1]; //don't input value
	}

	_element.style.backgroundPosition = String(bgPosXValueStr + " " + bgPosYValueStr);
};

/*
특정 Area의 width, height에 맞춰 size 변경된 image의 x, y, width, height 값을 가지는 Object 반환. 
var areaWidth = 140;
var areaHeight = 75;

var sizeObj = vw.utils.getFitRectSize(_imageElement.width, _imageElement.height, areaWidth, areaHeight, false);
_imageElement.width = sizeObj.width;
_imageElement.height = sizeObj.height;
*/
dragmove.util.DisplayUtil.getFitRectSize = function(_originalImageWidth, _originalImageHeight, _fitAreaWidth, _fitAreaHeight, _flag_returnAreaFitSize) {
	var sH;
	var sW;
	var sPer = _fitAreaWidth / _fitAreaHeight;
	var imgPer = _originalImageWidth / _originalImageHeight;
	var imgX = 0;
	var imgY = 0;
	if (_flag_returnAreaFitSize) {
		if (imgPer > sPer) {
			sW = Math.round(_originalImageWidth * (_fitAreaHeight / _originalImageHeight));
			sH = _fitAreaHeight;
			imgX = Math.round((_fitAreaWidth - sW) >> 1);
			imgY = 0;
		} else {
			sW = _fitAreaWidth;
			sH = Math.round(_originalImageHeight * (_fitAreaWidth / _originalImageWidth));			
			imgX = 0;
			imgY = Math.round((_fitAreaHeight - sH) >> 1);
		}
	} else {
		if (imgPer < sPer) {
			sW = Math.round(_originalImageWidth * (_fitAreaHeight / _originalImageHeight));
			sH = _fitAreaHeight;
			imgX = Math.round((_fitAreaWidth - sW) >> 1);
			imgY = 0;
		} else {
			sW = _fitAreaWidth;
			sH = Math.round(_originalImageHeight * (_fitAreaWidth / _originalImageWidth));			
			imgX = 0;
			imgY = Math.round((_fitAreaHeight - sH) >> 1);
		}
	}
	return {x:imgX, y:imgY, width:sW, height:sH};
};

/* 
문장 내에 기본 영문자와 숫자, 기본 심볼 문자만이 존재하는지의 여부를 반환
return true/false

var englishStr = "dragmove!#$%&'\"()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\ ]^_`abcdefghijklmnopqrstuvwxyz{|}~"
console.log(dragmove.util.StringUtil.getFlagEnglishStr(englishStr));

var koreanStr = "김현석 dragmove"
console.log(dragmove.util.StringUtil.getFlagEnglishStr(koreanStr));
*/
dragmove.util.StringUtil.getFlagEnglishStr = function(_string) {
	var flag = true;
	var splitArr = _string.split("");
	var strArr = [];
	var _str;
	var unicode;
	for(var i=0, max=splitArr.length; i<max; ++i) {
		_str = splitArr[i];
		unicode = _str.charCodeAt();
		if(unicode < 32 || unicode > 126) { // !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
			flag = false;
			break;
		} 
	}
	return flag;
};

/* 
문장 내의 각 한글 character를 초,성,성으로 분해하여 담은 Array(character가 한글이 아닐 경우에는 Array에 바로 담습니다)들을 별도의 Array에 순차적으로 담아 2차원 배열(Array) 형태로 반환
return Array

var testStr = "김현석 dragmove";
var returnArr = dragmove.util.StringUtil.breakSetenceStr(testStr);
console.log(returnArr); //[["ㄱ", "기", "김"], ["ㅎ", "혀", "현"], ["ㅅ", "서", "석"], [" "], ["d"], ["r"], ["a"], ["g"], ["m"], ["o"], ["v"], ["e"]]

for (var i=0, max=returnArr.length; i<max; ++i) {
	console.log("returnArr[i] :", returnArr[i]);
}
*/
dragmove.util.StringUtil.breakSetenceStr = function(_string) {
	var splitArr = _string.split("");
	var strArr = [];
	var _str;
	for(var i=0, max=splitArr.length; i<max; ++i) {
		_str = splitArr[i];
		strArr.push(dragmove.util.StringUtil.breakCharacterStr(_str));
	}
	return strArr;
};

/* 
한글 character를 초,중,종성으로 분해하여 Array에 담아 반환(character가 한글이 아닐 경우 Array에 담아 단순 반환)
return Array

link - http://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_Syllables_Area

var testChaStr = "껌";
console.log(dragmove.util.StringUtil.breakCharacterStr(testChaStr)); //ㄲ, 꺼, 껌
*/
dragmove.util.StringUtil.breakCharacterStr = function(_oneCharacterStr) {
	var valueArr = [];
	var unicode = _oneCharacterStr.charCodeAt();
	var initialValue; //Initial Jamo Number
	var MedialValue; //Initial Jamo Number + Medial Jamo Number

	if(unicode >= 44032 && unicode <= 55203) { //hangul (Unicode 44032 ~ 55203) 
		initialValue = Math.floor((unicode - 44032) / 588); //Initial Jamo index
		valueArr.push(String(dragmove.data.LanguageData.INITIAL_JAMO_KOR[initialValue]));
		
		var initialJamoUnicode = initialValue * 588 + 44032; // Initial Jamo + ㅏ(Medial Jamo[0]) + no Final Jamo
		MedialValue = Math.floor( (unicode - initialJamoUnicode) / 28 ) * 28 + initialJamoUnicode;
		
		var medialJamoUnicodeIndex = Math.floor( (unicode - initialJamoUnicode) / 28 );
		
		//ㅘ, ㅙ, ㅚ (9, 10, 11) -> add ㅗ (8)
		if(medialJamoUnicodeIndex >= 9 && medialJamoUnicodeIndex <= 11) valueArr.push(String.fromCharCode(initialJamoUnicode + 8 * 28)); //valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[8]);
		
		//ㅝ, ㅞ, ㅟ (14, 15, 16) -> add ㅜ(13)
		if(medialJamoUnicodeIndex >= 14 && medialJamoUnicodeIndex <= 16) valueArr.push(String.fromCharCode(initialJamoUnicode + 13 * 28));//valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[13]);
		
		//ㅢ (19) -> add ㅡ(18)
		if(medialJamoUnicodeIndex == 19) valueArr.push(String.fromCharCode(initialJamoUnicode + 18 * 28)); //valueArr.push(dragmove.data.LanguageData.MEDIAL_JAMO_KOR[18]);
		
		valueArr.push(String.fromCharCode(MedialValue));
		
		//add Final Jamo
		var finalJamoUnicodeIndex = unicode - MedialValue; //int
		if(finalJamoUnicodeIndex != 0) {
			//ㄲ, ㄳ (2, 3) -> add ㄱ(1)
			if(finalJamoUnicodeIndex >= 2 && finalJamoUnicodeIndex <= 3) valueArr.push(String.fromCharCode(MedialValue + 1));
			
			//ㄵ, ㄶ(5, 6) -> add ㄴ(4)
			if(finalJamoUnicodeIndex >= 5 && finalJamoUnicodeIndex <= 6) valueArr.push(String.fromCharCode(MedialValue + 4));
			
			//ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ (9, 10, 11, 12, 13, 14, 15) -> add ㄹ(8)
			if(finalJamoUnicodeIndex >= 9 && finalJamoUnicodeIndex <= 15) valueArr.push(String.fromCharCode(MedialValue + 8));
			
			//ㅄ (18) -> add ㅂ(17)
			if(finalJamoUnicodeIndex == 18) valueArr.push(String.fromCharCode(MedialValue + 17));

			//ㅆ (20) -> add ㅅ(19)
			if(finalJamoUnicodeIndex == 20) valueArr.push(String.fromCharCode(MedialValue + 19));
			
			valueArr.push(_oneCharacterStr);
		}
	}else if(unicode >= 32 && unicode <= 126) { // !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
		if(unicode == 32){ //" "
			valueArr.push(" ");
		}else if(unicode == 92){ //\
			valueArr.push(String.fromCharCode(unicode));
		}else{
			valueArr.push(String.fromCharCode(unicode));
		}
	}else{
		valueArr.push(String.fromCharCode(unicode));
	}
	return valueArr;
};

/*
String 내의 특정 문자열을 변환하여 출력.
return String

var testStr = "     test입니다.     test.";
console.log(dragmove.util.StringUtil.replaceStr(testStr, "tes", "nex"));
*/
dragmove.util.StringUtil.replaceStr = function(_targetStr, _findStr, _changeStr) {
	return _targetStr.split(_findStr).join(_changeStr);
};

/*
String 내의 모든 공백 문자열 삭제
return String

var testStr = "      test      입     니다.     ";
console.log(dragmove.util.StringUtil.removeWhiteSpaceStr(testStr));
*/
dragmove.util.StringUtil.removeWhiteSpaceStr = function(_targetStr) {
	return _targetStr.split(" ").join("");
};

/*
String의 length가 특정한 숫자보다 길 경우, String을 특정한 숫자까지만 표기. String의 마지막 글자 이후 _cutAddStr String의 추가 가능 
return String

console.log(dragmove.util.StringUtil.cutStrByIndex("dragmove", 3, "_javascript")); //dra_javascript
*/
dragmove.util.StringUtil.cutStrByIndex = function(_str, _cutStringIndex, _cutAddStr) {
	var tempStr = _str;
	if (_str.length > _cutStringIndex) tempStr = _str.substr(0, _cutStringIndex) + _cutAddStr;
	return tempStr;
};

/*
int type param value를 ','를 이용한 금액 표기 형태로 변경 출력
return String

var cost = 300000000000000000;
console.log(dragmove.util.StringUtil.numberToPriceStr(cost)); //300,000,000,000,000,000
*/
dragmove.util.StringUtil.numberToPriceStr = function(_intTypeValue, _addStr) {
	var addStr = ",";
	if(_addStr != undefined) addStr = _addStr;

	var arr = String(_intTypeValue).split(""); 
	var tlen = arr.length; 
	var clen = Math.ceil(tlen / 3); 
	for (var i=1; i<clen; i++) arr.splice(tlen - i * 3, 0, addStr); 
	return arr.join("");
};

/*
문자열 좌측 부분의 공백 문자 제거
return String

var trimTargetStr = "      dragmove      javascript      ";
console.log(dragmove.util.StringUtil.leftTrim(trimTargetStr)); //dragmove javascript      
*/
dragmove.util.StringUtil.leftTrim = function(_str) {
	return _str.replace(/^\s+/, "");
};

/*
문자열 우측 부분의 공백 문자 제거
return String

var trimTargetStr = "      dragmove      javascript      ";
console.log(dragmove.util.StringUtil.rightTrim(trimTargetStr)); //      dragmove      javascript
*/
dragmove.util.StringUtil.rightTrim = function(_str) {
	return _str.replace(/\s+$/, "");
};

/*
문자열 좌,우측의 모든 공백 문자 제거
return String

var trimTargetStr = "      dragmove      javascript      ";
console.log(dragmove.util.StringUtil.trim(trimTargetStr)); //dragmove      javascript
*/
dragmove.util.StringUtil.trim = function(_str) {
	return _str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
};

/*
문자열 우측 부분의 공백 문자 제거

trace(StringUtil.checkEmail(_value)); //_str parameter가 유효한 e-mail 주소 String일 경우, true 반환
*/
dragmove.util.StringUtil.checkEmail = function(_str) {
	if(_str.indexOf("@") < 1){
		//console.log("[StringUtil.checkEmail] '@'문자가 빠지거나 맨 처음에 위치할 수 없습니다.");
		return false;
	}
	if(_str.indexOf(".") < -1){
		//console.log("[StringUtil.checkEmail] '.'문자가 빠지거나 맨 처음에 위치할 수 없습니다.");
		return false;
	}
	if(_str.indexOf("@") != _str.lastIndexOf("@")){
		//console.log("[StringUtil.checkEmail] '@'는 두 개이상 들어갈 수 없습니다.");
		return false;
	}
	if(_str.indexOf(".") - _str.indexOf("@") < 2){
		//console.log("[StringUtil.checkEmail] '.'이 '@'보다 먼저 위치할 수 없으며 '@' 바로 다음에 '.'이 위치할 수 없습니다.");
		return false;
	}
	if(_str.lastIndexOf(".") == _str.length-1){
		//console.log("[StringUtil.checkEmail] 마지막에 '.'이 위치할 수 없습니다.");
		return false;
	}
	
	var lastStrLength = _str.substr(_str.lastIndexOf(".")+1).length;
	if(lastStrLength < 2 || lastStrLength > 4){
		//console.log("[StringUtil.checkEmail] 도메인명의 마지막 문자는 영문 2~4개여야 합니다.");
		return false;
	}
	return true;
	
	//other way
	//return !_str || /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/i.test(_str);
};

/*
문자열의 byte를 반환합니다.

var testStr = "1234567890"
console.log("1234567890 : ", StringUtil.getBytes(testStr));

testStr = "dragmove"
console.log("dragmove : ", StringUtil.getBytes(testStr));

testStr = "김현석"
console.log("김현석 : ", StringUtil.getBytes(testStr));
 */
dragmove.util.StringUtil.getBytes = function($str) {
	var str = $str;
	var bytes = 0;
	for(var i=0,max=$str.length; i<max; i++) {
		bytes += (str.charCodeAt(i)>128) ? 2 : 1;
	}
	return bytes;
};

/*
File의 확장자를 반환합니다.
console.log(dragmove.util.SystemUtil.getFileExtension("../flash/exampleFile.swf?temp=12345&tempFlag=false"));
console.log(dragmove.util.SystemUtil.getFileExtension("image.png"));
*/
dragmove.util.SystemUtil.getFileExtension = function(_fileURLStr) {
	var searchStr = _fileURLStr.indexOf("?") > -1 ? _fileURLStr.substring(0, _fileURLStr.indexOf("?")) : _fileURLStr;
	var finalPartStr = searchStr.substring(searchStr.lastIndexOf("/"));
	var fileExtensionStr = finalPartStr.substring(finalPartStr.lastIndexOf(".") + 1).toLowerCase();
	return fileExtensionStr;
};

/*
초 단위의 시간을 시간,분,초 정보로 변환하여 순서대로 Array에 담아 반환합니다.
console.log(dragmove.util.SystemUtil.secondUnitToHourUnit(3700)); //3700초를 변환하여 담은 배열의 원소인 1,1,40 반환 (1시간 1분 40초)
*/
dragmove.util.SystemUtil.secondUnitToHourUnit = function(_second) {
	var _hour = 0;
	var _min = 0;
	var _sec = 0;
	var _timeInfo = _second;
	_hour = Math.floor(_timeInfo / dragmove.data.DateData.HOUR_TO_SEC);
	_timeInfo -= _hour * dragmove.data.DateData.HOUR_TO_SEC;
	_min = Math.floor(_timeInfo / dragmove.data.DateData.MIN_TO_SEC);
	_timeInfo -= _min * dragmove.data.DateData.MIN_TO_SEC;
	_sec = Math.floor(_timeInfo);
	
	return [_hour, _min, _sec];
};

/*
Number type value들이 담긴 Array 내부의 값 중 value값과 가장 가까운 값을 찾아내고 그 값을 반환합니다.(동일한 오차일 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다.) 

var array = [100,200,300,400,500];
var value = 180;
console.log(ArrayUtilDM.getNearArrayPositionByValue(array , value));  //return 1 (200)

var array = [100,400,200,300,50];
var value = 40;
console.log(ArrayUtilDM.getNearArrayPositionByValue(array , value));  //return 4 (50)

var array = [-100,-200,-300,100,500];
var value = -180;
console.log(ArrayUtilDM.getNearArrayPositionByValue(array , value));  //return 1 (-200)
*/
dragmove.util.ArrayUtil.getNearArrayPositionByValue = function(array, value) {
	var nearIndex = -1;
	var minValue = Math.abs(value - array[0]);

	for(var i=0, max=array.length; i<max; i++) {
		if(minValue >= Math.abs(value - array[i])){
			minValue = Math.abs(value - array[i]);
			nearIndex = i;
		}
	}
	return nearIndex;
};

/*
Array 내부의 객체의 Number type 속성의 크기를 비교하여, 속성 크기의 순서대로 정렬된 Array를 반환. 

var elementArr = [{y:10}, {y:0}, {y:30}, {y:20}, {y:420}, {y:40}];
var arrangeArr = ArrayUtilDM.getArrangedArrByElementNumberTypeProperty(elementArr, "y");

var _element;
for(var i = 0; i < arrangeArr.length; ++i) {
 _element = arrangeArr[i];
 console.log("_element.y :", _element.y);
}
*/
dragmove.util.ArrayUtil.getArrangedArrByElementNumberTypeProperty = function(_array, _elementNumberTypePropertyNameStr) {
	var tarray = _array;
	var returnArr = [];
	var _elementObj;
	var _compareElementObj;
	var comparisonCount = 0;

	var tarrayLenth = tarray.length;
	for(var i=0; i<tarrayLenth; ++i) {
		_elementObj = tarray[i];
		if(!_elementObj.hasOwnProperty(_elementNumberTypePropertyNameStr)) {
			console.log("[dragmove.util.ArrayUtil.getArrangedArrByElementNumberTypeProperty] - Array 내부의 객체에 _elementNumberTypePropertyNameStr 문자열과 일치하는 속성이 존재하지 않습니다. null을 반환합니다."); 
			break;
			return null;
		}else{
			if(typeof _elementObj[_elementNumberTypePropertyNameStr] != "number") {
				console.log("[dragmove.util.ArrayUtil.getArrangedArrByElementNumberTypeProperty] - Array 내부의 객체의 _elementNumberTypePropertyNameStr 속성은 Number type이 아닙니다. null을 반환합니다.");
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

/*
Number type value들이 담긴 Array 내부의 값 중 가장 큰 값을 반환 

var numArr = [10, 30, 20, 120, 55];
console.log(dragmove.util.ArrayUtil.getMaxNumberByArr(numArr)); //display 120
*/
dragmove.util.ArrayUtil.getMaxNumberByArr = function(_array) {
	_array.sort(function numberOrder(a, b) { return a - b; });
	return _array[_array.length - 1];
};

/*
Number type value들이 담긴 Array 내부의 값 중 가장 작은 값을 반환 

var numArr = [10, 30, 20, 120, 55];
console.log(dragmove.util.ArrayUtil.getMinNumberByArr(numArr)); //display 10
*/
dragmove.util.ArrayUtil.getMinNumberByArr = function(_array) {
	_array.sort(function numberOrder(a, b) { return a - b; });
	return _array[0];
};

/*
Number type value들이 담긴 Array 내부의 값 중 가장 큰 값이 있는 위치값을 반환(같은 값이 존재할 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다.) 

var numArr = [10, 30, 20, 120, 55];
console.log(dragmove.util.ArrayUtil.getMaxNumberPositionByArr(numArr)); //가장 큰 값인 120의 위치인 3 이 반환
*/
dragmove.util.ArrayUtil.getMaxNumberPositionByArr = function(_array) {
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

/*
Number type value들이 담긴 Array 내부의 값 중 가장 작은 값이 있는 위치값을 반환(같은 값이 존재할 경우, 가장 뒤쪽에 존재하는 값의 위치를 반환합니다.) 

var numArr = [10, 30, 20, 120, 55];
console.log(dragmove.util.ArrayUtil.getMinNumberPositionByArr(numArr)); //가장 작은 값인 10의 위치인 0 이 반환
*/
dragmove.util.ArrayUtil.getMinNumberPositionByArr = function(_array) {
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

/*
Array 내부의 원소를 random하게 Mix합니다. 

var _testArr = [10, 30, 20, 120, 55];
dragmove.util.ArrayUtil.randomSort(_testArr);
console.log(_testArr);
*/
dragmove.util.ArrayUtil.randomSort = function(_array) {
	_array.sort(
		function( _elementA, _elementB) {
			var _num = Math.random() - .5;
			var value = ( _num > 0 )? 1 : -1;
			return value;
		}
	);
};

/**
 * getBackgroundPositionPointObjJQ(_$jqueryObject);
 * return {x, y}
 *
 * need jquery-1.6.2 javascript File
 * 
 * jquery의 $객체.css('background-position-x'), $객체.css('background-position-y') 메서드 실행 값이 Firefox browser에서 도출되지 않는 관계로,
 * x, y property를 가진 Object 반환.
 */
dragmove.util.JQueryUtil.getBackgroundPositionPointObjJQ = function(_$jqueryObject) {
	var _pointObj = { x:0 , y:0 };
	var bgPosStr;
	var flag_firefox = dragmove.util.BrowserUtil.getFlagBrowserIsFirefox(); //if browser is firefox
	if(flag_firefox) {
		bgPosStr = _$jqueryObject.css('background-position').toString();
		var bgInfoArr = bgPosStr.split(' ');
		_pointObj.x = parseFloat(bgInfoArr[0]);
		_pointObj.y = parseFloat(bgInfoArr[1]);
	}else{ //etc browser
		_pointObj.x = parseFloat(_$jqueryObject.css('background-position-x'));
		_pointObj.y = parseFloat(_$jqueryObject.css('background-position-y'));
	}
	return _pointObj; 
};

/**
 * getCloneObj(_objectTypeData);
 * return Object
 * 
 * Object type Data의 Clone Object 반환.
 */
dragmove.util.DataUtil.getCloneObj = function(_objectTypeData) {
	var _obj = {};
	for(i in _objectTypeData) {
		if(typeof _objectTypeData[i] == 'object') {
			_obj[i] = getCloneObj(_objectTypeData[i]);
		}else{
			_obj[i] = _objectTypeData[i];
		}
	}
	return _obj;
};

//DOM Node 객체를 전달받아, 이 노드가 HTML 태그를 표현하는지 검사한다. 즉, 이 노드가 Element 객체인지 검사한다.
//트리를 순회하면서 만나는 총 Element 객체의 수를 반환한다.
dragmove.util.NodeUtil.countTags = function(_elementNode) {
	var numTags = 0;
	if(_elementNode.nodeType == 1 /*Node.ELEMENT_NODE*/) numTags++;
	var children = _elementNode.childNodes;
	for(var i=0, max=children.length; i<max; i++) {
		numTags += dragmove.util.NodeUtil.countTags(children[i]);
	}
	return numTags;
};

//DOM element에 css class가 적용되어 있는지 확인하여 true, false 반환
dragmove.util.NodeUtil.hasClass = function(_elementNode, _cssClassNameStr) {
	var classes = _elementNode.className;
	if(classes == _cssClassNameStr) return true;
	return String(classes).search("\\b"+_cssClassNameStr+"\\b") != -1;
};

//DOM element에 css class 추가
dragmove.util.NodeUtil.addClass = function(_elementNode, _cssClassNameStr) {
	if (dragmove.util.NodeUtil.hasClass(_elementNode, _cssClassNameStr)) return;
	var classesStr = String(_elementNode.className);
	if(classesStr) _cssClassNameStr = " " + _cssClassNameStr;
	_elementNode.className += _cssClassNameStr;
};

//DOM element의 css class 삭제
dragmove.util.NodeUtil.removeClass = function(_elementNode, _cssClassNameStr) {
	_elementNode.className = _elementNode.className.replace(new RegExp("\\b" + _cssClassNameStr + "\\b\\s*", "g"), "");
};

//DOM element의 removeChild 기능에 parentNode null 상황시 처리
dragmove.util.NodeUtil.removeChild = function(_element){
	if(!_element) return;
	if(_element.parentNode) _element.parentNode.removeChild(_element);
};

//DOM element 내부의 모든 DOM element를 removeChild
dragmove.util.NodeUtil.removeAllChildren = function(_element) {
	if(!_element) return;
	while(_element.firstChild) _element.removeChild(_element.firstChild);
};

/*
DOM element의 CSS Style property String 반환. 현재, backgroundPosition 속성 탐색시, IE7, IE8 오류 발생.
_cssCamelPropertyStr : 카멜 표기법 style name
_cssHyphenPropertyStr : 하이픈 표기법 style name

var _targetElement = document.getElementById("navigation");
var backgroundPositionStr = dragmove.util.NodeUtil.getElementStyle(_targetElement, "backgroundPosition", "background-position");
console.log("backgroundPositionStr : " + backgroundPositionStr);
*/
dragmove.util.NodeUtil.getElementStyle = function(_elementNode, _cssCamelPropertyStr, _cssHyphenPropertyStr) {
	if(_elementNode.currentStyle) {
		return _elementNode.currentStyle[_cssCamelPropertyStr];
	}else if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(_elementNode, null).getPropertyValue(_cssHyphenPropertyStr);
	}else{
		return null;
	}
};

/*
DOM element의 inline css style 삭제
//<div id="targetElement" style="opacity:0.7;"></div>
var _targetElement = document.getElementById("targetElement");
dragmove.util.NodeUtil.removeElementInlineStyle(_targetElement);
//-> 실행시, inline style 삭제 완료
//<div id="targetElement"></div>
*/
dragmove.util.NodeUtil.removeElementInlineStyle = function(_element){
	if(!_element) return;
	_element.removeAttribute("style");
};

/*
DOM element의 document Global X 좌표 반환.
var _targetElement = document.getElementById("container");
var globalPosX = dragmove.util.NodeUtil.getElementGlobalPositionX(_targetElement);
console.log(globalPosX);
*/
dragmove.util.NodeUtil.getElementGlobalPositionX = function(_elementNode) {
	var positionX = 0;
	while(_elementNode.offsetParent) {
		positionX += _elementNode.offsetLeft;
		_elementNode = _elementNode.offsetParent;
	}
	return positionX;
};

/*
DOM element의 document Global Y 좌표 반환.
var _targetElement = document.getElementById("container");
var globalPosY = dragmove.util.NodeUtil.getElementGlobalPositionY(_targetElement);
console.log(globalPosY);
*/
dragmove.util.NodeUtil.getElementGlobalPositionY = function(_elementNode) {
	var positionY = 0;
	while(_elementNode.offsetParent) {
		positionY += _elementNode.offsetTop;
		_elementNode = _elementNode.offsetParent;
	}
	return positionY;
};

/*
DOM element의 parentNode 내부 X 좌표 반환. Javascript나 CSS로 style을 지정하지 않은 element의 X 위치를 얻어야 할 경우, 사용.
var _targetElement = document.getElementById("container");
var posX = dragmove.util.NodeUtil.getElementOffsetLeft(_targetElement);
console.log(posX);
*/
dragmove.util.NodeUtil.getElementOffsetLeft = function(_elementNode) {
	return _elementNode.parentNode == _elementNode.offsetParent ? _elementNode.offsetLeft : dragmove.util.NodeUtil.getElementGlobalPositionX(_elementNode) - dragmove.util.NodeUtil.getElementGlobalPositionX(_elementNode.parentNode);
};

/*
DOM element의 parentNode 내부 Y 좌표 반환. Javascript나 CSS로 style을 지정하지 않은 element의 Y 위치를 얻어야 할 경우, 사용.
var _targetElement = document.getElementById("container");
var posY = dragmove.util.NodeUtil.getElementOffsetTop(_targetElement);
console.log(posY);
*/
dragmove.util.NodeUtil.getElementOffsetTop = function(_elementNode) {
	return _elementNode.parentNode == _elementNode.offsetParent ? _elementNode.offsetTop : dragmove.util.NodeUtil.getElementGlobalPositionY(_elementNode) - dragmove.util.NodeUtil.getElementGlobalPositionY(_elementNode.parentNode);
};

/*
HTML Document 반환

var _documentBody = dragmove.util.NodeUtil.getDocumentBody();
_documentBody.scrollTop = 100;
*/
dragmove.util.NodeUtil.getDocumentBody = function() {
	var _body = null;
	if(document.documentElement) {
		_body = document.documentElement;
	}else{
		_body = document.body;
	}
	return _body;
};

/*
DOM element의 모든 parentNode 반환

var _targetElement = document.getElementById("container");
var parentNodeArr = dragmove.util.NodeUtil.getParentNodeArr(_targetElement);
console.log(parentNodeArr);
*/
dragmove.util.NodeUtil.getParentNodeArr = function(_elementNode) {
	var parentNodeArr = [];
	accumulateParentNode(_target);
	return parentNodeArr;
	
	//private function
	function accumulateParentNode(_target) {
		if(_target.parentNode) {
			parentNodeArr.push(_target.parentNode);
			accumulateParentNode(_target.parentNode);
		}
	}
};

/*
외부 javascript를 현재 페이지에 추가
해당 js file에 부여할 임의의 id 지정 필요

var externalJsUrlStr = "./js/project/main.js";
var externalJsFileId = "main-js"
dragmove.util.NodeUtil.setExternalJavascriptFile(externalJsUrlStr, externalJsFileId, completeLoadExternalJavascriptFile);

function completeLoadExternalJavascriptFile() {
	console.log("external js file load complete")
}

*/
dragmove.util.NodeUtil.setExternalJavascriptFile = function($jsFileUrlStr, $jsFileIdStr, $jsFileLoadCompleteEventHandler) {
	var scriptElementArr = document.getElementsByTagName("script");
	var firstJsElement = scriptElementArr[0];
	if(document.getElementById($jsFileIdStr)) {
		//console.log("already some javascript file have this id");
		return;
	}
	
	var jsElement = document.createElement("script");
	jsElement.id = $jsFileIdStr;
	jsElement.src = $jsFileUrlStr;
	jsElement.type = "text/javascript";
	jsElement.onload = $jsFileLoadCompleteEventHandler;
	if(firstJsElement.parentNode) {
		firstJsElement.parentNode.insertBefore(jsElement, firstJsElement);
	}
};





//browser의 location anchor String 반환
dragmove.util.BrowserUtil.getLocationAnchor = function() {
	var locationStr = unescape(document.location.href);
	var anchorIndex = locationStr.indexOf("#");
	if(anchorIndex < 0) return;
	return locationStr.substr(anchorIndex+1);
};

//browser의 canvas 지원 여부 반환 - true, false
dragmove.util.BrowserUtil.getFlagSupportCanvas = function() {
	return !!document.createElement('canvas').getContext;
};

//새로운 Browser 띄우기
dragmove.util.BrowserUtil.openWindow = function(_url, _windowName, _width, _height, _left, _top, _scrollbars, _resizable, _status, _location, _toolbar, _menubar, _fullscreen, _channelmode) {
	if(!_scrollbars) _scrollbars = "no";
	if(!_resizable) _resizable = "no";
	if(!_status) _status = "no";
	if(!_location) _location = "no";
	if(!_toolbar) _toolbar = "no";
	if(!_menubar) _menubar = "no";
	if(!_fullscreen) _fullscreen = "no";
	if(!_channelmode) _channelmode = "no";
	var paramStr = 'width='+_width+',height='+_height+',left='+_left+',top='+_top+',scrollbars='+_scrollbars+',resizable='+_resizable+',status='+_status+',location='+_location+',toolbar='+_toolbar+',menubar='+_menubar+',fullscreen='+_fullscreen+',channelmode='+_channelmode;
	var _window = window.open(_url, _windowName, paramStr);
	//_window.window.focus();
	return _window;
	
	/*
	url : string
	windowName : string
	width : number
	height : number
	left : number
	top : number
	scrollbars : yes, no
	resizable : yes, no
	status : yes, no
	location : yes, no
	toolbar : yes, no
	menubar : yes, no
	fullscreen : yes, no
	channelmode : yes, no
	*/
};

//browser 창의 x 좌표 반환
dragmove.util.BrowserUtil.getBrowserX = function() {
	if(window.screenX != "undefined" && window.screenX != null) {
		return window.screenX;
	}else{
		return window.screenLeft;
	}
};

//browser 창의 y 좌표 반환
dragmove.util.BrowserUtil.getBrowserY = function() {
	if(window.screenY != "undefined" && window.screenX != null) {
		return window.screenY;
	}else{
		return window.screenTop;
	}
};

//browser 창의 width에서 메뉴바, 툴바, 스크롤바 등의 크기를 뺀 나머지 width 반환 (IE에서는 스크롤바의 크기를 포함한 width를 반환)
dragmove.util.BrowserUtil.getBrowserInnerWidth = function() {
	var resultArr = [];
	if(window.innerWidth) resultArr.push(window.innerWidth);
	if(document.documentElement && document.documentElement.clientWidth) resultArr.push(document.documentElement.clientWidth);
	if(document.body && document.body.clientWidth) resultArr.push(document.body.clientWidth);
	if(resultArr.length <= 0) return -1;
	return(dragmove.util.ArrayUtil.getMinNumberByArr(resultArr));

	/* if(window.innerWidth) {
		return window.innerWidth;
	}else if(document.documentElement && document.documentElement.clientWidth) {
		return document.documentElement.clientWidth;
	}else if(document.body && document.body.clientWidth) {
		return document.body.clientWidth;
	} */
};

//browser 창의 height에서 메뉴바, 툴바, 스크롤바 등의 크기를 뺀 나머지 height 반환 (IE에서는 스크롤바의 크기를 포함한 height를 반환)
dragmove.util.BrowserUtil.getBrowserInnerHeight = function() {
	var resultArr = [];
	if(window.innerHeight) resultArr.push(window.innerHeight);
	if(document.documentElement && document.documentElement.clientHeight) resultArr.push(document.documentElement.clientHeight);
	if(document.body && document.body.clientHeight) resultArr.push(document.body.clientHeight);
	if(resultArr.length <= 0) return -1;
	return(dragmove.util.ArrayUtil.getMinNumberByArr(resultArr));

	/* if(window.innerHeight) {
		return window.innerHeight;
	}else if(document.documentElement && document.documentElement.clientHeight) {
		return document.documentElement.clientHeight;
	}else if(document.body && document.body.clientHeight) {
		return document.body.clientHeight;
	} */
};

//browser의 scrollWidth 반환
dragmove.util.BrowserUtil.getDocumentScrollWidth = function() {
	if(document.documentElement && document.documentElement.scrollWidth) {
		return document.documentElement.scrollWidth;
	}else if(document.body && document.body.scrollWidth) {
		return document.body.scrollWidth;
	}
}

//browser의 scrollHeight 반환
dragmove.util.BrowserUtil.getDocumentScrollHeight = function() {
	if(document.documentElement && document.documentElement.scrollHeight) {
		return document.documentElement.scrollHeight;
	}else if(document.body && document.body.scrollHeight) {
		return document.body.scrollHeight;
	}
};

//browser 창의 수평 스크롤바의 위치 반환
dragmove.util.BrowserUtil.getBrowserScrollX = function() {
	if(window.innerWidth) {
		return window.pageXOffset;
	}else if(document.documentElement && document.documentElement.clientWidth) {
		return document.documentElement.scrollLeft;
	}else if(document.body && document.body.clientWidth) {
		return document.body.scrollLeft;
	}
};

//browser 창의 수직 스크롤바의 위치 반환
dragmove.util.BrowserUtil.getBrowserScrollY = function() {
	if(window.innerHeight) {
		return window.pageYOffset;
	}else if(document.documentElement && document.documentElement.clientHeight) {
		return document.documentElement.scrollTop;
	}else if(document.body && document.body.clientHeight) {
		return document.body.scrollTop;
	}
};

/**
 * getFlagBrowserIsIE();
 * return true/false
 * 
 * Browser가 Microsoft Internet Explorer인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsIE = function() {
	return navigator.userAgent.toUpperCase().indexOf("MSIE") != -1;
};

/**
 * getBrowserIEVersion();
 * return 6, 7, 8, 9, -1
 * 
 * Browser가 Microsoft Internet Explorer인지 체크하고, Version Number를 반환합니다.
 * Browser가 IE가 아닐 경우, -1을 반환합니다.
 */
dragmove.util.BrowserUtil.getBrowserIEVersion = function() {
	if(dragmove.util.BrowserUtil.getFlagBrowserIsIE()) {
		if(navigator.userAgent.toUpperCase().indexOf("MSIE 6") != -1) return 6;
		if(navigator.userAgent.toUpperCase().indexOf("MSIE 7") != -1) return 7;
		if(navigator.userAgent.toUpperCase().indexOf("MSIE 8") != -1) return 8;
		if(navigator.userAgent.toUpperCase().indexOf("MSIE 9") != -1) return 9;
	}else{
		return -1;
	}
};

/**
 * getFlagBrowserIsFirefox();
 * return true/false
 * 
 * Browser가 Mozilla Firefox인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsFirefox = function() { 
	return navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1;
};

/**
 * getFlagBrowserIsOpera();
 * return true/false
 * 
 * Browser가 Opera인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsOpera = function() { 
	return navigator.userAgent.toUpperCase().indexOf("OPERA") != -1;
};

/**
 * getFlagBrowserIsChrome();
 * return true/false
 * 
 * Browser가 Google Chrome인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsChrome = function() {
	return navigator.userAgent.toUpperCase().indexOf("CHROME") != -1;
};

/**
 * getFlagBrowserIsSafari();
 * return true/false
 * 
 * Browser가 Apple Safari인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsSafari = function() {
	//return navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1;
	var userAgentInfoUpperCaseStr = navigator.userAgent.toUpperCase();
	if(userAgentInfoUpperCaseStr.indexOf("SAFARI") != -1 && userAgentInfoUpperCaseStr.indexOf("CHROME") == -1) {
		return true;
	}else{
		return false;
	}
};

/**
 * getFlagBrowserIsMobile();
 * return true/false
 * 
 * Mobile Browser인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsMobile = function() {
	return navigator.userAgent.toUpperCase().indexOf("MOBILE") != -1;
};

/**
 * getFlagBrowserIsMobileSafari();
 * return true/false
 * 
 * Browser가 Apple Mobile Safari인지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagBrowserIsMobileSafari = function() {
	return /APPLE.*MOBILE.*SAFARI/.test(navigator.userAgent.toUpperCase());
};

/**
 * getFlagDeviceIsiPad();
 * return true/false
 * 
 * Browser가 iPad에서 작동하고 있는지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagDeviceIsiPad = function() {
	return navigator.userAgent.toUpperCase().indexOf("IPAD") != -1;
};

/**
 * getFlagDeviceIsiPhone();
 * return true/false
 * 
 * Browser가 iPhone에서 작동하고 있는지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagDeviceIsiPhone = function() {
	return navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1;
};

/**
 * getFlagDeviceIsiPod();
 * return true/false
 * 
 * Browser가 iPod에서 작동하고 있는지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagDeviceIsiPod = function() {
	return navigator.userAgent.toUpperCase().indexOf("IPOD") != -1;
};

/**
 * getFlagDeviceIsAndroid();
 * return true/false
 * 
 * Browser가 Android에서 작동하고 있는지 체크합니다.
 */
dragmove.util.BrowserUtil.getFlagDeviceIsAndroid = function() {
	return /.*ANDROID.*/.test(navigator.userAgent.toUpperCase());
};

/**
 * available();
 * return true/false
 * 
 * check하는 변수가 null이나 undefined 이외의 value를 지니고 있는지 확인합니다.
 */
dragmove.util.CheckUtil.available = function($object) {
	var flag = true;
	if($object == null || $object == undefined) return false;
	return flag;
};

/**
 * isArray();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Array인지 체크합니다.
 */
dragmove.util.CheckUtil.isArray = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == Array);
};

/**
 * isFunction();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Function인지 체크합니다.
 */
dragmove.util.CheckUtil.isFunction = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == Function);
};

/**
 * isString();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Function인지 체크합니다.
 */
dragmove.util.CheckUtil.isString = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == String);
};

/**
 * isNumber();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Number인지 체크합니다.
 */
dragmove.util.CheckUtil.isNumber = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == Number);
};

/**
 * isBoolean();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Boolean인지 체크합니다.
 */
dragmove.util.CheckUtil.isBoolean = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == Boolean);
};

/**
 * isObject();
 * return true/false
 * 
 * check하는 $object 변수의 타입이 Object인지 체크합니다.
 */
dragmove.util.CheckUtil.isObject = function($object) {
	if(!dragmove.util.CheckUtil.available($object)) return false;
	return ($object.constructor == Object);
};

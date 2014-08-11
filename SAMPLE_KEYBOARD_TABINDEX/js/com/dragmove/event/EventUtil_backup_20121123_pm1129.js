/*
com.dragmove.event.EventUtil javascript File

+ 20120604

- TEST : IE7,8 , FIREFOX, CHROME, SAFARI success
addEventListener - test complete
removeEventListener - test complete
cancelEvent - no test
cancelPropagation - test complete
*/

if(!dragmove.event) dragmove.event = {};
if(!dragmove.event.EventUtil) dragmove.event.EventUtil = {};
if(!dragmove.event.EventUtil.core) dragmove.event.EventUtil.core = {};

var EventUtilDM;

if(!EventUtilDM) {
	EventUtilDM = dragmove.event.EventUtil;
}else{
	throw new Error("EventUtilDM already exists");
}

/*
eventListener
dragmove.event.EventUtil.addEventListener(window, "load", init);
function init() {
	alert("init");
}
*/
dragmove.event.EventUtil.addEventListener = function(_target, _eventTypeStr, _listener, _flag_useCapture) {
	var flag_useCapture = (_flag_useCapture == true) ? true : false;
	if(_target) {
		if(dragmove.event.EventUtil.core.isBaseHtmlEvent(_eventTypeStr)) {
			if(_target.addEventListener) {
				_target.addEventListener(_eventTypeStr, _listener, flag_useCapture); //DOM base Html Event. support event capture
			}else{
				_target.attachEvent("on"+_eventTypeStr, _listener); //IE base Html Event. don't support event capture
			}
		}else{
			dragmove.event.EventUtil.core.customEventManager.addCustomEventListener(_target, _eventTypeStr, _listener, flag_useCapture);
		}
	}
};

/*
removeEventListener
dragmove.event.EventUtil.addEventListener(window, "load", init);
dragmove.event.EventUtil.removeEventListener(window, "load", init);
function init() {
	alert("init");
}
*/
dragmove.event.EventUtil.removeEventListener = function(_target, _eventTypeStr, _listener, _flag_useCapture) {
	var flag_useCapture = (_flag_useCapture == true) ? true : false;
	if(_target) {
		if(dragmove.event.EventUtil.core.isBaseHtmlEvent(_eventTypeStr)) {
			if(_target.removeEventListener) {
				_target.removeEventListener(_eventTypeStr, _listener, flag_useCapture); //DOM base Html Event. support event capture
			}else{
				_target.detachEvent("on"+_eventTypeStr, _listener); //IE base Html Event. don't support event capture
			}
		}else{
			dragmove.event.EventUtil.core.customEventManager.removeCustomEventListener(_target, _eventTypeStr, _listener, flag_useCapture);
		}
	}
};

/*
dispatch dragmove.event.EventUtil.CustomEvent

<html>
	<header></header>
	<body>
		<div id="container">
			<div id="parentNode">
				<div id="childNode"></div>
			</div>
		</div>
	</body>
</html>

var CUSTOM_EVENT = "CUSTOM_EVENT";
var _containerNode = document.getElementById("container");
var _parentNode = document.getElementById("parentNode");
var _childNode = document.getElementById("childNode");

dragmove.event.EventUtil.addEventListener(_containerNode, CUSTOM_EVENT, containerNodeCaptureEventHandler, true); //capture
dragmove.event.EventUtil.addEventListener(_parentNode, CUSTOM_EVENT, parentNodeCaptureEventHandler, true); //capture
dragmove.event.EventUtil.addEventListener(_childNode, CUSTOM_EVENT, childNodeEventHandler); //target
dragmove.event.EventUtil.addEventListener(_parentNode, CUSTOM_EVENT, parentNodeBubbleEventHandler); //bubble
dragmove.event.EventUtil.addEventListener(_containerNode, CUSTOM_EVENT, containerNodeBubbleEventHandler); //bubble

dragmove.event.EventUtil.dispatchCustomEvent(_childNode, new dragmove.event.EventUtil.CustomEvent(CUSTOM_EVENT, {x:100, y:200}, true)); //dispatch custom event

function containerNodeCaptureEventHandler(e) {
	e = e || window.event;
	if(console) {
		console.log('capture containerNode : ' + e);
		console.log("capture containerNode e.json.x : " + e.json.x);
	}
	//dragmove.event.EventUtil.cancelPropagation(e);
}

function parentNodeCaptureEventHandler(e) {
	e = e || window.event;
	if(console) {
		console.log('capture parentNode : ' + e);
		console.log("capture parentNode e.json.x : " + e.json.x);
	}
	//dragmove.event.EventUtil.cancelPropagation(e);
}

function childNodeEventHandler(e) {
	e = e || window.event;
	if(console) {
		console.log('childNode : ' + e);
		console.log("childNode e.json.x : " + e.json.x);
	}
	//dragmove.event.EventUtil.cancelPropagation(e);
}

function parentNodeBubbleEventHandler(e) {
	e = e || window.event;
	if(console) {
		console.log('bubble parentNode : ' + e);
		console.log("bubble parentNode e.json.x : " + e.json.x);
	}
	//dragmove.event.EventUtil.cancelPropagation(e);
}

function containerNodeBubbleEventHandler(e) {
	e = e || window.event;
	if(console) {
		console.log('bubble containerNode : ' + e);
		console.log("bubble containerNode e.json.x : " + e.json.x);
	}
	//dragmove.event.EventUtil.cancelPropagation(e); //capture setting�ÿ���, parentNode�� childNode�� ��޵Ǵ� Event�� ĸ���ؼ�, event cancel ����.
}

*/
dragmove.event.EventUtil.dispatchCustomEvent = function(_target, _customEvent) {
	if(dragmove.event.EventUtil.core.isBaseHtmlEvent(_customEvent.type)) {
		//if(console) console.log('dispatchCustomEvent method do not support base Html Events, MouseEvents, UIEvents'); //Don't support base Html Events, MouseEvents, UIEvents. 
		//REFERENCE DOC - http://www.howtocreate.co.uk/tutorials/javascript/domevents
	}else{
		if(_customEvent) dragmove.event.EventUtil.core.customEventManager.callAddedCustomEventListener(_target, _customEvent); //support CustomEvent
	}
};

/*
custom event Object
*/
dragmove.event.EventUtil.CustomEvent = function(_eventTypeStr, _data, _flag_bubbles, _flag_cancelable) {
	var _customEvent = this;

	/*
	//+ HTML EVENT VARIABLES
	console.log(e.type);
	console.log(e.target);
	console.log(e.currentTarget);
	console.log(e.eventPhase);
	console.log(e.timeStamp);
	console.log(e.bubbles);
	console.log(e.cancelable);
	
	//+ HEML EVENT METHOD
	//e.preventDefault(); - DOM, e.returnValue = false; - IE
	//e.stopPropagation(); - DOM, e.cancelBubble = false; - IE
	*/
	var jsonData = (_data != null && _data != undefined) ? _data : null;
	var bubbles = (_flag_bubbles == true) ? true : false;
	var cancelable = (_flag_cancelable == true) ? true : false;

	if(document.createEvent) { //DOM Event Module
		_customEvent = document.createEvent("Events");
		_customEvent.initEvent(_eventTypeStr, bubbles, cancelable);

		/*
		//add IE variable - returnValue
		_customEvent.returnValue = true; //active variable
		var flag_usePreventDefault = false;
		_customEvent.preventDefault = function() { //DOM override preventDefault method
			if(!flag_usePreventDefault) {
				flag_usePreventDefault = true;
				//_customEvent.preventDefault();
				_customEvent.returnValue = false;
			}
		}
		*/

		//add IE variable - cancelBubble
		_customEvent.cancelBubble = false; //active variable
		var flag_useStopPropagation = false;
		_customEvent.stopPropagation = function() { //DOM override stopPropagation method
			if(!flag_useStopPropagation) {
				flag_useStopPropagation = true;
				//_customEvent.stopPropagation();
				_customEvent.cancelBubble = true;
			}
		};
	}else{ // IE Event Module
		_customEvent = document.createEventObject();
		_customEvent.type = _eventTypeStr;
		_customEvent.bubbles = bubbles;
		_customEvent.cancelable = cancelable;
	}
	_customEvent.json = jsonData;
	//_customEvent.target = null; //Event target property setting is impossible
	//_customEvent.currentTarget = null; //Event currentTarget property is impossible
	return _customEvent;
};

/*
cancel default behavior

function validateForm(evt) {
	evt = evt || window.event;
	dragmove.event.EventUtil.cancelEvent(evt);
}
*/
dragmove.event.EventUtil.cancelEvent = function(_event) {
	_event = _event || window.event;
	if(_event.preventDefault) {
		event.preventDefault();
	}else{
		event.returnValue = false;
	}
};

/*
cancel event propagation

function clickButtonEventHandler(evt) {
	evt = evt || window.event;
	dragmove.event.EventUtil.cancelPropagation(evt);
}
*/
dragmove.event.EventUtil.cancelPropagation = function(_event) {
	_event = _event || window.event;
	if(_event.stopPropagation) {
		//firefox, chrome, safari, opera support
		_event.stopPropagation();
	}else{
		//IE support
		_event.cancelBubble = true;
	}
};

/*
dragmove.event.EventUtil.core
*/
dragmove.event.EventUtil.core = {
	BASE_HTML_EVENTS : [
		"click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup",
		"keydown", "keypress", "keyup",
		"focus", "blur", "abort", "change", "reset", "resize", "select", "error", "submit", "scroll",
		"load", "unload", "beforeunload"],
		
	iOS_EVENTS : ["ontouchstart", "ontouchmove", "ontouchend", "ontouchcancel", "onscroll"],
	
	isBaseHtmlEvent : function(_eventTypeStr) {
		var flag_isBaseHtmlEvent = false;
		for(var i=0, max=dragmove.event.EventUtil.core.BASE_HTML_EVENTS.length; i<max; ++i) {
			if(dragmove.event.EventUtil.core.BASE_HTML_EVENTS[i] == _eventTypeStr) {
				flag_isBaseHtmlEvent = true;
				break;
			}
		}
		return flag_isBaseHtmlEvent;
	},
	
	isiOSEvent : function(_eventTypeStr) {
		var flag_isiOSEvent = false;
		for(var i=0, max=dragmove.event.EventUtil.core.isiOSEvent.length; i<max; ++i) {
			if(dragmove.event.EventUtil.core.isiOSEvent[i] == _eventTypeStr) {
				flag_isiOSEvent = true;
				break;
			}
		}
		return flag_isiOSEvent;
	}
};
dragmove.event.EventUtil.core.customEventManager = {
	customEventParamObjArr : [],

	hasCustomEventListener : function(_target, _eventTypeStr, _listener, _flag_useCapture) {
		var flag_hasCustomEvent = false;
		var _customEventParamObj;
		for(var i=0,max=dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.length; i<max; ++i) {
			_customEventParamObj = dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr[i];
			if(_customEventParamObj.target != _target) continue;
			if(_customEventParamObj.type != _eventTypeStr) continue;
			if(_customEventParamObj.listener != _listener) continue;
			if(_customEventParamObj.flag_useCapture != _flag_useCapture) continue;
			flag_hasCustomEvent = true;
			break;
		}
		return flag_hasCustomEvent;
	},

	addCustomEventListener : function(_target, _customEventTypeStr, _listener, _flag_useCapture) {
		if(!dragmove.event.EventUtil.core.customEventManager.hasCustomEventListener(_target, _customEventTypeStr, _listener, _flag_useCapture)) {
			var _customEventParamObj = {target:_target, type:_customEventTypeStr, listener:_listener, flag_useCapture:_flag_useCapture};
			dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.push(_customEventParamObj);
			return true;
		}
		return false;
	},

	removeCustomEventListener : function(_target, _customEventTypeStr, _listener, _flag_useCapture) {
		if(dragmove.event.EventUtil.core.customEventManager.hasCustomEventListener(_target, _customEventTypeStr, _listener, _flag_useCapture)) {
			var flag_removeCustomEvent = false;
			var _customEventParamObj;
			for(var i=0,max=dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.length; i<max; ++i) {
				_customEventParamObj = dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr[i];
				if(_customEventParamObj.target != _target) continue;
				if(_customEventParamObj.type != _customEventTypeStr) continue;
				if(_customEventParamObj.listener != _listener) continue;
				if(_customEventParamObj.flag_useCapture != _flag_useCapture) continue;
				
				flag_removeCustomEvent = true;
				dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.splice(i, 1);
				break;
			}
			return flag_removeCustomEvent;
		}
		return false;
	},

	callAddedCustomEventListener : function(_target, _customEvent) { //DOM ȯ�濡���� capture �ܰ� ���� �Ϸ�.
		var _customEventParamObj;
		var _parentNode;
		var parentNodeArr;

		if(_target) {
			//capture Event Process
			parentNodeArr = getParentNodeArr(_target, _customEvent); //[target, target parent... , body, html, document]
			if(parentNodeArr.length > 0) {
				parentNodeArr.reverse();

				var flag_break = false;
				for(var i=0,imax=parentNodeArr.length; i<imax; ++i) {
					_parentNode = parentNodeArr[i];
					for(var j=0,jmax=dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.length; j<jmax; ++j) {
						_customEventParamObj = dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr[j];
						if(_customEventParamObj.target != _parentNode) continue;
						if(_customEventParamObj.type != _customEvent.type) continue;
						if(_customEventParamObj.flag_useCapture == true) { //check capture
							if(_customEventParamObj.listener) _customEventParamObj.listener(_customEvent);
							if(_customEvent.cancelBubble == true) flag_break = true; //if user call customEvent.stopPropagation Function in listener, use custom stopPropagation(set _customEvent.cancelBubble variable to true).
							break;
						}
					}
					if(flag_break) break;
				}
			}
			
			//target Event Process
			if(_customEvent.cancelBubble == true) return;
			for(var i=0,max=dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.length; i<max; ++i) {
				_customEventParamObj = dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr[i];
				if(_customEventParamObj.target != _target) continue;
				if(_customEventParamObj.type != _customEvent.type) continue;
				if(_customEventParamObj.listener) _customEventParamObj.listener(_customEvent);
				if(_customEvent.cancelBubble == true) break; //if user call customEvent.stopPropagation Function in listener, use custom stopPropagation(set _customEvent.cancelBubble variable to true).
			}
			
			//bubble Event Process
			if(_customEvent.cancelBubble == true) return;
			if(_customEvent.bubbles == true) { //if CustomEvent is bubble Event
				if(parentNodeArr.length > 0) {
					parentNodeArr.reverse(); //re-reverse parentNodeArr

					var flag_break = false;
					for(var i=0,imax=parentNodeArr.length; i<imax; ++i) {
						_parentNode = parentNodeArr[i];
						for(var j=0,jmax=dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr.length; j<jmax; ++j) {
							_customEventParamObj = dragmove.event.EventUtil.core.customEventManager.customEventParamObjArr[j];
							if(_customEventParamObj.target != _parentNode) continue;
							if(_customEventParamObj.type != _customEvent.type) continue;
							if(_customEventParamObj.flag_useCapture == false) {
								if(_customEventParamObj.listener) _customEventParamObj.listener(_customEvent);
								if(_customEvent.cancelBubble == true) flag_break = true; //if user call customEvent.stopPropagation Function in listener, use custom stopPropagation(set _customEvent.cancelBubble variable to true).
							}
						}
						if(flag_break) break;
					}
				}
			}
		}

		function getParentNodeArr(_target, _customEvent) {
			var parentNodeArr = [];
			accumulateParentNode(_target);
			return parentNodeArr;

			function accumulateParentNode(_target) {
				if(_target.parentNode) {
					parentNodeArr.push(_target.parentNode);
					accumulateParentNode(_target.parentNode);
				}
			}
		}
	}
};
/*
com.dragmove.event.EventUtil javascript File
*/
var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.event) dragmove.event = {};
if(!dragmove.event.EventUtil) dragmove.event.EventUtil = {};
if(!dragmove.event.EventUtil.util) dragmove.event.EventUtil.util = {};
if(!dragmove.event.EventUtil.check) dragmove.event.EventUtil.check = {};
if(!dragmove.event.EventUtil.core) dragmove.event.EventUtil.core = {};

var EventUtilDM;

if(!EventUtilDM) {
	EventUtilDM = dragmove.event.EventUtil;
}else{
	throw new Error("EventUtilDM already exists");
}

dragmove.event.EventUtil.util.getElementOffsetX = function($event) {
	var offsetX = 0;
	offsetX = $event.hasOwnProperty("offsetX") ? $event.offsetX : $event.layerX;
	return offsetX;
};

dragmove.event.EventUtil.util.getElementOffsetY = function($event) {
	var offsetY = 0;
	offsetY = $event.hasOwnProperty("offsetY") ? $event.offsetY : $event.layerY;
	return offsetY;
};


dragmove.event.EventUtil.check.available = function($object) {
	var flag = true;
	if($object == null || $object == undefined) return false;
	return flag;
};

dragmove.event.EventUtil.core = {
	BASE_HTML_EVENTS : [
	"click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup",
	"keydown", "keypress", "keyup",
	"focus", "blur", "abort", "change", "reset", "resize", "select", "error", "submit", "scroll",
	"load", "unload", "beforeunload"],
	
	iOS_EVENTS : ["ontouchstart", "ontouchmove", "ontouchend", "ontouchcancel", "onscroll"],
	
	isBaseHtmlEvent : function($eventTypeStr) {
		var flag_isBaseHtmlEvent = false;
		for(var i=0, max=dragmove.event.EventUtil.core.BASE_HTML_EVENTS.length; i<max; ++i) {
			if(dragmove.event.EventUtil.core.BASE_HTML_EVENTS[i] == $eventTypeStr) {
				flag_isBaseHtmlEvent = true;
				break;
			}
		}
		return flag_isBaseHtmlEvent;
	},
	
	isiOSEvent : function($eventTypeStr) {
		var flag_isiOSEvent = false;
		for(var i=0, max=dragmove.event.EventUtil.core.isiOSEvent.length; i<max; ++i) {
			if(dragmove.event.EventUtil.core.isiOSEvent[i] == $eventTypeStr) {
				flag_isiOSEvent = true;
				break;
			}
		}
		return flag_isiOSEvent;
	}
}

//set custom event manager
dragmove.event.EventUtil.controller = {};
dragmove.event.EventUtil.controller.CustomEventManager = function() {
	var _this = this;
	var dataArr = [];
	
	_this.addCustomEventListener = function($target, $eventTypeStr, $eventHandler) {
		var dataObj = {};
		dataObj.target = $target;
		dataObj.eventTypeStr = $eventTypeStr;
		dataObj.eventHandler = $eventHandler;
		dataArr.push(dataObj);
	};
	
	_this.hasCustomEventListener = function($target, $eventTypeStr, $eventHandler) {
		return getFlagHasCustomEventListener($target, $eventTypeStr, $eventHandler);
	};
	
	_this.removeCustomEventListener = function($target, $eventTypeStr, $eventHandler) {
		if(getFlagHasCustomEventListener($target, $eventTypeStr, $eventHandler)) {
			var _dataObj;
			for(var i=0, max=dataArr.length; i<max; ++i) {
				_dataObj = dataArr[i];
				if(dragmove.event.EventUtil.check.available(_dataObj)) {
					if(_dataObj.target != $target) continue;
					if(_dataObj.eventTypeStr != $eventTypeStr) continue;
					if(_dataObj.eventHandler != $eventHandler) continue;
					dataArr.splice(i, 1);
				}
				break;
			}
		}
	};
	
	_this.run = function($target, $customEvent) {
		var _dataObj;
		for(var i=0, max=dataArr.length; i<max; ++i) {
			_dataObj = dataArr[i];
			if(dragmove.event.EventUtil.check.available(_dataObj)) {
				if(_dataObj.target != $target) continue;
				if(_dataObj.eventTypeStr != $customEvent.type) continue;
			
				//call eventHandler Function
				//console.log("run customEventHandler");
				_dataObj.eventHandler.call(null, $customEvent);
			}
		}
	};
	
	function getFlagHasCustomEventListener($target, $eventTypeStr, $eventHandler) {
		var flag_hasCustomEventListener = false;
		var _dataObj;
		for(var i=0, max=dataArr.length; i<max; ++i) {
			_dataObj = dataArr[i];
			if(dragmove.event.EventUtil.check.available(_dataObj)) {
				if(_dataObj.target != $target) continue;
				if(_dataObj.eventTypeStr != $eventTypeStr) continue;
				if(_dataObj.eventHandler != $eventHandler) continue;
				
				flag_hasCustomEventListener = true;
				break;
			}
		}
		return flag_hasCustomEventListener;
	}
	
	return _this;
};
dragmove.event.EventUtil.customEventManager = new dragmove.event.EventUtil.controller.CustomEventManager();

//public function
dragmove.event.EventUtil.hasEventListener = function($target, $eventTypeStr, $eventListener, $flag_useCapture) {
	if($target) {
		if(dragmove.event.EventUtil.core.isBaseHtmlEvent($eventTypeStr)) {
			//
		}else{
			return dragmove.event.EventUtil.customEventManager.hasCustomEventListener($target, $eventTypeStr, $eventListener);
		}
	}
};

dragmove.event.EventUtil.addEventListener = function($target, $eventTypeStr, $eventListener, $flag_useCapture) {
	var flag_useCapture = ($flag_useCapture == true) ? true : false;
	if($target) {
		if(dragmove.event.EventUtil.core.isBaseHtmlEvent($eventTypeStr)) {
			if($target.addEventListener) {
				$target.addEventListener($eventTypeStr, $eventListener, flag_useCapture); //DOM base Html Event. support event capture
			}else{
				$target.attachEvent("on"+$eventTypeStr, $eventListener); //IE9 under base Html Event. don't support event capture
			}
		}else{
			//console.log("addEventListener customEvent");
			dragmove.event.EventUtil.customEventManager.addCustomEventListener($target, $eventTypeStr, $eventListener);
			
			
		}
	}
};

dragmove.event.EventUtil.removeEventListener = function($target, $eventTypeStr, $eventListener, $flag_useCapture) {
	var flag_useCapture = ($flag_useCapture == true) ? true : false;
	if($target) {
		if(dragmove.event.EventUtil.core.isBaseHtmlEvent($eventTypeStr)) {
			if($target.removeEventListener) {
				$target.removeEventListener($eventTypeStr, $eventListener, flag_useCapture); //DOM base Html Event. support event capture
			}else{
				$target.detachEvent("on"+$eventTypeStr, $eventListener); //IE base Html Event. don't support event capture
			}
		}else{
			//console.log("removeEventListener customEvent");
			dragmove.event.EventUtil.customEventManager.removeCustomEventListener($target, $eventTypeStr, $eventListener);
			
			
		}
	}
};

dragmove.event.EventUtil.dispatchCustomEvent = function($target, $customEvent) {
	var target = $target;
	var customEvent = $customEvent;
	dragmove.event.EventUtil.customEventManager.run(target, customEvent);
};

dragmove.event.EventUtil.preventDefault = function($event) {
	if(dragmove.event.EventUtil.check.available($event)) {
		$event = ($event) ? $event : window.event;
		$event.preventDefault();
	}
};
		
dragmove.event.EventUtil.CustomEvent = function($eventTypeStr, $data, $flag_bubbles, $flag_cancelable) {
	var _customEvent = this;
	_customEvent.data = null;
	
	var jsonData = ($data != null && $data != undefined) ? $data : null;
	var bubbles = ($flag_bubbles == true) ? true : false;
	var cancelable = ($flag_cancelable == true) ? true : false;
	
	if(document.createEvent) {
		//console.log("DOM3 Events")
		_customEvent = document.createEvent("Event");
		_customEvent.initEvent($eventTypeStr, bubbles, cancelable);
	}else{
		//console.log("not DOM3 Events")
		
	}
	
	_customEvent.data = $data;
	return _customEvent;
};
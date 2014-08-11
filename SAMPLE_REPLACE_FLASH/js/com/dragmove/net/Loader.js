/*
com.dragmove.net.Loader.DataLoader javascript File
*/
var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.net) dragmove.net = {};
if(!dragmove.net.Loader) dragmove.net.Loader = {};

var LoaderDM;

if(!LoaderDM) {
	LoaderDM = dragmove.net.Loader;
}else{
	throw new Error("LoaderDM already exists");
}

dragmove.net.Loader.DataLoader = function() {
	var _this = this;
	
	var _xhr;
	var sendDataObject = null;
	
	var responseHeaderContentLength = 0;
	
	var returnResponseText = "";
	var returnResponseXML = null;
	var returnJsonData = null;
	
	//public method
	_this.getResponseText = function() {
		return returnResponseText;
	};
	
	_this.getResponseXML = function() {
		return returnResponseXML;
	};
	_this.getJson = function() {
		return returnJsonData;
	};
	
	_this.destroy = function() {
	};
	
	_this.init = function() {
		_xhr = createXMLHttpObject();
	};
	
	_this.addURL = function($httpMethodStr, $dataURLStr, $flag_asynchronous) {
		if(!_xhr) return;
		_xhr.onreadystatechange = xhrOnReadyStateChange;
		setHttpMethod(_xhr, $httpMethodStr, $dataURLStr, $flag_asynchronous);
	};
	
	_this.setSendPostData = function($sendJsonTypeData) {
		if($sendJsonTypeData) {
			sendDataObject = $sendJsonTypeData;
		}
	};
	
	_this.start = function() {
		if(sendDataObject) {
			var sendDataStr;
			var dataPairStrArr = [];
			var value = "";
			
			//var whiteSpaceRegExp = /%20/g;
			for(var key in sendDataObject) {
				value = sendDataObject[key];
				dataPairStrArr.push(encodeURIComponent(key).replace(/%20/g, "+") + '=' + encodeURIComponent(value).replace(/%20/g, "+"));
			}
			sendDataStr = dataPairStrArr.join("&");
			_xhr.send(sendDataStr);
			
		}else{
			_xhr.send(null);
		}
	};
	
	//private method
	function createXMLHttpObject() {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	};
	
	function setHttpMethod($xmlHttpRequest, $httpMethodStr, $dataURLStr, $flag_asynchronous) {
		switch($httpMethodStr) {
			case "GET" :
				$xmlHttpRequest.open("GET", $dataURLStr, $flag_asynchronous);
			break;
			
			case "POST" :
				$xmlHttpRequest.open("POST", $dataURLStr, $flag_asynchronous);
				$xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			break;
		}
	}
	
	function xhrOnReadyStateChange() {
		switch(_xhr.readyState) {
			case 0 : //request not initialized 
			break;
			
			case 1 : //server connection established
			break;
			
			case 2 : //request received
				responseHeaderContentLength = _xhr.getResponseHeader ("Content-Length");
			break;
			
			case 3 : //processing request
			break;
			
			case 4 : //request finished and response is ready 
				if(_xhr.status == 200) {
					var jsonObject = null;
					if(_xhr.responseXML) {
						console.log("XML DATA")
						var xml = _xhr.responseXML;
						returnResponseXML = xml;
						
						var jsonStr = xml2json(xml, " "); 
						jsonObject = eval("(" + jsonStr + ")");
					}else{
						console.log("CSV/JSON DATA")
						returnResponseText = _xhr.responseText;
						try {
							jsonObject = eval("(" + _xhr.responseText + ")");
						}catch(error) {
							console.log("create jsonObject error");
						}
					}
					returnJsonData = jsonObject;
				}else{
					console.log("XMLHttpRequest error");
				}
				
				var paramObj = null;
				var _customEvent = new EventUtilDM.CustomEvent(dragmove.net.Loader.DataLoader.EVENT_COMPLETE, paramObj);
				console.log("_customEvent :", _customEvent);
				
				EventUtilDM.dispatchCustomEvent(_this, _customEvent); //document.dispatchEvent(_customEvent);
			break;
		}
	}
	
	return _this;
};
dragmove.net.Loader.DataLoader.EVENT_COMPLETE = "dragmove.net.Loader.DataLoader.EVENT_COMPLETE";

/*
//1. LOAD XML GET METHOD
var dataURL = "./data/xml/sample.xml?data1=dragmove&data2=1";
var flag_asynchronous = true; //true:비동기, false:동기
var _dataLoader = new dragmove.net.DataLoader();
_dataLoader.init();
_dataLoader.addURL("GET", dataURL, flag_asynchronous);
_dataLoader.start();

//2. LOAD XML POST METHOD
var dataURL = "./data/xml/sample.xml";
var flag_asynchronous = true; //true:비동기, false:동기
var sendData = {};
sendData.data1 = "dragmove";
sendData.data2 = 1;

var _dataLoader = new dragmove.net.DataLoader();
_dataLoader.init();
_dataLoader.addURL("POST", dataURL, flag_asynchronous);
_dataLoader.setSendPostData(sendData);
_dataLoader.start();

//3. LOAD JSON POST METHOD
var dataURL = "./data/json/sample.php";
var flag_asynchronous = true; //true:비동기, false:동기
var sendData = {};
sendData.data1 = "dragmove";
sendData.data2 = 1;

var _dataLoader = new dragmove.net.DataLoader();
_dataLoader.init();
_dataLoader.addURL("POST", dataURL, flag_asynchronous);
_dataLoader.setSendPostData(sendData);
_dataLoader.start();
*/

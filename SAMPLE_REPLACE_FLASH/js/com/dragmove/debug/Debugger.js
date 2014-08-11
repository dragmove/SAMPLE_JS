/*
com.dragmove.debug.Debugger javascript File
*/
var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.debug) dragmove.debug = {};
if(!dragmove.debug.Debugger) dragmove.debug.Debugger = {};

var DebuggerDM;

if(!DebuggerDM) {
	DebuggerDM = dragmove.debug.Debugger;
}else{
	throw new Error("DebuggerDM already exists");
}

//Constructor 誘몄���
/*
	var _debugger = new dragmove.debug.Debugger();
	_debugger.init();
	document.body.appendChild(_debugger);

	_debugger.log( logTargetContents );
*/

dragmove.debug.Debugger = function() {
	//public variables
	var _constructorDiv = document.createElement("div");
	_constructorDiv.style.position = "relative";
	_constructorDiv.style.overflow = "scroll";
	//_constructorDiv.style.margin = 0;
	//_constructorDiv.style.padding = 0;	
	
	//private variables
	var historyDivArr;

	//public function
	_constructorDiv.destroy = function(_object) {
	};

	_constructorDiv.init = function(_object) {
		historyDivArr = [];
		_constructorDiv.style.border = "1px solid #000";
	};

	/*
	_constructorDiv.setFont = function(_left, _top) {
	};
	*/
	
	_constructorDiv.setPosition = function(_left, _top) {
		_constructorDiv.style.left = _left + "px";
		_constructorDiv.style.top = _top + "px";
	};

	_constructorDiv.setSize = function(_width, _height) {
		_constructorDiv.style.width = _width + "px";
		_constructorDiv.style.height = _height + "px";
	};

	_constructorDiv.log = function(_logMessageStr) {
		var _historyDiv = document.createElement("div");
		var _textNode = document.createTextNode(_logMessageStr);
		_historyDiv.appendChild(_textNode);
		_constructorDiv.appendChild(_historyDiv);

		historyDivArr.push(_historyDiv);
		/*
		if(typeof _logMessageStr == "string") {
			_textNode.display = "block";
			_constructorDiv.appendChild(_textNode);
		}
		*/
	};

	//private function
	function privateFunction() {
	}

	return _constructorDiv;
};

/*
html,
body { height:100%; margin:0; padding:0; }
body { margin:0; padding:0; color:#666; font-style:normal; font-size:12px; font-family:'���', dotum, verdana, arial, applegothic, sans-serif; line-height:1.5;  }
div, ul, ol, li, dl, dt, dd, form, fieldset, input, button, p, h1, h2, h3, h4, h5, h6, blockquote, iframe, th, td { margin:0; padding:0; }
img { border:0; }
li { list-style:none; }
button { background:transparent; cursor:pointer; vertical-align:middle; margin:0; }


i, em, u, cite { font-style:normal; }
 

a { color:#666; font-family:'���', dotum, verdana, arial, applegothic, sans-serif; font-size:12px; text-decoration:none; }
a:hover { text-decoration:underline; }


table { table-layout:fixed; border-collapse:collapse; border-spacing:0; width:100%; }
th,
td { border-collapse:collapse; }
legend, caption, hr { display:none; }


form { display:inline; }
select, input, textarea { color:#666; font-family:'���', dotum, verdana, arial, applegothic, sans-serif; font-size:inherit; vertical-align:middle; }
fieldset, blockquote, iframe, button { border:none; }
fieldset { display:inline; }
.input_txt { height:19px; padding:1px 0 0 3px; font:12px/18px '���',Dotum; background:#fff; border-top:1px solid #a7a7a7; border-right:1px solid #d7d7d7; border-bottom:1px solid #e5e5e5; border-left:1px solid #878787; }
.input_file { height:22px; font:12px/18px '���',Dotum; color:#666; background:#fff; border-top:1px solid #a7a7a7; border-right:1px solid #d7d7d7; border-bottom:1px solid #e5e5e5; border-left:1px solid #878787; }
.input_textarea { padding:3px; font:12px/18px '���',Dotum; color:#666; background:#fff; border-top:1px solid #a7a7a7; border-right:1px solid #d7d7d7; border-bottom:1px solid #e5e5e5; border-left:1px solid #878787; overflow:auto; overflow-x:hidden; }


.f_clear:after { content:" "; height:0; display:block; visibility:hidden; clear:both; }
* html .f_clear { height:1%; }
.f_clear { display:block; min-height:1%; }
*/

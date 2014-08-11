var dragmove;
if(!dragmove) dragmove = {};
if(!dragmove.effect) dragmove.effect = {};
if(!dragmove.effect.EffectUtil) dragmove.effect.EffectUtil = {};

var EffectUtilDM;

if(!EffectUtilDM) {
	EffectUtilDM = dragmove.effect.EffectUtil;
}else{
	throw new Error("EffectUtilDM already exists");
}

/*
Text TypeWrite Motion
(html tag String can't apply typeWriter motion.)

<body>
	<div id="typeWriterMotionContainer">target textNode</div>
</body>

var typeStr = "매일 자신이 하기 싫은 일을 2가지 하는 것은 영혼을 위해서는 좋다. - 달과 6펜스";  
var _textNode = document.getElementById("typeWriterMotionContainer").firstChild; //select textNode

var _typeWriterEffect = new dragmove.effect.EffectUtil.TypeWriter(typeStr, _textNode, 40, false);
dragmove.event.EventUtil.addEventListener(_typeWriterEffect, _typeWriterEffect.EFFECT_COMPLETE, completeTypeWriterEffect);
_typeWriterEffect.start();

function completeTypeWriterEffect() {
	console.log("completeTypeWriterEffect");
};
*/
dragmove.effect.EffectUtil.TypeWriter = function(_txt, _textNode, _typingTimerGap, _flag_startTimer) {
	var _this = this;

	//Event
	_this.EFFECT_COMPLETE = "com.dragmove.effect.effectUtil.TypeWriter.EFFECT_COMPLETE";
	
	//public function
	_this.destroy = function(_object) {
		if(_timer) {
			_timer.stop();
			_timer.destroy();
			_timer = null;
		}
		textArr = null;
		textIndex = 0;
		motionChaIndex = 0;
		accumulateStr = "";
		flag_useTimerExperience = false;
		flag_motionComplete = false;
	};
	
	_this.start = function(_flag_startMotionFromBeginning) {
		if(!flag_useTimerExperience) flag_useTimerExperience = true;
		if(_flag_startMotionFromBeginning) {
			flag_motionComplete = false;
			textIndex = 0;
			motionChaIndex = 0;
			accumulateStr = "";
			_txtNode.nodeValue = "";
			if(_timer) {
				_timer.stop();
				_timer.start();
			}
		}else{
			if(_timer) {
				_timer.stop();
				_timer.start();
			}
		}
	};

	_this.stop = function() {
		if(_timer) _timer.stop();
	};
	
	//variables
	var _timer;
	var _txtNode;
	var textArr;
	var textIndex = 0;
	var motionChaIndex = 0;
	var accumulateStr = "";
	var flag_useTimerExperience = false;
	var flag_motionComplete = false;

	//implement
	if(_txt == undefined || _txt == "") {
		//if(console) console.log("[com.dragmove.effect.effectUtil.TypeWriter] TypeWriter effect를 실행하기 위한 _txt value가 존재하지 않습니다.");
		return null;
	}
	_txtNode = _textNode;
	textArray = dragmove.util.StringUtil.breakSetenceStr(_txt); 
	
	if(_timer) {
		_timer.stop();
		_timer.destroy();
		_timer = null;
	}
	_timer = new dragmove.util.ControlUtil.SimpleTimer(_typingTimerGap, this, performTypingMotion);
	if(_flag_startTimer) _timer.start();
	
	//private function
	function performTypingMotion(){
		if(flag_motionComplete) {
			//console.log("[com.dragmove.effect.effectUtil.TypeWriter] TypeWriter effect가 start() Function 사용 이후, 진행 완료된 상태입니다.");
			flag_useTimerExperience = false;
			if(_timer) _timer.stop();
			return;
		}
		var motionChaArr = textArray[textIndex];
		var characterLength = motionChaArr.length;
		var _str = motionChaArr[motionChaIndex];
		_txtNode.nodeValue = accumulateStr + _str;

		motionChaIndex++;
		if(characterLength <= motionChaIndex) {
			accumulateStr += _str;
			motionChaIndex = 0;
			textIndex++;
			if(textIndex >= textArray.length) {
				flag_useTimerExperience = false;
				flag_motionComplete = true;
				if(_timer) _timer.stop();
				
				dragmove.event.EventUtil.dispatchCustomEvent(_this, new dragmove.event.EventUtil.CustomEvent(_this.EFFECT_COMPLETE)); //dispatch custom event
			}
		}
	}

	return _this;
};
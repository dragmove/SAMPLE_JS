/*
   com.dragmove.control.AbstractNaviDepth1
> com.dragmove.base.AbstractControllableDisplayObject javascript File
*/

//+ Constructor
function AbstractNaviDepth1() {
	/*
	//public variables
	this.index; //setIndex(), getIndex()
	this.extraObject; //setExtraObject(), getExtraObject()
	this._divContainer; //setDivContainer(), getDivContainer()
	*/
	
	//const
	this.GAP_INTERVAL = 1000;

	//variables
	this.intervalID = null;
	this.currentStatusDepth1 = 0;
	this.activateDepth1 = 0;
}

AbstractNaviDepth1.prototype = new AbstractControllableDisplayObject();
//AbstractNaviDepth1.prototype.constructor = AbstractNaviDepth1;

//+ Public get method
AbstractNaviDepth1.prototype.getActivateDepth1 = function() {
	return this.activateDepth1;
};
AbstractNaviDepth1.prototype.getCurrentStatusDepth1 = function() {
	return this.currentStatusDepth1;
};

//+ Public method
AbstractNaviDepth1.prototype.activateNavi = function(_d1_index) {
	this.displayNaviStatus(_d1_index);
	this.activateDepth1 = this.currentStatusDepth1 = _d1_index;
};

AbstractNaviDepth1.prototype.init = function(_object) {
	console.log("AbstractNaviDepth1.prototype.init(_object); - override detail define");
};

AbstractNaviDepth1.prototype.destroy = function(_object) {
	if(this.intervalID != null) {
		clearInterval(this.intervalID);
		intervalID = null;
	}
	this.destroyDetail(_object);
};

//+ Override Protected method
AbstractNaviDepth1.prototype.destroyDetail = function(_object) {
	console.log("AbstractNaviDepth1.prototype.destroyDetail(_object); - override detail define");
};

AbstractNaviDepth1.prototype.rollOverDetailDepth1BtnInteraction = function(_$jqueryMouseEvent) {
	console.log("AbstractNaviDepth1.prototype.rollOverDetailDepth1BtnInteraction(_$jqueryMouseEvent); - must override detail define");
	//this.currentStatusDepth1 = parseInt(_$jqueryMouseEvent.data.index);
};

AbstractNaviDepth1.prototype.rollOutDetailDepth1BtnInteraction = function(_$jqueryMouseEvent) {
	console.log("AbstractNaviDepth1.prototype.rollOutDetailDepth1BtnInteraction(_$jqueryMouseEvent); - override detail define");
};

AbstractNaviDepth1.prototype.clickDetailDepth1BtnInteraction = function(_$jqueryMouseEvent) {
	console.log("AbstractNaviDepth1.prototype.clickDetailDepth1BtnInteraction(_$jqueryMouseEvent); - override detail define");
};

AbstractNaviDepth1.prototype.displayNaviStatus = function(_d1_index) {
	console.log("AbstractNaviDepth1.prototype.displayNaviStatus(_d1_index); - must override detail define");
};

AbstractNaviDepth1.prototype.depth1BtnMouseInteraction = function(_$jqueryMouseEvent) {
	var _scope = _$jqueryMouseEvent.data.scope;

	switch(_$jqueryMouseEvent.type) {
		case 'mouseover' : //rollover
			if(_scope.intervalID != null) {
				clearInterval(_scope.intervalID);
				intervalID = null;
			}
			_scope.rollOverDetailDepth1BtnInteraction(_$jqueryMouseEvent);	
			_scope.displayNaviStatus(_scope.currentStatusDepth1);
		break;

		case 'mouseout' : //rollout
			_scope.setInternalInterval(_scope, _scope.GAP_INTERVAL);
			_scope.rollOutDetailDepth1BtnInteraction(_$jqueryMouseEvent);
		break;

		case 'click' : //click
			_scope.clickDetailDepth1BtnInteraction(_$jqueryMouseEvent);
		break;
	}
};


//+ Private method
AbstractNaviDepth1.prototype.timerInitializationAction = function() {
	if(this.intervalID != null) {
		clearInterval(this.intervalID);
		this.intervalID = null;
	}
	this.displayNaviStatus(this.activateDepth1);
	this.currentStatusDepth1 = this.activateDepth1;
};

AbstractNaviDepth1.prototype.intervalInitialization = function() {
	if(this.intervalID != null) {
		clearInterval(this.intervalID);
		this.intervalID = null;
	}
	this.timerInitializationAction();
};

AbstractNaviDepth1.prototype.setInternalInterval = function(_scope, _delayTime) {
	if(this.intervalID != null) {
		clearInterval(this.intervalID);
		this.intervalID = null;
	}
	this.intervalID = setInterval( function() { _scope.intervalInitialization(); }, _scope.GAP_INTERVAL);
};
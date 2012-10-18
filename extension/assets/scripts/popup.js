logit('[Init]popup.js',4);
/********************************* MAIN *********************************/
window.onload = function(){

	if(option('forcebackground')){
		document.getElementById('option_forcebackground').className = "item checked";
	}

	document.getElementById('option_forcebackground').onclick = function(){
		option_toggle('forcebackground');
	};

};

/********************************* POPUP *********************************/
function option_toggle(op){
	if(option(op)){
		logit('[Option]'+op+' turn False',1);
		option(op,'false');
		document.getElementById('option_'+op).className = 'item';
	}else{
		logit('[Option]'+op+' turn True',1);
		option(op,'true');
		document.getElementById('option_'+op).className = 'item checked';
	}
}
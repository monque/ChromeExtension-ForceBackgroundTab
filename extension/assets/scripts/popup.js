function init(){
	//OPTION
	if(option('forcebackground')){
		document.getElementById('option_forcebackground').className = "item checked";
	}
}

function toggleoption(op){
	if(option(op)){
		option(op,'false');
		document.getElementById('option_'+op).className = 'item';
	}else{
		option(op,'true');
		document.getElementById('option_'+op).className = 'item checked';
	}
}

init();
document.getElementById('option_forcebackground').onclick = function(){toggleoption('forcebackground');};
/********************************* GLOBAL *********************************/
function option(key,value){
	if(value === undefined){
		value = localStorage['option_'+key];
		if(value == 'true') value = true;
		else if(value == 'false') value = false;
		return value;
	}else{
		localStorage['option_'+key] = value;
	}
}

function data(key,value){
	var dom = document.getElementById(key);
	if(!dom && value !== undefined && value !== null){
		dom = document.createElement('i');
		dom.id = key;
		document.getElementById('datawrap').appendChild(dom);
	}

	if(value === undefined){
		return dom ? dom.value : false;
	}else{
		if(value === null){
			dom.parentElement.removeChild(dom);
		}else{
			dom.value = value;
		}
	}
}

/********************************* DEBUG *********************************/
var debug_level = 1;//0,1,2,4
function logit(message,level){
	if((level & debug_level) == level){
		console.log(message);
	}
}
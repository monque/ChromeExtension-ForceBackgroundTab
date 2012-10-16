/* ++++++++++++++++++++++++++++++++++++++++++++++++ GLOBAL  ++++++++++++++++++++++++++++++++++++++++++++++++ */
function option(key,value){
	if(value){
		localStorage['option_'+key] = value;
	}else{
		value = localStorage['option_'+key];
		if(value == 'true') value = true;
		else if(value == 'false') value = false;
		return value;
	}
}

function data(key,value){
	var dom = document.getElementById(key);
	if(value){
		if(!dom){
			newdata = document.createElement('i');
			newdata.id = key;
			document.getElementById('datawrap').appendChild(newdata);
			dom = document.getElementById(key);
		}
		dom.value = value;
	}else{
		if(!dom){
			return false;
		}
		return dom.value;
	}
}

function tab_focuson(tabid){
	try {
		chrome.tabs.update(tabid,{active:true});
	} catch (e) {
		alert(e+"\n"+'tabid:'+tabid);
	}
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++ DEBUG  ++++++++++++++++++++++++++++++++++++++++++++++++ */
function debug_output(obj,r){
	var string  = '';
	for(var p in obj){
		var type = typeof(obj[p]);
		if(type == "function"){
			string += type+': '+p+"\n";
		}else if(type == 'object'){
			string += type+': '+p;
			var objectstring = debug_output(obj[p],true);
			if(objectstring){
				string += "\n[\n    "+objectstring+"]\n";
			}else{
				string += " []\n";
			}
		}else{
			string += type+': '+p+" = "+obj[p]+"\n";
		}
	}
	if(r){
		string = string.replace(/\n/g,"\n    ");
	}else{
		string = 'typeof(obj) = '+ obj +' (' + typeof(obj) + ")\n" + string;
	}
	string = string.replace(/    \]/g,"]");
	return string;
}
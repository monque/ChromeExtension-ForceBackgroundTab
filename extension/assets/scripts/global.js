/* ++++++++++++++++++++++++++++++++++++++++++++++++ GLOBAL  ++++++++++++++++++++++++++++++++++++++++++++++++ */
function tab_focuson(tabid){
  try {
  	chrome.tabs.update(tabid,{selected:true});
  } catch (e) {
    alert(e+"\n"+'tabid:'+tabid);
  }
}

function option(option,value){
	if(value){
		localStorage['option_'+option] = value;
	}else{
		value = localStorage['option_'+option];
		value = value == 'true' ? true : false;
		return value;
	}
}

function data(key,value){
	dom = document.getElementById(key);
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

/* ++++++++++++++++++++++++++++++++++++++++++++++++ DEBUG  ++++++++++++++++++++++++++++++++++++++++++++++++ */
function debug_output(obj,r){
	var string  = '';
	for(var p in obj){
		type = typeof(obj[p]);
		if(type == "function"){
			string += type+': '+p+"\n";
		}else if(type == 'object'){
			string += type+': '+p;
			objectstring = debug_output(obj[p],true);
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
	}
	string = string.replace(/    \]/g,"]");
	return string;
}
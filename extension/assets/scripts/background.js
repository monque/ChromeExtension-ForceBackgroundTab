logit('[Init]background.js',2);
/********************************* MAIN *********************************/
window.onload = function(){

	if(option('forcebackground') === undefined){
		option('forcebackground','true');
	}

	//Func_Forcebackground
	func_forcebackground_init();

}

chrome.extension.onMessage.addListener(function(request,sender,sendResponse){
	logit('[Message]from '+(sender.tab ? sender.tab.url : 'extension'),4);
	if(request.action == 'open'){
		logit('[Dom]'+request.href+' clicked',2);
		func_forcebackground_open(request);
		sendResponse({action:request.action,result:true});
	}
});

/********************************* FUNC_FORCEBACKGROUND *********************************/
function func_forcebackground_init(){

	//Save default Tabid
	chrome.tabs.query({'active':true},function(result){
		for(var p in result){
			var tab = result[p];
			data('tab_cur_'+tab.windowId,tab.id);
		}
	});

	//EVENT_window_remove
	chrome.windows.onRemoved.addListener(function(windowId){
		logit('[Window]'+windowId+' removed',2);
		data('tab_cur_'+windowId,null);
	});

	//EVENT_tab_change
	chrome.tabs.onActivated.addListener(function(activeInfo){
		logit('[Tab]'+activeInfo.windowId+'_'+activeInfo.tabId+' activated',4);
		data('tab_cur_'+activeInfo.windowId,activeInfo.tabId);
	});

	//EVENT_tab_create
	chrome.tabs.onCreated.addListener(function(tab){
		logit('[Tab]'+tab.windowId+'_'+tab.id+' '+tab.url+' created',2);
		if(option('forcebackground')){
			var curid = data('tab_cur_'+tab.windowId);
			if(
				curid
				&&
				curid != tab.id
				&&
				tab.url.indexOf('chrome://') == -1
				&&
				tab.url.indexOf('chrome-search://') == -1
				&&
				tab.url.indexOf('chrome-devtools:') == -1
				&&
				tab.url.indexOf('about:') == -1
			){
				logit('[Tab]'+tab.windowId+'_'+tab.id+' -> '+tab.windowId+'_'+curid+' update',2);
				chrome.tabs.update(curid,{'active':true});
			}
		}
	});

}

function func_forcebackground_open(msg){
	chrome.tabs.query({'active':true,'currentWindow':true},function(result){
		var tab = result[0];
		chrome.tabs.create({
			windowId:tab.windowId,
			index:tab.index + 1,
			url:msg.href,
			active:option('forcebackground') ? false : true
		});
	});
}
//Initialize
if(typeof(option('forcebackground')) == 'undefined'){
	option('forcebackground','true');
}

chrome.windows.getCurrent({'populate':true},function(window){
	for(var p in window['tabs']){
		var tab = window['tabs'][p];
		if(tab['active']){
			var tabid = tab['id'];
			break;
		}
	}
	data('cur_tabid_'+window['id'],tabid);
});

//EVENT_tab_change
chrome.tabs.onActivated.addListener(function(activeInfo){
	data('cur_tabid_'+activeInfo.windowId,activeInfo.tabId);
});

//EVENT_tab_create
chrome.tabs.onCreated.addListener(function(tab){
	if(option('forcebackground')){
		cur_tabid = data('cur_tabid_'+tab.windowId);
		if(
			cur_tabid
			&&
			cur_tabid != tab.id
			&&
			tab.url.indexOf('chrome://') == -1
			&&
			tab.url.indexOf('about:') == -1
			&&
			tab.url.indexOf('chrome-devtools:') == -1
		){
			tab_focuson(cur_tabid);
		}
	}
});
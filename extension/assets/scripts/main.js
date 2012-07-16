//INIT
if(!localStorage['option_forcebackground']){
	option('forcebackground','true');
}

//EVENT_tab_change
chrome.tabs.onSelectionChanged.addListener(function(tabid,selectInfo){
	data('cur_tabid_'+selectInfo.windowId,tabid);
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
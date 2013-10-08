console.info('background.js');


/********************************* FUNC_FORCEBACKGROUND *********************************/
var func_fbg = {
    'dict': {},
    'manual_next': false,
    'init': function() {
        // First run
        if (option('forcebackground') === undefined)
            option('forcebackground', 'true');

        // Save default Tabid
        chrome.tabs.query({active: true}, function(result) {
            for (var p in result) {
                var tab = result[p];
                func_fbg.dict[tab.windowId] = tab.id;
            }
        });

        // EVENT_window_remove
        chrome.windows.onRemoved.addListener(function(windowId) {
            console.debug('Window onRemoved', windowId);
            delete func_fbg.dict[windowId];
        });

        // EVENT_tab_active
        chrome.tabs.onActivated.addListener(function(activeInfo) {
            console.debug('Tab onActivated', activeInfo);
            func_fbg.dict[activeInfo.windowId] = activeInfo.tabId;
        });

        // EVENT_tab_update
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            console.debug('Tab onUpdated', tabId, changeInfo);
        });

        // EVENT_tab_create
        chrome.tabs.onCreated.addListener(function(tab) {
            if (!option('forcebackground'))
                return;

            // skip open with Ctrl or Middle Mouse Button
            // If tabs.create called with prop.selected = true, prop.active =
            // false. Argument tab.active is still false, so we have to test
            // prop.selected although it is deprecated.
            if (!tab.active && !tab.selected)
                return;

            console.info('Tab onCreated', tab, func_fbg.manual_next);
            if (func_fbg.manual_next) {
                func_fbg.manual_next = false;
                return;
            }

            var last_tabid = func_fbg.dict[tab.windowId];
            if (!last_tabid || last_tabid == tab.id)
                return;
            if (func_fbg.is_exception(tab))
                return console.info('Tab is exception', tab);

            console.info('Tab Active', last_tabid);
            chrome.tabs.update(last_tabid, {active: true});
        });

        // EVENT_message
        chrome.extension.onMessage.addListener(func_fbg.on_message);
    },
    'is_exception': function(tab) {
        return (tab.url.indexOf('chrome:') == 0 ||
                tab.url.indexOf('chrome-search:') == 0 ||
                tab.url.indexOf('chrome-devtools:') == 0 ||
                tab.url.indexOf('about:') == 0 ||
                tab.url.indexOf('sourceid=chrome-instant') > -1);
    },
    'open': function(prop) {
        func_fbg.manual_next = true;
        chrome.tabs.create(prop);
    },
    'on_message': function(request, sender, sendResponse) {
        console.debug('Message', request, sender);
        if (request.action != 'open')
            return;
        func_fbg.open({
            url: request.href,
            active: option('forcebackground') ? false : true,
        });
        sendResponse({action: request.action, result: true});
    },
};


/********************************* MAIN *********************************/
window.onload = function() {
	func_fbg.init();
}

/*
 * TODO: how to avoid blink
 *
 * ref
 *     src/ui/webui/resources/js/cr/link_controller.js on line 144
 *     src/chrome/browser/extensions/api/tabs/tabs_api.cc on line 948
 *
 * Step
 *     chrome.tabs.create() @link_controller.js:144
 *     active ? NEW_FOREGROUND_TAB : NEW_BACKGROUND_TAB; @tabs_api.cc:1056
 *
 *
 * Step L-click
 *     1.create a empty tab
 *     2.active (by Chrome)
 *     3.active to openerId (by Extension)
 *     4.update url, status
 *
 * Step M-click or L-click + Ctrl
 *     1.create a empty tab
 *     4.update url, status
 */

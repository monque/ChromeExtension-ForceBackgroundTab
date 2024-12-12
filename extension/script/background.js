import { getOption, setOption } from './core.js';

console.info('background.js');

/********************************* FUNC_FORCEBACKGROUND *********************************/
var func_fbg = {
    'dict': {},
    'manual_next': false,
    'init': function() {
        // First-time default option
        getOption('forcebackground', function (value) {
          if (value === undefined) {
            setOption('forcebackground', true);
          }
        });

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
            if (!getOption('forcebackground'))
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

        // EVENT_message - Updated for V3
        chrome.runtime.onMessage.addListener(func_fbg.on_message);
    },
    'is_exception': function(tab) {
        let url = 'pendingUrl' in tab ? tab.pendingUrl : tab.url;
        return (url.indexOf('chrome:') == 0 ||
                url.indexOf('chrome-search:') == 0 ||
                url.indexOf('chrome-devtools:') == 0 ||
                url.indexOf('chrome-extension:') == 0 ||
                url.indexOf('about:') == 0 ||
                url.indexOf('sourceid=chrome-instant') > -1);
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
            active: getOption('forcebackground') ? false : true,
        });
        return true; // For async sendResponse in V3
    },
};

/********************************* MAIN *********************************/
func_fbg.init();
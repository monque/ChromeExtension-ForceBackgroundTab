console.info('core.js');


/********************************* GLOBAL *********************************/
var options = {};

function loadOptions(callback) {
  chrome.storage.sync.get(['options'], function(result) {
    options = result.options;
    if (options === undefined) {
      options = {};
    }

    console.log('Options loaded');
    console.log(options);

    if (typeof callback == 'function') {
      callback(options);
    }
  });
}

function getOption(key, callback) {
  if (callback === undefined) {
    return options[key];
  }

  loadOptions(function(options) {
    value = key in options ? options[key] : undefined;
    callback(value);
  });
}

function setOption(key, value) {
  options[key] = value;

  chrome.storage.sync.set({'options': options}, function() {
    console.log('Options saved, ' + key + '=' + value);
  });
}

chrome.storage.onChanged.addListener(function (changes, areaName) {
  loadOptions();
});

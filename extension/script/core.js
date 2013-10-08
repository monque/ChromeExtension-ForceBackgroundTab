console.info('core.js');


/********************************* GLOBAL *********************************/
function option(key, value) {
	if (value === undefined) {
		value = localStorage['option_'+key];
		if (value == 'true')
            value = true;
		else if(value == 'false')
            value = false;
		return value;
	} else {
		localStorage['option_'+key] = value;
        console.info('Option', key, value);
	}
}

// Disable debug
console.debug = function() {};

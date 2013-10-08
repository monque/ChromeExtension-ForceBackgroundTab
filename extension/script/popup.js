console.info('popup.js');


/********************************* POPUP *********************************/
function option_toggle(op) {
	if (option(op)) {
		option(op, 'false');
		document.getElementById('option_' + op).className = 'item';
	} else {
		option(op,'true');
		document.getElementById('option_' + op).className = 'item checked';
	}
}


/********************************* MAIN *********************************/
window.onload = function() {
	document.getElementById('option_forcebackground').onclick = function() {
		option_toggle('forcebackground');
	};
	if (option('forcebackground'))
		document.getElementById('option_forcebackground').className = "item checked";
};

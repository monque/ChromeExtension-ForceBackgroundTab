import { getOption, setOption } from './core.js';

console.info('popup.js');


/********************************* POPUP *********************************/
function option_toggle(op) {
	if (getOption(op)) {
		setOption(op, false);
		document.getElementById('option_' + op).className = 'item';
	} else {
		setOption(op, true);
		document.getElementById('option_' + op).className = 'item checked';
	}
}


/********************************* MAIN *********************************/
window.onload = function() {
	document.getElementById('option_forcebackground').onclick = function() {
		option_toggle('forcebackground');
	};

  getOption('forcebackground', function (option) {
    if (option) {
      document.getElementById('option_forcebackground').className = "item checked";
    }
  });
};

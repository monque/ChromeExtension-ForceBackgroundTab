/********************************* MAIN *********************************/
$(document).ready(function() {

	$("a[target='_blank']").live('click', function(event) {
        if (event.button != 0)
            return;
        event.preventDefault();
        chrome.extension.sendMessage({
            action: 'open',
            href: this.href
        }, function(response) {});
	});

});

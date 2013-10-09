/********************************* MAIN *********************************/
$(document).ready(function() {

    $(document).on('click', 'a[target="_blank"]', function(event) {
        if (event.button != 0)
            return;
        event.preventDefault();
        chrome.extension.sendMessage({
            action: 'open',
            href: this.href
        }, function(response) {});
	});

});

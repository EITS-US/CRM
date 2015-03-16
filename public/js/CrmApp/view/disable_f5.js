function disableKey(event) {
    if (!event) event = window.event;
    if (!event) return;

    var keyCode = event.keyCode ? event.keyCode : event.charCode;

    if (keyCode == 116) {
        window.status = "F5 key detected! Attempting to disabling default response.";
        window.setTimeout("window.status='';", 2000);

        // Standard DOM (Mozilla):
        if (event.preventDefault) event.preventDefault();

        //IE (exclude Opera with !event.preventDefault):
        if (document.all && window.event && !event.preventDefault) {
            event.cancelBubble = true;
            event.returnValue = false;
            event.keyCode = 0;
        }

        return false;
    }
}

function setEventListener(eventListener) {
    if (document.addEventListener) document.addEventListener('keypress', eventListener, true);
    else if (document.attachEvent) document.attachEvent('onkeydown', eventListener);
    else document.onkeydown = eventListener;
}

function unsetEventListener(eventListener) {
    if (document.removeEventListener) document.removeEventListener('keypress', eventListener, true);
    else if (document.detachEvent) document.detachEvent('onkeydown', eventListener);
    else document.onkeydown = null;
}

setEventListener(disableKey)
//unsetEventListener(disableKey)
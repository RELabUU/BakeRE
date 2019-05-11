function onLoad() {
    console.log('window ready');
    document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
function onDeviceReady() {
    console.log('device ready');
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    // Handle the back button
    console.log('clicked the back button');
    event.preventDefault();
}
// document.body.style.border = "5px solid blue";
// function copySelection() {
//     var selectedText = window.getSelection().toString().trim();//     if (selectedText) {
//         document.execCommand("Copy");
//     }
// }// /*
// Add copySelection() as a listener to mouseup events.
// */
// document.addEventListener("mouseup", copySelection);
function onCreated() {
    if (browser.runtime.lastError) {
      console.log(`Error: ${browser.runtime.lastError}`);
    } else {
      console.log("Item created successfully");
    }
}
browser.menus
    .create({
        id: "log-selection",
        title: "Word-Counter",
        type: "normal",
        contexts: ['selection']
    }, 
    onCreated);  

    browser.menus.onClicked.addListener((info, tab) => {
        browser.browserAction.openPopup()
         console.log("Item " + info.menuItemId + " clicked " +
              "in tab " + tab.id)
})
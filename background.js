
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.contextMenus.create({
  id: "log-selection",
  title: "Word Counter",
  contexts: ["selection"]
}, onCreated);


browser.contextMenus.onClicked.addListener((info, tab)=> {
      navigator.clipboard.writeText(info.selectionText).then().catch(error=>console.log(error))
      browser.browserAction.openPopup()
})


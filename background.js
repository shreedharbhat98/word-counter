
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
})


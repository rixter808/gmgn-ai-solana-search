chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "readClipboard") {
    navigator.clipboard.readText()
      .then(text => {
        chrome.runtime.sendMessage({ action: "clipboardData", text: text });
      })
      .catch(err => {
        chrome.runtime.sendMessage({ message: "Cannot read clipboard: " + err.message });
      });
  }
});
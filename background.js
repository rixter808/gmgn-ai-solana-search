// Create context menu items
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed, creating context menus");
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "search-solana-selection",
      title: "Search on GMGN.AI",
      contexts: ["selection"]
    });
    chrome.contextMenus.create({
      id: "search-solana-clipboard",
      title: "Search Clipboard Address on GMGN.AI",
      contexts: ["all"]
    });
  });
});

// Validate Solana wallet address (42–44 characters, base58)
function isValidSolanaAddress(address) {
  console.log(`Validating address: "${address}" (length: ${address.length})`);
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{42,44}$/;
  const isValid = base58Regex.test(address.trim());
  console.log(`Validation result: ${isValid}`);
  return isValid;
}

// Handle errors with a Google search tab
function showError(message) {
  console.log(`Showing error: ${message}`);
  chrome.tabs.create({
    url: `https://www.google.com/search?q=${encodeURIComponent(message)}`
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log(`Context menu clicked: ${info.menuItemId}`);
  if (info.menuItemId === "search-solana-selection" && info.selectionText) {
    const selectedText = info.selectionText.trim();
    console.log(`Selected text: "${selectedText}"`);
    if (isValidSolanaAddress(selectedText)) {
      const url = `https://gmgn.ai/sol/address/${encodeURIComponent(selectedText)}`;
      console.log(`Opening GMGN.AI: ${url}`);
      chrome.tabs.create({ url });
    } else {
      showError(`Invalid Solana wallet address: "${selectedText}". Must be 42–44 characters.`);
    }
  } else if (info.menuItemId === "search-solana-clipboard") {
    console.log("Clipboard search triggered");
    if (tab && tab.id && tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
      console.log(`Sending clipboard read message to tab ID: ${tab.id}, URL: ${tab.url}`);
      chrome.tabs.sendMessage(tab.id, { action: "readClipboard" });
    } else {
      showError("Cannot read clipboard. Please use on an HTTP/HTTPS webpage (e.g., https://google.com).");
    }
  }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`Received message: ${JSON.stringify(request)}`);
  if (request.action === "clipboardData" && request.text) {
    const clipboardText = request.text.trim();
    if (isValidSolanaAddress(clipboardText)) {
      const url = `https://gmgn.ai/sol/address/${encodeURIComponent(clipboardText)}`;
      console.log(`Opening GMGN.AI: ${url}`);
      chrome.tabs.create({ url });
    } else {
      showError(`Invalid Solana wallet address in clipboard: "${clipboardText}". Must be 42–44 characters.`);
    }
  } else if (request.message) {
    showError(request.message);
  }
});
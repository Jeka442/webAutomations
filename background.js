chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getCookie") {
        console.log("cookie name:", request.cookieName);
      chrome.cookies.get({ url: request.url, name: request.cookieName }, (cookie) => {
        if (cookie) {
          sendResponse({ value: cookie.value });
        } else {
          sendResponse({ value: null });
        }
      });
      return true;  // Will respond asynchronously
    }
  });
  
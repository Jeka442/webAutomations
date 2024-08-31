chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookie") {
    chrome.cookies.get(
      { url: request.url, name: request.cookieName },
      (cookie) => {
        if (cookie) {
          const resCookie = `${cookie.name}=${cookie.value}; SameSite=${
            cookie.sameSite
          }; path=${cookie.path}; domain=${cookie.domain}; ${
            cookie.hostOnly ? "" : "Secure"
          }`;

          fetch("http://localhost:4405/cookie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cookie: resCookie,
              target: request.origin,
            }),
          });

          sendResponse({ value: resCookie });
        } else {
          sendResponse({ value: null });
        }
      }
    );
    return true; // Will respond asynchronously
  }
});

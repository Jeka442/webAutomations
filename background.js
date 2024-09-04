chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCookie") {
    chrome.cookies.get(
      { url: request.url, name: request.cookieName },
      (cookie) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message); // Debugging any runtime errors
        }
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
          })
            .then(() => {
              sendResponse({ value: true });
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              sendResponse({ value: false });
            });
        } else {
          console.warn("Cookie not found:", request.cookieName);
          sendResponse({ value: false });
        }
      }
    );
    return true; // Ensure the response is sent asynchronously
  }
});

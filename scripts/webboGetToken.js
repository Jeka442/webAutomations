// Specify the URL where the cookie is set, typically the current page's URL
// Send a message to the background script
chrome.runtime.sendMessage(
  {
    action: "getCookie",
    url: window.location.href,
    cookieName: ".ASPXFORMSAUTH",
    origin: window.location.origin,
  },
  async (response) => {
    if (response && response.value) {
      alert("Ok");
    } else {
      alert("cookie not found");
    }
  }
);

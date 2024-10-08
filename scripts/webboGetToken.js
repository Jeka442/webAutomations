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
      console.info("WebAutomation - Token found:", response.value);
    } else {
      console.info("WebAutomation - missing token");
    }
  }
);

if (window.localStorage.getItem("autoReload")) {
  console.log("Reload has found and setted to 10 minutes");
  setTimeout(() => {
    window.location.reload();
  }, 600000);
}

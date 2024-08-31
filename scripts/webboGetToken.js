// Specify the URL where the cookie is set, typically the current page's URL
// Send a message to the background script
chrome.runtime.sendMessage(
  {
    action: "getCookie",
    url: window.location.href,
    cookieName: ".ASPXFORMSAUTH",
    origin: window.location.origin,
  },
  (response) => {
    if (response && response.value) {
      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = response.value;
      document.body.appendChild(textarea);
      textarea.select(); // Select the text

      try {
        // Copy the text to the clipboard
        document.execCommand("copy");
        console.log("Cookie value copied to clipboard:", response.value);
      } catch (err) {
        console.error("Failed to copy the cookie value:", err);
      } finally {
        // Clean up
        document.body.removeChild(textarea);
      }
    } else {
      console.log("MyCookie not found");
    }
  }
);

const config = {
  Automation: [
    {
      id: "webboMassAction",
      name: "webbo mass action",
      file: "scripts/webboMassActions.js",
    },
    {
      id: "autoReload",
      name: "auto reload on/off",
      file: "scripts/autoReload.js",
    },{
      id: "activeDraggable",
      name: "draggable mode",
      file: "scripts/draggable.js",
    },
  ],
};

async function startup() {
  let html = ``;
  for (let item of config.Automation) {
    html += `<button id="${item.id}">${item.name}</button>`;
  }
  document.getElementById("actions").innerHTML = html;

  document.querySelectorAll("button").forEach(async (elm) => {
    await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;

      const id = elm.id;
      elm.addEventListener("click", (e) => {
        const scriptConfig = config.Automation.find((item) => item.id === id);
        if (scriptConfig) {
          chrome.scripting.executeScript({
            target: { tabId: activeTabId }, // replace activeTabId with the actual ID of the tab you want to target
            files: [scriptConfig.file],
          });
        } else {
          console.error(`No script found for id: ${id}`);
        }
      });
    });
    // Your script execution logic here, using `activeTabId` as the target

  });
}

startup();

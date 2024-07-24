
function automation() {
  setTimeout(() => {
    try {
      const docs = document.getElementsByClassName("tab");
      for (let doc of docs) {
        doc.remove();
      }

      const textarea = document.querySelector("textarea");

      textarea.addEventListener("keydown", function (e) {
        if (e.key.toLowerCase() === "tab") {
          e.preventDefault();
          const whiteSpaces = "  ";
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;

          textarea.value =
            textarea.value.substring(0, start) +
            whiteSpaces +
            textarea.value.substring(end);

          textarea.selectionStart = textarea.selectionEnd =
            start + whiteSpaces.length;
        }
      });
    } catch {
      console.log("webAutomations extension got an error");
    }
  }, 100);
}

automation();

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("fixing icon.. final check");

    const appendButton = () => {
      const inputField = document.querySelector<HTMLElement>(
        ".msg-form__contenteditable"
      );

      if (inputField) {
        let button =
          inputField.querySelector<HTMLButtonElement>(".custom-button");

        if (!button) {
          button = document.createElement("button");
          button.className = "custom-button";
          button.style.position = "absolute";
          button.style.right = "10px";
          button.style.bottom = "10px";
          button.style.zIndex = "1000";
          button.textContent = "working..";
          button.style.backgroundImage = "url(../assets/icon.svg)";
          button.style.backgroundSize = "contain";
          button.style.backgroundRepeat = "no-repeat";
          button.style.display = "none";
          button.style.width = "30px";
          button.style.height = "30px";
          button.style.border = "none";
          button.style.cursor = "pointer";

          inputField.style.position = "relative";
          inputField.appendChild(button);

          button.addEventListener("click", () => {
            alert("Button clicked!");
          });
        }

        inputField.addEventListener("focus", () => {
          button.style.display = "block";
        });

        inputField.addEventListener("blur", () => {
          button.style.display = "none";
        });
      }
    };

    appendButton();

    const observer = new MutationObserver(() => {
      appendButton();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});

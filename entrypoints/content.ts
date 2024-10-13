import { createModal } from "./popup/Modal";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
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
          button.style.backgroundImage = `url(https://images.unsplash.com/photo-1728297644019-5f49a560b4d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`;
          button.style.backgroundSize = "contain";
          button.style.backgroundRepeat = "no-repeat";
          button.style.display = "none";
          button.style.width = "30px";
          button.style.height = "30px";
          button.style.border = "none";
          button.style.cursor = "pointer";

          inputField.style.position = "relative";
          inputField.appendChild(button);

          let isButtonClicked = false;

          button.addEventListener("mousedown", () => {
            isButtonClicked = true;
          });

          button.addEventListener("click", () => {
            createModal();
          });

          inputField.addEventListener("focus", () => {
            if (button) button.style.display = "block";
          });

          inputField.addEventListener("blur", () => {
            setTimeout(() => {
              if (!isButtonClicked) {
                if (button) button.style.display = "none";
              }
              isButtonClicked = false;
            }, 100);
          });
        }
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

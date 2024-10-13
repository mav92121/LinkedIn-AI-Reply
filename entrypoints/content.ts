export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("fixing icon.. final check changed and working!");

    const createModal = () => {
      // Create the modal background
      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "2000";

      // Create the modal content
      const modalContent = document.createElement("div");
      modalContent.style.backgroundColor = "white";
      modalContent.style.padding = "20px";
      modalContent.style.borderRadius = "5px";
      modalContent.style.width = "300px"; // Adjust width as needed
      modalContent.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
      modalContent.style.position = "relative"; // For positioning close button

      // Create input field
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.placeholder = "Your prompt";
      inputField.style.width = "100%";
      inputField.style.padding = "10px";
      inputField.style.marginBottom = "10px";
      inputField.style.border = "1px solid #ccc";
      inputField.style.borderRadius = "4px";
      inputField.style.boxSizing = "border-box"; // Ensure padding and width work together

      // Create a container to hold the button aligned to the right
      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-end"; // Align content to the right

      // Create the generate button
      const generateButton = document.createElement("button");
      generateButton.innerText = "Generate";
      generateButton.style.width = "auto"; // Auto width instead of 100%
      generateButton.style.padding = "10px 20px"; // Padding for better look
      generateButton.style.backgroundColor = "#3B82F6";
      generateButton.style.color = "white";
      generateButton.style.border = "none";
      generateButton.style.borderRadius = "4px";
      generateButton.style.cursor = "pointer";

      generateButton.onclick = () => {
        console.log("Prompt:", inputField.value); // Perform any action with the input value
        document.body.removeChild(modal); // Close modal after generating
      };

      // Append the generate button to the button container
      buttonContainer.appendChild(generateButton);

      // Append input field and button container to modal content
      modalContent.appendChild(inputField);
      modalContent.appendChild(buttonContainer);

      // Create the close button
      const closeButton = document.createElement("span");
      closeButton.innerText = "✕";
      closeButton.style.position = "absolute"; // Position it in the modal
      closeButton.style.top = "10px";
      closeButton.style.right = "10px";
      closeButton.style.cursor = "pointer";
      closeButton.onclick = () => {
        document.body.removeChild(modal); // Remove modal on close
      };

      // Append close button to modal content
      modalContent.appendChild(closeButton);

      // Close modal on clicking outside of modal content
      modal.onclick = (event) => {
        if (event.target === modal) {
          document.body.removeChild(modal); // Remove modal on click outside
        }
      };

      // Append modal content to modal and modal to body
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    };

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
          button.textContent = "qwerty";
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

          // Add event listeners only once
          let isButtonClicked = false;

          button.addEventListener("mousedown", () => {
            isButtonClicked = true;
          });

          button.addEventListener("click", () => {
            console.log("Button clicked"); // This should now only log once
            createModal(); // Open the modal when the button is clicked
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

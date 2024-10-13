export const createModal = () => {
  // Create the modal background
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "2000";

  // Create the modal content
  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "8px";
  modalContent.style.width = "400px"; // Adjust width based on your design
  modalContent.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  modalContent.style.position = "relative";

  // Create input field for user prompt
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Your prompt";
  inputField.style.width = "100%";
  inputField.style.padding = "10px";
  inputField.style.marginBottom = "20px";
  inputField.style.border = "1px solid #ccc";
  inputField.style.borderRadius = "4px";
  inputField.style.boxSizing = "border-box";

  // Create a container for buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "flex-end"; // Initially aligned to the right

  // Create the generate button
  const generateButton = document.createElement("button");
  generateButton.innerText = "Generate";
  generateButton.style.padding = "8px 16px";
  generateButton.style.backgroundColor = "#3B82F6";
  generateButton.style.marginLeft = "10px";
  generateButton.style.color = "white";
  generateButton.style.border = "none";
  generateButton.style.borderRadius = "4px";
  generateButton.style.cursor = "pointer";

  // Create two box containers (hidden initially)
  const greyBox = document.createElement("div");
  greyBox.style.display = "none";
  greyBox.style.padding = "12px";
  greyBox.style.borderRadius = "5px";
  greyBox.style.marginBottom = "10px";
  greyBox.style.backgroundColor = "#f0f0f0"; // Grey box for user input
  greyBox.style.color = "#333";
  greyBox.style.fontSize = "14px";

  const blueBox = document.createElement("div");
  blueBox.style.display = "none";
  blueBox.style.padding = "12px";
  blueBox.style.borderRadius = "5px";
  blueBox.style.marginBottom = "10px";
  blueBox.style.backgroundColor = "#E0ECFF"; // Blue box for hardcoded text
  blueBox.style.color = "#333";
  blueBox.style.fontSize = "14px";
  blueBox.innerText = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

  // Insert button (hidden initially)
  const insertButton = document.createElement("button");
  insertButton.innerText = "Insert";
  insertButton.style.padding = "8px 16px";
  insertButton.style.backgroundColor = "#F3F4F6";
  insertButton.style.color = "#333";
  insertButton.style.border = "1px solid #ccc";
  insertButton.style.borderRadius = "4px";
  insertButton.style.cursor = "pointer";
  insertButton.style.display = "none"; // Initially hidden
  insertButton.onclick = () => {
    const textToInsert = blueBox.innerText;
    const inputField = document.querySelector<HTMLElement>(
      ".msg-form__contenteditable"
    );
    if (inputField) {
      const pTag = inputField.querySelector("p");
      if (pTag) {
        // Clear the <br> or current content and insert the new text
        pTag.textContent = textToInsert;
      } else {
        // If no <p> tag exists, create it
        const newPTag = document.createElement("p");
        newPTag.textContent = textToInsert;
        inputField.appendChild(newPTag);
      }
      const event = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      inputField.dispatchEvent(event);
      document.body.removeChild(modal);
    }
  };

  // Generate button logic
  generateButton.onclick = () => {
    const userInput = inputField.value.trim();

    if (userInput) {
      greyBox.innerText = userInput; // Show the user's input in the grey box
      inputField.value = ""; // Clear the input field
      generateButton.innerText = "Regenerate"; // Change button text to Regenerate
      insertButton.style.display = "inline-block"; // Show Insert button
      greyBox.style.display = "block"; // Show grey box
      blueBox.style.display = "block"; // Show blue box
    } else {
      greyBox.innerText = "Please enter a valid prompt!";
    }
  };

  // Append buttons and boxes
  buttonContainer.appendChild(insertButton); // Append Insert button
  buttonContainer.appendChild(generateButton); // Append Generate/Regenerate button
  modalContent.appendChild(greyBox);
  modalContent.appendChild(blueBox);
  modalContent.appendChild(inputField);
  modalContent.appendChild(buttonContainer);

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Close modal when clicking outside content
  modal.onclick = (event) => {
    if (event.target === modal) {
      document.body.removeChild(modal);
    }
  };

  // Add modal to the body
  document.body.appendChild(modal);
};

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    console.log("fixing icon.. final check changed and working!");

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
          button.style.backgroundImage =
            "url(https://images.unsplash.com/photo-1728297644019-5f49a560b4d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D)";
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

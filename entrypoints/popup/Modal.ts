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
  modalContent.style.width = "400px";
  modalContent.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  modalContent.style.position = "relative";

  // Create input field for user prompt
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Your prompt";
  inputField.style.width = "100%";
  inputField.style.padding = "20px 13px";
  inputField.style.margin = "20px 0px";
  inputField.style.border = "1px solid #C1C7D0";
  inputField.style.borderRadius = "8px";
  inputField.style.boxSizing = "border-box";
  inputField.style.marginTop = "-20px";

  // Create a container for the message boxes
  const messageContainer = document.createElement("div");
  messageContainer.style.display = "flex";
  messageContainer.style.flexDirection = "column";
  messageContainer.style.gap = "10px";
  messageContainer.style.marginBottom = "20px";

  // Create the grey box (user input)
  const greyBox = document.createElement("div");
  greyBox.style.display = "none";
  greyBox.style.padding = "12px";
  greyBox.style.borderRadius = "10px";
  greyBox.style.marginBottom = "10px";
  greyBox.style.backgroundColor = "#DFE1E7";
  greyBox.style.color = "#666D80";
  greyBox.style.width = "70%";
  greyBox.style.fontSize = "13px";
  greyBox.style.alignSelf = "flex-end";

  // Create the blue box (response)
  const blueBox = document.createElement("div");
  blueBox.style.display = "none";
  blueBox.style.padding = "12px";
  blueBox.style.borderRadius = "10px";
  blueBox.style.marginBottom = "20px";
  blueBox.style.backgroundColor = "#DBEAFE"; // Blue box for hardcoded text
  blueBox.style.color = "#666D80";
  blueBox.style.fontSize = "14px";
  blueBox.style.width = "70%";
  blueBox.style.alignSelf = "flex-start"; // Align to the right like a response bubble
  blueBox.innerText = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

  // Create a container for buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "flex-end"; // Buttons aligned to the right

  // Create the generate button
  const generateButton = document.createElement("button");
  generateButton.innerText = "Generate";
  generateButton.style.fontWeight = "bold";
  generateButton.style.padding = "8px 16px";
  generateButton.style.backgroundColor = "#3B82F6";
  generateButton.style.marginLeft = "10px";
  generateButton.style.color = "white";
  generateButton.style.border = "none";
  generateButton.style.borderRadius = "8px";
  generateButton.style.cursor = "pointer";

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
      greyBox.innerText = userInput;
      inputField.value = "";
      generateButton.innerText = "Regenerate";
      insertButton.style.display = "inline-block";
      greyBox.style.display = "block";
      blueBox.style.display = "block";
    } else {
      greyBox.innerText = "Please enter a valid prompt!";
    }
  };

  // Append buttons and boxes
  buttonContainer.appendChild(insertButton);
  buttonContainer.appendChild(generateButton);
  messageContainer.appendChild(greyBox); // Append user message
  messageContainer.appendChild(blueBox); // Append response message
  modalContent.appendChild(messageContainer); // Add message container to modal content
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

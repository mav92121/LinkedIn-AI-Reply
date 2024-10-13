import { appendButton } from "./popup/components/AiButton";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
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

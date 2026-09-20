export const workflows = {
  askAI: {
    id: "askAI",
    name: "Ask AI",
    icon: "✦",
    description: "Send code to AI and ask what is wrong.",
    steps: [
      "Copy example code",
      "Open ChatGPT",
      "Paste the code",
      "Ask what is wrong",
    ],
  },

  hint: {
    id: "hint",
    name: "Hint",
    icon: "◆",
    description: "Get a hint without getting the full answer.",
    steps: [
      "Copy problem",
      "Open ChatGPT",
      "Ask for a hint",
    ],
  },

  search: {
    id: "search",
    name: "Search",
    icon: "⌕",
    description: "Launch a Google search.",
    steps: [
      "Prepare search query",
      "Open Google",
      "Search automatically",
    ],
  },

  submit: {
    id: "submit",
    name: "Submit",
    icon: "▶",
    description: "Run the submission workflow.",
    steps: [
      "Validate solution",
      "Submit",
      "Show result",
    ],
  },
};
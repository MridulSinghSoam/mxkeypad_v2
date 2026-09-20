import { useState } from "react";

import KeyboardScene from "./components/KeyboardScene";
import WorkflowPanel from "./components/WorkflowPanel";

import { workflows } from "./data/workflows";

const DEFAULT_KEYS = [
  "askAI",
  "hint",
  "search",
  "submit",
];

const demoCode = `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int sum = 0;
        int ans = 0;

        for (int x : nums) {
            sum += x;

            if (sum < 0)
                sum = 0;

            ans = max(ans, sum);
        }

        return ans;
    }
};`;

function App() {
  const [assignments, setAssignments] =
    useState(DEFAULT_KEYS);

  const [activeKey, setActiveKey] =
    useState(null);

  const [selectedWorkflow, setSelectedWorkflow] =
    useState("askAI");

  const [status, setStatus] =
    useState("READY");

  async function runWorkflow(
    workflowId,
    keyIndex
  ) {
    setSelectedWorkflow(workflowId);
    setActiveKey(keyIndex);
    setStatus("RUNNING...");

    /*
     * ASK AI
     */
    if (workflowId === "askAI") {
      const prompt = `${demoCode}

What is wrong with this code?`;

      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(
          prompt
        );
      } catch (error) {
        console.log(
          "Clipboard permission denied"
        );
      }

      // Open ChatGPT
      window.open(
        "https://chatgpt.com/",
        "_blank"
      );

      setStatus("AI WORKFLOW STARTED");
    }

    /*
     * HINT
     */
    else if (workflowId === "hint") {
      const prompt = `${demoCode}

Give me a hint only.
Do not give me the complete solution.`;

      try {
        await navigator.clipboard.writeText(
          prompt
        );
      } catch (error) {
        console.log(
          "Clipboard permission denied"
        );
      }

      window.open(
        "https://chatgpt.com/",
        "_blank"
      );

      setStatus("HINT WORKFLOW STARTED");
    }

    /*
     * SEARCH
     */
    else if (workflowId === "search") {
      const query =
        "React Three Fiber GLB keyboard";

      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`,
        "_blank"
      );

      setStatus("SEARCH OPENED");
    }

    /*
     * SUBMIT
     */
    else if (workflowId === "submit") {
      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setStatus("✓ SUBMITTED");
    }

    setTimeout(() => {
      setActiveKey(null);
    }, 800);
  }

  function changeAssignment(
    index,
    workflowId
  ) {
    setAssignments((current) => {
      const updated = [...current];

      updated[index] = workflowId;

      return updated;
    });

    setStatus("KEY UPDATED");
  }

  const currentWorkflow =
    workflows[selectedWorkflow];

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>SMART K580</h1>

          <p>
            One keyboard. Smarter workflows.
          </p>
        </div>

        <div className="status">
          <span className="dot" />

          {status}
        </div>
      </header>

      <main>
        <section className="hero">
          <span className="label">
            PRODUCT CONCEPT
          </span>

          <h2>
            Your keyboard,
            <br />
            <span>reimagined.</span>
          </h2>

          <p>
            A familiar keyboard redesigned with
            integrated programmable Smart Keys.
            One click can trigger an entire workflow.
          </p>
        </section>

        <section className="workspace">
          <div className="keyboard-container">
            <KeyboardScene
              assignments={assignments}
              workflows={workflows}
              activeKey={activeKey}
              onRun={runWorkflow}
            />

            <div className="hint">
              Drag to rotate · Scroll to zoom ·
              Click a Smart Key
            </div>
          </div>

          <WorkflowPanel
            workflow={currentWorkflow}
            assignments={assignments}
            workflows={workflows}
            onChangeAssignment={
              changeAssignment
            }
          />
        </section>
      </main>
    </div>
  );
}

export default App;
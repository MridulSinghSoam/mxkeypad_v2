export default function WorkflowPanel({
  workflow,
  assignments,
  workflows,
  onChangeAssignment,
}) {
  return (
    <aside className="workflow-panel">
      <div className="panel-label">
        SMART WORKFLOW
      </div>

      {workflow ? (
        <>
          <h2>
            {workflow.icon} {workflow.name}
          </h2>

          <p className="workflow-description">
            {workflow.description}
          </p>

          <div className="workflow-steps">
            {workflow.steps.map((step, index) => (
              <div
                className="workflow-step"
                key={step}
              >
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Select a Smart Key.</p>
      )}

      <div className="customize-section">
        <div className="panel-label">
          CUSTOMIZE
        </div>

        {assignments.map(
          (assignment, index) => (
            <div
              className="key-assignment"
              key={index}
            >
              <span>Key {index + 1}</span>

              <select
                value={assignment}
                onChange={(event) =>
                  onChangeAssignment(
                    index,
                    event.target.value
                  )
                }
              >
                {Object.values(workflows).map(
                  (item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  )
                )}
              </select>
            </div>
          )
        )}
      </div>
    </aside>
  );
}
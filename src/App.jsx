import { useState } from "react";
import Node from "./components/node";

const btn = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #d0d7ff",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 12
};

export default function App() {
  const [workflow, setWorkflow] = useState({
    id: "start",
    type: "start",
    label: "Start",
    next: null
  });

  const addActionNext = (id) => {
    const dfs = (node) => {
      if (!node) return;
      if (node.id === id) {
        node.next = {
          id: crypto.randomUUID(),
          type: "action",
          label: "Action",
          next: node.next
        };
        return;
      }
      if (node.type === "branch") {
        dfs(node.children.true);
        dfs(node.children.false);
      } else {
        dfs(node.next);
      }
    };
    const copy = structuredClone(workflow);
    dfs(copy);
    setWorkflow(copy);
  };

  const addBranchNext = (id) => {
    const dfs = (node) => {
      if (!node) return;
      if (node.id === id) {
        node.next = {
          id: crypto.randomUUID(),
          type: "branch",
          label: "Branch",
          children: { true: null, false: null }
        };
        return;
      }
      if (node.type === "branch") {
        dfs(node.children.true);
        dfs(node.children.false);
      } else {
        dfs(node.next);
      }
    };
    const copy = structuredClone(workflow);
    dfs(copy);
    setWorkflow(copy);
  };

  const addActionToBranch = (id, side) => {
    const dfs = (node) => {
      if (!node) return;
      if (node.id === id && node.type === "branch") {
        node.children[side] = {
          id: crypto.randomUUID(),
          type: "action",
          label: "Action",
          next: node.children[side]
        };
        return;
      }
      if (node.type === "branch") {
        dfs(node.children.true);
        dfs(node.children.false);
      } else {
        dfs(node.next);
      }
    };
    const copy = structuredClone(workflow);
    dfs(copy);
    setWorkflow(copy);
  };

  const deleteNode = (id) => {
    const dfs = (node) => {
      if (!node) return;
      if (node.next?.id === id) {
        node.next = node.next.next;
        return;
      }
      if (node.type === "branch") {
        if (node.children.true?.id === id) {
          node.children.true = node.children.true.next;
          return;
        }
        if (node.children.false?.id === id) {
          node.children.false = node.children.false.next;
          return;
        }
        dfs(node.children.true);
        dfs(node.children.false);
      } else {
        dfs(node.next);
      }
    };
    const copy = structuredClone(workflow);
    dfs(copy);
    setWorkflow(copy);
  };

  const editLabel = (id, value) => {
    const dfs = (node) => {
      if (!node) return;
      if (node.id === id) {
        node.label = value;
        return;
      }
      if (node.type === "branch") {
        dfs(node.children.true);
        dfs(node.children.false);
      } else {
        dfs(node.next);
      }
    };
    const copy = structuredClone(workflow);
    dfs(copy);
    setWorkflow(copy);
  };

  const renderNode = (node) => {
    if (!node) return null;

    return (
      <div key={node.id} style={{ marginLeft: 30 }}>
        <Node
          id={node.id}
          label={node.label}
          type={node.type}
          onAddAction={() => addActionNext(node.id)}
          onAddBranch={() => addBranchNext(node.id)}
          onDelete={() => deleteNode(node.id)}
          onEditLabel={editLabel}
        />

        {node.type === "branch" ? (
          <div
            style={{
              display: "flex",
              gap: 60,
              padding: 16,
              marginTop: 8,
              background: "#ffffff",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <div>
              <strong style={{ fontSize: 14 }}>True</strong>
              <br />
              <button
                style={{ ...btn, marginTop: 6 }}
                onClick={() => addActionToBranch(node.id, "true")}
              >
                + Action
              </button>
              {renderNode(node.children.true)}
            </div>

            <div>
              <strong style={{ fontSize: 14 }}>False</strong>
              <br />
              <button
                style={{ ...btn, marginTop: 6 }}
                onClick={() => addActionToBranch(node.id, "false")}
              >
                + Action
              </button>
              {renderNode(node.children.false)}
            </div>
          </div>
        ) : (
          renderNode(node.next)
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 1100,
        margin: "0 auto",
        background: "#f5f7fb",
        minHeight: "100vh",
        fontFamily: "Inter, system-ui, sans-serif"
      }}
    >
      <h2 style={{ color: "#4f46e5" }}>Workflow Builder</h2>

      <button
        style={{
          marginBottom: 20,
          padding: "8px 14px",
          fontWeight: "bold",
          cursor: "pointer",
          borderRadius: 6,
          border: "none",
          background: "#4f46e5",
          color: "#fff"
        }}
        onClick={() => console.log(workflow)}
      >
        Save Workflow
      </button>

      {renderNode(workflow)}
    </div>
  );
}

import { useState } from "react";
const btn = {
  padding: "6px 10px",
  borderRadius: 6,
  border: "1px solid #d0d7ff",
  background: "#ffffff",
  cursor: "pointer",
  fontSize: 12
};

export default function Node({
  id,
  label,
  type,
  onAddAction,
  onAddBranch,
  onDelete,
  onEditLabel
}) 
 { const [disabled,setD]=useState(false);
  const background =
    type === "start"
      ? "#e8f0fe"
      : type === "branch"
      ? "#fff7e6"
      : "#ffffff";

  return (
    <div
      style={{
        border: "1px solid #e0e4f0",
        padding: "14px 16px",
        borderRadius: 10,
        width: 230,
        textAlign: "center",
        background,
        marginBottom: 12, // 🔽 reduced spacing
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)"
      }}
    >
      <input
        value={label}
        onChange={(e) => onEditLabel(id, e.target.value)}
        style={{
          width: "100%",
          textAlign: "center",
          fontWeight: 600,
          fontSize: 14,
          padding: "4px 6px",
          borderRadius: 6,
          border: "1px solid #d0d7ff",
          background: "#fff",
          marginBottom: 8
        }}
      />

      {type !== "end" && (
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          { !disabled ? <>
            <button style={btn} onClick={onAddAction}>
            + Action
          </button>
          <button style={btn} onClick={onAddBranch}>
            + Branch
          </button>
          <button style={{ ...btn, opacity: 1.0 }} onClick={()=>{
            setD(true);
          }} >
            + End
          </button></>: <div>
            workflow ended
          </div>
          }
        </div>
      )}

      {type !== "start" && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={onDelete}
            style={{
              ...btn,
              background: "#ff5252",
              color: "#fff",
              border: "none"
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

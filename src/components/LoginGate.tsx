"use client";

import { useState } from "react";
import { TripData } from "@/lib/types";

export default function LoginGate({ data, children }: { data: TripData; children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    if (!checked) {
      const saved = sessionStorage.getItem("travel-master-auth");
      if (saved === "true") setAuthed(true);
      setChecked(true);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === data.password) {
      setAuthed(true);
      sessionStorage.setItem("travel-master-auth", "true");
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authed) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: "var(--m3-background)" }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: 400,
          padding: "40px 32px",
          backgroundColor: "var(--m3-surface-container-high)",
          borderRadius: 28,
          border: "1px solid var(--m3-outline-variant)",
        }}
      >
        <div className="text-center mb-8">
          <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
          <h1
            className="m3-title-large"
            style={{ color: "var(--m3-on-surface)" }}
          >
            {data.title}
          </h1>
          <p
            className="m3-body-medium mt-2"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {data.subtitle}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="m3-body-medium block mb-2"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              パスワード
            </label>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 8,
                backgroundColor: "var(--m3-surface-container-highest)",
                border: "1px solid var(--m3-outline)",
                color: "var(--m3-on-surface)",
                fontSize: 16,
                outline: "none",
              }}
              autoFocus
              onFocus={(e) => { e.target.style.borderColor = "var(--m3-primary)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--m3-outline)"; }}
            />
          </div>
          {error && (
            <p className="m3-body-medium text-center" style={{ color: "var(--m3-error)" }}>
              パスワードが違います
            </p>
          )}
          <button type="submit" className="m3-button-filled w-full" style={{ height: 48, borderRadius: 24 }}>
            開く
          </button>
        </form>
      </div>
    </div>
  );
}

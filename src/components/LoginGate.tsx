"use client";

import { useState, useEffect } from "react";
import { TripData } from "@/lib/types";

export default function LoginGate({ data, children }: { data: TripData; children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("travel-master-auth");
    if (saved === "true") setAuthed(true);
  }, []);

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
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--m3-background)" }}
    >
      <div
        className="w-full max-w-sm p-8"
        style={{
          backgroundColor: "var(--m3-surface-container-high)",
          borderRadius: 28,
          border: "1px solid var(--m3-outline-variant)",
        }}
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🗺️</div>
          <h1
            className="m3-title-large"
            style={{ color: "var(--m3-on-surface)" }}
          >
            {data.title}
          </h1>
          <p
            className="m3-body-small mt-1"
            style={{ color: "var(--m3-on-surface-variant)" }}
          >
            {data.subtitle}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="m3-body-small block mb-1"
              style={{ color: "var(--m3-on-surface-variant)" }}
            >
              パスワード
            </label>
            <input
              type="password"
              placeholder="パスワードを入力"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 m3-shape-sm"
              style={{
                backgroundColor: "var(--m3-surface-container-highest)",
                border: "1px solid var(--m3-outline)",
                color: "var(--m3-on-surface)",
                fontSize: 16,
                outline: "none",
              }}
              autoFocus
              onFocus={(e) => {
                e.target.style.borderColor = "var(--m3-primary)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--m3-outline)";
              }}
            />
          </div>
          {error && (
            <p
              className="m3-body-small text-center"
              style={{ color: "var(--m3-error)" }}
            >
              パスワードが違います
            </p>
          )}
          <button type="submit" className="m3-button-filled w-full">
            開く
          </button>
        </form>
      </div>
    </div>
  );
}

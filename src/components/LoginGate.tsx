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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🗺️</div>
          <h1 className="text-xl font-bold text-white">{data.title}</h1>
          <p className="text-sm text-blue-300 mt-1">{data.subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="パスワード"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm text-center">パスワードが違います</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition"
          >
            開く
          </button>
        </form>
      </div>
    </div>
  );
}

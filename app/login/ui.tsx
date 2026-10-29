"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode, next }: { mode: "login" | "register"; next?: string }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [isRegister, setIsRegister] = useState(mode === "register");

  return (
    <form
      className="card"
      style={{ padding: 24, marginTop: 16 }}
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const email = String(fd.get("email") || "");
        const password = String(fd.get("password") || "");
        const name = String(fd.get("name") || email.split("@")[0]);
        setBusy(true);
        setError("");
        const result = isRegister
          ? await authClient.signUp.email({ email, password, name })
          : await authClient.signIn.email({ email, password });
        setBusy(false);
        if (result.error) {
          setError(result.error.message || "Could not sign in. Check your details and try again.");
          return;
        }
        const session = await authClient.getSession();
        const role = (session.data?.user as { role?: string } | undefined)?.role;
        const dest = next || (role === "admin" ? "/admin" : "/account");
        window.location.href = dest.startsWith("/") ? dest : "/account";
      }}
    >
      {isRegister ? <input name="name" placeholder="Full name" required /> : null}
      <input name="email" type="email" placeholder="Email" autoComplete="email" required />
      <input
        name="password"
        type="password"
        placeholder="Password (8+ characters)"
        autoComplete={isRegister ? "new-password" : "current-password"}
        minLength={8}
        required
      />
      {error ? <p className="disc">{error}</p> : null}
      <button className="btn" type="submit" disabled={busy} style={{ width: "100%" }}>
        {busy ? "Please wait…" : isRegister ? "Create account" : "Sign in"}
      </button>
      <p style={{ marginTop: 16 }}>
        {isRegister ? "Already have an account?" : "Need an account?"}{" "}
        <button
          type="button"
          className="btn n"
          onClick={() => setIsRegister((v) => !v)}
          style={{ minHeight: 40, padding: "0 16px" }}
        >
          {isRegister ? "Sign in" : "Register"}
        </button>
      </p>
    </form>
  );
}

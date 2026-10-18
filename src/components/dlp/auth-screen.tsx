import { useState } from "react";
import { Eye, EyeOff, Fingerprint, Loader2, LockKeyhole, Mail, ShieldCheck, TriangleAlert } from "lucide-react";
import { Button } from "./shared";
import { demoCredentials, dlpApi, type SessionUser } from "./mock-api";

export function AuthScreen({ onAuthenticated }: { onAuthenticated: (user: SessionUser) => void }) {
  const [email, setEmail] = useState(demoCredentials.email);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [mfa, setMfa] = useState("");
  const [stage, setStage] = useState<"credentials" | "mfa">("credentials");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitCredentials(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid work email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setBusy(true);
    const response = await dlpApi.login(email, password);
    setBusy(false);
    if (!response.ok || !response.data) return setError("Invalid credentials. Authentication service returned 401.");
    setStage("mfa");
  }

  async function submitMfa(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!/^\d{6}$/.test(mfa)) return setError("Enter the 6-digit verification code.");
    setBusy(true);
    const response = await dlpApi.login(email, password);
    setBusy(false);
    if (response.ok && response.data) onAuthenticated(response.data.user);
  }

  return (
    <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-sidebar p-10 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground"><ShieldCheck size={22} /></div>
          <div>
            <p className="text-base font-black tracking-wide">AEPTTAS<span className="text-primary">SHIELD</span></p>
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Enterprise DLP Platform</p>
          </div>
        </div>
        <div>
          <h2 className="max-w-md text-3xl font-bold leading-tight">Protect sensitive data across every endpoint, channel and cloud.</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Classification, incident response, endpoint control, compliance evidence and real-time monitoring in one console.</p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[["1,248", "Endpoints"], ["99.2K", "Records classified"], ["24/7", "Monitoring"]].map(([value, label]) => (
              <div key={label} className="rounded-lg border border-border bg-card p-4">
                <p className="text-xl font-bold">{value}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground">Prototype build · local sample data · no persistent storage</p>
      </div>

      <div className="flex items-center justify-center p-5 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground"><ShieldCheck size={20} /></div>
            <p className="text-sm font-black tracking-wide">AEPTTAS<span className="text-primary">SHIELD</span></p>
          </div>

          {stage === "credentials" ? (
            <form onSubmit={submitCredentials} noValidate>
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="mt-2 text-sm text-muted-foreground">Use your corporate account to access the DLP console.</p>

              <label className="mt-7 block text-sm font-semibold" htmlFor="email">Work email</label>
              <div className="relative mt-2">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 w-full rounded-md border border-input bg-field pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="you@company.com" />
              </div>

              <label className="mt-4 block text-sm font-semibold" htmlFor="password">Password</label>
              <div className="relative mt-2">
                <LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input id="password" type={show ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 w-full rounded-md border border-input bg-field pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" placeholder="••••••••" />
                <button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="accent-primary" /> Keep me signed in</label>
                <button type="button" className="font-semibold text-primary hover:underline">Forgot password?</button>
              </div>

              {error && <p className="mt-4 flex items-center gap-2 rounded-md border border-destructive/25 bg-danger-soft px-3 py-2 text-xs font-semibold text-danger"><TriangleAlert size={14} /> {error}</p>}

              <Button type="submit" variant="primary" className="mt-6 w-full" disabled={busy}>{busy ? <><Loader2 size={16} className="animate-spin" /> Authenticating</> : "Continue"}</Button>
              <Button type="button" className="mt-3 w-full"><Fingerprint size={16} /> Single sign-on (SAML)</Button>
              <p className="mt-6 rounded-md border border-border bg-secondary/50 px-3 py-2 text-center text-[11px] text-muted-foreground">Demo access · {demoCredentials.email} / {demoCredentials.password}</p>
            </form>
          ) : (
            <form onSubmit={submitMfa} noValidate>
              <h1 className="text-2xl font-bold">Two-factor verification</h1>
              <p className="mt-2 text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app. Any 6 digits work in this prototype.</p>
              <input inputMode="numeric" maxLength={6} value={mfa} onChange={(event) => setMfa(event.target.value.replace(/\D/g, ""))} className="mt-6 h-14 w-full rounded-md border border-input bg-field text-center font-mono text-2xl tracking-[0.5em] outline-none focus:border-primary" placeholder="000000" aria-label="Verification code" />
              {error && <p className="mt-4 flex items-center gap-2 rounded-md border border-destructive/25 bg-danger-soft px-3 py-2 text-xs font-semibold text-danger"><TriangleAlert size={14} /> {error}</p>}
              <Button type="submit" variant="primary" className="mt-6 w-full" disabled={busy}>{busy ? <><Loader2 size={16} className="animate-spin" /> Verifying</> : "Verify and sign in"}</Button>
              <Button type="button" variant="ghost" className="mt-3 w-full" onClick={() => setStage("credentials")}>Back to sign in</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

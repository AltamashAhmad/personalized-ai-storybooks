'use client';

import { useEffect, useState } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

/**
 * ---------------------------------------------------------------------------
 * AdminGate — a LIGHT client-side password gate for the internal /admin pages.
 * ---------------------------------------------------------------------------
 * HOW IT WORKS: the admin password is read from NEXT_PUBLIC_ADMIN_PASSWORD
 * at build time. The visitor types it once per browser tab; a sessionStorage
 * flag then unlocks the wrapped content for that tab only.
 *
 * !!! IMPORTANT !!!  This is NOT real authentication. It only hides the UI —
 * anyone who can read the client bundle could find the password. It exists to
 * keep casual visitors and crawlers out of an internal dashboard. REAL
 * server-side authentication (e.g. a signed session cookie checked in
 * middleware) is REQUIRED before wiring these pages to any API or showing
 * real customer / order data.
 *
 * SETUP: add NEXT_PUBLIC_ADMIN_PASSWORD=<secret> to .env.local and rebuild.
 * If the env var is unset, the gate fails closed and refuses everyone.
 */
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? '';
const STORAGE_KEY = 'pt_admin_unlocked';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setUnlocked(sessionStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      setUnlocked(false);
    }
  }, []);

  const configured = ADMIN_PASSWORD.length > 0;

  const tryUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (configured && password === ADMIN_PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // storage unavailable — the gate simply stays per-page-load
      }
      setUnlocked(true);
      setError('');
      setPassword('');
    } else {
      setError(configured ? 'Incorrect password.' : 'Admin access is not configured.');
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-black text-white">Admin Access</h1>
            <p className="text-xs text-slate-400">Internal dashboard — authorized staff only</p>
          </div>
        </div>

        {!configured ? (
          <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-200 leading-relaxed">
              Admin access is not configured. Set <code className="font-mono">NEXT_PUBLIC_ADMIN_PASSWORD</code> in
              the environment and rebuild to enable this dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={tryUnlock} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-password" className="text-xs font-semibold text-slate-300 block mb-2">
                Admin password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 focus:border-amber-500"
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-2.5 rounded-xl transition"
            >
              Unlock dashboard
            </button>
          </form>
        )}

        <p className="mt-6 text-[11px] text-slate-500 leading-relaxed">
          Light gate only — not real authentication. Do not connect real customer data until server-side auth is in place.
        </p>
      </div>
    </div>
  );
}

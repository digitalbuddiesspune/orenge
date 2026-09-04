import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { SeoMeta } from '../../components/common/SeoMeta';
import { Flame, Lock } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin, navigate } = useAppState();
  const [email, setEmail] = useState('admin@oreng.com');
  const [password, setPassword] = useState('changeme123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    const em = customEmail || email;
    const pw = customPass || password;
    const success = await adminLogin(em, pw);
    setLoading(false);
    if (!success) {
      setError('Invalid email or password. Use admin@oreng.com and changeme123');
    }
  };

  return (
    <>
      <SeoMeta
        title="Admin Portal Login — Oreng B2B CMS"
        description="Secure admin login for Oreng B2B lead management and game catalog administration."
      />

      <div className="py-8 min-h-screen bg-[#0B0D13] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#121622] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5B14]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5 mx-auto shadow-lg shadow-[#FF5B14]/30">
              <div className="w-full h-full bg-[#0B0D13] rounded-[14px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#FF782D]" />
              </div>
            </div>
            <h1 className="text-2xl font-display font-extrabold text-white">🔐 Oreng Admin Portal</h1>
            <p className="text-xs text-gray-300 font-medium">B2B CRM &amp; Content Management System</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
              />
            </div>

            <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-300 space-y-1">
              <p className="font-bold text-[#FF782D]">🔑 Pre-configured Admin Credentials:</p>
              <p>Email: <span className="text-white font-mono font-bold">admin@oreng.com</span></p>
              <p>Password: <span className="text-emerald-400 font-mono font-bold">changeme123</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-bold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Signing in...' : 'Sign In as Admin'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleLogin(undefined, 'admin@oreng.com', 'changeme123')}
              className="w-full py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 text-emerald-300 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡ 1-Click Instant Demo Login</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="text-xs text-gray-400 hover:text-white transition cursor-pointer font-mono"
            >
              ← Back to Oreng Public Site
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

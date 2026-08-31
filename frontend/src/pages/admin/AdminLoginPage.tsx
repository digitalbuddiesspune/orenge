import React, { useState } from 'react';
import { useAppState } from '../../contexts/AppStateContext';
import { SeoMeta } from '../../components/common/SeoMeta';
import { Flame, Lock } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin } = useAppState();
  const [email, setEmail] = useState('admin@oreng.io');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(password);
    if (!success) {
      setError('Invalid password. Use demo password: oreng2026');
    }
  };

  return (
    <>
      <SeoMeta
        title="Admin Portal Login — Oreng B2B CMS"
        description="Secure admin login for Oreng B2B lead management and game catalog administration."
      />

      <div className="pt-36 pb-24 min-h-screen bg-[#0B0D13] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#121622] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5B14]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5 mx-auto shadow-lg shadow-[#FF5B14]/30">
              <div className="w-full h-full bg-[#0B0D13] rounded-[14px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#FF782D]" />
              </div>
            </div>
            <h1 className="text-2xl font-display font-bold text-white">Oreng Admin Portal</h1>
            <p className="text-xs text-gray-400 font-mono">B2B CRM &amp; Content Management System</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-mono text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#FF5B14]"
              />
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] font-mono text-gray-400 space-y-1">
              <p>🔑 <strong className="text-gray-300">Demo Credentials:</strong></p>
              <p>Email: <span className="text-white">admin@oreng.io</span></p>
              <p>Password: <span className="text-[#FF782D] font-bold">oreng2026</span></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-lg shadow-[#FF5B14]/30 hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In to Admin</span>
            </button>
          </form>

          <div className="text-center text-[10px] font-mono text-gray-500">
            Protected by TLS 1.3 • Role-Based Session Authorization
          </div>
        </div>
      </div>
    </>
  );
};

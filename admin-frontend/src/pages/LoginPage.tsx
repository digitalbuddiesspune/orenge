import React, { useState } from 'react';
import { adminApi, isLoggedIn } from '../lib/adminApi';
import { Lock, Flame } from 'lucide-react';

interface Props { onLogin: () => void; }

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@oreng.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminApi.login(email, password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0B0D13]">
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF5B14] to-[#F59E0B] p-0.5 shadow-lg shadow-[#FF5B14]/30 mb-4">
            <div className="w-full h-full bg-[#0B0D13] rounded-[13px] flex items-center justify-center">
              <Flame className="w-7 h-7 text-[#FF782D]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Oreng Admin</h1>
          <p className="text-sm text-gray-400 mt-1">Game Studio Control Panel</p>
        </div>

        <div className="bg-[#121622] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5B14] transition"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF5B14] transition"
              />
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-gray-400 space-y-0.5">
              <p>🔑 Default: <span className="text-white">admin@oreng.com</span></p>
              <p>Password: set in backend <span className="text-[#FF782D]">.env → ADMIN_PASSWORD</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-lg shadow-[#FF5B14]/30 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

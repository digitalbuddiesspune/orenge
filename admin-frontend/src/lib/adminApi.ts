const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

const TOKEN_KEY = 'oreng_admin_token';

export type AdminUser = { id: string; email: string; name: string; role: string };
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Demo Scheduled' | 'Proposal Sent' | 'Won' | 'Lost';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({ success: false, message: 'Invalid JSON' }));
  if (res.status === 401) clearSession();
  if (!res.ok || !body.success) throw new Error(body.message ?? `Error ${res.status}`);
  return body.data as T;
}

export function getToken() { return localStorage.getItem(TOKEN_KEY); }
export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('oreng_admin_user');
}
export function isLoggedIn() { return Boolean(getToken()); }

export const adminApi = {
  login: async (email: string, password: string) => {
    const data = await req<{ token: string; admin: AdminUser }>('/api/admin/auth/login', {
      method: 'POST', body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem('oreng_admin_user', JSON.stringify(data.admin));
    return data;
  },

  logout: () => clearSession(),

  getStats: () => req<unknown>('/api/admin/dashboard/stats'),

  getLeads: async (params?: Record<string, string>) => {
    const qs = new URLSearchParams(params ?? {}).toString();
    const res = await fetch(`${BASE}/api/admin/leads${qs ? `?${qs}` : ''}`, {
      headers: authHeaders(),
    });
    const body = await res.json();
    if (res.status === 401) clearSession();
    if (!res.ok || !body.success) throw new Error(body.message ?? 'Failed');
    return body as { data: unknown[]; meta: unknown };
  },

  updateLeadStatus: (id: string, status: string, notes?: string) =>
    req(`/api/admin/leads/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }) }),
  deleteLead: (id: string) => req(`/api/admin/leads/${id}`, { method: 'DELETE' }),

  getGames: () => req<unknown[]>('/api/admin/games'),
  createGame: (payload: unknown) => req('/api/admin/games', { method: 'POST', body: JSON.stringify(payload) }),
  updateGame: (id: string, payload: unknown) => req(`/api/admin/games/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteGame: (id: string) => req(`/api/admin/games/${id}`, { method: 'DELETE' }),

  getCaseStudies: () => req<unknown[]>('/api/admin/case-studies'),
  createCaseStudy: (payload: unknown) => req('/api/admin/case-studies', { method: 'POST', body: JSON.stringify(payload) }),
  updateCaseStudy: (id: string, payload: unknown) => req(`/api/admin/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCaseStudy: (id: string) => req(`/api/admin/case-studies/${id}`, { method: 'DELETE' }),

  getBlogPosts: () => req<unknown[]>('/api/admin/blog'),
  createBlogPost: (payload: unknown) => req('/api/admin/blog', { method: 'POST', body: JSON.stringify(payload) }),
  updateBlogPost: (id: string, payload: unknown) => req(`/api/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteBlogPost: (id: string) => req(`/api/admin/blog/${id}`, { method: 'DELETE' }),

  uploadImage: async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const token = getToken();
    const res = await fetch(`${BASE}/api/admin/uploads`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    const body = await res.json().catch(() => ({ success: false, message: 'Upload failed' }));
    if (res.status === 401) clearSession();
    if (!res.ok || !body.success) throw new Error(body.message ?? 'Upload failed');
    return body.data as { url: string; filename: string; size: number; mimetype: string };
  },
};

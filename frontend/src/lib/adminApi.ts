import { uploadToCloudinary } from './cloudinary';

const TOKEN_KEY = 'oreng_admin_token';
const ADMIN_KEY = 'oreng_admin_user';

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(init?.headers || {}),
    },
  });

  const body = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));

  if (res.status === 401) {
    clearAdminSession();
  }

  if (!res.ok || !body.success) {
    throw new Error(body.message || `Request failed (${res.status})`);
  }

  return body.data as T;
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdmin(): AdminUser | null {
  const raw = localStorage.getItem(ADMIN_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function clearAdminSession(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
  sessionStorage.removeItem('oreng_admin_auth');
}

export function isAdminSessionActive(): boolean {
  return Boolean(getAdminToken());
}

export const adminApi = {
  login: async (email: string, password: string) => {
    const data = await adminRequest<{ token: string; admin: AdminUser }>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
    sessionStorage.setItem('oreng_admin_auth', 'true');
    return data;
  },

  logout: () => {
    clearAdminSession();
  },

  getStats: () => adminRequest('/api/admin/dashboard/stats'),

  getLeads: async (params?: { type?: string; status?: string; q?: string; page?: number; limit?: number }) => {
    const q = new URLSearchParams();
    if (params?.type) q.set('type', params.type);
    if (params?.status) q.set('status', params.status);
    if (params?.q) q.set('q', params.q);
    if (params?.page) q.set('page', String(params.page));
    if (params?.limit) q.set('limit', String(params.limit));
    const qs = q.toString();
    const url = `/api/admin/leads${qs ? `?${qs}` : ''}`;
    try {
      const res = await adminRequest<unknown>(url);
      if (Array.isArray(res)) {
        return { success: true, data: res, meta: {} };
      }
      if (res && typeof res === 'object' && 'data' in res) {
        const obj = res as { data: unknown[]; meta?: unknown };
        return { success: true, data: obj.data, meta: obj.meta || {} };
      }
      return { success: true, data: [], meta: {} };
    } catch {
      // Fallback direct request
      const fallbackUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
      const res = await fetch(fallbackUrl, { headers: { ...authHeaders() } });
      const body = await res.json().catch(() => ({ success: false, data: [] }));
      return { success: true, data: body.data || [], meta: body.meta || {} };
    }
  },

  updateLeadStatus: (id: string, status: string, notes?: string) =>
    adminRequest(`/api/admin/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  deleteLead: (id: string) =>
    adminRequest(`/api/admin/leads/${id}`, { method: 'DELETE' }),

  getGames: () => adminRequest<unknown[]>('/api/admin/games'),
  createGame: (payload: unknown) =>
    adminRequest('/api/admin/games', { method: 'POST', body: JSON.stringify(payload) }),
  updateGame: (id: string, payload: unknown) =>
    adminRequest(`/api/admin/games/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteGame: (id: string) =>
    adminRequest(`/api/admin/games/${id}`, { method: 'DELETE' }),

  getCaseStudies: () => adminRequest<unknown[]>('/api/admin/case-studies'),
  createCaseStudy: (payload: unknown) =>
    adminRequest('/api/admin/case-studies', { method: 'POST', body: JSON.stringify(payload) }),
  updateCaseStudy: (id: string, payload: unknown) =>
    adminRequest(`/api/admin/case-studies/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCaseStudy: (id: string) =>
    adminRequest(`/api/admin/case-studies/${id}`, { method: 'DELETE' }),

  getBlogPosts: () => adminRequest<unknown[]>('/api/admin/blog'),
  createBlogPost: (payload: unknown) =>
    adminRequest('/api/admin/blog', { method: 'POST', body: JSON.stringify(payload) }),
  updateBlogPost: (id: string, payload: unknown) =>
    adminRequest(`/api/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteBlogPost: (id: string) =>
    adminRequest(`/api/admin/blog/${id}`, { method: 'DELETE' }),

  getHomeAssets: () => adminRequest<Record<string, string> | null>('/api/admin/settings/home-assets'),
  updateHomeAssets: (payload: Record<string, string>) =>
    adminRequest('/api/admin/settings/home-assets', { method: 'PUT', body: JSON.stringify(payload) }),

  uploadImage: async (file: File, onProgress?: (percent: number) => void) => {
    try {
      // Primary: Direct Cloudinary CDN Upload
      const cloudRes = await uploadToCloudinary(file, onProgress);
      return {
        url: cloudRes.url,
        filename: cloudRes.filename,
        size: cloudRes.size,
        mimetype: file.type,
      };
    } catch (cloudErr) {
      console.warn('[upload] Cloudinary direct upload failed, attempting local server fallback...', cloudErr);
      // Fallback: Local Express backend upload
      const form = new FormData();
      form.append('file', file);
      const token = localStorage.getItem(TOKEN_KEY);
      const res = await fetch(`${API_BASE}/api/admin/uploads`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form,
      });
      const body = await res.json().catch(() => ({ success: false, message: 'Invalid response' }));
      if (res.status === 401) clearAdminSession();
      if (!res.ok || !body.success) {
        throw new Error(
          (cloudErr instanceof Error ? cloudErr.message : '') ||
          body.message ||
          `Upload failed (${res.status})`
        );
      }
      return body.data as { url: string; filename: string; size: number; mimetype: string };
    }
  },
};

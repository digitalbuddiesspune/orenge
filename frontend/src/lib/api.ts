type ApiOk<T> = { success: true; data: T; meta?: unknown };
type ApiErr = { success: false; message: string; errors?: unknown };

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  let body: ApiOk<T> | ApiErr;
  try {
    body = await res.json();
  } catch {
    throw new Error(res.status === 503 ? 'API unavailable' : 'Unexpected server response');
  }

  if (!res.ok || !body.success) {
    throw new Error(('message' in body && body.message) || `Request failed (${res.status})`);
  }

  return body.data;
}

export type ContactPayload = {
  fullName: string;
  businessEmail: string;
  phone?: string;
  companyName: string;
  companyWebsite?: string;
  country: string;
  lookingFor: string;
  hasPlatform?: 'Yes' | 'No' | 'Under Development';
  budget?: string;
  timeline?: string;
  projectDescription: string;
  source?: string;
};

export type DemoPayload = {
  fullName: string;
  businessEmail: string;
  phone?: string;
  companyName: string;
  companyWebsite?: string;
  country: string;
  gameSlug?: string;
  gameTitle?: string;
  preferredDate?: string;
  message?: string;
  source?: string;
};

export const api = {
  health: () => request<{ service: string }>('/api/health'),

  submitContact: (payload: ContactPayload) =>
    request('/api/leads/contact', { method: 'POST', body: JSON.stringify(payload) }),

  submitDemo: (payload: DemoPayload) =>
    request('/api/leads/demo', { method: 'POST', body: JSON.stringify(payload) }),

  getGames: (params?: { category?: string; featured?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.category) q.set('category', params.category);
    if (params?.featured) q.set('featured', 'true');
    const qs = q.toString();
    return request<unknown[]>(`/api/games${qs ? `?${qs}` : ''}`);
  },

  getGame: (slug: string) => request(`/api/games/${encodeURIComponent(slug)}`),

  getCaseStudies: () => request<unknown[]>('/api/case-studies'),

  getCaseStudy: (slug: string) => request(`/api/case-studies/${encodeURIComponent(slug)}`),

  getBlogPosts: () => request<unknown[]>('/api/blog'),

  getBlogPost: (slug: string) => request(`/api/blog/${encodeURIComponent(slug)}`),
};

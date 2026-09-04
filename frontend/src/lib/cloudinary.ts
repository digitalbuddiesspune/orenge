const cloudName =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_CLOUD_NAME) ||
  'uf3q04pk';

const uploadPreset =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CLOUDINARY_UPLOAD_PRESET) ||
  'oreng_admin';

export const CLOUDINARY_CONFIG = {
  cloudName,
  uploadPreset,
  uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
};

export type CloudinaryUploadResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
};

export type UploadedMediaItem = {
  id: string;
  url: string;
  publicId: string;
  filename: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  createdAt: string;
};

const LOCAL_MEDIA_STORAGE_KEY = 'oreng_uploaded_media';

export function getStoredMedia(): UploadedMediaItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_MEDIA_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveMediaItem(item: UploadedMediaItem): UploadedMediaItem[] {
  const current = getStoredMedia();
  const updated = [item, ...current.filter((m) => m.url !== item.url)];
  localStorage.setItem(LOCAL_MEDIA_STORAGE_KEY, JSON.stringify(updated.slice(0, 50)));
  return updated;
}

export function removeStoredMediaItem(url: string): UploadedMediaItem[] {
  const current = getStoredMedia();
  const updated = current.filter((m) => m.url !== url);
  localStorage.setItem(LOCAL_MEDIA_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/**
 * Uploads a file directly to Cloudinary using unsigned upload preset
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ url: string; publicId: string; filename: string; size: number; width: number; height: number }> {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  // Validate image file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files (JPG, PNG, WebP, GIF, SVG) are allowed');
  }

  // Max 10MB check
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image size must be under 10MB');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };
    }

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.secure_url) {
          const mediaItem: UploadedMediaItem = {
            id: res.public_id || `media-${Date.now()}`,
            url: res.secure_url,
            publicId: res.public_id,
            filename: file.name,
            format: res.format,
            width: res.width || 0,
            height: res.height || 0,
            bytes: res.bytes || file.size,
            createdAt: new Date().toISOString(),
          };
          saveMediaItem(mediaItem);

          resolve({
            url: res.secure_url,
            publicId: res.public_id,
            filename: file.name,
            size: res.bytes || file.size,
            width: res.width || 0,
            height: res.height || 0,
          });
        } else {
          const errorMsg = res.error?.message || `Cloudinary upload failed (${xhr.status})`;
          reject(new Error(errorMsg));
        }
      } catch {
        reject(new Error(`Failed to parse Cloudinary response (${xhr.status})`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary image upload. Check internet connection.'));
    };

    xhr.send(formData);
  });
}

/**
 * Downloads an image directly to the user's computer
 */
export async function downloadImage(url: string, filename?: string): Promise<void> {
  if (!url) return;
  try {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const defaultName = url.split('/').pop()?.split('?')[0] || 'image.png';
    link.download = filename || defaultName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch {
    // Fallback: open/download via window
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = filename || 'image.png';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

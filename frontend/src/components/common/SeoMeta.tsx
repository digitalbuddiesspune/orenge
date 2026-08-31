import React, { useEffect } from 'react';

interface SeoMetaProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website'
}) => {
  useEffect(() => {
    // Update Title
    const fullTitle = `${title} | Oreng B2B Game Development`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [title, description, keywords, canonical, ogType]);

  return null;
};

import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { ArrowLeft, Clock } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { currentSlug, blogPosts, navigate, openConsultationModal } = useAppState();

  const post = blogPosts.find((p) => p.slug === currentSlug) || blogPosts[0];

  return (
    <>
      <SeoMeta
        title={`${post.title} — Oreng Insights`}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
      />

      <div className="pt-28 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('insights')}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Insights</span>
            </button>
          </div>

          {/* Article Header */}
          <div className="space-y-4 mb-10 pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gray-400">
              <span className="px-3 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] font-bold">
                {post.category}
              </span>
              <span>•</span>
              <span>{post.publishedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            {/* Author bar */}
            <div className="flex items-center gap-3 pt-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <span className="text-sm font-semibold text-white block">{post.author.name}</span>
                <span className="text-xs text-gray-400 font-mono">{post.author.role}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed font-sans">
            {post.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-gray-500">Tags:</span>
              {post.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-mono text-gray-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Consultation Box */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#171C2B] via-[#121622] to-[#171C2B] border border-white/10 text-center shadow-2xl space-y-4">
            <h3 className="text-2xl font-display font-bold text-white">
              Building a game or scaling your platform?
            </h3>
            <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
              Our engineering team is ready to evaluate your requirements, design stateful room servers, and build custom games tailored to your platform.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openConsultationModal(`Consultation after reading ${post.title}`)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5B14] to-[#FF782D] text-white font-semibold text-sm shadow-xl shadow-[#FF5B14]/30 hover:opacity-95 transition cursor-pointer"
              >
                Discuss Your Architecture
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

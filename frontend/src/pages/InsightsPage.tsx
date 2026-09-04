import React from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { SeoMeta } from '../components/common/SeoMeta';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const { blogPosts, navigate } = useAppState();

  return (
    <>
      <SeoMeta
        title="Gaming Engineering Insights & Architecture Guides — Oreng"
        description="Technical articles and architecture guides on building high-concurrency multiplayer games, WebSocket state synchronization, and platform integration."
        keywords="Multiplayer Architecture, WebSocket Gaming, Game Backend, White-Label vs Custom Games, Game Development Blog"
      />

      <div className="pt-32 pb-24 min-h-screen bg-[#0B0D13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5B14]/10 border border-[#FF5B14]/30 text-[#FF782D] text-xs font-mono mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>ENGINEERING THOUGHT LEADERSHIP</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Insights &amp; Architecture.
            </h1>
            <p className="text-gray-400 mt-3 text-base sm:text-lg leading-relaxed">
              Deep dives into multiplayer game state synchronization, authoritative backend engineering, and gaming platform integration strategies.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-3xl bg-[#121622] border border-white/10 overflow-hidden shadow-xl hover:border-[#FF5B14]/40 transition duration-300 flex flex-col justify-between group"
              >
                <div className="p-7">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-[#FF5B14]/10 text-[#FF782D] font-bold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="text-xl font-display font-bold text-white group-hover:text-[#FF782D] transition leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-300 mt-3 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-7 pt-0 border-t border-white/5 mt-4">
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2.5">
                      {post.author?.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-white/10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-[#FF5B14]/20 text-[#FF782D] border border-[#FF5B14]/30 flex items-center justify-center text-[10px] font-bold">
                          {(post.author?.name || 'O').charAt(0)}
                        </div>
                      )}
                      <span className="text-xs text-gray-300 font-medium">{post.author?.name || 'Oreng Engineering'}</span>
                    </div>

                    <button
                      onClick={() => navigate('blog-detail', post.slug)}
                      className="text-xs font-semibold text-[#FF782D] hover:text-white flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

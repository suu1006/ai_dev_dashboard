'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Star,
  Sparkles,
  Activity,
  ShoppingBag,
  Eye,
  Trophy,
  Palette,
} from 'lucide-react';
import { Category, PersonalColor } from '@/lib/types';
import { REVIEWS } from '@/lib/data';

const categories: { label: string; value: Category }[] = [
  { label: 'Total', value: 'ALL' },
  { label: '뷰티', value: 'BEAUTY' },
  { label: '시술', value: 'PROCEDURE' },
  { label: '패션', value: 'FASHION' },
];

const personalColors: { label: string; value: PersonalColor | 'ALL' }[] = [
  { label: '전체', value: 'ALL' },
  { label: '봄 웜톤', value: 'SPRING_WARM' },
  { label: '여름 쿨톤', value: 'SUMMER_COOL' },
  { label: '가을 웜톤', value: 'AUTUMN_WARM' },
  { label: '겨울 쿨톤', value: 'WINTER_COOL' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const [activePersonalColor, setActivePersonalColor] = useState<PersonalColor | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = useMemo(() => {
    let results = REVIEWS.filter((review) => {
      const matchesCategory =
        activeCategory === 'ALL' || review.category === activeCategory;
      const matchesSearch =
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      let matchesPersonalColor = true;
      if (activeCategory === 'BEAUTY' && activePersonalColor !== 'ALL') {
        matchesPersonalColor = review.personalColor === activePersonalColor;
      }

      return matchesCategory && matchesSearch && matchesPersonalColor;
    });

    if (activeCategory === 'BEAUTY') {
      results = [...results].sort(
        (a, b) =>
          b.helpfulCount + b.rating * 10 - (a.helpfulCount + a.rating * 10)
      );
    }

    return results;
  }, [activeCategory, activePersonalColor, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-sm px-12 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex items-center gap-12">
          <div className="flex items-baseline gap-4">
            <h1 className="title-black text-2xl cursor-pointer">리뷰의 정석</h1>
            <span className="hidden lg:block text-[10px] font-bold text-brand-gray tracking-tighter border-l border-gray-200 pl-4 py-1">
              광고 없는 진짜들의 리뷰
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] text-brand-gray uppercase">
            <a href="#" className="hover:text-brand-ink transition-colors">Beauty</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Procedures</a>
            <a href="#" className="hover:text-brand-ink transition-colors">Fashion</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-ink transition-colors" />
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-48 md:w-64 h-9 bg-gray-50 border border-transparent rounded-full pl-10 pr-4 text-[11px] text-brand-ink focus:bg-white focus:border-brand-ink focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[10px] font-bold text-brand-gray px-3 py-1 border border-gray-200 rounded-full cursor-pointer hover:bg-white transition-colors">
              LOGIN
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="px-12 py-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[480px] rounded-sm overflow-hidden group border border-gray-100"
          >
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfad450511?q=80&w=2000&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Featured Review"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-16 text-white">
              <span className="inline-block px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest mb-6 self-start">
                Monthly Best
              </span>
              <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                2024 봄 시즌<br />린넨 소재 완벽 분석 후기
              </h3>
              <p className="text-sm opacity-80 max-w-sm mb-8 leading-relaxed">
                실제 원단감부터 체형별 핏까지 꼼꼼하게 비교 분석했습니다. 패션 카테고리 최고의 유저 리뷰를 확인하세요.
              </p>
              <button className="self-start text-[11px] font-bold border-b-2 border-white pb-1 hover:opacity-70 transition-opacity">
                VIEW FULL REVIEW
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="px-12 mb-6">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-100 pb-6 gap-6">
            <div>
              <h4 className="title-black text-xl mb-4">Latest Insights</h4>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setActiveCategory(cat.value);
                      setActivePersonalColor('ALL');
                    }}
                    className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all border ${
                      activeCategory === cat.value
                        ? 'bg-brand-ink text-white border-brand-ink'
                        : 'bg-white text-brand-gray border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold text-brand-gray tracking-widest">
              <span className="cursor-pointer hover:text-brand-ink uppercase">Latest</span>
              <span className="opacity-30">|</span>
              <span className="cursor-pointer hover:text-brand-ink uppercase">Popular</span>
              <span className="opacity-30">|</span>
              <span className="cursor-pointer hover:text-brand-ink uppercase">Helpful</span>
            </div>
          </div>

          {/* Personal Color Filter */}
          <AnimatePresence>
            {activeCategory === 'BEAUTY' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-sm border border-gray-100">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-ink shrink-0">
                    <Palette className="w-3.5 h-3.5" />
                    Personal Color
                  </div>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {personalColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setActivePersonalColor(color.value)}
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all border shrink-0 ${
                          activePersonalColor === color.value
                            ? 'bg-brand-ink text-white border-brand-ink'
                            : 'bg-white text-brand-gray border-gray-200 hover:border-brand-gray/50'
                        }`}
                      >
                        {color.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Review Grid */}
      <main className="px-12 flex-1 mb-24">
        <div className="max-w-[1440px] mx-auto">
          {filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-brand-gray">
              <Sparkles className="w-8 h-8 mb-4 opacity-30" />
              <p className="text-sm font-medium">검색 결과가 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((review, index) => (
                  <motion.article
                    key={review.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="minimal-card group overflow-hidden cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                        {review.image ? (
                          <img
                            src={review.image}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={review.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <ShoppingBag className="w-8 h-8" />
                          </div>
                        )}

                        {/* Labels */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          <span
                            className={`label-micro px-2 py-1 bg-white/95 backdrop-blur-sm border ${
                              review.category === 'BEAUTY'
                                ? 'text-blue-600 border-blue-100'
                                : review.category === 'PROCEDURE'
                                ? 'text-purple-600 border-purple-100'
                                : 'text-green-600 border-green-100'
                            }`}
                          >
                            {review.category}
                          </span>
                          {activeCategory === 'BEAUTY' && index < 3 && (
                            <div className="flex items-center gap-1 label-micro bg-brand-ink text-white px-2 py-1">
                              <Trophy className="w-2 h-2 fill-amber-400 text-amber-400" />
                              Rank {index + 1}
                            </div>
                          )}
                          {review.personalColor && (
                            <span className="text-[8px] font-black uppercase tracking-widest bg-white/90 px-2 py-1 text-brand-ink">
                              {personalColors.find((pc) => pc.value === review.personalColor)?.label}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-sm font-bold leading-tight line-clamp-2 mb-3 group-hover:text-brand-ink transition-colors">
                          {review.title}
                        </h3>
                        <p className="text-[11px] text-brand-gray leading-relaxed line-clamp-2 mb-6 opacity-60 font-medium">
                          {review.content}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-brand-ink flex items-center justify-center text-[8px] font-black text-white">
                              {review.author[0].toUpperCase()}
                            </div>
                            <span className="text-[10px] font-bold text-brand-ink tracking-tight uppercase">
                              {review.author}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                              <Eye className="w-3 h-3 text-brand-gray" />
                              <span className="text-[9px] font-bold">
                                {review.viewCount > 1000
                                  ? (review.viewCount / 1000).toFixed(1) + 'k'
                                  : review.viewCount}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span className="text-[10px] font-black tracking-tighter">
                                {review.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-12 py-8 border-t border-gray-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold italic">
          Real Reviews Only / Established 2024
        </p>
        <div className="flex gap-8">
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest cursor-pointer hover:text-brand-ink transition-colors">Privacy</span>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest cursor-pointer hover:text-brand-ink transition-colors">Terms</span>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest cursor-pointer hover:text-brand-ink transition-colors">Contact</span>
        </div>
      </footer>
    </div>
  );
}

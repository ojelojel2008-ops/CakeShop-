import React, { useState } from 'react';
import { Star, Heart, MessageSquarePlus, Sparkles, Check, Quote } from 'lucide-react';
import { SWEET_STORIES } from '../data/cakes';

export const SweetStoriesSection: React.FC = () => {
  const [stories, setStories] = useState(SWEET_STORIES);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newOccasion, setNewOccasion] = useState('');
  const [newCakeName, setNewCakeName] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [submittedThanks, setSubmittedThanks] = useState(false);

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newQuote.trim()) return;

    const added = {
      id: `story-${Date.now()}`,
      author: newAuthor.trim(),
      occasion: newOccasion.trim() || 'Momen Spesial',
      quote: newQuote.trim(),
      cakeName: newCakeName.trim() || 'Custom CakeShop Creation',
      rating: 5,
      location: 'Indonesia',
      date: 'Baru saja',
    };

    setStories([added, ...stories]);
    setSubmittedThanks(true);
    setTimeout(() => {
      setSubmittedThanks(false);
      setIsAddingStory(false);
      setNewAuthor('');
      setNewOccasion('');
      setNewCakeName('');
      setNewQuote('');
    }, 2000);
  };

  return (
    <section id="stories" className="py-14 lg:py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8FA] to-[#FFFDF9] border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-wider font-semibold text-pink-600 mb-1 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
              <span>Cerita Manis Pelanggan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif-display">
              Setiap Kue Punya Ceritanya Sendiri
            </h2>
            <p className="mt-1 text-sm text-stone-500 max-w-xl">
              Simak kisah di balik setiap lilin yang ditiup, senyum kebahagiaan sahabat, dan cinta yang terukir di atas kue CakeShop.
            </p>
          </div>

          <button
            onClick={() => setIsAddingStory(!isAddingStory)}
            className="px-5 py-2.5 rounded-xl border border-pink-300 hover:bg-pink-50 text-pink-700 font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0 shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Bagikan Cerita Manismu</span>
          </button>
        </div>

        {/* Story Form Modal / Dropdown */}
        {isAddingStory && (
          <div className="mb-10 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-md max-w-2xl mx-auto animate-fade-in">
            <h3 className="text-base font-bold text-stone-900 mb-1 font-serif-display">
              Tuliskan Cerita di Balik Kuemu
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Bagikan momen bahagiamu agar menginspirasi orang lain untuk merayakan cinta.
            </p>

            <form onSubmit={handleSubmitStory} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Namamu</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={e => setNewAuthor(e.target.value)}
                    placeholder="Contoh: Bianca"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Perayaan / Momen</label>
                  <input
                    type="text"
                    value={newOccasion}
                    onChange={e => setNewOccasion(e.target.value)}
                    placeholder="Contoh: Ulang tahun Mama ke-50"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Kue yang Kamu Pesan</label>
                <input
                  type="text"
                  value={newCakeName}
                  onChange={e => setNewCakeName(e.target.value)}
                  placeholder="Contoh: Custom Bento Cake Lilac"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">Kisah & Ulasanmu</label>
                <textarea
                  rows={3}
                  required
                  value={newQuote}
                  onChange={e => setNewQuote(e.target.value)}
                  placeholder="Ceritakan bagaimana reaksi orang terdekat saat menerima kuemu..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-pink-500 focus:outline-hidden resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingStory(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-500 hover:text-stone-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  {submittedThanks ? 'Cerita Terkirim!' : 'Publikasikan Cerita'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map(story => (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-6 border border-pink-100/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              <div>
                {/* Clean Unboxed Metadata */}
                <div className="flex items-center justify-between text-xs text-stone-400 mb-4">
                  <span className="font-semibold text-pink-600 uppercase tracking-wider text-[11px]">
                    {story.occasion}
                  </span>
                  <span>{story.date}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed font-serif-display">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">{story.author}</h4>
                  <span className="text-[11px] text-stone-500">{story.location}</span>
                </div>
                <span className="text-[11px] font-medium text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md truncate max-w-[130px]">
                  {story.cakeName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram / Social Proof Photo Grid preview */}
        <div className="mt-14 rounded-3xl bg-white p-6 sm:p-8 border border-pink-100 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-lg font-bold text-stone-900 font-serif-display">
              Galeri Momen Manis #EveryCakeTellsASweetStory
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Tag akun kami @cakeshop.sweetstory di Instagram untuk kesempatan tampil di galeri utama!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 group">
              <img
                src="/src/assets/images/bento_korean_cake_1793860598136.jpg"
                alt="Korean Bento Sweet Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                @sarah.baking
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 group">
              <img
                src="/src/assets/images/hero_artisan_cake_1793860596512.jpg"
                alt="Birthday Vintage Cake Sweet Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                @celebratewithus
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 group">
              <img
                src="/src/assets/images/custom_tier_cake_1793860598219.jpg"
                alt="Anniversary Tier Cake Sweet Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                @clara_moment
              </div>
            </div>

            <div className="relative aspect-square rounded-2xl overflow-hidden bg-pink-50 group">
              <img
                src="/src/assets/images/pastry_cupcake_set_1793860597636.jpg"
                alt="Cupcakes Party Sweet Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                @sweetreats.id
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

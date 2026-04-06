import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ArrowRight, Clock, Coffee, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HomePage() {
  const { data: drinks, isLoading } = useQuery({
    queryKey: ["drinks"],
    queryFn: async () => {
      const res = await fetch("/api/drinks");
      if (!res.ok) throw new Error("Failed to fetch drinks");
      return res.json();
    },
  });

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDrinks = drinks?.filter(
    (drink) =>
      drink.name.toLowerCase().includes(search.toLowerCase()) ||
      drink.category.toLowerCase().includes(search.toLowerCase()),
  );

  const categories = ["All", "Coffee & Tea", "Refreshers"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FFF4E0] to-[#E0F4FF]">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-[#FF6B9D]" />
            <span className="font-bold text-[#FF6B9D] text-sm uppercase tracking-wider">
              Your Happy Place
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-fredoka mb-6 tracking-tight text-[#2D3748] font-bold">
            Cafe Vibes ☕✨
          </h1>
          <p className="text-xl md:text-2xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed font-medium">
            Colorful drinks, happy moments! Discover fun recipes that'll
            brighten your day 🌈
          </p>
        </motion.header>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="relative w-full max-w-md mx-auto mb-8">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search for yummy drinks..."
              className="w-full bg-white/90 backdrop-blur-sm border-none rounded-full pl-14 pr-6 py-4 focus:ring-4 focus:ring-[#FF6B9D]/30 text-lg placeholder-[#9CA3AF] font-medium shadow-lg transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-md ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white shadow-lg"
                    : "bg-white/80 text-[#4A5568] hover:bg-white"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Drink Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-white/60 rounded-3xl mb-6"></div>
                <div className="h-8 bg-white/60 rounded-full w-2/3 mb-4"></div>
                <div className="h-4 bg-white/60 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDrinks?.map((drink, idx) => (
              <motion.a
                key={drink.id}
                href={`/drink/${drink.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group block"
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all p-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-[#FFE5F1] to-[#E0F4FF]">
                    <motion.img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      {drink.category}
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-fredoka font-bold text-[#2D3748] group-hover:text-[#FF6B9D] transition-colors">
                      {drink.name}
                    </h2>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] rounded-full p-2"
                    >
                      <ArrowRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-base text-[#4A5568] leading-relaxed mb-5 line-clamp-2 font-medium">
                    {drink.description}
                  </p>
                  <div className="flex gap-4 text-sm text-[#6B7280] font-bold">
                    <span className="flex items-center gap-2 bg-[#FFF4E0] px-3 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-[#FFB347]" /> {drink.time}
                    </span>
                    <span className="flex items-center gap-2 bg-[#E0F4FF] px-3 py-2 rounded-full">
                      <Coffee className="w-4 h-4 text-[#4299E1]" />{" "}
                      {drink.difficulty}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-16 text-center"
        >
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-xl">
            <div className="font-fredoka text-3xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] bg-clip-text text-transparent mb-3">
              Cafe Vibes ☕
            </div>
            <p className="text-[#6B7280] text-sm font-bold uppercase tracking-wider">
              Made with 💖 in 2026
            </p>
          </div>
        </motion.footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .font-fredoka {
          font-family: 'Fredoka', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .group:hover img {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

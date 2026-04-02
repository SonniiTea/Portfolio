"use client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Clock, Coffee, Check, Sparkles, Heart } from "lucide-react";
import { motion } from "motion/react";

export default function DrinkDetailPage({ params }) {
  const { id } = params;

  const { data: drink, isLoading } = useQuery({
    queryKey: ["drink", id],
    queryFn: async () => {
      const res = await fetch(`/api/drinks/${id}`);
      if (!res.ok) throw new Error("Failed to fetch drink");
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FFF4E0] to-[#E0F4FF] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#FF6B9D] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="font-fredoka text-2xl font-bold text-[#2D3748]">
            Loading your recipe...
          </p>
        </div>
      </div>
    );
  if (!drink) return <div className="p-24 text-center">Drink not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE5F1] via-[#FFF4E0] to-[#E0F4FF]">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="p-6 md:p-8 flex justify-between items-center fixed top-0 w-full z-10 bg-white/80 backdrop-blur-md shadow-lg"
      >
        <motion.a
          href="/"
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white px-5 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.a>
        <div className="font-fredoka text-xl font-bold bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] bg-clip-text text-transparent">
          Cafe Vibes ☕
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white rounded-full p-3 shadow-lg"
        >
          <Heart className="w-5 h-5 text-[#FF6B9D]" />
        </motion.button>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image & Header */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-2xl mb-8"
            >
              <img
                src={drink.image}
                alt={drink.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {drink.category}
              </div>
            </motion.div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-[#2D3748] mb-4 leading-tight">
                {drink.name}
              </h1>
              <p className="text-lg text-[#4A5568] leading-relaxed mb-6 font-medium">
                {drink.description}
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-[#FFF4E0] px-4 py-3 rounded-full">
                  <Clock className="w-5 h-5 text-[#FFB347]" />
                  <span className="font-bold text-[#2D3748] text-sm">
                    {drink.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#E0F4FF] px-4 py-3 rounded-full">
                  <Coffee className="w-5 h-5 text-[#4299E1]" />
                  <span className="font-bold text-[#2D3748] text-sm">
                    {drink.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recipe Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Ingredients */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] rounded-full p-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-fredoka font-bold text-[#2D3748]">
                  What You'll Need
                </h3>
              </div>
              <ul className="space-y-4">
                {drink.ingredients.map((ingredient, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 bg-gradient-to-r from-[#FFF4E0] to-[#FFE5F1] p-4 rounded-2xl"
                  >
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-md">
                      {idx + 1}
                    </span>
                    <span className="text-[#2D3748] font-medium text-base">
                      {ingredient}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* Steps */}
            <section className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-[#4299E1] to-[#9F7AEA] rounded-full p-2">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-fredoka font-bold text-[#2D3748]">
                  Let's Make It!
                </h3>
              </div>
              <div className="space-y-6">
                {drink.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex gap-5 bg-gradient-to-r from-[#E0F4FF] to-[#F0E7FF] p-5 rounded-2xl"
                  >
                    <div className="text-3xl font-fredoka font-bold bg-gradient-to-r from-[#4299E1] to-[#9F7AEA] bg-clip-text text-transparent">
                      {idx + 1}
                    </div>
                    <p className="text-base leading-relaxed text-[#2D3748] font-medium flex-1">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Success Message */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-[#FF6B9D] to-[#FFB347] text-white p-10 rounded-3xl text-center shadow-2xl"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Check className="w-8 h-8" />
                </div>
              </motion.div>
              <h4 className="text-3xl font-fredoka font-bold mb-2">
                You Did It! 🎉
              </h4>
              <p className="text-white/90 text-base font-medium">
                Time to enjoy your delicious creation!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .font-fredoka {
          font-family: 'Fredoka', sans-serif;
        }
      `}</style>
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles, Gift } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  results: string[];
}

interface PremiumTestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  badgeText?: string;
  theme?: 'gift' | 'seller' | 'user';
}

export function PremiumTestimonials({ 
  testimonials, 
  title = "Trusted by Industry Leaders",
  subtitle = "Join thousands of businesses already transforming their operations with our premium solutions.",
  badgeText = "✨ Success Stories",
  theme = 'gift'
}: PremiumTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 0.86, 0.39, 0.96] 
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'seller':
        return {
          primary: 'from-emerald-300 via-teal-300 to-cyan-300',
          accent: 'text-emerald-300',
          gradient: 'from-emerald-500/[0.08] via-teal-500/[0.05] to-cyan-500/[0.08]',
          orb1: 'bg-emerald-400/15',
          orb2: 'bg-cyan-400/15'
        };
      case 'user':
        return {
          primary: 'from-rose-300 via-pink-300 to-purple-300',
          accent: 'text-rose-300',
          gradient: 'from-rose-500/[0.08] via-pink-500/[0.05] to-purple-500/[0.08]',
          orb1: 'bg-rose-400/15',
          orb2: 'bg-purple-400/15'
        };
      default:
        return {
          primary: 'from-indigo-300 via-purple-300 to-rose-300',
          accent: 'text-indigo-300',
          gradient: 'from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08]',
          orb1: 'bg-indigo-400/15',
          orb2: 'bg-rose-400/15'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <section className="relative py-32 bg-gradient-to-br from-black via-indigo-950/20 to-black text-white overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${themeColors.gradient}`}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Moving light orbs */}
        <motion.div
          className={`absolute top-1/3 left-1/5 w-72 h-72 ${themeColors.orb1} rounded-full blur-3xl`}
          animate={{
            x: [0, 150, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className={`absolute bottom-1/3 right-1/5 w-80 h-80 ${themeColors.orb2} rounded-full blur-3xl`}
          animate={{
            x: [0, -100, 0],
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${25 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {theme === 'gift' ? <Gift className="h-4 w-4 text-indigo-300" /> : <Sparkles className="h-4 w-4 text-indigo-300" />}
            </motion.div>
            <span className="text-sm font-medium text-white/80">
              {badgeText}
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
            variants={fadeInUp}
          >
            <motion.span 
              className={`bg-clip-text text-transparent bg-gradient-to-r ${themeColors.primary}`}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              {title}
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="relative h-[500px] md:h-[400px] perspective-1000">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  rotateY: { duration: 0.6 }
                }}
                className="absolute inset-0"
              >
                <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.15] p-8 md:p-12 overflow-hidden group">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${themeColors.gradient} rounded-3xl`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />

                  {/* Quote icon */}
                  <motion.div
                    className="absolute top-8 right-8 opacity-20"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Quote className="w-16 h-16 text-white" />
                  </motion.div>

                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                    {/* User Info */}
                    <div className="flex-shrink-0 text-center md:text-left">
                      <motion.div
                        className="relative mb-6"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white/20 relative">
                          <img
                            src={testimonials[currentIndex]?.avatar}
                            alt={testimonials[currentIndex]?.name}
                            className="w-full h-full object-cover"
                          />
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${themeColors.gradient}`}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          />
                        </div>

                        {/* Floating ring animation */}
                        <motion.div
                          className={`absolute inset-0 border-2 border-indigo-400/30 rounded-full`}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-2">
                        {testimonials[currentIndex]?.name}
                      </h3>
                      <p className={`${themeColors.accent} mb-1 font-medium`}>
                        {testimonials[currentIndex]?.role}
                      </p>
                      <p className="text-white/60 mb-4">
                        {testimonials[currentIndex]?.company}
                      </p>

                      {/* Star Rating */}
                      <div className="flex justify-center md:justify-start gap-1 mb-6">
                        {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <motion.blockquote
                        className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-light italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        "{testimonials[currentIndex]?.text}"
                      </motion.blockquote>

                      {/* Results */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {testimonials[currentIndex]?.results?.map((result, i) => (
                          <motion.div
                            key={i}
                            className="bg-white/[0.05] rounded-lg p-3 border border-white/[0.1] backdrop-blur-sm"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                          >
                            <span className="text-sm text-white/70 font-medium">
                              {result}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm text-white hover:bg-white/[0.15] transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-indigo-400 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm text-white hover:bg-white/[0.15] transition-all"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

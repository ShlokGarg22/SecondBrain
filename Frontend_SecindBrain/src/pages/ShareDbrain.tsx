import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/Card";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { AnimatedButton } from "../components/AnimatedButton";
import { Logo } from "../icons/Logo";
import { CopyIcon } from "../icons/CopyIcon";
import { CheckIcon } from "../icons/CheckIcon";

export function ShareDbrain() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchContents() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setContents(response.data.content);
      } catch (error) {
        console.error("Error fetching contents:", error);
        setError("Failed to load content. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchContents();
  }, []);

  const copyShareLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
    });
  };

  // Floating shapes for background effects (same as dashboard)
  const FloatingCircle = ({ delay = 0, size = "w-8 h-8" }) => (
    <motion.div
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 200,
        opacity: 0 
      }}
      animate={{ 
        x: [null, Math.random() * window.innerWidth, Math.random() * window.innerWidth],
        y: [null, -200],
        opacity: [0, 0.6, 0.8, 0.4, 0],
        scale: [1, 1.8, 2.2, 1.5, 1]
      }}
      transition={{
        duration: 12 + Math.random() * 18,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`fixed pointer-events-none z-10 ${size} bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-[1px] shadow-lg`}
    />
  );

  const FloatingDot = ({ delay = 0 }) => (
    <motion.div
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0
      }}
      animate={{ 
        scale: [0, 1.5, 2.5, 1.8, 0],
        opacity: [0, 0.4, 0.8, 0.6, 0],
        x: [null, Math.random() * window.innerWidth],
        y: [null, Math.random() * window.innerHeight]
      }}
      transition={{
        duration: 5 + Math.random() * 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="fixed pointer-events-none z-10 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-[0.5px] shadow-md"
    />
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen text-gray-900 relative overflow-hidden">
      {/* Background elements */}
      {[...Array(8)].map((_, i) => (
        <FloatingCircle key={`circle-${i}`} delay={i * 2} size={i % 3 === 0 ? "w-6 h-6" : i % 3 === 1 ? "w-8 h-8" : "w-10 h-10"} />
      ))}
      {[...Array(10)].map((_, i) => (
        <FloatingDot key={`dot-${i}`} delay={i * 1.5} />
      ))}

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.06) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="relative z-20 w-full xl:max-w-7xl mx-auto px-6 space-y-12">
        {/* Enhanced Header */}
        <motion.header 
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center justify-center py-10 mt-8 border border-gray-200/50 backdrop-blur-xl bg-white/80 rounded-3xl px-8 shadow-2xl shadow-gray-200/50 relative overflow-hidden"
        >
          {/* Animated Header Background */}
          <motion.div 
            animate={{
              background: [
                'linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))',
                'linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
                'linear-gradient(45deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-3xl"
          />
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center text-3xl font-bold gap-4 text-gray-800 relative z-10 mb-4"
          >
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.3)",
                  "0 0 30px rgba(147, 51, 234, 0.3)",
                  "0 0 25px rgba(236, 72, 153, 0.3)",
                  "0 0 20px rgba(59, 130, 246, 0.3)"
                ]
              }}
              className="p-3 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-2xl text-white shadow-lg"
            >
              <Logo />
            </motion.div>
            <motion.span 
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)',
                  'linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)',
                  'linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)'
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="bg-clip-text text-transparent"
            >
              Shared Brain
            </motion.span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-6 text-center max-w-xl"
          >
            Access a curated collection of knowledge from Twitter, YouTube, Medium, and Reddit
          </motion.p>

          {/* Copy URL Button */}
          <AnimatedButton 
            onClick={copyShareLink} 
            variant="primary" 
            className="relative"
          >
            <motion.div className="flex items-center gap-2">
              {copied ? (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-300"
                >
                  <CheckIcon />
                </motion.span>
              ) : (
                <motion.span 
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <CopyIcon />
                </motion.span>
              )}
              {copied ? "Link Copied!" : "Copy Share Link"}
            </motion.div>
          </AnimatedButton>
        </motion.header>

        {/* Main content with cards */}
        <motion.main 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-16"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex justify-center py-20"
              >
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 1, ease: "linear" },
                    scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                  }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </motion.div>
            ) : error ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-red-500 text-lg">{error}</p>
                <AnimatedButton 
                  onClick={() => window.location.reload()} 
                  variant="primary"
                  className="mt-4"
                >
                  Retry
                </AnimatedButton>
              </motion.div>
            ) : contents.length > 0 ? (
              contents.map(({ type, link, title, _id }, index) => (
                <motion.div
                  key={_id || index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card 
                    type={type} 
                    link={link} 
                    title={title} 
                    contentId={_id} 
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="col-span-full text-center py-20 relative"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.15, 1],
                    rotate: [0, 8, -8, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-9xl mb-8 filter drop-shadow-2xl"
                >
                  🧠
                </motion.div>
                <motion.h3 
                  animate={{
                    backgroundImage: [
                      'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                      'linear-gradient(45deg, #8b5cf6, #ec4899)',
                      'linear-gradient(45deg, #ec4899, #3b82f6)'
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="text-4xl font-bold mb-6 bg-clip-text text-transparent"
                >
                  No content available
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 mb-6 text-xl max-w-md mx-auto leading-relaxed"
                >
                  This brain hasn't been filled with knowledge yet
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
  );
}

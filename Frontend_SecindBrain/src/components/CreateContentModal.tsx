import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrossIcon } from "../icons/CrossIcon";
import { AnimatedButton } from "./AnimatedButton";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { MediumIcon } from "../icons/Medium";
import { RedditIcon } from "../icons/Reddit";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Medium = "medium",
  Reddit = "reddit"
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    // Basic validation
    if (!title || !link) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type
        },
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );
      onClose();
    } catch (err) {
      console.error("Failed to add content", err);
      setError("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Get platform-specific styles
  const getPlatformStyles = () => {
    switch (type) {
      case ContentType.Youtube:
        return {
          bgGradient: "from-red-500 to-red-700",
          icon: <YoutubeIcon />,
          name: "YouTube"
        };
      case ContentType.Twitter:
        return {
          bgGradient: "from-blue-400 to-blue-600",
          icon: <TwitterIcon />,
          name: "Twitter"
        };
      case ContentType.Medium:
        return {
          bgGradient: "from-gray-700 to-gray-900",
          icon: <MediumIcon />,
          name: "Medium"
        };
      case ContentType.Reddit:
        return {
          bgGradient: "from-orange-500 to-red-600",
          icon: <RedditIcon />,
          name: "Reddit"
        };
    }
  };

  const platformStyle = getPlatformStyles();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with blur effect */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />

          {/* Modal content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 300
            }}
            className="relative z-10 w-full max-w-md mx-4"
          >
            {/* Modal card with fancy gradient background */}
            <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <motion.div 
                  animate={{
                    background: [
                      'linear-gradient(45deg, rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))',
                      'linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05), rgba(147, 51, 234, 0.05))',
                      'linear-gradient(45deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05), rgba(59, 130, 246, 0.05))'
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    radial-gradient(circle at 15% 15%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 85% 85%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
                  `}}></div>
              </div>

              {/* Modal content */}
              <div className="relative p-7 space-y-6">
                {/* Header with platform icon */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${platformStyle.bgGradient} shadow-lg text-white`}
                    >
                      {platformStyle.icon}
                    </motion.div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Add {platformStyle.name} Content
                    </h2>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-500 hover:text-gray-700 transition-colors p-2" 
                    onClick={onClose}
                  >
                    <CrossIcon />
                  </motion.button>
                </div>

                {/* Input fields */}
                <div className="space-y-4">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Title</label>
                    <Input 
                      reference={titleRef} 
                      placeholder="Enter content title" 
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all" 
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Link</label>
                    <Input 
                      reference={linkRef} 
                      placeholder="Enter content URL" 
                      className="w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                    />
                  </motion.div>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Platform selector */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-center text-gray-700 mb-3">Select Platform</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    <AnimatedButton 
                      onClick={() => setType(ContentType.Youtube)}
                      variant={type === ContentType.Youtube ? "primary" : "filter"}
                      className={type === ContentType.Youtube ? "!bg-gradient-to-r !from-red-500 !to-red-700" : ""}
                    >
                      <div className="flex items-center gap-2">
                        <YoutubeIcon />
                        YouTube
                      </div>
                    </AnimatedButton>
                    
                    <AnimatedButton 
                      onClick={() => setType(ContentType.Twitter)}
                      variant={type === ContentType.Twitter ? "primary" : "filter"}
                      className={type === ContentType.Twitter ? "!bg-gradient-to-r !from-blue-400 !to-blue-600" : ""}
                    >
                      <div className="flex items-center gap-2">
                        <TwitterIcon />
                        Twitter
                      </div>
                    </AnimatedButton>
                    
                    <AnimatedButton 
                      onClick={() => setType(ContentType.Medium)}
                      variant={type === ContentType.Medium ? "primary" : "filter"}
                      className={type === ContentType.Medium ? "!bg-gradient-to-r !from-gray-700 !to-gray-900" : ""}
                    >
                      <div className="flex items-center gap-2">
                        <MediumIcon />
                        Medium
                      </div>
                    </AnimatedButton>
                    
                    <AnimatedButton 
                      onClick={() => setType(ContentType.Reddit)}
                      variant={type === ContentType.Reddit ? "primary" : "filter"}
                      className={type === ContentType.Reddit ? "!bg-gradient-to-r !from-orange-500 !to-red-600" : ""}
                    >
                      <div className="flex items-center gap-2">
                        <RedditIcon />
                        Reddit
                      </div>
                    </AnimatedButton>
                  </div>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 flex justify-center"
                >
                  <AnimatedButton 
                    onClick={addContent} 
                    loading={loading}
                    className={`w-full max-w-xs !bg-gradient-to-r ${platformStyle.bgGradient}`}
                  >
                    <span className="font-medium text-lg">
                      Save to Second Brain
                    </span>
                  </AnimatedButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

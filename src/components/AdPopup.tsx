import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

interface Ad {
  _id: string;
  title: string;
  description: string;
  images: string[];
  redirectLink: string;
  isActive: boolean;
}

const API_BASE = "http://localhost:5000/api";

export default function AdPopup() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { openBooking } = useBooking();

  // Fetch active ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch(`${API_BASE}/ads/active`);
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setAds(data);
            // Show popup after a short delay for better UX
            setTimeout(() => setIsVisible(true), 2000);
          }
        }
      } catch (error) {
        // Silently fail — don't break homepage if server is down
        console.log("Ad server not available");
      }
    };

    fetchAds();
  }, []);

  // Auto-cycle images within current ad
  useEffect(() => {
    if (!isVisible || ads.length === 0) return;
    const currentAd = ads[currentAdIndex];
    if (!currentAd || currentAd.images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentAd.images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isVisible, currentAdIndex, ads]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBookNow = () => {
    const currentAd = ads[currentAdIndex];
    if (currentAd?.redirectLink) {
      window.open(currentAd.redirectLink, "_blank");
    } else {
      openBooking();
    }
    setIsVisible(false);
  };

  if (ads.length === 0) return null;

  const currentAd = ads[currentAdIndex];
  if (!currentAd) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white transition-all shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-8 pt-6 text-center">
              {/* Title */}
              {currentAd.title && (
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#1b3a4b] mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {currentAd.title}
                </h2>
              )}

              {/* Description */}
              {currentAd.description && (
                <p
                  className="text-sm text-gray-500 mb-6"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {currentAd.description}
                </p>
              )}

              {/* Image Carousel */}
              {currentAd.images.length > 0 && (
                <div className="mb-6">
                  <div className="flex gap-3 justify-center">
                    {currentAd.images.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          i === currentImageIndex
                            ? "border-[#2E6B8A] shadow-lg"
                            : "border-transparent"
                        }`}
                        style={{
                          width: currentAd.images.length === 1 ? "100%" : currentAd.images.length === 2 ? "48%" : "31%",
                          maxWidth: "200px",
                        }}
                        onClick={() => setCurrentImageIndex(i)}
                      >
                        <img
                          src={`http://localhost:5000${img}`}
                          alt={`${currentAd.title || "Ad"} ${i + 1}`}
                          className="w-full h-32 md:h-40 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Image Dots */}
                  {currentAd.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {currentAd.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentImageIndex
                              ? "w-6 bg-[#2E6B8A]"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Book Now Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNow}
                className="px-10 py-3 bg-[#2E6B8A] hover:bg-[#255a75] text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#2E6B8A]/30"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Book Now
              </motion.button>
            </div>

            {/* Ad navigation dots (if multiple ads) */}
            {ads.length > 1 && (
              <div className="flex justify-center gap-2 pb-6">
                {ads.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentAdIndex(i);
                      setCurrentImageIndex(0);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentAdIndex
                        ? "bg-[#C5A861] w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

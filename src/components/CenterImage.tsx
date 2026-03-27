import { useEffect, useState } from "react";
import proposalImage from "@/assets/proposal-image.png";

interface CenterImageProps {
  onAnimationComplete: () => void;
  onRevealStart?: () => void;
}

const CenterImage = ({ onAnimationComplete, onRevealStart }: CenterImageProps) => {
  const [visible, setVisible] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setVisible(true);
      onRevealStart?.();
    }, 500);
    const t2 = setTimeout(() => setShowQuote(true), 5000);
    const t3 = setTimeout(() => onAnimationComplete(), 10000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onAnimationComplete, onRevealStart]);

  return (
    <div className="flex flex-col items-center justify-center gap-6" style={{ zIndex: 2 }}>
      <div
        style={{
          opacity: visible ? 1 : 0,
          filter: visible
            ? "blur(0px) drop-shadow(0 0 40px hsl(280 60% 55% / 0.4))"
            : "blur(6px)",
          transition: "opacity 7s cubic-bezier(0.16, 1, 0.3, 1), filter 7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src={proposalImage}
          alt="Love Proposal"
          style={{
            width: "clamp(400px, 95vw, 900px)",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Romantic quote */}
      <p
        className="font-proposal-display text-center max-w-md px-6"
        style={{
          opacity: showQuote ? 1 : 0,
          transform: showQuote ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 3s cubic-bezier(0.16, 1, 0.3, 1), transform 3s cubic-bezier(0.16, 1, 0.3, 1)",
          color: "hsl(280, 20%, 75%)",
          fontSize: "clamp(1rem, 3.5vw, 1.35rem)",
          fontStyle: "italic",
          letterSpacing: "0.02em",
          textShadow: "0 0 30px hsl(280 60% 55% / 0.3)",
        }}
      >
        "I exist in two places — here, and wherever you are."
      </p>
    </div>
  );
};

export default CenterImage;

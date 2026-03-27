import { useEffect, useState } from "react";
import proposalImage from "@/assets/proposal-image.png";

interface CenterImageProps {
  onAnimationComplete: () => void;
  onRevealStart?: () => void;
}

const CenterImage = ({ onAnimationComplete, onRevealStart }: CenterImageProps) => {
  const [visible, setVisible] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    setVisible(true);
    const t2 = setTimeout(() => setShowQuote(true), 4500);
    const t3 = setTimeout(() => onAnimationComplete(), 9500);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [revealed, onAnimationComplete]);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    onRevealStart?.();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6" style={{ zIndex: 2 }}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleReveal}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleReveal();
          }
        }}
        aria-label="Tap to reveal"
        style={{
          position: "relative",
          cursor: revealed ? "default" : "pointer",
          opacity: revealed ? (visible ? 1 : 0) : 1,
          filter: revealed
            ? (visible ? "blur(0px) drop-shadow(0 0 40px hsl(280 60% 55% / 0.4))" : "blur(8px)")
            : "blur(12px) brightness(0.65)",
          transition: "opacity 6.5s cubic-bezier(0.16, 1, 0.3, 1), filter 6.5s cubic-bezier(0.16, 1, 0.3, 1)",
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

        {!revealed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              textAlign: "center",
              padding: "0 1rem",
              background: "linear-gradient(180deg, hsl(0 0% 0% / 0.2), hsl(0 0% 0% / 0.45))",
            }}
          >
            <p
              className="font-proposal-body"
              style={{
                color: "hsl(285 38% 90% / 0.92)",
                fontSize: "clamp(0.95rem, 2.6vw, 1.2rem)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textShadow: "0 0 20px hsl(280 80% 60% / 0.45)",
              }}
            >
              Tap to reveal
            </p>
          </div>
        )}
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

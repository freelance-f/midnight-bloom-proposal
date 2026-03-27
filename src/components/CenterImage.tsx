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
    const t2 = setTimeout(() => setShowQuote(true), 6200);
    const t3 = setTimeout(() => onAnimationComplete(), 12200);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [revealed, onAnimationComplete]);

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
    onRevealStart?.();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-6"
      style={{ zIndex: 20 }}
    >
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
          transition: "opacity 9.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div
          style={{
            filter: revealed
              ? (visible ? "blur(0px) brightness(1) drop-shadow(0 0 44px hsl(280 60% 55% / 0.38))" : "blur(10px) brightness(0.72)")
              : "blur(16px) brightness(0.52)",
            transition: "filter 9.5s cubic-bezier(0.22, 1, 0.36, 1)",
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

        {!revealed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 22,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <p
              className="font-proposal-display"
              style={{
                fontFamily: "'Dancing Script', 'Cormorant Garamond', serif",
                color: "hsl(287 44% 92% / 0.95)",
                fontSize: "clamp(1rem, 2.6vw, 1.35rem)",
                letterSpacing: "0.04em",
                textShadow: "0 0 20px hsl(280 80% 60% / 0.45)",
                marginBottom: "0.35rem",
              }}
            >
              Tap to reveal
            </p>
            <svg
              width="38"
              height="28"
              viewBox="0 0 38 28"
              fill="none"
              aria-hidden="true"
              style={{ opacity: 0.9, filter: "drop-shadow(0 0 10px hsl(282 90% 66% / 0.42))" }}
            >
              <path
                d="M3 5C13 5 15 10 16 15C17 20 20 24 29 24"
                stroke="hsl(287 50% 88%)"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M25.5 20.5L29.5 24L25.5 27.5"
                stroke="hsl(287 50% 88%)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Romantic quote */}
      <p
        className="font-proposal-display text-center max-w-md px-6"
        style={{
          opacity: showQuote ? 1 : 0,
          transform: showQuote ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 3.8s cubic-bezier(0.22, 1, 0.36, 1), transform 3.8s cubic-bezier(0.22, 1, 0.36, 1)",
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

import { useState, useCallback, useEffect, useRef } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import CenterImage from "@/components/CenterImage";
import ProposalNotes from "@/components/ProposalNotes";
import ProposalInteraction from "@/components/ProposalInteraction";

const Index = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const handleAnimationComplete = useCallback(() => setShowNotes(true), []);

  // Auto-scroll to notes section after they appear
  useEffect(() => {
    if (showNotes && notesRef.current) {
      setTimeout(() => {
        notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [showNotes]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
    if (!isMuted) {
      void audioRef.current.play().catch(() => {
        // Browser may block autoplay until first user interaction.
      });
    }
  }, [isMuted]);

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
    if (!nextMuted) {
      void audioRef.current.play().catch(() => {
        // Keep this silent for a smooth UI experience.
      });
    }
  };

  return (
    <div
      className="min-h-screen overflow-y-auto overflow-x-hidden"
      style={{ background: "var(--gradient-proposal)" }}
    >
      <audio ref={audioRef} src="/dear-kavya-bgm.mp3" loop preload="auto" autoPlay />

      <button
        type="button"
        onClick={handleToggleMute}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
        className="fixed right-4 top-4 z-50 rounded-full px-3 py-2 text-xs font-semibold text-white/90 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
        style={{
          fontFamily: "'Inter', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', sans-serif",
          letterSpacing: "0.12em",
          background: "linear-gradient(180deg, hsl(280 26% 20% / 0.78), hsl(280 22% 12% / 0.78))",
          border: "1px solid hsl(285 55% 76% / 0.28)",
          boxShadow: "0 8px 20px hsl(280 85% 56% / 0.22), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
          backdropFilter: "blur(8px)",
        }}
      >
        {isMuted ? "MUTE" : "SOUND"}
      </button>

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)", zIndex: 0 }}
      />

      <FloatingParticles />

      {/* Hero Section - Full screen, only PNG */}
      <section className="relative h-screen flex items-center justify-center" style={{ zIndex: 2 }}>
        <CenterImage onAnimationComplete={handleAnimationComplete} />
      </section>

      {/* Notes Section - Scrollable */}
      {showNotes && (
        <>
          <section
            ref={notesRef}
            className="relative min-h-screen flex items-center justify-center px-6 py-16"
            style={{ zIndex: 2 }}
          >
            <ProposalNotes show={showNotes} />
          </section>
          <ProposalInteraction show={showNotes} />
        </>
      )}
    </div>
  );
};

export default Index;

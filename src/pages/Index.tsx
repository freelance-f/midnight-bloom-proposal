import { useState, useCallback, useEffect, useRef } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import CenterImage from "@/components/CenterImage";
import ProposalNotes from "@/components/ProposalNotes";
import ProposalInteraction from "@/components/ProposalInteraction";

const Index = () => {
  const [showNotes, setShowNotes] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedAudioRef = useRef(false);
  const hasUnmutedAudioRef = useRef(false);
  const handleAnimationComplete = useCallback(() => setShowNotes(true), []);
  const playBackgroundMusic = useCallback((fromStart = false) => {
    if (!audioRef.current) return;
    if (fromStart) {
      audioRef.current.currentTime = 0;
    }
    audioRef.current.muted = true;
    void audioRef.current.play().then(() => {
      hasStartedAudioRef.current = true;
    }).catch(() => {
      // Browser may block autoplay until first user interaction.
    });
  }, []);

  const handleRevealStart = useCallback(() => {
    playBackgroundMusic(true);
  }, [playBackgroundMusic]);

  useEffect(() => {
    if (showNotes && notesRef.current) {
      setTimeout(() => {
        notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [showNotes]);

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) return;
      if (!hasStartedAudioRef.current) {
        playBackgroundMusic(false);
      }
      if (!hasUnmutedAudioRef.current) {
        audioRef.current.muted = false;
        hasUnmutedAudioRef.current = true;
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [playBackgroundMusic]);

  return (
    <div
      className="min-h-screen overflow-y-auto overflow-x-hidden"
      style={{ background: "var(--gradient-proposal)" }}
    >
      <audio ref={audioRef} src="/dear-kavya-bgm.mp3" loop preload="auto" playsInline />

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--gradient-glow)", zIndex: 0 }}
      />

      <FloatingParticles />

      {/* Hero Section - Full screen, only PNG */}
      <section className="relative h-screen flex items-center justify-center" style={{ zIndex: 2 }}>
        <CenterImage onAnimationComplete={handleAnimationComplete} onRevealStart={handleRevealStart} />
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

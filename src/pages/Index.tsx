import { useState, useCallback, useEffect, useRef } from "react";
import FloatingParticles from "@/components/FloatingParticles";
import CenterImage from "@/components/CenterImage";
import ProposalNotes from "@/components/ProposalNotes";

const Index = () => {
  const [showNotes, setShowNotes] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);
  const handleAnimationComplete = useCallback(() => setShowNotes(true), []);

  // Auto-scroll to notes section after they appear
  useEffect(() => {
    if (showNotes && notesRef.current) {
      setTimeout(() => {
        notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [showNotes]);

  return (
    <div
      className="min-h-screen overflow-y-auto overflow-x-hidden"
      style={{ background: "var(--gradient-proposal)" }}
    >
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
        <section
          ref={notesRef}
          className="relative min-h-screen flex items-center justify-center px-6 py-16"
          style={{ zIndex: 2 }}
        >
          <ProposalNotes show={showNotes} />
        </section>
      )}
    </div>
  );
};

export default Index;

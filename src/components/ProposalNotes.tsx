import { useEffect, useRef, useState } from "react";

const notesData = [
  {
    title: "Ma ❤️",
    lines: [
      "Ne life lo nenu anto Naku teliyadu kani,",
      "na life anni nuvee — anduku ani adagaka,",
      "nuvu nacchinatlu ninnu treat chesintu",
      "inkokari daggara i can't maa..",
      "",
      "Konni saarlu nenu mistakes chesa…",
      "konni matalu cheppakudadhu ani telisina kuda cheppanu.",
      "Dani gurinchi naku chala regret undi ma.",
      "Sorry… nijam ga sorry.",
      "Ninnu hurt cheyadam na intention eppudu kaadu.",
      "",
      "Nuvvu navvute na day complete aipothundi…",
      "nuvvu matladakapothe na heart silent aipothundi.",
      "Nuvvu na pakkana unte, vere yemi kavali anipinchadu.",
      "",
      "I may not be perfect,",
      "but na love matram true ga icchanu.",
      "Ninnu care chestha, respect chestha,",
      "and life lo eppudu vadalanu.",
      "",
      "Please na mistakes ni oka sari marchipoyi,",
      "malli manam happy ga undham ma.",
      "Oka chance, one last chance.",
      "",
      "Nuvu agipoina point nunchi kouncham movie iye chudu —",
      "chala life undhi, kallu musukoni happy ga bratakocchu.",
      "Edi na promise..",
    ],
    isSecret: false,
  },
  {
    title: "Bangaram💝",
    lines: [
      "Mana madhya jarigindhi… mana break up…",
      "aa rojullo nenu chala confuse ayyanu,",
      "konni mistakes kuda chesa.",
      "Ippudu aa mistakes gurinchi alochisthe",
      "chala badha padutunnanu Maa… nijam ga sorry.",
      "",
      "Ninnu hurt cheyyadam na intention kaadu,",
      "kani na actions tho ninnu baadha pettanu ani ardham ayyindi.",
      "",
      "2025 motham nenu naa mistakes gurinchi alochinchanu…",
      "nenu evarini blame cheyyaledu,",
      "nannu nene question chesukunnanu.",
      "But real change naku 2026 January nunchi start ayyindi.",
      "Na thinking, na behavior, na patience…",
      "anni slow ga marchukunna.",
      "",
      "Ippudu nenu matram cheppagalanu —",
      "nenu mundu jariginatlu jaraaganivaanu, trust me.",
      "Oka chance ivvu Maa…",
      "ee sari ninnu hurt cheyyanu ani promise cheyyanu.",
      "",
      "Nenu ninnu 3 years nundi love chesthunna…",
      "aa prema ippude kaadu, appatiki alane untadi.",
    ],
    isSecret: false,
  },
  {
    title: "Na prema… ❤️",
    lines: [
      "Nuvvu na life lo ochinappati nunchi,",
      "prathi roju oka special feeling tho start avutundi.",
      "Nuvvu navvithe na rojanta bright aipothundi,",
      "nuvvu matladithe na manasu calm aipothundi.",
      "",
      "Nenu ninnu chusthe,",
      "na future motham neetho imagine chestha…",
      "simple moments aina,",
      "manam kalisi navvukune kshanalu aina,",
      "avi naaku chala pedda happiness istayi.",
      "",
      "Naa prema lo expectations levu, conditions levu…",
      "just pure ga ninnu love chesthunna.",
      "Nuvvu happy ga unte chaalu,",
      "ade naaku biggest happiness.",
      "",
      "Nuvvu na life lo oka beautiful chapter kaadu…",
      "you are my whole story",
      "and my whole world.",
      "",
      "Always yours.",
    ],
    isSecret: false,
  },
  {
    title: "My Promise",
    lines: [
      "I want you because I know",
      "I can handle everything that comes with you.",
      "",
      "I want to make you happy, smile, laugh every time.",
      "I want to be the one person you can trust —",
      "a shoulder to cry on when no one else can.",
      "",
      "I wanna show how perfect you are.",
      "I want to kiss your insecurities",
      "and show you how really beautiful you are.",
      "",
      "I Love you.",
      "I only want you, no one else.",
      "",
      "I promise you ❤",
    ],
    isSecret: true,
  },
];

const SIGN = "— Forever yours, Bangaram 💌";
const LINE_DELAY = 120;

interface ProposalNotesProps {
  show: boolean;
}

// ── Line-by-line animated text ───────────────────────────────────────────────
const AnimatedLines = ({ lines, active }: { lines: string[]; active: boolean }) => {
  const [shown, setShown] = useState(0);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShown(0);
    if (!active) return;
    lines.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setShown((p) => Math.max(p, i + 1)), i * LINE_DELAY + 300)
      );
    });
    return () => timers.current.forEach(clearTimeout);
  }, [active, lines]);

  return (
    <div style={{ textAlign: "center" }}>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            opacity: i < shown ? 1 : 0,
            transform: i < shown ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            minHeight: line === "" ? "0.8rem" : undefined,
          }}
        >
          {line && (
            <span
              style={{
                fontFamily: "'Bitter Rose', 'Dancing Script', cursive",
                fontSize: "1.25rem",
                lineHeight: "1.9",
                color: "hsl(320 25% 88% / 0.92)",
                letterSpacing: "0.01em",
              }}
            >
              {line}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

// ── Sealed paper note ────────────────────────────────────────────────────────
const SealedNote = ({ note, active }: { note: typeof notesData[0]; active: boolean }) => {
  const [revealed, setRevealed] = useState(false);
  const [shown, setShown] = useState(0);
  const timers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!active) { setRevealed(false); setShown(0); }
  }, [active]);

  const reveal = () => {
    setRevealed(true);
    timers.current.forEach(clearTimeout);
    note.lines.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setShown((p) => Math.max(p, i + 1)), i * LINE_DELAY + 600)
      );
    });
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Paper body */}
      <div
        style={{
          background: `
            repeating-linear-gradient(
              transparent, transparent 27px,
              hsl(30 30% 65% / 0.22) 27px, hsl(30 30% 65% / 0.22) 28px
            ),
            linear-gradient(
              160deg,
              hsl(42 55% 88%) 0%, hsl(38 48% 82%) 35%,
              hsl(35 42% 78%) 65%, hsl(32 38% 74%) 100%
            )`,
          padding: "1.6rem 1.8rem 1.8rem",
          borderRadius: "6px",
          boxShadow: "0 8px 40px hsl(0 0% 0% / 0.5), 4px 4px 16px hsl(30 30% 30% / 0.2), inset 0 0 24px hsl(38 30% 70% / 0.18)",
          border: "1px solid hsl(35 25% 60% / 0.4)",
          position: "relative",
          userSelect: revealed ? "auto" : "none",
          filter: revealed ? "none" : "blur(6px)",
          transition: "filter 0.8s ease",
        }}
      >
        <div style={{ position: "absolute", left: "44px", top: 0, bottom: 0, width: "1px", background: "hsl(0 60% 65% / 0.3)" }} />

        <h3 style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", fontWeight: 700, color: "hsl(10 50% 25%)", marginBottom: "1rem", textAlign: "center" }}>
          {note.title}
        </h3>

        {note.lines.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: revealed && i < shown ? 1 : revealed ? 0 : 1,
              transform: revealed && i < shown ? "translateY(0)" : revealed ? "translateY(6px)" : "translateY(0)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              minHeight: line === "" ? "0.7rem" : undefined,
            }}
          >
            {line && (
              <p style={{
                fontFamily: "'Bitter Rose', 'Dancing Script', cursive",
                fontSize: "1.25rem",
                lineHeight: "1.85",
                color: "hsl(20 35% 22%)",
                margin: 0,
              }}>
                {line}
              </p>
            )}
          </div>
        ))}

        {revealed && (
          <p style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "1rem",
            fontWeight: 600,
            color: "hsl(350 55% 40%)",
            marginTop: "1.2rem",
            textAlign: "center",
            fontStyle: "italic",
            opacity: shown >= note.lines.length ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}>
            {SIGN}
          </p>
        )}
      </div>

      {/* Seal overlay */}
      {!revealed && (
        <div
          onClick={reveal}
          style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 4, gap: "10px",
          }}
        >
          <div style={{
            width: "68px", height: "68px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, hsl(350 65% 60%), hsl(350 55% 32%))",
            boxShadow: "0 4px 20px hsl(350 60% 30% / 0.6), inset 0 2px 6px hsl(350 70% 72% / 0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="hsl(35 60% 92%)">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "0.88rem", color: "hsl(35 25% 72% / 0.9)", fontStyle: "italic" }}>
            tap to unseal
          </p>
        </div>
      )}

      {/* Corner ribbon */}
      {!revealed && (
        <div style={{ position: "absolute", top: 0, right: 0, width: "88px", height: "88px", overflow: "hidden", zIndex: 5, pointerEvents: "none", borderRadius: "0 6px 0 0" }}>
          <div style={{
            position: "absolute", top: "20px", right: "-24px", width: "90px",
            background: "linear-gradient(180deg, hsl(350 65% 52%), hsl(350 55% 40%))",
            color: "hsl(35 50% 94%)", textAlign: "center", padding: "5px 0",
            fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.14em",
            transform: "rotate(45deg)", boxShadow: "0 2px 8px hsl(0 0% 0% / 0.35)",
            textTransform: "uppercase",
          }}>
            SEALED
          </div>
        </div>
      )}
    </div>
  );
};

// ── Divider between notes ────────────────────────────────────────────────────
const Divider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center", margin: "1rem 0" }}>
    <div style={{ width: "50px", height: "1px", background: "hsl(320 20% 55% / 0.25)" }} />
    <svg width="12" height="12" viewBox="0 0 24 24" fill="hsl(320 40% 70% / 0.45)">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
    <div style={{ width: "50px", height: "1px", background: "hsl(320 20% 55% / 0.25)" }} />
  </div>
);

// ── Main ─────────────────────────────────────────────────────────────────────
const ProposalNotes = ({ show }: ProposalNotesProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "440px",
        padding: "1rem 1.25rem 5rem",
        zIndex: 3,
      }}
    >
      {notesData.map((note, idx) => (
        <div key={idx} style={{ width: "100%" }}>
          {/* Note block */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.9s ease ${idx * 0.25}s, transform 0.9s ease ${idx * 0.25}s`,
              width: "100%",
            }}
          >
            {note.isSecret ? (
              <SealedNote note={note} active={visible} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <h2 style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "clamp(1.5rem, 5vw, 1.9rem)",
                  fontWeight: 700,
                  color: "hsl(320 40% 90%)",
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                }}>
                  {note.title}
                </h2>
                <AnimatedLines lines={note.lines} active={visible} />
                <p style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "hsl(320 35% 78% / 0.8)",
                  marginTop: "1.2rem",
                  fontStyle: "italic",
                  opacity: 0,
                  animation: visible
                    ? `fadeInSign ${note.lines.length * LINE_DELAY + 1200}ms ease ${idx * 250}ms forwards`
                    : "none",
                }}>
                  {SIGN}
                </p>
              </div>
            )}
          </div>

          {/* Divider between notes */}
          {idx < notesData.length - 1 && (
            <div style={{
              opacity: visible ? 1 : 0,
              transition: `opacity 1s ease ${idx * 0.25 + 0.5}s`,
              margin: "3.5rem 0",
            }}>
              <Divider />
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes fadeInSign {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProposalNotes;

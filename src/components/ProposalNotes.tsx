import { useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 60;
const SIGN = "— Forever yours, Bangaram 💌";

const notesData = [
  {
    title: "Ma ❤️",
    text: `Ne life lo nenu anto Naku teliyadu kani, na life anni\nNuvee anduku ani adagaka Naku nuvu nacchinatlu ninnu nenu treat chesintu inkokari daggara i cant maa..

Konni saarlu nenu mistakes chesa… konni matalu cheppakudadhu ani telisina kuda cheppanu. Dani gurinchi naku chala regret undi ma. Sorry… nijam ga sorry. Ninnu hurt cheyadam na intention eppudu kaadu.

Nuvvu navvithe na day complete aipothundi… nuvvu matladakapothe na heart silent aipothundi. Nuvvu na pakkana unte, vere yemi kavali anipinchadu.

I may not be perfect, but na love matram true ga icchanu. Ninnu care chestha, respect chestha, and life lo eppudu vadalanu.

Please na mistakes ni oka sari marchipoyi, malli manam happy ga undham ma. Oka chance, one last chance.

Nuvu agipoina point nunchi kouncham move aiye chudu chala life undhi kallu musukoni Happy ga bratakocchu edi na promise..`,
    isSecret: false,
  },
  {
    title: "Maa ❤️",
    text: `Mana madhya jarigindhi… mana break up… aa rojullo nenu chala confuse ayyanu, konni mistakes kuda chesa. Ippudu aa mistakes gurinchi alochisthe chala badha padutunnanu Maa… nijam ga sorry.

Ninnu hurt cheyyadam na intention kaadu, kani na actions tho ninnu baadha pettanu ani ardham ayyindi.

2025 motham nenu naa mistakes gurinchi alochinchanu… nenu evarini blame cheyyaledu, nannu nene question chesukunnanu. But real change naku 2026 January nunchi start ayyindi. I observed many changes in me Maa… na thinking, na behavior, na patience… anni slow ga marchukunna.

Ippudu nenu matram cheppagalanu — nenu mundu jariginatlu am jaraganivvanu, trust me. Nuvvu deserve chese better person avvalani chala try chesthunna ma.

Nuvvu na life lo malli ravali ani nenu force cheyyatledu… kani oka chance ivvu Maa… nannu malli okasari ardham chesukodaniki try cheyu. Ee sari ninnu hurt cheyyanu ani promise cheyyanu… kani ninnu care cheyyadam, Neku respect ivvadam, love cheyyadam matram 1000% guarantee istanu.

Nenu ninnu 3 years nundi love chesthunna… aa prema ippude kadu appatiki alane untadi am jarigina.

Nuvvu happy ga unte chalu ani anipistundi… kani aa happiness lo nenu part avvalani inka gattiga korukuntunna ma.`,
    isSecret: false,
  },
  {
    title: "Na prema… ❤️",
    text: `Nuvvu na life lo ochinappati nunchi, prathi roju oka special feeling tho start avutundi. Nuvvu navvithe na rojanta bright aipothundi, nuvvu matladithe na manasu calm aipothundi. Netho unde parthi nimasham oka peace full moment la anipistundi.

Nenu ninnu chusthe, na future motham neetho imagine chestha… simple moments aina, manam kalisi navvukune kshanalu aina, avi naaku chala pedda happiness istayi. Nuvvu na pakkana unte chalu, vere emi kavali ani anipinchadu.

Naa prema lo expectations levu, conditions levu… just pure ga ninnu love chesthunna. Nuvvu happy ga unte chaalu, ade naaku biggest happiness.

Nuvvu na life lo oka beautiful chapter kaadu… you are my whole story and whole world.

Always yours..`,
    isSecret: false,
  },
  {
    title: "My Promise",
    text: `I want you because I know that I can handle everything that comes with you. I want to make you happy, smile, laugh everytime. I want to be the one person you can trust and have a shoulder to cry on when no one else can.

I wanna show how perfect you are. I want to kiss your insecurities and show you how really beautiful you are.

I Love you.
I only want you, no one else.

I promise you.`,
    isSecret: true,
  },
];

// ── Paper note body (no curls) ──────────────────────────────────────────────
const PaperNoteBody = ({
  note,
  showSign,
  signColor = "hsl(10 45% 28%)",
  signCenter = false,
}: {
  note: typeof notesData[0];
  showSign: boolean;
  signColor?: string;
  signCenter?: boolean;
}) => (
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
      padding: "1.4rem 1.6rem 1.6rem",
      borderRadius: "6px",
      boxShadow:
        "0 6px 30px hsl(0 0% 0% / 0.45), 4px 4px 12px hsl(30 30% 30% / 0.2), inset 0 0 20px hsl(38 30% 70% / 0.2)",
      border: "1px solid hsl(35 25% 60% / 0.4)",
      position: "relative",
      maxHeight: "58vh",
      overflowY: "auto",
      userSelect: "none",
    }}
  >
    {/* Red margin line */}
    <div
      style={{
        position: "absolute",
        left: "42px",
        top: 0,
        bottom: 0,
        width: "1px",
        background: "hsl(0 60% 65% / 0.32)",
      }}
    />

    <h3
      style={{
        fontFamily: "'Dancing Script', 'Georgia', cursive",
        fontSize: "1.25rem",
        fontWeight: 700,
        color: "hsl(10 50% 25%)",
        marginBottom: "0.9rem",
        letterSpacing: "0.02em",
      }}
    >
      {note.title}
    </h3>

    {note.text.split("\n\n").map((para, pi, arr) => (
      <p
        key={pi}
        style={{
          fontFamily: "'Caveat', 'Georgia', cursive",
          fontSize: "0.97rem",
          lineHeight: "1.85",
          color: "hsl(20 35% 22%)",
          marginBottom: pi < arr.length - 1 ? "0.75rem" : 0,
          whiteSpace: "pre-line",
        }}
      >
        {para}
      </p>
    ))}

    {showSign && (
      <p
        style={{
          fontFamily: "'Dancing Script', 'Georgia', cursive",
          fontSize: "1rem",
          fontWeight: 600,
          color: signColor,
          marginTop: "1rem",
          textAlign: signCenter ? "center" : "right",
          fontStyle: "italic",
        }}
      >
        {SIGN}
      </p>
    )}
  </div>
);

// ── Secret blurred note ─────────────────────────────────────────────────────
const SecretNote = ({ note }: { note: typeof notesData[0] }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Blurred paper */}
      <div
        style={{
          filter: revealed ? "blur(0)" : "blur(7px)",
          transition: "filter 0.75s ease",
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        <PaperNoteBody note={note} showSign={revealed} signColor="hsl(350 55% 40%)" signCenter />
      </div>

      {/* Overlay (only when sealed) */}
      {!revealed && (
        <div
          onClick={() => setRevealed(true)}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 4,
          }}
        >
          {/* Wax seal circle */}
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 30%, hsl(350 65% 60%), hsl(350 55% 32%))",
              boxShadow:
                "0 4px 18px hsl(0 0% 0% / 0.5), inset 0 2px 6px hsl(350 70% 72% / 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Heart SVG */}
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="hsl(35 60% 90%)"
              style={{ filter: "drop-shadow(0 1px 2px hsl(0 0% 0% / 0.3))" }}
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </div>

          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "0.82rem",
              color: "hsl(35 25% 75% / 0.9)",
              marginTop: "10px",
              fontStyle: "italic",
            }}
          >
            tap to unseal
          </p>
        </div>
      )}

      {/* Corner ribbon (top-right) */}
      {!revealed && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "88px",
            height: "88px",
            overflow: "hidden",
            zIndex: 5,
            pointerEvents: "none",
            borderRadius: "0 6px 0 0",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "-24px",
              width: "90px",
              background: "linear-gradient(180deg, hsl(350 65% 52%), hsl(350 55% 40%))",
              color: "hsl(35 50% 94%)",
              textAlign: "center",
              padding: "5px 0",
              fontSize: "0.58rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              transform: "rotate(45deg)",
              boxShadow: "0 2px 8px hsl(0 0% 0% / 0.35)",
              textTransform: "uppercase",
            }}
          >
            SEALED
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main component ─────────────────────────────────────────────────────────
interface ProposalNotesProps {
  show: boolean;
}

const ProposalNotes = ({ show }: ProposalNotesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideW, setSlideW] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [visible, setVisible] = useState(false);
  const startX = useRef<number | null>(null);

  // Measure slide width
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([e]) => setSlideW(e.contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Fade in on show
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  // ── snap helper ──
  const snapTo = (next: number) => {
    setIsSnapping(true);
    setDragX(0);
    setCurrent(next);
    setTimeout(() => setIsSnapping(false), 360);
  };

  // ── drag handlers ──
  const onStart = (x: number) => {
    if (isSnapping) return;
    startX.current = x;
    setIsDragging(true);
  };

  const onMove = (x: number) => {
    if (!isDragging || startX.current === null) return;
    let d = x - startX.current;
    if ((current === 0 && d > 0) || (current === notesData.length - 1 && d < 0)) {
      d *= 0.18; // rubber band
    }
    setDragX(d);
  };

  const onEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -DRAG_THRESHOLD && current < notesData.length - 1) {
      snapTo(current + 1);
    } else if (dragX > DRAG_THRESHOLD && current > 0) {
      snapTo(current - 1);
    } else {
      setIsSnapping(true);
      setDragX(0);
      setTimeout(() => setIsSnapping(false), 360);
    }
    startX.current = null;
  };

  const trackX = slideW > 0 ? -(current * slideW) + dragX : 0;
  const trackTransition =
    isSnapping && !isDragging
      ? "transform 0.36s cubic-bezier(0.25,0.46,0.45,0.94)"
      : "none";

  // fractional position for scale calc
  const frac = slideW > 0 ? current - dragX / slideW : current;

  return (
    <div
      style={{
        width: "100%",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
        zIndex: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {/* ── Track wrapper (clips overflow) ── */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
        onMouseDown={(e) => onStart(e.clientX)}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onEnd}
        onMouseLeave={() => isDragging && onEnd()}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); onMove(e.touches[0].clientX); }}
        onTouchEnd={onEnd}
      >
        {/* ── Track ── */}
        <div
          style={{
            display: "flex",
            transform: `translateX(${trackX}px)`,
            transition: trackTransition,
            willChange: "transform",
          }}
        >
          {notesData.map((note, i) => {
            const dist = Math.abs(i - frac);
            const scale = Math.max(0.91, 1 - Math.min(dist, 1) * 0.09);
            const opacity = Math.max(0.55, 1 - Math.min(dist, 1) * 0.45);

            return (
              <div
                key={i}
                style={{
                  minWidth: `${slideW}px`,
                  width: `${slideW}px`,
                  boxSizing: "border-box",
                  padding: "4px 6px",
                  transform: `scale(${scale})`,
                  opacity,
                  transition: isDragging
                    ? "transform 0.08s, opacity 0.08s"
                    : "transform 0.36s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.36s",
                  transformOrigin: "center top",
                }}
              >
                {note.isSecret ? (
                  <SecretNote note={note} />
                ) : (
                  <PaperNoteBody note={note} showSign />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dot indicators ── */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {notesData.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            aria-label={`Go to note ${i + 1}`}
            style={{
              width: i === current ? "20px" : "8px",
              height: "8px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              background:
                i === current
                  ? "hsl(38 48% 70%)"
                  : "hsl(35 25% 65% / 0.4)",
              transition: "all 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Drag hint ── */}
      {current === 0 && !isDragging && (
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "0.82rem",
            color: "hsl(35 30% 70% / 0.75)",
            marginTop: "-4px",
            userSelect: "none",
          }}
        >
          ← drag to read more →
        </p>
      )}
    </div>
  );
};

export default ProposalNotes;

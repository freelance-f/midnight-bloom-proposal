import { useMemo, useState } from "react";

type Choice = "YES" | "NO";
type HeartParticle = {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScKsV5q2_aEQlgO6V-Tb-cZgFfpo5Q8_tUR6mpcZQpKxDqzwg/formResponse";
const ENTRY_KEY = "entry.741916871";

const ProposalInteraction = ({ show }: { show: boolean }) => {
  const [response, setResponse] = useState<string>("");
  const [selected, setSelected] = useState<Choice | null>(null);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  const isVisible = useMemo(() => show, [show]);

  const sendAnswer = async (answer: Choice) => {
    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams({ [ENTRY_KEY]: answer }).toString(),
      });
    } catch {
      // Silent failure keeps UI smooth and avoids disrupting user flow.
    }
  };

  const handleChoice = (answer: Choice) => {
    setSelected(answer);

    if (answer === "YES") {
      setResponse("You made me the happiest. Thank you. 💜");
      const burst = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        left: `${18 + Math.random() * 64}%`,
        size: `${0.9 + Math.random() * 0.9}rem`,
        delay: `${Math.random() * 0.16}s`,
        duration: `${1.2 + Math.random() * 0.8}s`,
      }));
      setHearts(burst);
      setTimeout(() => setHearts([]), 2200);
    } else {
      setResponse("I understand. Thank you for your honesty.");
      setHearts([]);
    }

    void sendAnswer(answer);
  };

  const responseTone =
    selected === "YES"
      ? "text-purple-200"
      : selected === "NO"
        ? "text-zinc-300"
        : "text-white/70";
  const hasAnswered = selected !== null;

  return (
    <section className="relative min-h-[65vh] flex items-center justify-center px-6 py-16" style={{ zIndex: 2 }}>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[34rem] w-[34rem] rounded-full blur-3xl opacity-45"
          style={{
            background:
              "radial-gradient(circle, hsl(282 82% 56% / 0.33) 0%, hsl(279 65% 36% / 0.22) 40%, transparent 72%)",
          }}
        />
      </div>

      <div
        className={`relative w-full max-w-2xl rounded-[30px] border border-white/15 bg-black/30 backdrop-blur-2xl p-8 md:p-12 text-center shadow-[0_24px_90px_hsl(280_70%_8%_/_0.7)] transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[30px]"
          style={{
            background:
              "linear-gradient(140deg, hsl(286 70% 56% / 0.16) 0%, transparent 34%, transparent 70%, hsl(325 84% 78% / 0.1) 100%)",
          }}
        />

        <p className="relative font-proposal-body text-[11px] md:text-xs uppercase tracking-[0.34em] text-white/55 mb-5">
          A Special Question
        </p>

        <h2
          className={`relative font-proposal-display text-4xl md:text-6xl font-medium leading-tight tracking-[0.03em] text-transparent bg-clip-text ${
            isVisible ? "animate-[fadeRise_0.9s_ease_forwards]" : "opacity-0"
          }`}
          style={{
            fontFamily: "'Dancing Script', 'Cormorant Garamond', serif",
            backgroundImage:
              "linear-gradient(120deg, hsl(292 80% 94%) 2%, hsl(278 95% 80%) 36%, hsl(320 90% 86%) 100%)",
            textShadow: "0 5px 30px hsl(282 79% 56% / 0.34)",
          }}
        >
          Will you be my Valentine?
        </h2>

        {!hasAnswered && (
          <div
            className={`relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <button
              id="yesBtn"
              type="button"
              onClick={() => handleChoice("YES")}
              className={`group min-w-[156px] rounded-full px-9 py-3.5 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_0_36px_hsl(282_87%_62%_/_0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/70 ${
                selected === "YES" ? "scale-105" : ""
              }`}
              style={{
                fontFamily:
                  "'Inter', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', sans-serif",
                letterSpacing: "0.18em",
                background:
                  "linear-gradient(135deg, hsl(279 80% 58% / 0.95), hsl(291 69% 49% / 0.92), hsl(317 66% 57% / 0.88))",
                border: "1px solid hsl(285 90% 85% / 0.34)",
                boxShadow:
                  "0 14px 36px hsl(282 83% 55% / 0.35), inset 0 1px 0 hsl(0 0% 100% / 0.3)",
              }}
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                YES
              </span>
            </button>

            <button
              id="noBtn"
              type="button"
              onClick={() => handleChoice("NO")}
              className={`group min-w-[156px] rounded-full px-9 py-3.5 text-sm md:text-base font-semibold text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_22px_hsl(282_52%_70%_/_0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 ${
                selected === "NO" ? "scale-105" : ""
              }`}
              style={{
                fontFamily:
                  "'Inter', 'Avenir Next', 'Segoe UI', 'Helvetica Neue', sans-serif",
                letterSpacing: "0.18em",
                background: "linear-gradient(180deg, hsl(240 7% 13% / 0.58), hsl(240 8% 8% / 0.6))",
                border: "1px solid hsl(278 36% 76% / 0.28)",
                boxShadow:
                  "0 12px 30px hsl(0 0% 0% / 0.42), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
              }}
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                NO
              </span>
            </button>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-[54%] h-28 overflow-visible">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="absolute text-pink-200 opacity-0"
              style={{
                left: heart.left,
                fontSize: heart.size,
                textShadow: "0 0 12px hsl(321 90% 74% / 0.7), 0 0 24px hsl(286 84% 68% / 0.5)",
                animation: `heartRise ${heart.duration} ease-out ${heart.delay} forwards`,
              }}
            >
              ❤
            </span>
          ))}
        </div>

        <p
          className={`relative mt-8 min-h-6 font-proposal-body text-base md:text-lg transition-all duration-500 ${responseTone} ${
            response ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{
            textShadow:
              selected === "YES"
                ? "0 0 22px hsl(282 88% 72% / 0.35)"
                : selected === "NO"
                  ? "0 0 18px hsl(0 0% 100% / 0.12)"
                  : "none",
          }}
        >
          {response}
        </p>
      </div>

      <style>{`
        @keyframes fadeRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartRise {
          0% { opacity: 0; transform: translateY(8px) scale(0.85); }
          16% { opacity: 1; transform: translateY(-8px) scale(1); }
          100% { opacity: 0; transform: translateY(-90px) scale(1.15); }
        }
      `}</style>
    </section>
  );
};

export default ProposalInteraction;

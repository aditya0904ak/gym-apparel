import { useState, useRef, useEffect, useCallback } from "react";

// Soniox Web Library loaded via CDN in index.html
// This component uses the @soniox/speech-to-text-web library

const SONIOX_API_KEY = "e8bdbd7dd64340c7af2f4c94bed07daa95f55ef8cc29250cc402d3123e0a8328";

const LANGUAGE_OPTIONS = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ar", label: "Arabic" },
  { code: "pt", label: "Portuguese" },
  { code: "hi", label: "Hindi" },
  { code: "ru", label: "Russian" },
  { code: "it", label: "Italian" },
];

const LANGUAGE_FLAG = {
  en: "🇬🇧", es: "🇪🇸", fr: "🇫🇷", de: "🇩🇪",
  zh: "🇨🇳", ja: "🇯🇵", ko: "🇰🇷", ar: "🇸🇦",
  pt: "🇧🇷", hi: "🇮🇳", ru: "🇷🇺", it: "🇮🇹",
};

// ─── Waveform Visualizer ──────────────────────────────────────────────────────
function WaveformBars({ active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 4,
            borderRadius: 4,
            background: active ? "#00e5b0" : "#2a3a4a",
            height: active ? undefined : 8,
            animation: active ? `wave ${0.6 + (i % 4) * 0.15}s ease-in-out infinite alternate` : "none",
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave {
          from { height: 6px; opacity: 0.5; }
          to { height: 32px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Token renderer ───────────────────────────────────────────────────────────
function renderTokens(finalTokens, nonFinalTokens) {
  const all = [...finalTokens, ...nonFinalTokens];
  return all.map((t) => t.text).join("");
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function SonioxTranscriber() {
  const [status, setStatus] = useState("idle"); // idle | loading | recording | error
  const [selectedLangs, setSelectedLangs] = useState(["en", "es", "fr"]);
  const [finalTokens, setFinalTokens] = useState([]);
  const [nonFinalTokens, setNonFinalTokens] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [detectedLang, setDetectedLang] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const clientRef = useRef(null);
  const timerRef = useRef(null);
  const sessionStart = useRef(null);

  // Load Soniox library dynamically
  const [SonioxClient, setSonioxClient] = useState(null);
  useEffect(() => {
    import("https://unpkg.com/@soniox/speech-to-text-web?module")
      .then((mod) => {
        setSonioxClient(() => mod.SonioxClient);
      })
      .catch(() => {
        setErrorMsg("Failed to load Soniox library. Check your connection.");
        setStatus("error");
      });
  }, []);

  const liveText = renderTokens(finalTokens, nonFinalTokens);

  const toggleLang = (code) => {
    setSelectedLangs((prev) =>
      prev.includes(code)
        ? prev.length > 1 ? prev.filter((l) => l !== code) : prev
        : [...prev, code]
    );
  };

  const startRecording = useCallback(async () => {
    if (!SonioxClient) return;
    setStatus("loading");
    setErrorMsg("");
    setFinalTokens([]);
    setNonFinalTokens([]);
    setTranscript("");
    setDetectedLang(null);

    try {
      const client = new SonioxClient({ apiKey: SONIOX_API_KEY });
      clientRef.current = client;

      client.onPartialResult = (result) => {
        const newFinal = [];
        const newNonFinal = [];
        for (const token of result.tokens || []) {
          if (token.text) {
            if (token.is_final) newFinal.push(token);
            else newNonFinal.push(token);
            if (token.language) setDetectedLang(token.language);
          }
        }
        if (newFinal.length) setFinalTokens((prev) => [...prev, ...newFinal]);
        setNonFinalTokens(newNonFinal);
      };

      client.onStateChange = (state) => {
        if (state === "recording") {
          setStatus("recording");
          sessionStart.current = Date.now();
          timerRef.current = setInterval(() => {
            setSessionTime(Math.floor((Date.now() - sessionStart.current) / 1000));
          }, 1000);
        }
      };

      client.onError = (err) => {
        setErrorMsg(err?.message || "An error occurred with the Soniox API.");
        setStatus("error");
        clearInterval(timerRef.current);
      };

      await client.start({
        model: "stt-rt-v4",
        audioFormat: "auto",
        languageHints: selectedLangs,
        enable_language_identification: true,
      });
    } catch (e) {
      setErrorMsg(e?.message || "Could not start recording. Check microphone permissions.");
      setStatus("error");
    }
  }, [SonioxClient, selectedLangs]);

  const stopRecording = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.stop();
      clientRef.current = null;
    }
    clearInterval(timerRef.current);
    setSessionTime(0);
    // Flush remaining transcript
    setTranscript((prev) => prev || liveText);
    setNonFinalTokens([]);
    setStatus("idle");
  }, [liveText]);

  const copyTranscript = () => {
    const text = liveText || transcript;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const clearAll = () => {
    setFinalTokens([]);
    setNonFinalTokens([]);
    setTranscript("");
    setDetectedLang(null);
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const displayText = status === "recording" ? liveText : (liveText || transcript);
  const isRecording = status === "recording";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080f17",
      fontFamily: "'IBM Plex Mono', monospace",
      color: "#c8dae8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0e1c2b; }
        ::-webkit-scrollbar-thumb { background: #1f3348; border-radius: 4px; }
        .lang-pill { cursor: pointer; border-radius: 20px; padding: 5px 14px; font-size: 12px; font-family: 'IBM Plex Mono', monospace; border: 1px solid #1f3348; transition: all 0.2s; user-select: none; }
        .lang-pill:hover { border-color: #00e5b0; }
        .lang-pill.active { background: rgba(0,229,176,0.12); border-color: #00e5b0; color: #00e5b0; }
        .lang-pill.inactive { background: transparent; color: #4a6a84; }
        .btn-main { cursor: pointer; border: none; font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 600; letter-spacing: 1px; padding: 16px 40px; border-radius: 40px; transition: all 0.2s; }
        .btn-record { background: #00e5b0; color: #080f17; }
        .btn-record:hover { background: #00ffc4; transform: scale(1.02); }
        .btn-stop { background: transparent; color: #ff4d6d; border: 2px solid #ff4d6d !important; }
        .btn-stop:hover { background: rgba(255,77,109,0.1); }
        .btn-icon { cursor: pointer; background: transparent; border: 1px solid #1f3348; border-radius: 8px; padding: 7px 12px; font-size: 12px; color: #4a6a84; transition: all 0.2s; font-family: 'IBM Plex Mono', monospace; }
        .btn-icon:hover { border-color: #00e5b0; color: #00e5b0; }
        .pulse { animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity: 0.4; } }
        .slide-in { animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00e5b0", boxShadow: "0 0 12px #00e5b0" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: 4, color: "#4a6a84", textTransform: "uppercase" }}>
            Soniox · Real-Time
          </span>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00e5b0", boxShadow: "0 0 12px #00e5b0" }} />
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, margin: 0, letterSpacing: -1, background: "linear-gradient(135deg, #c8dae8 30%, #00e5b0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Multilingual Transcriber
        </h1>
        <p style={{ marginTop: 10, fontSize: 13, color: "#4a6a84", letterSpacing: 0.5 }}>
          60+ languages · Real-time · Language detection
        </p>
      </div>

      {/* Main card */}
      <div style={{ width: "100%", maxWidth: 760, background: "#0e1c2b", borderRadius: 20, border: "1px solid #1a2e42", overflow: "hidden" }}>

        {/* Language picker */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #1a2e42" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#4a6a84", marginBottom: 12, textTransform: "uppercase" }}>
            Language Hints
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {LANGUAGE_OPTIONS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => !isRecording && toggleLang(code)}
                className={`lang-pill ${selectedLangs.includes(code) ? "active" : "inactive"}`}
                style={{ opacity: isRecording ? 0.5 : 1, cursor: isRecording ? "not-allowed" : "pointer" }}
              >
                {LANGUAGE_FLAG[code]} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div style={{ padding: "12px 24px", borderBottom: "1px solid #1a2e42", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: isRecording ? "#00e5b0" : status === "error" ? "#ff4d6d" : "#1f3348",
              boxShadow: isRecording ? "0 0 8px #00e5b0" : "none",
            }} className={isRecording ? "pulse" : ""} />
            <span style={{ fontSize: 12, color: isRecording ? "#00e5b0" : "#4a6a84" }}>
              {status === "idle" && "Ready"}
              {status === "loading" && "Connecting..."}
              {status === "recording" && `Recording · ${formatTime(sessionTime)}`}
              {status === "error" && "Error"}
            </span>
            {detectedLang && isRecording && (
              <span style={{ fontSize: 11, background: "rgba(0,229,176,0.1)", color: "#00e5b0", padding: "2px 8px", borderRadius: 10, border: "1px solid rgba(0,229,176,0.3)" }}>
                {LANGUAGE_FLAG[detectedLang] || ""} {detectedLang.toUpperCase()}
              </span>
            )}
          </div>
          <WaveformBars active={isRecording} />
        </div>

        {/* Transcript area */}
        <div style={{ minHeight: 220, padding: 24, position: "relative" }}>
          {!displayText && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#1f3348" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎙️</div>
              <div style={{ fontSize: 13, letterSpacing: 1 }}>Press record to start transcribing</div>
            </div>
          )}
          <div style={{
            fontSize: 16, lineHeight: 1.8, color: "#c8dae8",
            minHeight: 180,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 300,
          }}>
            {/* Final tokens in solid color */}
            <span>{finalTokens.map((t) => t.text).join("")}</span>
            {/* Non-final tokens in dimmed color */}
            <span style={{ color: "#4a6a84" }}>{nonFinalTokens.map((t) => t.text).join("")}</span>
            {isRecording && (
              <span style={{ display: "inline-block", width: 2, height: "1em", background: "#00e5b0", marginLeft: 2, verticalAlign: "text-bottom", animation: "pulse 0.8s infinite" }} />
            )}
          </div>
          {status === "error" && (
            <div className="slide-in" style={{ background: "rgba(255,77,109,0.1)", border: "1px solid rgba(255,77,109,0.3)", borderRadius: 10, padding: "12px 16px", marginTop: 12, fontSize: 13, color: "#ff4d6d" }}>
              ⚠ {errorMsg}
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #1a2e42", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-icon" onClick={copyTranscript} disabled={!displayText}>
              {copied ? "✓ Copied" : "⎘ Copy"}
            </button>
            <button className="btn-icon" onClick={clearAll} disabled={isRecording || !displayText}>
              ✕ Clear
            </button>
          </div>

          {!isRecording ? (
            <button
              className="btn-main btn-record"
              onClick={startRecording}
              disabled={!SonioxClient || status === "loading"}
            >
              {status === "loading" ? "⏳ Connecting..." : "● Record"}
            </button>
          ) : (
            <button className="btn-main btn-stop" style={{ border: "none" }} onClick={stopRecording}>
              ■ Stop
            </button>
          )}
        </div>
      </div>

      {/* Footer note */}
      <p style={{ marginTop: 28, fontSize: 11, color: "#1f3348", letterSpacing: 0.5, textAlign: "center" }}>
        Powered by Soniox · stt-rt-v4 model · {selectedLangs.length} language hints active
      </p>
    </div>
  );
}
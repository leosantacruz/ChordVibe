import { useEffect } from "react";
import { playChord } from "../../lib/sound";

const noteOrder = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const isSharp = (note) => note.includes("#");

const buildKeys = () => {
  const keys = [];
  for (let octave = 2; octave <= 4; octave++) {
    for (let note of noteOrder) {
      keys.push({
        note: `${note}${octave}`,
        isSharp: isSharp(note),
      });
    }
  }
  keys.push({ note: "C7", isSharp: false });
  return keys;
};

const keys = buildKeys();

const Piano = ({ highlightedKeys = [], scale = [], isMuted }) => {
  useEffect(() => {
    if (highlightedKeys.length && !isMuted) {
      playChord(highlightedKeys);
    }
  }, [highlightedKeys, isMuted]);

  return (
    <div className="overflow-x-auto">
      <div className="relative h-40 inline-block">
        {/* White keys */}
        <div className="flex">
          {keys
            .filter((k) => !k.isSharp)
            .map((k) => (
              <div
                key={k.note}
                className={`w-10 h-40 border border-gray-400 relative ${
                  highlightedKeys.includes(k.note) ? "bg-blue-400" : "bg-white"
                }`}
                title={k.note}
              >
                {scale.includes(k.note.replace(/[0-9]/g, "")) && (
                  <div className="w-2 h-2 bg-red-400 rounded-full absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20" />
                )}
              </div>
            ))}
        </div>

        {/* Black keys */}
        <div className="absolute top-0 left-0 flex pointer-events-none">
          {keys.map((k, i) => {
            if (!k.isSharp) return null;
            const offset = keys.slice(0, i).filter((n) => !n.isSharp).length;
            return (
              <div
                key={k.note}
                className={`w-6 h-24 absolute z-10 ${
                  highlightedKeys.includes(k.note) ? "bg-blue-400" : "bg-black"
                }`}
                style={{ left: `${offset * 40 - 12}px` }}
                title={k.note}
              >
                {scale.includes(k.note.replace(/[0-9]/g, "")) && (
                  <div className="w-2 h-2 bg-red-400 rounded-full absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-white">
        Use the arrow keys (<strong>left</strong> or <strong>right</strong>) to
        switch chords
      </div>
    </div>
  );
};

export default Piano;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useChordStore } from "./store/chordStore";
import { useGenerateChords } from "./hooks/useGenerateChords";
import Piano from "./components/Piano";
import Nav from "./components/Nav";
import { Music, Loader } from 'lucide-react';

const flatToSharp = (note) => {
  const map = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };
  return note.replace(/([A-G])b/, (_, base) => map[`${base}b`] || note);
};

const normalizeNotes = (notes) => {
  return notes.map(n => {
    const note = n.slice(0, -1);
    const octave = n.slice(-1);
    return flatToSharp(note) + octave;
  });
};

const Home = () => {
  const { selectedProgression } = useChordStore();
  const { fetchChords, loading } = useGenerateChords();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [chords, setChords] = useState(selectedProgression);
  const [input, setInput] = useState("");
  const [showBackground, setShowBackground] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % chords.progression.length);
  const prev = () => setIndex((prev) => (prev - 1 + chords.progression.length) % chords.progression.length);

  const handleInputEnter = (e) => {
    if (e.key === "Enter") {
      fetchChords(input, (newChords) => {
        console.log({ newChords });
        setChords(newChords);
        setIndex(0);
      });
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") router.push("/collection");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [chords, router]);

  useEffect(() => {
    const timer = setTimeout(() => setShowBackground(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black">
      {showBackground && (
        <div className="animate-fade-in">
          <Nav />

          <div
            className="fixed inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(/images/collection/${chords.thumbnail})`,
            }}
          ></div>

          <div className="fixed inset-0 z-10 bg-gradient-to-b to-sky-500 from-black opacity-50 pointer-events-none"></div>

          <div className="relative z-20 p-4 pt-14 min-h-screen text-center">
            <h1 className="text-4xl mt-10 mb-8 font-bold text-white">
              {chords.title}
            </h1>

            {chords.progression && (
              <>
                <div className="flex justify-center gap-2 flex-wrap mb-6">
                  {chords.progression.map((chord, i) => (
                    <button
                      onClick={() => setIndex(i)}
                      key={i}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${i === index
                        ? "bg-blue-600 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300"
                        }`}
                    >
                      {chord.name}
                    </button>
                  ))}
                </div>

                <Piano
                  highlightedKeys={normalizeNotes(chords.progression[index].notes)}
                  scale={chords.scale}
                />
              </>
            )}

            {isFocused && (
              <div
                className="fixed inset-0 bg-black opacity-70 z-40"
                onClick={() => setIsFocused(false)}
              ></div>
            )}

            <div
              className={`
                absolute bottom-20 left-0 right-0 flex justify-center items-center
                mx-auto max-w-[400px] rounded-3xl bg-white bg-opacity-40 backdrop-blur-lg
                transition-transform duration-300
                ${isFocused ? "z-50 scale-125" : "z-10 scale-100"}
              `}
            >
              <div className="w-full border-2 rounded-3xl m-2 p-2 bg-white">
                <input
                  type="text"
                  placeholder="Generate your progression"
                  value={input}
                  onInput={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputEnter}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="h-auto w-full bg-transparent text-center text-sm font-medium text-gray-700 focus:outline-none"
                />
              </div>
              <button className="rounded-full flex items-center justify-items-center p-2 border-2 mr-3">
                {!loading ? <Music color="white" /> : <Loader color="white" className="animate-spin" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

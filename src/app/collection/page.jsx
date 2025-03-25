"use client";
import { useEffect, useState } from "react";
import { list } from "../data/collection";
import { useChordStore } from "../store/chordStore";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";

const Collection = () => {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [columns, setColumns] = useState(4);
  const { selectedProgression, setSelectedProgression } = useChordStore();
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1024) setColumns(4);
      else if (window.innerWidth >= 768) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const selectProgression = (index) => {
    setSelectedProgression(list[index]);
    setIsFadingOut(true);

    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight")
        setActiveIndex((prev) => (prev + 1) % list.length);
      else if (e.key === "ArrowLeft")
        setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
      else if (e.key === "ArrowDown")
        setActiveIndex((prev) => Math.min(prev + columns, list.length - 1));
      else if (e.key === "ArrowUp")
        setActiveIndex((prev) => Math.max(prev - columns, 0));
      else if (e.key === "Enter") {
        selectProgression(activeIndex);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, columns]);

  const backgroundImage = list[activeIndex]?.thumbnail || "";

  return (
    <div
      className={`relative min-h-screen ${
        isFadingOut ? "animate-fade-out" : ""
      }`}
    >
      <Nav></Nav>
      <div
        className="fixed inset-0 z-0 bg-cover bg-center  scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(/images/collection/${backgroundImage})`,
        }}
      ></div>
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-sky-500 to-black opacity-70 pointer-events-none"></div>
      <div className="relative z-20 container mx-auto px-5 py-14">
        <div className="my-10 flex flex-col justify-between gap-5 h-[220px]">
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow">
              {list[activeIndex].title}
            </h1>
            <h2 className="text- mt-4 max-w-[600px] text-white drop-shadow">
              {list[activeIndex].description}
            </h2>
          </div>

          <div>
            <button
              onClick={() => {
                selectProgression(activeIndex);
              }}
              className="bg-blue-600 border-2 border-blue-500 hover:border-blue-400 rounded-lg px-8 py-2 text-white mt-5 inline-flex transition-colors"
            >
              Try this progression
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5">
          {list.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                onClick={() => {
                  selectProgression(index);
                }}
                key={"progression" + index}
                className={`overflow-hidden rounded-lg transition duration-300 bg-card focus:outline-none ${
                  isActive
                    ? "ring-4 ring-blue-500 bg-blue-400 text-white"
                    : "bg-gray-100 hover:bg-blue-400 hover:text-white"
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 scale-100 hover:scale-110"
                    style={{
                      backgroundImage: `url(/images/collection/${item.thumbnail})`,
                    }}
                  ></div>
                </div>
                <div className="p-4 font-semibold">{item.title}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collection;

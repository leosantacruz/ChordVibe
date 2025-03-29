"use client";
import { useEffect, useState } from "react";
import { scenes, emotions, artists, categories } from "../data/collections";
import { useChordStore } from "../store/chordStore";
import { useRouter } from "next/navigation";
import Nav from "../components/Nav";

const categoryMap = {
  scenes,
  emotions,
  artists,
};

const Collection = () => {
  const router = useRouter();
  const { setSelectedProgression } = useChordStore();

  const [category, setCategory] = useState("scenes");
  const [activeIndex, setActiveIndex] = useState(0);
  const [columns, setColumns] = useState(4);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const collections = {
    scenes,
    artists,
    emotions,
  };

  const list = collections[category];

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

  const backgroundImage = list[activeIndex]?.thumbnail || "";

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setList(categoryMap[category]);
    setActiveIndex(0);
  };

  return (
    <div
      className={`relative min-h-screen ${
        isFadingOut ? "animate-fade-out" : ""
      }`}
    >
      <Nav />

      {/* Fondo y overlay */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center scale-110 transition-all duration-500"
        style={{
          backgroundImage: `url(/images/collection/${backgroundImage})`,
        }}
      ></div>
      <div className="fixed inset-0 z-10 bg-gradient-to-l from-sky-500 to-black opacity-70 pointer-events-none"></div>

      <div className="relative z-20 container mx-auto px-5 pt-10 pb-0 h-screen overflow-hidden">
        {/* Selector de Categoría */}
        <div className="flex gap-5 border-b border-gray-200 pb-3 my-10 text-white">
          {["scenes", "artists", "emotions"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setActiveIndex(0);
              }}
              className={`capitalize transition font-medium ${
                category === cat ? "font-bold text-white" : "opacity-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contenido dividido */}
        <div className="flex flex-col lg:flex-row gap-10 h-full">
          {/* Descripción izquierda - sticky y centrada */}
          <div className="flex-1 lg:max-w-[40%]">
            <div className="sticky top-1/2 transform -translate-y-1/2">
              <h1 className="text-4xl font-bold text-white drop-shadow mb-4">
                {list[activeIndex].title}
              </h1>
              <h2 className="text-white drop-shadow mb-6 max-w-prose">
                {list[activeIndex].description}
              </h2>
              <button
                onClick={() => selectProgression(activeIndex)}
                className="bg-blue-600 border-2 border-blue-500 hover:border-blue-400 rounded-lg px-8 py-2 text-white inline-flex transition-colors"
              >
                Try this progression
              </button>
            </div>
          </div>

          {/* Grid de progresiones con scroll */}
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{
              maxHeight: "calc(100vh - 12rem)",
              scrollbarGutter: "stable",
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={"progression" + index}
                    onClick={() => selectProgression(index)}
                    onMouseEnter={() => setActiveIndex(index)}
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
      </div>
    </div>
  );
};

export default Collection;

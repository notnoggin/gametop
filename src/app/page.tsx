"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";

const SAMPLE_GAMES = [
  { id: 1, title: "Elden Ring", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg" },
  { id: 2, title: "Baldur's Gate 3", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg" },
  { id: 3, title: "The Legend of Zelda: Tears of the Kingdom", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg" },
  { id: 4, title: "God of War Ragnarök", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg" },
  { id: 5, title: "Spider-Man 2", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5x8j.jpg" },
  { id: 6, title: "Hades II", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6wr2.jpg" },
  { id: 7, title: "Astro Bot", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co7b2s.jpg" },
  { id: 8, title: "Black Myth: Wukong", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg" },
  { id: 9, title: "Stellar Blade", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6m4z.jpg" },
  { id: 10, title: "Final Fantasy VII Rebirth", cover: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6f5n.jpg" },
];

export default function Home() {
  const [games, setGames] = useState(SAMPLE_GAMES);
  const previewRef = useRef<HTMLDivElement>(null);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newGames = [...games];
    [newGames[index - 1], newGames[index]] = [newGames[index], newGames[index - 1]];
    setGames(newGames);
  };

  const moveDown = (index: number) => {
    if (index === games.length - 1) return;
    const newGames = [...games];
    [newGames[index], newGames[index + 1]] = [newGames[index + 1], newGames[index]];
    setGames(newGames);
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    const dataUrl = await toPng(previewRef.current, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "top-10-games.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Share your Top 10 Games</h1>
        <p className="text-zinc-400 mb-8">Rank your favorites and generate a clean shareable spine image.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Ranking List */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Ranking</h2>
            <div className="space-y-2">
              {games.map((game, index) => (
                <div
                  key={game.id}
                  className="flex items-center gap-3 bg-zinc-900 rounded-lg p-3 border border-zinc-800"
                >
                  <span className="text-zinc-500 w-6 text-right">{index + 1}</span>
                  <img src={game.cover} alt="" className="w-10 h-14 object-cover rounded" />
                  <span className="flex-1 font-medium">{game.title}</span>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveUp(index)}
                      className="text-xs px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      className="text-xs px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div
              ref={previewRef}
              className="bg-gradient-to-b from-zinc-900 to-black p-8 rounded-2xl border border-zinc-800 flex flex-wrap justify-center gap-1 min-h-[320px]"
            >
              {games.slice(0, 10).map((game, index) => (
                <div
                  key={game.id}
                  className="relative w-14 h-48 bg-zinc-800 rounded-sm overflow-hidden shadow-lg border border-zinc-700"
                  style={{
                    backgroundImage: `url(${game.cover})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-[9px] p-1 text-center leading-tight">
                    {game.title}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={downloadImage}
              className="mt-6 w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition"
            >
              Download Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
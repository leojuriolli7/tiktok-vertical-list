"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import ScrollList from "./components/ScrollList";

const stories = [
  {
    id: 1,
    img: "https://d2we8z90utluth.cloudfront.net/files/videos/202x360_03d1fa42-77e1-47c7-961f-13fd663eb1be_thumb.webp",
    video:
      "https://d2we8z90utluth.cloudfront.net/files/videos/03d1fa42-77e1-47c7-961f-13fd663eb1be.mp4",
    name: "Story 1",
  },
  {
    id: 2,
    img: "https://d2we8z90utluth.cloudfront.net/files/videos/404x720_056de7bb-4344-4c16-83a1-d7295982f43f_thumb.webp",
    video:
      "https://d2we8z90utluth.cloudfront.net/files/videos/056de7bb-4344-4c16-83a1-d7295982f43f.mp4",
    name: "Story 2",
  },
  {
    id: 3,
    img: "https://d2we8z90utluth.cloudfront.net/files/videos/720x405_057187d9-edd9-4dfb-870e-6c7bf0dc6826_thumb.webp",
    video:
      "https://d2we8z90utluth.cloudfront.net/files/videos/057187d9-edd9-4dfb-870e-6c7bf0dc6826.mp4",
    name: "Story 3",
  },
];

export default function Home() {
  const [activeStory, setActiveStory] = useState(stories[0]);

  const [mode] = useState(
    () => (Cookies.get("mode") as "horizontal" | "vertical") || "vertical"
  );

  return (
    <div className="relative">
      <button
        className="absolute top-4 left-4 bg-slate-800 text-white z-20 p-2 rounded-md"
        onClick={() => {
          Cookies.set(
            "mode",
            mode === "horizontal" ? "vertical" : "horizontal"
          );

          window.location.reload();
        }}
      >
        Switch to {mode === "horizontal" ? "Vertical" : "Horizontal"}
      </button>

      <ScrollList
        mode={mode}
        onSlideEnd={(index) => {
          setActiveStory(stories[index]);
        }}
        videoSource={activeStory.video}
      >
        {stories.map((story) => (
          <div className="h-full" key={story.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={story.img}
              className="h-full w-full object-cover"
              alt={story.name}
            />
          </div>
        ))}
      </ScrollList>
    </div>
  );
}

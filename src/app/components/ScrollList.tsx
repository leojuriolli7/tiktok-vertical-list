"use client";

import { useState, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  threshold?: number;
  onSlideStart?: () => void;
  onSlideEnd?: (idx: number) => void;
  videoSource?: string;
  mode: "vertical" | "horizontal";
}

const getTranslateString = (value: number, mode: "vertical" | "horizontal") => {
  if (mode === "vertical") {
    return `translate3d(0, ${value}%, 0)`;
  }

  return `translate3d(${value}%, 0, 0)`;
};

const ScrollList = ({
  children,
  threshold = 0.1,
  videoSource,
  onSlideEnd,
  onSlideStart,
  mode,
}: Props) => {
  const [state, setState] = useState<"idle" | "sliding">("idle");

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const deltaRef = useRef(0);

  const updatePosition = () => {
    if (!containerRef.current) return;
    const offset = -(
      activeIndex * 100 +
      (deltaRef.current /
        window[mode === "vertical" ? "innerHeight" : "innerWidth"]) *
        100
    );
    containerRef.current.style.transform = getTranslateString(offset, mode);
    animationRef.current = requestAnimationFrame(updatePosition);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0][mode === "vertical" ? "clientY" : "clientX"]);
    setTouchDelta(0);
    deltaRef.current = 0;
    animationRef.current = requestAnimationFrame(updatePosition);

    setState("sliding");
    onSlideStart?.();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta =
      touchStart - e.touches[0][mode === "vertical" ? "clientY" : "clientX"];
    setTouchDelta(delta);
    deltaRef.current = delta;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const moveThreshold =
      window[mode === "vertical" ? "innerHeight" : "innerWidth"] * threshold;

    const newIndex =
      touchDelta > moveThreshold
        ? Math.min(activeIndex + 1, children.length - 1)
        : touchDelta < -moveThreshold
        ? Math.max(activeIndex - 1, 0)
        : activeIndex;

    setActiveIndex(newIndex);
    containerRef.current.style.transform = getTranslateString(
      -newIndex * 100,
      mode
    );

    setTouchDelta(0);
    deltaRef.current = 0;
  };

  return (
    <div
      className="fixed inset-0 h-[100dvh] overflow-hidden will-change-transform touch-none"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        height: "-webkit-fill-available",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTransitionEnd={() => {
        if (deltaRef.current === 0) {
          onSlideEnd?.(activeIndex);
          setState("idle");
        }
      }}
    >
      <div className="w-full h-full absolute inset-0 z-10">
        <video
          className="h-full w-full object-cover"
          style={{ visibility: state === "idle" ? "visible" : "hidden" }}
          muted
          loop
          controls={false}
          playsInline
          autoPlay
          src={videoSource}
        />
      </div>

      <div
        ref={containerRef}
        style={{ transform: `translate3d(0, 0, 0)` }}
        className={`w-full h-full transition-transform duration-300 ease-out ${
          mode === "horizontal" ? "flex flex-row" : ""
        }`}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollList;

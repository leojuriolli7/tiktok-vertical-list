"use client";

import { useState, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  threshold?: number;
}

/**
 * Starter component for a tiktok vertical list implementation. Key points:
 *
 * - requestAnimationFrame fro smoother animations
 * - Using translate3d for GUP acceleration
 * - will-change attribute
 * - Separated animation state
 */
const VerticalScrollList = ({ children, threshold = 0.3 }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchDelta, setTouchDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);
  const deltaRef = useRef(0);

  const updatePosition = () => {
    if (!containerRef.current) return;

    const offset = -(activeIndex * window.innerHeight + deltaRef.current);
    containerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    animationRef.current = requestAnimationFrame(updatePosition);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
    setTouchDelta(0);
    deltaRef.current = 0;
    animationRef.current = requestAnimationFrame(updatePosition);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = touchStart - e.touches[0].clientY;
    setTouchDelta(delta);
    deltaRef.current = delta;
  };

  const handleTouchEnd = () => {
    if (!containerRef.current) return;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const screenHeight = window.innerHeight;
    const moveThreshold = screenHeight * threshold;

    const newIndex =
      touchDelta > moveThreshold
        ? Math.min(activeIndex + 1, children.length - 1)
        : touchDelta < -moveThreshold
        ? Math.max(activeIndex - 1, 0)
        : activeIndex;

    setActiveIndex(newIndex);
    containerRef.current.style.transform = `translate3d(0, ${
      -newIndex * 100
    }%, 0)`;
    setTouchDelta(0);
    deltaRef.current = 0;
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden will-change-transform"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={containerRef}
        style={{ transform: `translate3d(0, 0, 0)` }}
        className="w-full h-full transition-transform duration-300 ease-out"
      >
        {children.map((child, index) => (
          <div key={index} className="w-full h-full">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalScrollList;

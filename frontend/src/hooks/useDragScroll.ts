// src/hooks/useDragScroll.ts
import { useEffect, useState, useRef } from "react";

const useDragScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0); //initial x position of mouse
  const [scrollLeft, setScrollLeft] = useState(0); //scroll position of container

  // Handle Mouse Down to Start Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  // Handle Mouse Move to Drag
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust scroll speed if necessary
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Handle Mouse Up to Stop Dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach and Remove Event Listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { containerRef, handleMouseDown, isDragging };
};

export default useDragScroll;

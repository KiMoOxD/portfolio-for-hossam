'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointing, setIsPointing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const moveTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable =
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.closest('a') ||
        target?.closest('button') ||
        target?.classList.contains('cursor-none') === false;

      setMousePosition({ x: clientX, y: clientY });
      setIsPointing(isClickable);
      setIsMoving(true);

      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-50 mix-blend-lighten"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isPointing ? 1.5 : 1,
          opacity: isMoving ? 1 : 0.6,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 20,
          mass: 0.3,
        }}
      >
        <div className="w-6 h-6 rounded-full border-2 border-silver" />
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: isPointing ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 1000,
          damping: 30,
          mass: 0.15,
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-silver" />
      </motion.div>

      {/* Cursor trail effect */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background: isMoving
              ? 'radial-gradient(circle, rgba(192, 192, 192, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192, 192, 192, 0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}

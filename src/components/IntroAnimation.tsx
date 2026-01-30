'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

const GREETINGS = ['Hello', 'Bonjour', 'Ciao', 'Olá', 'Hallo', 'नमस्ते'];

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const [shouldShow, setShouldShow] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Wait for next frame to ensure refs are populated
    const timeoutId = setTimeout(() => {
      // Create GSAP timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true); // Hide component after animation
          onComplete();
        },
      });

      // Animate each greeting word sequentially
      textRefs.current.forEach((textEl, index) => {
        if (!textEl) return;

        // Fade in + scale up (0.25s - faster)
        tl.fromTo(
          textEl,
          {
            opacity: 0,
            scale: 0.92,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.out',
          },
          index === 0 ? 0 : '+=0'
        );

        // Hold (0.1s - faster)
        tl.to(textEl, {
          duration: 0.1,
        });

        // Fade out (0.25s - faster)
        tl.to(textEl, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.out',
        });
      });

      // Add morphing SVG reveal effect
      if (svgRef.current) {
        // Show SVG overlay
        tl.set(svgRef.current, { opacity: 1 }, '-=0.2');

        // Morph from center circle to full screen
        tl.fromTo(
          svgRef.current.querySelector('circle'),
          {
            attr: { r: '0' },
          },
          {
            attr: { r: '150' },
            duration: 0.8,
            ease: 'power2.inOut',
          }
        );

        // Fade out the entire overlay
        tl.to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        );
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onComplete]);

  // Don't render if animation is complete
  if (!shouldShow || isComplete) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      {/* Greeting texts */}
      {GREETINGS.map((greeting, index) => (
        <p
          key={greeting}
          ref={(el) => {
            textRefs.current[index] = el;
          }}
          className="absolute text-5xl font-semibold text-zinc-50 sm:text-6xl md:text-7xl"
          style={{ opacity: 0 }}
        >
          {greeting}
        </p>
      ))}

      {/* Morphing SVG overlay for exit effect */}
      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0 }}
      >
        <defs>
          <clipPath id="morphClip">
            <circle cx="50" cy="50" r="0" />
          </clipPath>
        </defs>
        <rect
          width="100"
          height="100"
          fill="white"
          clipPath="url(#morphClip)"
        />
      </svg>
    </div>
  );
}

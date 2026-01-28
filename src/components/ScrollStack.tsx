'use client';

import { useLayoutEffect, useRef, useCallback, ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({
  children,
  itemClassName = '',
}: ScrollStackItemProps) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] border border-white/10 bg-gradient-to-br from-zinc-900/90 to-black/60 shadow-[0_0_40px_rgba(0,0,0,0.5)] box-border origin-top will-change-transform backdrop-blur-xl ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
);

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
};

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Fungsi pembantu untuk kalkulasi posisi
  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback(() => {
    // Gunakan requestAnimationFrame untuk menghilangkan getaran (jitter)
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!cardsRef.current.length) return;

      const scrollTop = window.scrollY;
      const containerHeight = window.innerHeight;
      const stackPositionPx = parsePercentage(stackPosition, containerHeight);
      const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

      // Cari elemen penanda akhir
      const endElement = document.querySelector('.scroll-stack-end') as HTMLElement | null;
      const endElementTop = endElement ? endElement.getBoundingClientRect().top + scrollTop : 0;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const cardRect = card.getBoundingClientRect();
        const cardTop = cardRect.top + scrollTop - (parseFloat(card.style.transform.split('translate3d(0px, ')[1]) || 0);
        
        const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
        const pinEnd = endElementTop - containerHeight / 2;

        // Kalkulasi Scale
        const triggerStart = pinStart;
        const triggerEnd = cardTop - scaleEndPositionPx;
        let progress = (scrollTop - triggerStart) / (triggerEnd - triggerStart);
        progress = Math.max(0, Math.min(1, progress));
        
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - progress * (1 - targetScale);
        
        // Kalkulasi Pinning (TranslateY)
        let translateY = 0;
        if (scrollTop >= pinStart && scrollTop <= pinEnd) {
          translateY = scrollTop - pinStart;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - pinStart;
        }

        // Terapkan style dengan translate3d untuk akselerasi GPU
        card.style.transform = `translate3d(0, ${Math.round(translateY)}px, 0) scale(${scale.toFixed(4)})`;
      });
    });
  }, [baseScale, itemScale, itemStackDistance, parsePercentage, scaleEndPosition, stackPosition]);

  useLayoutEffect(() => {
    // Ambil semua kartu
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    // Set margin antar kartu
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
    });

    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1, // Nilai lerp yang lebih kecil membuat scroll lebih halus
    });

    lenis.on('scroll', updateCardTransforms);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    
    lenisRef.current = lenis;

    // Trigger update pertama kali
    updateCardTransforms();

    return () => {
      lenis.destroy();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [itemDistance, updateCardTransforms]);

  return (
    <div className={`relative w-full z-0 ${className}`} ref={containerRef}>
      {/* Padding bottom pb-[60vh] memastikan section bawah tidak menimpa sebelum kartu selesai menumpuk */}
      <div className="scroll-stack-inner px-6 pb-[60vh] pt-[10vh] sm:px-10">
        {children}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
};

export default ScrollStack;
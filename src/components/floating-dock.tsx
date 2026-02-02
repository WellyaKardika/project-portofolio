'use client';

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <FloatingDockContainer
      items={items}
      className={cn(desktopClassName, mobileClassName)}
    />
  );
};

const FloatingDockContainer = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      // PERBAIKAN: Gunakan w-max agar kontainer selalu mengikuti lebar total ikon
      // dan gap yang lebih kecil di mobile agar tidak pecah.
      className={cn(
        "mx-auto flex items-end justify-center rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg dark:bg-black/20",
        "h-14 px-3 pb-2 gap-2", // Mobile: Tinggi lebih pendek, gap kecil
        "md:h-16 md:px-4 md:pb-3 md:gap-4", // Desktop: Ukuran normal
        "w-max",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Deteksi apakah perangkat menggunakan layar sentuh (Mobile/iPad/Tablet)
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 1024 // Angka 1024 mencakup sebagian besar iPad
      );
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  let distance = useTransform(mouseX, (val) => {
    // Jika perangkat sentuh (termasuk iPad), matikan kalkulasi jarak
    if (isTouchDevice) return Infinity;

    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Nilai transformasi tetap sama, tapi tidak akan terpicu jika isTouchDevice true
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{
          // Gunakan ukuran statis 40px jika di iPad/Mobile
          width: isTouchDevice ? 40 : width,
          height: isTouchDevice ? 40 : height
        }}
        onMouseEnter={() => !isTouchDevice && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full border border-white/5 bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20 dark:bg-neutral-800/50"
      >
        <AnimatePresence>
          {/* Tooltip dimatikan untuk iPad/Mobile */}
          {hovered && !isTouchDevice && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 hidden md:block w-fit rounded-md border border-white/10 bg-black/80 px-2 py-0.5 text-[10px] text-white backdrop-blur-md"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex h-5 w-5 items-center justify-center text-white">
          {icon}
        </div>
      </motion.div>
    </a>
  );
}
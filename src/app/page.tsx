'use client';

import Image from 'next/image';
import { useRef, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiPhp,
  SiLaravel,
  SiTailwindcss,
  SiJavascript,
  SiNextdotjs,
  SiWordpress,
  SiCodeigniter,
  SiMysql,
} from 'react-icons/si';
import { PiEnvelopeSimpleBold } from 'react-icons/pi';

import LightRays from '../components/LightRays';
import ScrambledText from '../components/ScrambledText';
// import Lanyard from '../components/Lanyard';
import ProfileCard from '../components/ProfileCard';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import PixelTransition from '../components/PixelTransition';
import TextPressure from '../components/TextPressure';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>('.section');

      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: rootRef },
  );

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const subject = encodeURIComponent(`Portfolio Contact – ${name || 'New message'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );

    window.location.href = `mailto:kardikawellya@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div
      ref={rootRef}
      className="min-h-screen bg-black text-zinc-50 antialiased selection:bg-zinc-50 selection:text-black"
    >
      {/* Main tidak lagi menggunakan max-w-6xl agar elemen background bisa full width.
          Batas lebar 6xl dipindahkan ke dalam masing-masing container konten.
      */}
      <main className="flex flex-col gap-32 pb-24">
        
        {/* HERO SECTION */}
        <section className="section relative flex min-h-[70vh] items-center justify-center overflow-hidden">
          {/* Background ini sekarang bisa benar-benar Full Width */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={0.6}
              rayLength={3}
              followMouse
              mouseInfluence={0.15}
              noiseAmount={0.05}
              distortion={0.05}
              className="mix-blend-screen"
            />
          </div>

          {/* Kontainer Konten HERO dengan Batas Lebar */}
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 text-center sm:px-8 lg:px-12">
            <ScrambledText
              className="m-0 max-w-none font-semibold leading-tight tracking-tight text-zinc-50"
              radius={60}
              duration={1}
              speed={0.7}
              scrambleChars=".:"
            >
              Hi. I&apos;m Wellya. <br /> A Web Developer.
            </ScrambledText>

            <p className="max-w-xl text-sm text-zinc-400 sm:text-base">
              I design and build modern web experiences with Next.js, PHP, and WordPress – bridging
              clean interfaces, reliable infrastructure, and thoughtful UX.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-200 backdrop-blur">
                Web Development · IT Support · UI/UX
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300 backdrop-blur">
                Based in Bali · Open to Opportunities
              </span>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
          {/* Perbaikan Responsif: grid-cols-1 untuk mobile, md:grid-cols-2 untuk desktop */}
          <div className="section grid grid-cols-1 gap-10 rounded-[32px] border border-white/10 bg-zinc-950/80 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl md:grid-cols-2 lg:p-12">
            <div className="flex flex-col justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
                  About
                </h2>
                <p className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
                  I Made Wellya Supratistha Kardika
                </p>
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  I am a fresh graduate in Information Systems from Atma Jaya Yogyakarta University
                  with interests in Web Development, IT Support, and UI/UX Design. I enjoy building
                  clean, performant interfaces while ensuring the underlying systems are stable and
                  maintainable. I am an adaptive and responsible individual with strong problem-solving
                  abilities.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Connect
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://linkedin.com/in/wellyakardika"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
                  >
                    <SiLinkedin className="text-sky-400" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/WellyaKardika"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
                  >
                    <SiGithub />
                    GitHub
                  </a>
                  <a
                    href="https://www.instagram.com/wellyakardikaa/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
                  >
                    <SiInstagram className="text-pink-400" />
                    Instagram
                  </a>
                  <a
                    href="mailto:kardikawellya@gmail.com"
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
                    >
                    <PiEnvelopeSimpleBold />
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-6">
              <div className="relative flex w-full items-center justify-center">
                <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-emerald-500/10 blur-3xl" />
                <ProfileCard
                    status="Online"
                    contactText="Contact Me"
                    avatarUrl="/assets/images/profile.png"
                    behindGlowSize="500px" 
                    miniAvatarUrl="/assets/images/profile.png" 
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => {}} 
                    behindGlowEnabled={true}
                    behindGlowColor="#10b981"
                    innerGradient="linear-gradient(...)"
                  />
              </div>            
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-6 px-6 pt-10 sm:px-10">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Experience
              </p>
              <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
                Hands-on roles in web and IT.
              </h2>
              <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
                From crafting WordPress sites to supporting government networks and managing system
                transitions, I bring practical experience across development and IT operations.
              </p>
            </div>
          </div>
          <div className="mt-4 h-[1300px]">
            <ScrollStack
              itemDistance={80}
              itemScale={0.04}
              itemStackDistance={40}
              rotationAmount={-2}
              blurAmount={2}
              baseScale={0.82}
              useWindowScroll
            >
              <ScrollStackItem>
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      PT. Bali 66 Citra Persada
                    </p>
                    <h3 className="text-xl font-semibold text-zinc-50">
                      IT Developer – WordPress
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Designed and maintained WordPress-based sites, implementing responsive layouts,
                      theme customization, and performance optimizations for hospitality brands.
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Focus: WordPress design, content structure, maintenance, and long-term
                    scalability.
                  </p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                      Diskominfo Badung
                    </p>
                    <h3 className="text-xl font-semibold text-zinc-50">
                      IT Support Technician Intern
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Supported hardware and network troubleshooting for a government environment,
                      ensuring stable connectivity and resolving user-side issues efficiently.
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Focus: Hardware diagnostics, network troubleshooting, user support, and uptime.
                  </p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                      Koperasi Kresna Dana Mandiri
                    </p>
                    <h3 className="text-xl font-semibold text-zinc-50">
                      IT &amp; Admin Support Intern
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Assisted in system transition and data migration, ensuring data integrity and
                      smooth handover between platforms while supporting administrative workflows.
                    </p>
                  </div>
                  <p className="text-xs text-zinc-500">
                    Focus: Data migration, documentation, system transition support, and reliability.
                  </p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section id="skills" className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="section grid gap-10 rounded-[32px] border border-white/10 bg-zinc-950/80 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid-cols-[1.1fr_minmax(0,1.2fr)] lg:p-12">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Tech Stack
              </p>
              <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
                Tools I use to ship robust experiences.
              </h2>
              <p className="text-sm text-zinc-400 sm:text-base">
                From PHP backends to modern React frontends, I&apos;m comfortable moving across the
                stack and collaborating with teams on real-world projects.
              </p>

              <div className="mt-4 space-y-2 text-sm text-zinc-300">
                <p className="font-medium text-zinc-200">Languages</p>
                <p>Indonesian (Native), English (Intermediate)</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Programming
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiPhp className="text-sky-400" /> PHP
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiJavascript className="text-yellow-300" /> JavaScript
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiTailwindcss className="text-sky-300" /> CSS / Tailwind
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiMysql className="text-sky-300" /> SQL
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Frameworks &amp; Platforms
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-zinc-200">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiNextdotjs /> Next.js
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiLaravel className="text-red-500" /> Laravel
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiWordpress className="text-sky-400" /> WordPress
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1">
                    <SiCodeigniter className="text-orange-500" /> CodeIgniter
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="section flex flex-col gap-8 rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:p-12">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Projects
              </p>
              <h2 className="text-2xl font-semibold text-zinc-50 sm:text-3xl">
                Selected work in hospitality and lifestyle.
              </h2>
              <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
                A glimpse of the brands I&apos;ve supported through web design, content structuring,
                and ongoing maintenance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: 'Watercress',
                  image: '/assets/projects/watercress.png',
                  link: 'https://staging.watercressbali.com/', // Tambahkan link di sini
                  summary:
                    'Modern website for a Bali-based restaurant brand, focused on menu visibility and location details.',
                },
                {
                  title: 'Double-Six Group',
                  image: '/assets/projects/double-six-group.png',
                  link: 'https://staging.doublesix.group/',
                  summary:
                    'Multi-property hospitality presence with strong visual identity and clear navigation.',
                },
                {
                  title: 'Milk & Madu',
                  image: '/assets/projects/milk-and-madu.png',
                  link: 'https://staging.milkandmadu.com/',
                  summary:
                    'Warm, inviting digital experience for a popular cafe brand, optimized for mobile visitors.',
                },
              ].map(project => (
                <PixelTransition
                  key={project.title}
                  gridSize={8}
                  pixelColor="#ffffff"
                  animationStepDuration={0.4}
                  className="group"
                  firstContent={
                    <div className="relative h-full w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-1 text-left">
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-300">
                          Featured Project
                        </p>
                        <p className="text-lg font-semibold text-zinc-50">{project.title}</p>
                      </div>
                    </div>
                  }
                  secondContent={
                    <div className="flex h-full w-full flex-col justify-between bg-black/95 px-5 py-4 text-left">
                      <div className="space-y-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                          Case Study
                        </p>
                        <p className="text-lg font-semibold text-zinc-50">{project.title}</p>
                        <p className="text-sm text-zinc-300">{project.summary}</p>
                      </div>
                      <div className="mt-3">
                          <a
                            href={project.link} 
                            target="_blank"     
                            rel="noreferrer"    
                            className="relative z-20 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-white/40 hover:bg-white/10"
                          >
                            View Project
                          </a>
                        </div>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12">
          <div className="section grid gap-10 rounded-[32px] border border-white/10 bg-zinc-950/90 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:p-12">
          <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-3xl bg-black">
              <TextPressure 
                  text="CONTACT" 
                  flex 
                  alpha={false} 
                  stroke={false} 
                  width 
                  weight 
                  italic 
                  textColor="#ffffff" 
                  strokeColor="#22c55e" 
                  minFontSize={36}  
                  style={{ height: '100%', width: '100%', top:100}} // Tambahkan width 100%
                  className="flex items-center" // Tambahkan class ini
              />
          </div>

            <div className="flex flex-col justify-center gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Let&apos;s work together
                </p>
                <p className="text-sm text-zinc-400 sm:text-base">
                  Share a project idea, collaboration, or opportunity. I&apos;ll respond as soon as
                  possible via email.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4 text-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="h-10 w-full rounded-xl border border-white/15 bg-black/60 px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-black"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="h-10 w-full rounded-xl border border-white/15 bg-black/60 px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-black"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-300" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-emerald-400 focus:bg-black"
                    placeholder="Tell me a bit about your project or idea..."
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-emerald-400"
                  >
                    Send Email
                  </button>
                  <p className="text-[11px] text-zinc-500">
                    This will open your default email client with a pre-filled message.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="mx-auto mt-4 flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 text-[11px] text-zinc-500 sm:flex-row">
          <span>© {new Date().getFullYear()} I Made Wellya Supratistha Kardika.</span>
          <span>Built with Next.js, GSAP, Lenis, and React Three Fiber.</span>
        </footer>
      </main>
    </div>
  );
}
# 🌟 Wellya Kardika - Portfolio Website

A modern, cinematic portfolio website showcasing web development projects and professional experience. Built with Next.js 16, GSAP animations, and premium UI components.

![Portfolio Preview](https://img.shields.io/badge/Next.js-16.1.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎬 Cinematic Intro Animation
- Multilingual greeting sequence (Hello, Bonjour, Ciao, Olá, Hallo, नमस्ते)
- Morphing SVG reveal effect
- Smooth fade-in transitions
- Plays on every page load

### 🎨 Premium UI Components
- **LightRays** - Dynamic ray-casting background with mouse interaction
- **ScrambledText** - Animated text reveal effect
- **PixelTransition** - Pixel-based image transitions for project showcase
- **ScrollStack** - 3D card stacking on scroll
- **TextPressure** - Interactive pressure-sensitive text
- **FloatingDock** - macOS-style navigation dock
- **ProfileCard** - 3D tilt card with glow effects

### 📱 Responsive Design
- Mobile-first approach
- Smooth animations across all devices
- Optimized for performance

### 🚀 Tech Stack Highlights
- Next.js 16 with App Router
- GSAP for advanced animations
- React Three Fiber for 3D graphics
- Tailwind CSS 4 for styling
- TypeScript for type safety

## 🛠️ Installation

### Prerequisites
- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/WellyaKardika/wellya-portfolio.git
   cd wellya-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
The easiest way to deploy is using [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/WellyaKardika/wellya-portfolio)

## 📂 Project Structure

```
wellya-portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main portfolio page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles & animations
│   └── components/
│       ├── IntroAnimation.tsx # Cinematic intro sequence
│       ├── LightRays.tsx      # Dynamic background effect
│       ├── ScrambledText.tsx  # Text reveal animation
│       ├── PixelTransition.tsx # Image transition effect
│       ├── ScrollStack.tsx    # 3D scroll cards
│       ├── ProfileCard.jsx    # 3D profile card
│       ├── TextPressure.tsx   # Pressure-sensitive text
│       └── floating-dock.tsx  # Navigation dock
├── public/
│   ├── assets/
│   │   ├── images/           # Profile & project images
│   │   └── projects/         # Project screenshots
│   └── docs/
│       └── CV-Wellya.pdf     # Downloadable CV
└── package.json
```

## 🎯 Key Sections

- **Hero** - Animated introduction with dynamic light rays
- **About** - Professional background with profile card
- **Experience** - Work history with scroll-stacking cards
- **Skills** - Tech stack and language proficiency
- **Projects** - Featured work with pixel transitions
- **Contact** - Email contact form

## 🔧 Customization

### Modify Intro Animation
Edit greeting words in `src/components/IntroAnimation.tsx`:
```tsx
const GREETINGS = ['Hello', 'Bonjour', 'Ciao', 'Olá', 'Hallo', 'नमस्ते'];
```

### Adjust Animation Speed
Modify timing in `IntroAnimation.tsx`:
```tsx
duration: 0.25,  // Fade in/out speed
duration: 0.1,   // Hold duration
```

### Update Projects
Edit project data in `src/app/page.tsx`:
```tsx
{
  title: 'Project Name',
  image: '/assets/projects/image.webp',
  link: 'https://project-url.com',
  summary: 'Project description'
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**I Made Wellya Supratistha Kardika**

- 🌐 Website: [wellyakardika.vercel.app](https://wellyakardika.vercel.app/)
- 💼 LinkedIn: [linkedin.com/in/wellyakardika](https://linkedin.com/in/wellyakardika)
- 🐙 GitHub: [@WellyaKardika](https://github.com/WellyaKardika)
- 📧 Email: kardikawellya@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - 3D graphics
- [Vercel](https://vercel.com/) - Deployment platform

---

⭐ **Star this repo if you find it helpful!**

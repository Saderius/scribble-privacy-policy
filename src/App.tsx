import React, { useEffect, useState, memo, useMemo } from 'react';
import { motion } from 'motion/react';
import fm from 'front-matter';
import Markdown from 'react-markdown';

// Helper to resolve asset paths for GitHub Pages
const resolveAsset = (path: string) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
};

interface SectionData {
  id: string;
  icon: string;
  title: string;
  color: string;
  bg: string;
  order: number;
  content: string;
}

// 7. Memoize background to prevent re-renders on state changes
const BackgroundElements = memo(() => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 2. Stabilize Asset Paths with resolveAsset */}
      <motion.img src={resolveAsset("/scribble_20260304_161702278.png")} alt="" className="absolute top-[5%] left-[5%] w-48 md:w-64 opacity-15 mix-blend-multiply" animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [-10, 15, -10], scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={resolveAsset("/sketch_1772191709150.png")} alt="" className="absolute top-[15%] right-[2%] w-56 md:w-72 opacity-15 mix-blend-multiply" animate={{ y: [0, 50, 0], x: [0, -30, 0], rotate: [15, -20, 15], scale: [0.9, 1.2, 0.9] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={resolveAsset("/scribble_1773745917428.png")} alt="" className="absolute top-[45%] left-[-5%] w-40 md:w-56 opacity-15 mix-blend-multiply" animate={{ y: [0, -35, 0], x: [0, -25, 0], rotate: [-20, 10, -20], scale: [1, 1.25, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={resolveAsset("/scribble_20260307_184846075.png")} alt="" className="absolute bottom-[10%] right-[5%] w-64 md:w-80 opacity-15 mix-blend-multiply" animate={{ y: [0, -50, 0], x: [0, 40, 0], rotate: [0, 25, 0], scale: [0.85, 1.15, 0.85] }} transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.img src={resolveAsset("/sketch_1772458799045.png")} alt="" className="absolute bottom-[5%] left-[15%] w-48 md:w-64 opacity-15 mix-blend-multiply" animate={{ y: [0, 45, 0], x: [0, 20, 0], rotate: [10, -25, 10], scale: [1.1, 0.9, 1.1] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
});

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [sections, setSections] = useState<SectionData[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // 1. Eliminate Waterfalls by using Promise.all()
    const loadContent = async () => {
      const modules = import.meta.glob('/src/content/*.md', { query: '?raw', import: 'default' });
      
      const loadedSections = await Promise.all(
        Object.entries(modules).map(async ([path, loader]) => {
          const rawContent = await loader() as string;
          const parsed = fm(rawContent);
          return {
            ...(parsed.attributes as any),
            content: parsed.body
          } as SectionData;
        })
      );
      
      // Sort by the 'order' frontmatter property
      loadedSections.sort((a, b) => a.order - b.order);
      setSections(loadedSections);
    };

    loadContent();
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden font-sans text-m3-sys-light-on-surface">
      <BackgroundElements />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        
        {/* Hero Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20 flex flex-col items-center"
        >
          {/* Popping App Icon */}
          <div className="mb-8 relative group flex justify-center h-32 sm:h-48">
            <div className="absolute inset-0 bg-blue-400/30 blur-3xl rounded-full transform group-hover:scale-125 transition-transform duration-700"></div>
            <a href="https://play.google.com/store/apps/details?id=com.twentyminCode.scribble" target="_blank" rel="noopener noreferrer" className="relative block w-32 h-32 sm:w-48 sm:h-48 hover:scale-105 hover:-translate-y-2 transition-all duration-300 z-10">
              
              {/* 1. Yellow Background Fill */}
              <div className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] overflow-hidden z-0">
                <motion.div 
                  className="absolute inset-0 bg-[#fbef9d]"
                  initial={{ clipPath: "circle(0% at 50% 50%)" }}
                  animate={{ clipPath: "circle(150% at 50% 50%)" }}
                  transition={{ delay: 3.1, duration: 0.4, ease: "easeOut" }}
                />
              </div>

              {/* 2. Shape and Wave (Unclipped) */}
              <motion.div 
                className="absolute inset-0 z-10 pointer-events-none"
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: [0, -20, 0], opacity: 0 }}
                transition={{ 
                  y: { delay: 2.9, duration: 0.5, times: [0, 0.4, 1], ease: "easeInOut" },
                  opacity: { delay: 3.3, duration: 0.01 }
                }}
              >
                {/* Shape */}
                <motion.img 
                  src={resolveAsset("/app-icon-fglayer-v2-shape.png")}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ originX: 0.2, originY: 0.5 }}
                  initial={{ x: -120, y: 140, opacity: 0, rotate: -20 }}
                  animate={{ 
                    x: [-120, -120, 120, 0, 0, 0, 0, 0, 0],
                    y: [140, 140, 140, 0, 0, 0, 0, 0, 0],
                    rotate: [-20, -20, 10, 0, -20, 15, -10, 0, 0],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1]
                  }}
                  transition={{ 
                    duration: 4.0,
                    times: [0, 0.05, 0.3, 0.425, 0.475, 0.525, 0.575, 0.675, 0.9],
                    ease: "easeInOut"
                  }}
                />
                {/* Wave */}
                <motion.img 
                  src={resolveAsset("/app-icon-fglayer-v2-wave.png")}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ clipPath: "circle(0% at 20% 50%)" }}
                  animate={{ clipPath: "circle(150% at 20% 50%)" }}
                  transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>

              {/* 3. Clipped Shape and Wave */}
              <motion.div 
                className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] overflow-hidden z-15 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.3, duration: 0.01 }}
              >
                <img src={resolveAsset("/app-icon-fglayer-v2-shape.png")} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <img src={resolveAsset("/app-icon-fglayer-v2-wave.png")} className="absolute inset-0 w-full h-full object-cover" alt="" />
              </motion.div>

              {/* 4. Enclosing Border */}
              <motion.div 
                className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white/60 z-20 pointer-events-none"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  opacity: { delay: 3.3, duration: 0.2 }, 
                  scale: { delay: 3.3, duration: 0.3, type: "spring", stiffness: 200 } 
                }}
              />
            </a>
          </div>

          <div className="relative inline-flex items-center justify-center px-8 py-3 mb-6">
            <motion.div 
              className="absolute inset-0 rounded-full glass-panel shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.3, duration: 0.4, type: "spring", stiffness: 200 }}
            />
            <motion.h1 
              className="relative z-10 text-5xl sm:text-6xl tracking-tight text-center"
              initial={{ color: "var(--app-title-initial)", fontWeight: 400, clipPath: "inset(0 100% 0 0)" }}
              animate={{ 
                color: ["var(--app-title-initial)", "var(--app-title-initial)", "var(--app-title-final)"],
                fontWeight: [400, 400, 700],
                clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"]
              }}
              transition={{
                color: { times: [0, 0.85, 0.86], duration: 4.0 },
                fontWeight: { times: [0, 0.85, 0.86], duration: 4.0 },
                clipPath: { times: [0, 0.05, 0.3, 1], duration: 4.0, ease: "linear" }
              }}
            >
              Scribble
            </motion.h1>
          </div>
          <h2 className="text-2xl sm:text-3xl font-medium text-m3-sys-light-on-surface-variant mb-4">
            Your Privacy, Drawn Clearly
          </h2>
          <p className="text-lg text-m3-sys-light-outline max-w-2xl mx-auto">
            Last updated: April 26, 2026
          </p>
        </motion.header>

        {/* Policy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="glass-card rounded-[28px] p-6 sm:p-8 flex flex-col h-full"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-[20px] ${section.bg} mb-6`}>
                <span className={`material-symbols-rounded icon-filled text-3xl ${section.color}`}>
                  {section.icon}
                </span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-m3-sys-light-on-surface">
                {section.title}
              </h3>
              <div className="text-m3-sys-light-on-surface-variant leading-relaxed flex-grow text-lg markdown-body">
                <Markdown>{section.content}</Markdown>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Connect Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          className="mt-12 glass-card rounded-[28px] p-6 sm:p-8 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6 text-m3-sys-light-on-surface">
            Get Scribble
          </h3>
          <div className="flex justify-center mb-10">
            <a href="https://play.google.com/store/apps/details?id=com.twentyminCode.scribble" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 rounded-full bg-m3-sys-light-primary hover:bg-m3-sys-light-primary/90 transition-colors text-m3-sys-light-on-primary font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transform duration-200">
              <span className="material-symbols-rounded mr-3 text-2xl">shop</span>
              Get it on Google Play
            </a>
          </div>

          <h3 className="text-xl font-medium mb-6 text-m3-sys-light-on-surface-variant">
            Connect With Us
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:20minCode@gmail.com" className="inline-flex items-center px-5 py-3 rounded-full bg-m3-sys-light-on-surface/10 hover:bg-m3-sys-light-on-surface/15 transition-colors text-m3-sys-light-on-surface font-medium shadow-sm">
              <span className="material-symbols-rounded mr-2 text-blue-600">mail</span>
              Email Us
            </a>
            <a href="https://www.reddit.com/r/20minCode/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full bg-m3-sys-light-on-surface/10 hover:bg-m3-sys-light-on-surface/15 transition-colors text-m3-sys-light-on-surface font-medium shadow-sm">
              <span className="material-symbols-rounded mr-2 text-orange-600">forum</span>
              r/20minCode
            </a>
            <a href="https://www.reddit.com/r/scribbleapp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full bg-m3-sys-light-on-surface/10 hover:bg-m3-sys-light-on-surface/15 transition-colors text-m3-sys-light-on-surface font-medium shadow-sm">
              <span className="material-symbols-rounded mr-2 text-orange-500">forum</span>
              r/scribbleapp
            </a>
            <a href="https://discord.gg/cgS6WhQAXC" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full bg-m3-sys-light-on-surface/10 hover:bg-m3-sys-light-on-surface/15 transition-colors text-m3-sys-light-on-surface font-medium shadow-sm">
              <span className="material-symbols-rounded mr-2 text-indigo-600">chat</span>
              Discord
            </a>
            <a href="https://www.facebook.com/scribblewear/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full bg-m3-sys-light-on-surface/10 hover:bg-m3-sys-light-on-surface/15 transition-colors text-m3-sys-light-on-surface font-medium shadow-sm">
              <span className="material-symbols-rounded mr-2 text-blue-700">thumb_up</span>
              Facebook
            </a>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block glass-panel rounded-full px-6 py-3 text-m3-sys-light-on-surface-variant font-medium">
            &copy; 2026 Scribble. Built for privacy.
          </div>
        </motion.footer>

      </div>
    </div>
  );
}

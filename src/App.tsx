/**
 * @license
 * The H Portfolio Template - Community Edition
 * Original Template by Ameer Hamza (MIT Licensed)
 */

import React, { useState, useEffect, useRef } from 'react';
import { initialPortfolioConfig } from './initialConfig';
import { PortfolioConfig, ProjectItem } from './types';
import { generatePortfolioZip, downloadBlob } from './utils/exporter';
import {
  Download,
  Sliders,
  X,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  Menu,
  FileCode2,
  Upload,
  Plus,
  Trash2,
  Info,
  Volume2,
  VolumeX
} from 'lucide-react';
import { getSkillMeta } from './utils/skillIcons';

export default function App() {
  const [skillFilter, setSkillFilter] = useState<'all' | 'web' | 'programming' | 'video' | 'design' | 'ai'>('all');
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    const saved = localStorage.getItem('h_portfolio_config_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return initialPortfolioConfig;
  });

  // Save to localStorage v3
  useEffect(() => {
    localStorage.setItem('h_portfolio_config_v4', JSON.stringify(config));
    document.documentElement.style.setProperty('--accent', config.accent || '#e07a4a');
  }, [config]);

  // Stages: 'opening' -> 'profiles' -> 'home'
  const [stage, setStage] = useState<'opening' | 'profiles' | 'home'>('opening');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Highlight reel slideshow dialog
  const [introOpen, setIntroOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePaused, setSlidePaused] = useState(false);

  // Editor drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<'basics' | 'projects' | 'skills' | 'services' | 'journey' | 'contact'>('basics');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Cursor position
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorActive, setCursorActive] = useState(false);

  // Project rail scroll ref
  const projectRailRef = useRef<HTMLDivElement>(null);
  const heroPhotoRef = useRef<HTMLImageElement>(null);
  // Interactive ElevenLabs Milly Maple AI Animation Voice Assistant State
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeechText, setCurrentSpeechText] = useState<string | null>(null);
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const speechTimeoutRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load and listen for available system voices (Milly, Maple, natural female voices)
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const updateVoices = () => {
      const vs = window.speechSynthesis.getVoices();
      if (vs && vs.length > 0) {
        setSystemVoices(vs);
      }
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Upbeat anime AI chirp for ElevenLabs Milly Maple Animation Voice
  const playAiChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1620, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  };

  // Play subtle futuristic UI click sound via Web Audio API
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  };

  // Dedicated picker for Milly / Maple style sweet, feminine natural voice
  const pickMillyMapleVoice = (voiceList: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
    if (!voiceList || voiceList.length === 0) return null;

    // Priority 1: Direct match for Maple or Milly / Millie
    const millyMaple = voiceList.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('maple') || n.includes('milly') || n.includes('millie');
    });
    if (millyMaple) return millyMaple;

    // Priority 2: Sweet, natural Indian / Hindi female voices (Swara, Neerja, Heera, Veena, Kavya, etc.)
    const indianFemale = voiceList.find(v => {
      const n = v.name.toLowerCase();
      const isIndian = v.lang === 'hi-IN' || v.lang === 'en-IN' || v.lang.startsWith('hi');
      const isFemale = n.includes('swara') || n.includes('neerja') || n.includes('heera') || 
                       n.includes('veena') || n.includes('kavya') || n.includes('female') || 
                       n.includes('kalpana') || n.includes('priya') || n.includes('ananya');
      return isIndian && isFemale;
    });
    if (indianFemale) return indianFemale;

    // Priority 3: Popular high-quality natural female voices (Microsoft Jenny, Aria, Sonia, Google Hindi Female, Apple Samantha/Lekha)
    const naturalFemale = voiceList.find(v => {
      const n = v.name.toLowerCase();
      return (
        n.includes('google हिन्दी') ||
        n.includes('swara') ||
        n.includes('neerja') ||
        n.includes('jenny') ||
        n.includes('aria') ||
        n.includes('sonia') ||
        n.includes('samantha') ||
        n.includes('lekha') ||
        n.includes('zira') ||
        (n.includes('natural') && n.includes('female'))
      );
    });
    if (naturalFemale) return naturalFemale;

    // Priority 4: Any female voice listed on the system
    const anyFemale = voiceList.find(v => {
      const n = v.name.toLowerCase();
      return n.includes('female') || n.includes('woman') || n.includes('girl') || n.includes('zira');
    });
    if (anyFemale) return anyFemale;

    // Priority 5: Any Hindi or Indian English voice
    const anyIndian = voiceList.find(v => v.lang === 'hi-IN' || v.lang.startsWith('hi') || v.lang === 'en-IN');
    if (anyIndian) return anyIndian;

    return voiceList[0] || null;
  };

  // Skill speech description mapper - Sweet, enthusiastic animation dialogue ("pyaar se bole")
  const getSkillSpeech = (skill: string): string => {
    const s = skill.trim();
    const map: Record<string, string> = {
      'HTML': 'Arey wah, HTML! Yeh web development ki pyari si neenv hai, jisse khoobsurat web pages bante hain!',
      'HTML5 & CSS3': 'HTML5 aur CSS3! Modern web development aur pyaari styling ka super combo!',
      'CSS': 'CSS! Isse websites me khoobsurat colors, elegant designs aur stylish layouts aate hain!',
      'JavaScript': 'JavaScript! Web pages me jaan daalti hai, interactive buttons aur dynamic magic banati hai!',
      'React': 'React JS! Deenu Verma ka favourite framework, super fast aur modern apps banane ke liye!',
      'Node.js': 'Node.js! Powerful, fast aur scalable backend systems ke liye!',
      'Express.js': 'Express.js! Lightweight aur super smooth backend web framework!',
      'Tailwind CSS': 'Tailwind CSS! Modern utility classes aur clean aesthetic styling ke liye Deenu ka best tool!',
      'Python': 'Python! Coding, problem solving aur Artificial Intelligence ki bohot hi pyari aur smart language!',
      'Java': 'Java! Strong object-oriented programming aur high performance logic!',
      'Data Structures & Algorithms': 'DSA! Computer science ke strong fundamentals aur sharp problem solving skills!',
      'Reels Editing': 'Reels Editing! Viral, creative aur super engaging short-form videos ka kamaal!',
      'Podcast Editing': 'Podcast Editing! Studio quality crisp audio aur seamless visual storytelling!',
      'CapCut': 'CapCut! Trending transitions, aesthetic effects aur fast video editing toolkit!',
      'VN': 'VN Video Editor! High performance mobile video editing aur cinematic cuts!',
      'Filmora': 'Filmora! Creative visual effects, smooth transitions aur visual magic!',
      'Graphic Design': 'Graphic Design! Clean branding, stylish posters aur aesthetic digital visuals!',
      'AI Graphic Design': 'AI Graphic Design! Canva, Photoshop aur Generative AI ka smart visual combo!',
      'Canva': 'Canva! Quick creative designs, presentations aur social media marketing graphics!',
      'Photoshop': 'Photoshop! Professional photo manipulation aur studio grade visuals!',
      'ChatGPT': 'ChatGPT! Creative prompt engineering aur smart AI workflows!',
      'Gemini': 'Google Gemini! Multimodal AI solutions aur intelligent research!',
      'Claude': 'Claude AI! Deep reasoning aur advanced code analysis!'
    };
    return map[s] || `Arey wah, ${s}! Deenu Verma ka bohot hi shandaar technical skill!`;
  };

  // Client-side ElevenLabs Milly Maple Animation Voice Synthesis
  const synthesizeClientAnimationVoice = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const allVoices = systemVoices.length > 0 ? systemVoices : window.speechSynthesis.getVoices();
      const preferred = pickMillyMapleVoice(allVoices);
      if (preferred) {
        utterance.voice = preferred;
      }

      // ElevenLabs Milly Maple AI Animation Voice Profile:
      // High-energy, bright, excited anime/animation style pitch & tempo
      utterance.pitch = 1.30; // Elevated bright, animated pitch
      utterance.rate = 1.04;  // Upbeat, lively animation pace
      utterance.volume = 1.0;

      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeechText(null);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeechText(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
      console.warn('Speech synthesis error:', e);
    }
  };

  // Voice narration function supporting ElevenLabs API + Client Animation Engine
  const speak = async (text: string) => {
    playAiChime();
    if (!voiceEnabled) return;

    // Cancel any previous speech or audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(true);
    setCurrentSpeechText(text);

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setIsSpeaking(false);
      setCurrentSpeechText(null);
    }, 6500);

    // 1. Check for server-side ElevenLabs neural audio proxy
    try {
      const resp = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voiceId: '21m00Tcm4TlvDq8ikWAM' })
      });
      const contentType = resp.headers.get('content-type') || '';
      if (resp.ok && contentType.includes('audio')) {
        const blob = await resp.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;
        audio.onended = () => {
          setIsSpeaking(false);
          setCurrentSpeechText(null);
          URL.revokeObjectURL(audioUrl);
        };
        audio.onerror = () => {
          synthesizeClientAnimationVoice(text);
        };
        await audio.play();
        return;
      }
    } catch {}

    // 2. Client-side Milly Maple Animation Voice Synthesis
    synthesizeClientAnimationVoice(text);
  };

  const toggleVoice = () => {
    playClickSound();
    if (voiceEnabled) {
      if (currentAudioRef.current) currentAudioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setVoiceEnabled(false);
      setIsSpeaking(false);
      setCurrentSpeechText(null);
    } else {
      setVoiceEnabled(true);
      speak('Namaste! ElevenLabs Milly Maple AI animation voice chalu ho gayi hai!');
    }
  };


  // Slides definition
  const slides = [
    { title: config.name || 'Your Name', text: config.intro || 'Welcome to my cinematic portfolio.' },
    ...(config.projects || []).map(p => ({
      title: p.title,
      text: `${p.category} · ${p.description}`
    })),
    { title: 'Let’s connect', text: `${config.role} · ${config.location}` }
  ];

  // Slide auto-play interval
  useEffect(() => {
    if (!introOpen || slidePaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.max(1, slides.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [introOpen, slidePaused, slides.length]);

  // Pointer movement for cursor and 3D hero tilt
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const isInteractive = Boolean((e.target as HTMLElement)?.closest('button, a, input, [role="button"]'));
      setCursorActive(isInteractive);

      if (heroPhotoRef.current) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        heroPhotoRef.current.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateX(${x * 12}px) scale(1.32)`;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Keyboard navigation for opening and dialogs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage === 'opening' && (e.key === 'Enter' || e.key === 'Escape')) {
        e.preventDefault();
        setStage('profiles');
      } else if (stage === 'profiles' && e.key === 'Escape') {
        setStage('home');
      } else if (introOpen) {
        if (e.key === 'ArrowRight') {
          setCurrentSlide(prev => (prev + 1) % slides.length);
        } else if (e.key === 'ArrowLeft') {
          setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
        } else if (e.code === 'Space') {
          e.preventDefault();
          setSlidePaused(prev => !prev);
        } else if (e.key === 'Escape') {
          setIntroOpen(false);
        }
      } else if (selectedProject && e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, introOpen, selectedProject, slides.length]);

  // Handle profile selection
  const handleProfileSelect = (view: 'main' | 'recruiter' | 'developer' | 'creative') => {
    if (view === 'main') speak('Explore Everything! Poora portfolio shuru ho raha hai.');
    else if (view === 'recruiter') speak('Deenu Verma ki education aur profile section.');
    else if (view === 'developer') speak('Deenu Verma ke selected projects aur demonstrations.');
    setStage('home');
    const targetMap: Record<string, string> = {
      main: 'top',
      developer: 'work',
      creative: 'services',
      recruiter: 'profile'
    };
    const target = targetMap[view] || 'top';
    setTimeout(() => {
      const el = document.getElementById(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleRailScroll = (direction: -1 | 1) => {
    if (projectRailRef.current) {
      const scrollAmount = direction * (projectRailRef.current.clientWidth * 0.75);
      projectRailRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleExportZip = async () => {
    setIsExporting(true);
    setExportNotice(null);
    try {
      const blob = await generatePortfolioZip(config);
      const filename = `${(config.firstName || 'portfolio').toLowerCase().replace(/[^a-z0-9]/g, '-')}-portfolio-template.zip`;
      downloadBlob(blob, filename);
      setExportNotice('ZIP downloaded! Contains complete standalone repository ready for GitHub Pages.');
      setTimeout(() => setExportNotice(null), 7000);
    } catch (err) {
      console.error(err);
      setExportNotice('Export failed. Please check files.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setConfig(prev => ({ ...prev, portrait: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentJourney = config.journey[activeSeason] || config.journey[0];

  return (
    <div className="relative min-h-screen text-[#f8f4f0] bg-[#160f0b] select-none selection:bg-[#e07a4a] selection:text-white">
      {/* Custom Glowing Cursor */}
      <div
        id="cursor"
        className={cursorActive ? 'active' : ''}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
        aria-hidden="true"
      />

      {/* =========================================================================
          STAGE 1: CINEMATIC OPENING TITLES
          ========================================================================= */}
      {stage === 'opening' && (
        <div id="opening" role="dialog" aria-label="Opening titles">
          <button
            className="skip-intro cursor-pointer"
            type="button"
            onClick={() => {
              speak("Deenu Verma ke portfolio mein aapka swaagat hai!");
              setStage('profiles');
            }}
          >
            Skip intro
          </button>
          <div className="studio">A PERSONAL PORTFOLIO</div>
          <div className="opening-title">
            <h1>{config.firstName || config.name || 'YOUR NAME'}</h1>
            <p>THE H PORTFOLIO</p>
          </div>
          <img
            src={config.portrait || 'assets/portrait.svg'}
            alt={config.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'assets/portrait.svg';
            }}
          />
          <button
            type="button"
            className="play-start primary cursor-pointer shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition"
            onClick={() => {
              speak("Deenu Verma ke portfolio mein aapka swaagat hai! Chaliye shuru karte hain.");
              setStage('profiles');
            }}
          >
            ▶ PLAY
          </button>
        </div>
      )}

      {/* =========================================================================
          STAGE 2: "WHAT BRINGS YOU HERE?" PROFILE SELECTOR
          ========================================================================= */}
      {stage === 'profiles' && (
        <div id="profiles" role="dialog" aria-label="Choose your view">
          <h2>What brings you here?</h2>
          <p>Choose a starting point. Explore the whole portfolio any time.</p>
          <div className="profile-grid">
            <button
              data-profile="main"
              onClick={() => handleProfileSelect('main')}
              className="cursor-pointer group hover:scale-105 active:scale-95 transition"
            >
              <span>▶</span>
              <b>Explore Everything</b>
            </button>
            <button
              data-profile="recruiter"
              onClick={() => handleProfileSelect('recruiter')}
              className="cursor-pointer group hover:scale-105 active:scale-95 transition"
            >
              <span>R</span>
              <b>View My Profile</b>
            </button>
            <button
              data-profile="developer"
              onClick={() => handleProfileSelect('developer')}
              className="cursor-pointer group hover:scale-105 active:scale-95 transition"
            >
              <span>⌘</span>
              <b>Explore My Work</b>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          STAGE 3: MAIN PORTFOLIO EXPERIENCE
          ========================================================================= */}
      <a className="skip" href="#main">Skip to content</a>

      <header>
        <a
          href="#top"
          className="logo"
          onClick={() => speak("Deenu Verma: Home section me aapka swagat hai!")}
        >
          <b>▶</b> PORTFOLIO
        </a>
        <nav aria-label="Sections" className={mobileMenuOpen ? 'open' : ''}>
          <a
            href="#work"
            onClick={() => {
              speak("Deenu Verma ke shandaar projects: Nova AI, Deenu Ki Awaaz aur 3D Portfolio!");
              setMobileMenuOpen(false);
            }}
          >
            Work
          </a>
          <a
            href="#skills-section"
            onClick={() => {
              speak("Deenu Verma ke technical skills aur creative tools! Kisi bhi skill par click karke suniye!");
              setMobileMenuOpen(false);
            }}
          >
            Expertise
          </a>
          <a
            href="#about"
            onClick={() => {
              speak("Deenu Verma ke baare me janiye — Noida me based Full Stack Developer aur Video Editor!");
              setMobileMenuOpen(false);
            }}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => {
              speak("Aap Deenu se contact karna chahte ho? Bohot accha laga! Niche diye gaye email ya social links par connect kijiye!");
              setMobileMenuOpen(false);
            }}
          >
            Contact
          </a>
        </nav>

        {/* Voice Narration Assistant Toggle in Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleVoice}
            className="voice-toggle cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-pink-500/40 backdrop-blur-md text-xs text-white transition hover:scale-105 active:scale-95 shadow-md group"
            aria-label={voiceEnabled ? 'Mute voice narration' : 'Unmute voice narration'}
            title="Milly Maple Sweet Voice Assistant (Click to toggle)"
          >
            {voiceEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                <Volume2 className="w-3.5 h-3.5 text-pink-400" />
                <span className="font-mono text-[11px] text-white/90">
                  🌸 Milly Maple: ON
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
                <span className="font-mono text-[11px] text-white/60 group-hover:text-white">
                  🌸 Voice: OFF
                </span>
              </>
            )}
          </button>

          <button
            id="menu-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="hero" id="top">
          <div className="atmosphere" aria-hidden="true"></div>
          
          {/* Enhanced Animated Hero Photo with halo and 3D depth */}
          <div className="hero-art relative flex items-center justify-center">
            <div className="hero-art-glow" />
            <div className="hero-halo-ring" />
            
            {/* Cinematic live streaming badge */}
            <div className="absolute top-[28%] -left-4 sm:left-4 z-20 px-3 py-1.5 rounded-full bg-black/75 border border-white/20 backdrop-blur-md flex items-center gap-2 text-[11px] shadow-2xl animate-[float-badge_4.5s_ease-in-out_infinite]">
              <span className="w-2 h-2 rounded-full bg-[#e07a4a] animate-ping"></span>
              <span className="font-mono text-white/90 tracking-wider">CREATOR &amp; DEV</span>
            </div>

            <div className="photo-slide-up relative z-10 w-full h-full flex items-center justify-center">
              <img
                ref={heroPhotoRef}
                id="hero-photo"
                src={config.portrait || 'assets/portrait.svg'}
                alt={config.name}
                className="photo-animated relative z-10 select-none"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'assets/portrait.svg';
                }}
              />
            </div>
          </div>

          <div className="hero-copy">
            <span className="eyebrow flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#e07a4a] animate-spin-slow" />
              <span>A PERSONAL CINEMATIC PORTFOLIO</span>
            </span>
            <h1 id="hero-name" className="tracking-tight hover:text-white transition">{config.firstName || config.name}</h1>
            <div className="series-label">THE H PORTFOLIO</div>
            <div className="meta">
              <span id="hero-role">{config.role}</span>
              {config.location && <span id="hero-location">{config.location}</span>}
            </div>
            <p id="hero-intro">{config.intro}</p>
            <div className="actions">
              <button
                id="play-intro"
                className="primary cursor-pointer hover:shadow-lg hover:shadow-white/20 hover:scale-105 transition"
                type="button"
                onClick={() => {
                  setCurrentSlide(0);
                  setSlidePaused(false);
                  setIntroOpen(true);
                }}
              >
                ▶ Play Intro
              </button>
              <a className="button glass cursor-pointer hover:bg-white/15 hover:scale-105 transition" href="#work">
                ＋ My Work
              </a>
            </div>

            {/* Quick Achievement Stats to fill laptop empty space */}
            <div className="hero-stats-grid mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3.5 max-w-xl">
              <div className="stat-card p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#e07a4a]/40 transition">
                <span className="block text-base sm:text-lg font-bold text-[#e07a4a] font-['Impact'] tracking-wide">TOPPER</span>
                <span className="text-[11px] text-white/70 block leading-tight mt-0.5">Class 10th &amp; 12th PCM</span>
              </div>
              <div className="stat-card p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#e07a4a]/40 transition">
                <span className="block text-base sm:text-lg font-bold text-[#e07a4a] font-['Impact'] tracking-wide">1.3M+</span>
                <span className="text-[11px] text-white/70 block leading-tight mt-0.5">YouTube Views (@deenukiawaaz)</span>
              </div>
              <div className="stat-card p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#e07a4a]/40 transition">
                <span className="block text-base sm:text-lg font-bold text-[#e07a4a] font-['Impact'] tracking-wide">FULL STACK</span>
                <span className="text-[11px] text-white/70 block leading-tight mt-0.5">Web &amp; AI Products</span>
              </div>
            </div>
          </div>
          <div className="floating-chip">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>NOW STREAMING</span>
            </div>
            <b id="floating-role">{config.role}</b>
          </div>
        </section>

        {/* EPISODE / CHAPTER LINKS */}
        <div className="continue gutter">
          <span className="eyebrow">CONTINUE EXPLORING</span>
          <div id="chapter-links">
            <a href="#about" data-section="about">
              <span>EPISODE 01</span>
              <b>The Pilot</b>
            </a>
            <a href="#services" data-section="services">
              <span>EPISODE 02</span>
              <b>Services</b>
            </a>
            <a href="#work" data-section="work">
              <span>EPISODE 03</span>
              <b>Projects</b>
            </a>
            <a href="#journey" data-section="journey">
              <span>EPISODE 04</span>
              <b>How I Work</b>
            </a>
            <a href="#moments" data-section="moments">
              <span>EPISODE 05</span>
              <b>Community</b>
            </a>
            <a href="#contact" data-section="contact">
              <span>EPISODE 06</span>
              <b>Connect</b>
            </a>
          </div>
        </div>

        <div id="sections">
          {/* ABOUT SECTION */}
          <section id="about" className="gutter chapter reveal-ready visible">
            <div className="section-label">BACKGROUND</div>
            <h2>About Me</h2>
            <div className="about-grid">
              <div className="portrait-frame tilt about-photo-slide-up relative group overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(237,36,68,0.25)] rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#160f0b] via-transparent to-transparent z-10 pointer-events-none" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/75 border border-white/20 backdrop-blur-md text-[10px] tracking-wider text-white/90 uppercase font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>CREATOR / DEVELOPER</span>
                </div>
                <img
                  id="about-photo"
                  src={config.portrait || 'assets/portrait.svg'}
                  alt={config.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'assets/portrait.svg';
                  }}
                />
              </div>
              <div>
                <p id="about-copy" className="story-copy">
                  {config.about}
                </p>
                <div id="skills" className="chips flex flex-wrap gap-2 my-5">
                  {(config.skills || []).map((skill, i) => {
                    const meta = getSkillMeta(skill);
                    return (
                      <span
                        key={i}
                        onClick={() => speak(getSkillSpeech(skill))}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white/90 hover:border-white/40 hover:scale-105 active:scale-95 hover:bg-white/10 transition cursor-pointer shadow-sm select-none"
                        style={{ borderLeftColor: meta.color, borderLeftWidth: '3px' }}
                        title="Click to hear info"
                      >
                        <span style={{ color: meta.color }} className="flex-shrink-0">
                          {meta.icon}
                        </span>
                        <span className="font-medium">{skill}</span>
                      </span>
                    );
                  })}
                </div>
                {config.resume && (
                  <a
                    id="resume-link"
                    className="button glass active:scale-95"
                    href={config.resume}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => speak("Deenu Verma ka resume view kijiye.")}
                  >
                    View Resume ↗
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="gutter chapter reveal-ready visible">
            <div className="section-label">LET'S BUILD</div>
            <h2>What I Can Do</h2>
            <div id="service-grid" className="service-grid">
              {(config.services || []).map((serv, i) => (
                <article
                  key={i}
                  onClick={() => speak(`${serv.title}: ${serv.detail}`)}
                  className="service-card card-shine hover:border-white/30 transition hover:-translate-y-1.5 active:scale-95 duration-300 cursor-pointer"
                  title="Click to hear service details"
                >
                  <div className="number">0{i + 1}</div>
                  <h3>{serv.title}</h3>
                  <p>{serv.detail}</p>
                </article>
              ))}
            </div>
          </section>

          {/* WORK / PROJECTS SECTION */}
          <section id="work" className="chapter reveal-ready visible">
            <div className="gutter">
              <div className="section-label">SELECTED WORK</div>
              <h2>Projects</h2>
              <p className="hint">Explore a title for its story. Demo projects are labelled.</p>
            </div>
            <div className="rail-controls gutter">
              <button
                type="button"
                onClick={() => handleRailScroll(-1)}
                aria-label="Scroll projects left"
                className="cursor-pointer hover:bg-white/20 hover:scale-105 active:scale-95 transition"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => handleRailScroll(1)}
                aria-label="Scroll projects right"
                className="cursor-pointer hover:bg-white/20 hover:scale-105 active:scale-95 transition"
              >
                →
              </button>
            </div>
            <div
              id="project-rail"
              ref={projectRailRef}
              className="project-rail gutter"
            >
              {(config.projects || []).map((p, i) => (
                <button
                  key={i}
                  type="button"
                  className="project-card tilt card-shine cursor-pointer hover:border-white/40 transition duration-300 active:scale-95 text-left"
                  style={{ '--card-accent': p.accent || '#e07a4a' } as React.CSSProperties}
                  onClick={() => {
                    speak(`${p.title}: ${p.description}`);
                    setSelectedProject(p);
                  }}
                  aria-label={`Open ${p.title}`}
                >
                  <span>{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <small>▶ Explore project</small>
                </button>
              ))}
            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills-section" className="gutter chapter reveal-ready visible">
            <div className="section-label">TECHNICAL CAPABILITIES</div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <h2>Skills &amp; Toolkit</h2>
                <p className="text-white/60 text-sm max-w-xl">
                  Technologies, video production software, and artificial intelligence tools I use to build modern products and engaging digital content.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Tools' },
                  { id: 'web', label: 'Web & Full Stack' },
                  { id: 'programming', label: 'Programming & DSA' },
                  { id: 'video', label: 'Video Editing' },
                  { id: 'design', label: 'Design & AI' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSkillFilter(cat.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
                      skillFilter === cat.id
                        ? 'bg-[#e07a4a] text-white shadow-lg shadow-amber-500/25 scale-105'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div id="toolkit-grid" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {(config.skills || [])
                .filter(skill => {
                  if (skillFilter === 'all') return true;
                  const meta = getSkillMeta(skill);
                  if (skillFilter === 'design') return meta.category === 'design' || meta.category === 'ai';
                  return meta.category === skillFilter;
                })
                .map((skill, i) => {
                  const meta = getSkillMeta(skill);
                  return (
                    <article
                      key={i}
                      onClick={() => speak(getSkillSpeech(skill))}
                      className="skill-card-modern card-shine p-5 rounded-xl border border-white/10 bg-gradient-to-br from-[#181822] to-[#0e0e14] flex flex-col justify-between group cursor-pointer hover:border-white/30 active:scale-95 transition select-none"
                      style={{ '--skill-color': meta.color } as React.CSSProperties}
                      title="Click to hear info"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition group-hover:scale-110 shadow-inner"
                          style={{
                            backgroundColor: meta.bgColor,
                            color: meta.color,
                            boxShadow: `0 0 20px ${meta.color}25`
                          }}
                        >
                          {meta.icon}
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:text-white transition">
                          {meta.category === 'web'
                            ? 'Web Dev'
                            : meta.category === 'video'
                            ? 'Video'
                            : meta.category === 'programming'
                            ? 'Code'
                            : 'AI & Design'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-white transition">
                          {skill}
                        </h3>
                        <p className="text-[11px] text-white/40 group-hover:text-white/70 transition">
                          Workflow Toolkit
                        </p>
                      </div>

                      <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 group-hover:w-full"
                          style={{
                            backgroundColor: meta.color,
                            width: '88%'
                          }}
                        />
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>

          {/* PROFILE / RESUME SECTION */}
          <section id="profile" className="gutter chapter reveal-ready visible">
            <div className="section-label">PROFILE &amp; EXPERIENCE</div>
            <h2>The Full Story</h2>
            <div className="resume-grid">
              <article className="resume-sheet">
                <h3 id="resume-name">{config.name}</h3>
                <div className="resume-columns">
                  <div>
                    <h4>Education</h4>
                    <div id="education-list">
                      {(config.education || []).length > 0 ? (
                        config.education.map((edu, i) => (
                          <article key={i} className="mb-4">
                            <h5>{edu.degree}</h5>
                            <p>{edu.school} · {edu.period}</p>
                          </article>
                        ))
                      ) : (
                        <p className="text-white/40 text-xs mt-2">Add your education in the customizer.</p>
                      )}
                    </div>

                    <h4 className="mt-6">Projects</h4>
                    <div id="resume-projects">
                      {(config.projects || []).map((p, i) => (
                        <article key={i} className="mb-3">
                          <h5>{p.title}</h5>
                          <p>{(p.stack || []).join(', ')}</p>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4>Skills &amp; Technologies</h4>
                    <div id="resume-skills" className="resume-skill-list flex flex-wrap gap-2">
                      {(config.skills || []).map((skill, i) => {
                        const meta = getSkillMeta(skill);
                        return (
                          <span
                            key={i}
                            onClick={() => speak(getSkillSpeech(skill))}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/90 hover:border-white/30 active:scale-95 transition cursor-pointer shadow-sm select-none"
                            title="Click to hear speech"
                          >
                            <span style={{ color: meta.color }} className="flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center">
                              {meta.icon}
                            </span>
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>

              <aside className="product-statement">
                <span className="eyebrow">IDEA → INTERFACE → PRODUCT</span>
                <h3>More than code.</h3>
                <p>Software that moves your business forward.</p>
                <a
                  className="button glass active:scale-95"
                  href="#contact"
                  onClick={() => speak("Contact karna chahte ho? Email ya social links par connect kijiye!")}
                >
                  Let’s talk ↗
                </a>
              </aside>
            </div>
          </section>

          {/* JOURNEY SECTION */}
          <section id="journey" className="gutter chapter reveal-ready visible">
            <div className="section-label">DEVELOPMENT APPROACH</div>
            <h2>How I Work</h2>
            <div id="journey-tabs" role="tablist" aria-label="Journey seasons">
              {(config.journey || []).map((s, i) => (
                <button
                  key={i}
                  id={`season-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={activeSeason === i}
                  className="cursor-pointer"
                  onClick={() => setActiveSeason(i)}
                >
                  {`S0${i + 1} · ${s.title}`}
                </button>
              ))}
            </div>

            {currentJourney && (
              <article id="journey-panel" role="tabpanel" aria-labelledby={`season-${activeSeason}`}>
                <span className="eyebrow">{currentJourney.period}</span>
                <h3>{currentJourney.title}</h3>
                <p>{currentJourney.detail}</p>
              </article>
            )}
          </section>

          {/* MOMENTS / HIGHLIGHTS SECTION */}
          <section id="moments" className="gutter chapter reveal-ready visible">
            <div className="section-label">THE HIGHLIGHTS</div>
            <h2>Leadership &amp; Community</h2>
            <div id="milestone-grid" className="service-grid">
              {(config.milestones || []).map((m, i) => (
                <article key={i} className="service-card">
                  <span className="eyebrow">{m.organization}</span>
                  <h3>{m.title}</h3>
                  <p>{m.detail}</p>
                </article>
              ))}
            </div>
            {(config.credentials || []).length > 0 && (
              <div id="credential-list" className="chips">
                {config.credentials.map((cred, i) => (
                  <a key={i} href={cred.url} target="_blank" rel="noreferrer">
                    {cred.title} ↗
                  </a>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* CONTACT SECTION */}
        <section id="contact" className="gutter chapter contact reveal-ready visible">
          <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2
            className="cursor-pointer hover:text-white transition active:scale-95"
            onClick={() => speak("Aap Deenu se contact karna chahte ho? Bohot accha laga! Niche diye gaye email ya social links par connect kijiye!")}
            title="Click to speak"
          >
            LET’S<br />BUILD IT.
          </h2>
          <p id="contact-name">{config.name} · {config.location}</p>
          <div id="contact-links" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full my-8 text-left">
            {config.email && (
              <a
                href={`mailto:${config.email}`}
                onClick={() => speak("Aap Deenu se contact karna chahte ho? Unhe direct email bhejiye — deenuverma238@gmail.com par, woh zaroor reply karenge!")}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#e07a4a] hover:bg-white/10 active:scale-95 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e07a4a] block mb-1">DIRECT INQUIRY</span>
                  <b className="text-sm text-white font-bold block group-hover:text-[#e07a4a] transition">Email Me</b>
                  <p className="text-xs text-white/60 mt-1 truncate">{config.email}</p>
                </div>
                <span className="text-xs text-[#e07a4a] mt-3 font-semibold flex items-center gap-1">
                  Send email ↗
                </span>
              </a>
            )}
            {config.links?.youtube && (
              <a
                href={config.links.youtube}
                target="_blank"
                rel="noreferrer"
                onClick={() => speak("Aap Deenu se judna chahte ho? Unke Deenu Ki Awaaz YouTube channel par 13 lakh se zyada logo ka pyaar mila hai! Subscribe zaroor kijiye!")}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#e07a4a] hover:bg-white/10 active:scale-95 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e07a4a] block mb-1">YOUTUBE (1.3M+ VIEWS)</span>
                  <b className="text-sm text-white font-bold block group-hover:text-[#e07a4a] transition">Deenu Ki Awaaz</b>
                  <p className="text-xs text-white/60 mt-1">Tech &amp; Case Studies</p>
                </div>
                <span className="text-xs text-[#e07a4a] mt-3 font-semibold flex items-center gap-1">
                  Watch Channel ↗
                </span>
              </a>
            )}
            {config.links?.linkedin && (
              <a
                href={config.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => speak("Aap Deenu Verma se connect karna chahte ho? LinkedIn par unka professional network join kijiye!")}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#e07a4a] hover:bg-white/10 active:scale-95 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e07a4a] block mb-1">PROFESSIONAL</span>
                  <b className="text-sm text-white font-bold block group-hover:text-[#e07a4a] transition">LinkedIn Profile</b>
                  <p className="text-xs text-white/60 mt-1">Connect with Deenu</p>
                </div>
                <span className="text-xs text-[#e07a4a] mt-3 font-semibold flex items-center gap-1">
                  Connect ↗
                </span>
              </a>
            )}
            {config.links?.instagram && (
              <a
                href={config.links.instagram}
                target="_blank"
                rel="noreferrer"
                onClick={() => speak("Aap Deenu se baat karna chahte ho? Instagram par unhe follow karke pyara sa message bhej dijiye!")}
                className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#e07a4a] hover:bg-white/10 active:scale-95 transition group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e07a4a] block mb-1">SOCIAL &amp; CREATIVE</span>
                  <b className="text-sm text-white font-bold block group-hover:text-[#e07a4a] transition">Instagram</b>
                  <p className="text-xs text-white/60 mt-1">@deenu_verma05</p>
                </div>
                <span className="text-xs text-[#e07a4a] mt-3 font-semibold flex items-center gap-1">
                  Follow ↗
                </span>
              </a>
            )}
          </div>
          <div className="actions mt-6">
            <button
              id="replay"
              className="secondary cursor-pointer"
              onClick={() => setStage('opening')}
            >
              Replay opening ↺
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="gutter">
        <span id="copyright">
          © {new Date().getFullYear()} {config.name || 'Deenu Verma'}. All rights reserved.
        </span>
        <span>Crafted with passion · Balrampur &amp; Noida, India</span>
      </footer>

      {/* =========================================================================
          PROJECT DETAIL DIALOG MODAL
          ========================================================================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-[#101017] text-[#f2efec] border border-white/20 rounded-2xl p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close cursor-pointer"
              aria-label="Close project"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <div className="section-label">{selectedProject.category}</div>
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 font-['Impact'] tracking-wide">
              {selectedProject.title}
            </h2>
            <p className="text-white/70 mb-6 text-sm sm:text-base leading-relaxed">
              {selectedProject.description}
            </p>
            <div className="chips">
              {(selectedProject.stack || []).map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <ul className="list-disc pl-5 my-6 text-white/80 space-y-1 text-sm">
              {(selectedProject.features || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="actions mt-6">
              {selectedProject.demo && (
                <a
                  className="button primary"
                  href={selectedProject.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Launch Demo ↗
                </a>
              )}
              {selectedProject.github && (
                <a
                  className="button glass"
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Source ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          HIGHLIGHT REEL SLIDE SHOW DIALOG MODAL
          ========================================================================= */}
      {introOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIntroOpen(false)}
        >
          <div
            className="relative bg-[#101017] text-[#f2efec] border border-white/20 rounded-2xl p-8 sm:p-12 max-w-xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close cursor-pointer"
              aria-label="Close intro"
              onClick={() => setIntroOpen(false)}
            >
              ×
            </button>
            <span className="eyebrow">THE HIGHLIGHT REEL</span>
            <div id="slide-count" className="text-xs text-white/50 my-3">
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold my-4 font-['Impact'] tracking-wide">
              {slides[currentSlide]?.title}
            </h2>
            <p className="text-white/70 text-base leading-relaxed min-h-[60px] my-4">
              {slides[currentSlide]?.text}
            </p>
            <div className="actions justify-center gap-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded cursor-pointer hover:bg-white/20 transition"
                onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
              >
                ←
              </button>
              <button
                type="button"
                className="px-5 py-2 bg-white/10 border border-white/20 rounded cursor-pointer hover:bg-white/20 transition"
                onClick={() => setSlidePaused(!slidePaused)}
              >
                {slidePaused ? 'Play' : 'Pause'}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded cursor-pointer hover:bg-white/20 transition"
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VISUAL CUSTOMIZER DRAWER (FOR STEP 2 & 3 ADJUSTMENTS)
          ========================================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#0e0f16] border-l border-white/15 h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#14151f]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#e07a4a]" />
                <h3 className="font-bold text-sm tracking-wide text-white">Customize Portfolio Data</h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs */}
            <div className="flex border-b border-white/10 bg-[#10111a] overflow-x-auto text-xs">
              {(['basics', 'projects', 'skills', 'services', 'journey', 'contact'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setEditorTab(tab)}
                  className={`px-3 py-2.5 capitalize whitespace-nowrap border-b-2 font-medium transition ${
                    editorTab === tab
                      ? 'border-[#e07a4a] text-white bg-white/5'
                      : 'border-transparent text-white/50 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
              {editorTab === 'basics' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={config.name}
                      onChange={(e) => setConfig({ ...config, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                      placeholder="e.g. Alex Morgan"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Hero First Name / Display Name</label>
                    <input
                      type="text"
                      value={config.firstName}
                      onChange={(e) => setConfig({ ...config, firstName: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white uppercase focus:outline-none focus:border-[#e07a4a]"
                      placeholder="e.g. ALEX"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Professional Role</label>
                    <input
                      type="text"
                      value={config.role}
                      onChange={(e) => setConfig({ ...config, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                      placeholder="e.g. Full-Stack Developer & UI Designer"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      value={config.location}
                      onChange={(e) => setConfig({ ...config, location: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                      placeholder="e.g. London, United Kingdom"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={config.accent}
                        onChange={(e) => setConfig({ ...config, accent: e.target.value })}
                        className="w-9 h-9 rounded bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.accent}
                        onChange={(e) => setConfig({ ...config, accent: e.target.value })}
                        className="bg-white/5 border border-white/15 rounded px-3 py-1.5 text-white font-mono text-xs w-28 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Portrait Image</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={config.portrait}
                        onChange={(e) => setConfig({ ...config, portrait: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                        placeholder="Image URL or assets/portrait.svg"
                      />
                      <label className="flex items-center justify-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Custom Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePortraitUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Hero Intro (2 sentences)</label>
                    <textarea
                      rows={3}
                      value={config.intro}
                      onChange={(e) => setConfig({ ...config, intro: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">About Story (Full description)</label>
                    <textarea
                      rows={4}
                      value={config.about}
                      onChange={(e) => setConfig({ ...config, about: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-[#e07a4a]"
                    />
                  </div>
                </div>
              )}

              {editorTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Projects ({config.projects.length})</span>
                    <button
                      onClick={() => {
                        const newP: ProjectItem = {
                          title: 'New Project',
                          category: 'Web App',
                          description: 'Description of the project.',
                          stack: ['React', 'TypeScript'],
                          features: ['Feature 1', 'Feature 2'],
                          demo: '',
                          github: '',
                          accent: '#6ee7b7'
                        };
                        setConfig({ ...config, projects: [...config.projects, newP] });
                      }}
                      className="flex items-center gap-1 text-[#e07a4a] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Project
                    </button>
                  </div>

                  {config.projects.map((p, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={p.title}
                          onChange={(e) => {
                            const updated = [...config.projects];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setConfig({ ...config, projects: updated });
                          }}
                          className="bg-transparent font-bold text-white border-b border-transparent hover:border-white/20 focus:border-[#e07a4a] px-1 py-0.5"
                        />
                        <button
                          onClick={() => {
                            setConfig({
                              ...config,
                              projects: config.projects.filter((_, i) => i !== idx)
                            });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-white/50">Category</label>
                          <input
                            type="text"
                            value={p.category}
                            onChange={(e) => {
                              const updated = [...config.projects];
                              updated[idx] = { ...updated[idx], category: e.target.value };
                              setConfig({ ...config, projects: updated });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/50">Card Accent</label>
                          <input
                            type="color"
                            value={p.accent || '#6ee7b7'}
                            onChange={(e) => {
                              const updated = [...config.projects];
                              updated[idx] = { ...updated[idx], accent: e.target.value };
                              setConfig({ ...config, projects: updated });
                            }}
                            className="w-full h-7 bg-transparent rounded cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-white/50">Description</label>
                        <textarea
                          rows={2}
                          value={p.description}
                          onChange={(e) => {
                            const updated = [...config.projects];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            setConfig({ ...config, projects: updated });
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-white/50">Tech Stack (comma separated)</label>
                        <input
                          type="text"
                          value={(p.stack || []).join(', ')}
                          onChange={(e) => {
                            const updated = [...config.projects];
                            updated[idx] = {
                              ...updated[idx],
                              stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                            };
                            setConfig({ ...config, projects: updated });
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-white/50">Demo URL</label>
                          <input
                            type="text"
                            value={p.demo}
                            onChange={(e) => {
                              const updated = [...config.projects];
                              updated[idx] = { ...updated[idx], demo: e.target.value };
                              setConfig({ ...config, projects: updated });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                            placeholder="demos/flowdesk.html"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/50">GitHub URL</label>
                          <input
                            type="text"
                            value={p.github}
                            onChange={(e) => {
                              const updated = [...config.projects];
                              updated[idx] = { ...updated[idx], github: e.target.value };
                              setConfig({ ...config, projects: updated });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {editorTab === 'skills' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-2 font-medium">Skills (One per line)</label>
                    <textarea
                      rows={6}
                      value={config.skills.join('\n')}
                      onChange={(e) => {
                        const list = e.target.value.split('\n').filter(s => s.trim().length > 0);
                        setConfig({ ...config, skills: list });
                      }}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {editorTab === 'services' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Services ({config.services.length})</span>
                    <button
                      onClick={() => {
                        setConfig({
                          ...config,
                          services: [
                            ...config.services,
                            { title: 'New Service', detail: 'Description of service offered.' }
                          ]
                        });
                      }}
                      className="flex items-center gap-1 text-[#e07a4a] hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Service
                    </button>
                  </div>

                  {config.services.map((serv, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={serv.title}
                          onChange={(e) => {
                            const updated = [...config.services];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setConfig({ ...config, services: updated });
                          }}
                          className="bg-transparent font-bold text-white border-b border-transparent focus:border-[#e07a4a] px-1 py-0.5"
                        />
                        <button
                          onClick={() => {
                            setConfig({
                              ...config,
                              services: config.services.filter((_, i) => i !== idx)
                            });
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={serv.detail}
                        onChange={(e) => {
                          const updated = [...config.services];
                          updated[idx] = { ...updated[idx], detail: e.target.value };
                          setConfig({ ...config, services: updated });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {editorTab === 'journey' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Journey Seasons ({config.journey.length})</span>
                  </div>

                  {config.journey.map((item, idx) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-white/50">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...config.journey];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setConfig({ ...config, journey: updated });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/50">Period</label>
                          <input
                            type="text"
                            value={item.period}
                            onChange={(e) => {
                              const updated = [...config.journey];
                              updated[idx] = { ...updated[idx], period: e.target.value };
                              setConfig({ ...config, journey: updated });
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-white/50">Detail</label>
                        <textarea
                          rows={2}
                          value={item.detail}
                          onChange={(e) => {
                            const updated = [...config.journey];
                            updated[idx] = { ...updated[idx], detail: e.target.value };
                            setConfig({ ...config, journey: updated });
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {editorTab === 'contact' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Public Email</label>
                    <input
                      type="email"
                      value={config.email}
                      onChange={(e) => setConfig({ ...config, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="hello@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">YouTube Channel URL</label>
                    <input
                      type="text"
                      value={config.links?.youtube || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          links: { ...config.links, youtube: e.target.value }
                        })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://youtube.com/@..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">LinkedIn URL</label>
                    <input
                      type="text"
                      value={config.links?.linkedin || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          links: { ...config.links, linkedin: e.target.value }
                        })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">GitHub URL</label>
                    <input
                      type="text"
                      value={config.links?.github || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          links: { ...config.links, github: e.target.value }
                        })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">WhatsApp Link</label>
                    <input
                      type="text"
                      value={config.links?.whatsapp || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          links: { ...config.links, whatsapp: e.target.value }
                        })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://wa.me/..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Instagram URL</label>
                    <input
                      type="text"
                      value={config.links?.instagram || ''}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          links: { ...config.links, instagram: e.target.value }
                        })
                      }
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-medium">Resume Link (PDF or Drive)</label>
                    <input
                      type="text"
                      value={config.resume || ''}
                      onChange={(e) => setConfig({ ...config, resume: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded px-3 py-2 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-white/10 bg-[#14151f] flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm('Reset all changes back to template defaults?')) {
                    setConfig(initialPortfolioConfig);
                    localStorage.removeItem('h_portfolio_config');
                  }
                }}
                className="text-white/40 hover:text-red-400 text-xs transition"
              >
                Reset Defaults
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-1.5 rounded bg-[#e07a4a] text-white font-medium hover:bg-[#d01c39] transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ELEVENLABS MILLY MAPLE AI ANIMATION VOICE CHARACTER WIDGET
          ========================================================================= */}
      <aside
        className={`fixed z-[140] transition-all duration-300 ${
          currentSpeechText
            ? 'bottom-6 left-1/2 -translate-x-1/2 max-w-xl w-[94vw] sm:w-auto'
            : 'bottom-6 right-6 max-w-xs'
        }`}
        aria-live="polite"
        aria-label="ElevenLabs Milly Maple AI Voice Assistant"
      >
        {currentSpeechText ? (
          // Active Speaking State with Animated Equalizer and Holographic Avatar
          <div className="p-4 sm:p-4.5 rounded-2xl bg-[#140b0eee] border border-pink-500/60 text-white backdrop-blur-2xl shadow-[0_15px_50px_rgba(237,36,68,0.45)] flex items-center gap-3.5 voice-toast-anim pointer-events-auto">
            {/* Holographic Glowing AI Avatar */}
            <div className="relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-pink-400/50 ai-orbit-ring" />
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-pink-500/40 via-amber-500/30 to-purple-500/40 blur-sm ai-speaking-orb" />
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#ed2444] to-[#f97316] flex items-center justify-center text-white shadow-inner font-bold text-sm">
                🌸
              </div>
            </div>

            {/* Live Animated Speech Bubble */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-pink-400 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-pink-400 animate-spin" />
                    ELEVENLABS AI · MILLY MAPLE
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 font-mono">
                    Animation Voice
                  </span>
                </div>

                {/* Animated Equalizer Waves */}
                {isSpeaking && (
                  <div className="flex items-end gap-1 h-5 px-2 py-1 bg-black/40 rounded-full border border-pink-500/30">
                    <span className="w-1 bg-pink-400 rounded-full ai-wave-bar-1" />
                    <span className="w-1 bg-amber-400 rounded-full ai-wave-bar-2" />
                    <span className="w-1 bg-pink-300 rounded-full ai-wave-bar-3" />
                    <span className="w-1 bg-purple-400 rounded-full ai-wave-bar-4" />
                    <span className="w-1 bg-pink-400 rounded-full ai-wave-bar-5" />
                  </div>
                )}
              </div>

              <p className="text-xs sm:text-sm font-medium text-white/95 leading-snug">
                {currentSpeechText}
              </p>
            </div>

            {/* Quick Mute button */}
            <button
              type="button"
              onClick={() => {
                if (currentAudioRef.current) currentAudioRef.current.pause();
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsSpeaking(false);
                setCurrentSpeechText(null);
              }}
              className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition"
              title="Stop voice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // Idle Floating AI Mascot Badge
          <button
            type="button"
            onClick={() => {
              speak("Hey there! Main hoon Milly Maple, Deenu Verma ki ElevenLabs AI Voice Assistant! Deenu ke amazing projects aur creative skills dekhne ke liye kisi bhi button par click kijiye!");
            }}
            className="group cursor-pointer p-2.5 pr-4 rounded-full bg-[#181014cc] hover:bg-[#20141acc] border border-pink-500/35 hover:border-pink-500/70 text-white backdrop-blur-xl shadow-[0_10px_35px_rgba(237,36,68,0.25)] flex items-center gap-3 transition hover:scale-105 active:scale-95 pointer-events-auto"
            title="Click to talk to Milly Maple (ElevenLabs AI Voice)"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#ed2444] to-[#f97316] flex items-center justify-center text-white text-xs shadow-md group-hover:scale-110 transition">
              🌸
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-bold text-white block leading-tight group-hover:text-pink-300 transition">
                Milly Maple AI
              </span>
              <span className="text-[9px] text-pink-400/90 font-mono block">
                ElevenLabs Voice ✨
              </span>
            </div>
          </button>
        )}
      </aside>
    </div>
  );
}

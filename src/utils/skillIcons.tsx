import React from 'react';

export interface SkillMeta {
  name: string;
  category: 'web' | 'programming' | 'video' | 'design' | 'ai';
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

export const SKILL_DATA: Record<string, SkillMeta> = {
  // ----------------------------------------------------
  // WEB & FRONTEND / BACKEND
  // ----------------------------------------------------
  'HTML': {
    name: 'HTML5',
    category: 'web',
    color: '#E34F26',
    bgColor: '#e34f2618',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17.6 5H4.9l.4 4.5h12.9l-.5 5.5-5.7 1.6-5.7-1.6-.3-3.5h3.6l.2 1.6 2.2.6 2.2-.6.3-2.6H4.6L3.6 3.5h15.9l-.4 1.5z" />
      </svg>
    )
  },
  'HTML5 & CSS3': {
    name: 'HTML5 & CSS3',
    category: 'web',
    color: '#E34F26',
    bgColor: '#e34f2618',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17.6 5H4.9l.4 4.5h12.9l-.5 5.5-5.7 1.6-5.7-1.6-.3-3.5h3.6l.2 1.6 2.2.6 2.2-.6.3-2.6H4.6L3.6 3.5h15.9l-.4 1.5z" />
      </svg>
    )
  },
  'CSS': {
    name: 'CSS3',
    category: 'web',
    color: '#1572B6',
    bgColor: '#1572b618',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0zm17 5.5H5.5l.3 3.5h12.4l-.5 5.6-5.7 1.6-5.7-1.6-.3-3.5h3.6l.2 1.6 2.2.6 2.2-.6.3-2.6H5.2L4.6 3h14.3l-.4 2.5z" />
      </svg>
    )
  },
  'JavaScript': {
    name: 'JavaScript',
    category: 'web',
    color: '#F7DF1E',
    bgColor: '#f7df1e18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <rect width="24" height="24" rx="3" fill="#F7DF1E" />
        <path
          d="M6.2 18.5l2.1-1.3c.5.8.9 1.4 1.8 1.4.9 0 1.5-.4 1.5-1.7V10H9v-2h5.2v8.8c0 2.5-1.5 3.6-3.7 3.6-1.9 0-3.3-1-4.3-1.9zm8.5-.1l2.1-1.2c.6.9 1.3 1.6 2.6 1.6 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4.1 0-2 1.6-3.6 4.1-3.6 1.8 0 3.1.6 4.1 2.3l-2 1.3c-.4-.8-.9-1.2-2.1-1.2-1 0-1.7.5-1.7 1.2 0 .8.6 1.2 1.7 1.7l.7.3c2.3 1 3.6 2 3.6 4.3 0 2.5-1.9 3.8-4.5 3.8-2.6 0-4.1-1.3-4.7-2.9z"
          fill="#000000"
        />
      </svg>
    )
  },
  'React': {
    name: 'React.js',
    category: 'web',
    color: '#61DAFB',
    bgColor: '#61dafb18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61DAFB" stroke="none" />
      </svg>
    )
  },
  'Node.js': {
    name: 'Node.js',
    category: 'web',
    color: '#5FA04E',
    bgColor: '#5fa04e18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L4.8 8.4v7.2L12 19.7l7.2-4.1V8.4L12 4.3z" />
        <path d="M12 6.5l4.8 2.8v5.5L12 17.5l-4.8-2.7V9.3L12 6.5z" opacity="0.6" />
      </svg>
    )
  },
  'Express.js': {
    name: 'Express.js',
    category: 'web',
    color: '#FFFFFF',
    bgColor: '#ffffff18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <text
          x="12"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="14"
          textAnchor="middle"
          letterSpacing="-1"
          fill="#FFFFFF"
        >
          ex
        </text>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    )
  },
  'Tailwind CSS': {
    name: 'Tailwind CSS',
    category: 'web',
    color: '#38BDF8',
    bgColor: '#38bdf818',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    )
  },

  // ----------------------------------------------------
  // PROGRAMMING & CS
  // ----------------------------------------------------
  'Python': {
    name: 'Python',
    category: 'programming',
    color: '#3776AB',
    bgColor: '#3776ab18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Python official dual snake logo */}
        <path
          d="M11.9 2C8.6 2 8.4 3.4 8.4 3.4l.03 2.3h4.6v.7H6.1S3.8 6.2 3.8 9.6c0 3.4 2.1 3.3 2.1 3.3h1.2V11c0-1.8 1.6-1.8 1.6-1.8h4.6c1.3 0 1.3-1.3 1.3-1.3V3.8s.1-1.8-2.7-1.8zm-1.8 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22c3.3 0 3.5-1.4 3.5-1.4l-.03-2.3H11v-.7h6.9s2.3.2 2.3-3.2c0-3.4-2.1-3.3-2.1-3.3h-1.2v1.9c0 1.8-1.6 1.8-1.6 1.8h-4.6c-1.3 0-1.3 1.3-1.3 1.3v4.4s-.1 1.8 2.7 1.8zm1.8-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"
          fill="#FFD43B"
        />
      </svg>
    )
  },
  'Java': {
    name: 'Java',
    category: 'programming',
    color: '#ED8B00',
    bgColor: '#ed8b0018',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Steam curls */}
        <path
          d="M11.5 1.5c1.8 1.8.8 3.5-.3 4.6-1.2 1.3-1 2.3-.4 3.3-1.5-1.3-1.8-3-.5-4.4 1.1-1.2 1.7-2.3 1.2-3.5z"
          fill="#ED8B00"
        />
        <path
          d="M14.5 3c1.5 1.4.6 2.8-.2 3.8-1 1.1-.8 2-.3 2.7-1.2-1.1-1.4-2.5-.4-3.7.9-1 1.4-1.9.9-2.8z"
          fill="#5382A1"
        />
        {/* Cup body & saucer */}
        <path
          d="M6 13c0 3.5 3 5 6 5s6-1.5 6-5H6zm12 1c1.2 0 2-.8 2-2s-.8-2-2-2v4z"
          fill="#ED8B00"
        />
        <path
          d="M4 19.5c2.5 1.5 13.5 1.5 16 0-2-.5-14-.5-16 0z"
          fill="#5382A1"
        />
      </svg>
    )
  },
  'Data Structures & Algorithms': {
    name: 'DSA & Algorithms',
    category: 'programming',
    color: '#A855F7',
    bgColor: '#a855f718',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="4" r="2.5" fill="#A855F7" />
        <circle cx="6" cy="18" r="2.5" fill="#A855F7" />
        <circle cx="18" cy="18" r="2.5" fill="#A855F7" />
        <path d="M12 6.5v4m-4.5 4.5L10.5 12m3 0l3 3" />
        <circle cx="12" cy="12" r="1.5" stroke="#A855F7" />
      </svg>
    )
  },

  // ----------------------------------------------------
  // VIDEO EDITING & PRODUCTION
  // ----------------------------------------------------
  'Reels Editing': {
    name: 'Reels Editing',
    category: 'video',
    color: '#EC4899',
    bgColor: '#ec489918',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Instagram Reels official clapper / camera frame */}
        <defs>
          <linearGradient id="reelsGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="50%" stopColor="#DD2A7B" />
            <stop offset="100%" stopColor="#8134AF" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#reelsGrad)" />
        <polygon points="10 8 16 12 10 16 10 8" fill="#FFFFFF" />
        <line x1="7" y1="3" x2="11" y2="7" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="13" y1="3" x2="17" y2="7" stroke="#FFFFFF" strokeWidth="1.5" />
      </svg>
    )
  },
  'Podcast Editing': {
    name: 'Podcast Editing',
    category: 'video',
    color: '#F43F5E',
    bgColor: '#f43f5e18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="2" width="6" height="11" rx="3" fill="#F43F5E" stroke="none" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="17" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
      </svg>
    )
  },
  'CapCut': {
    name: 'CapCut',
    category: 'video',
    color: '#FFFFFF',
    bgColor: '#ffffff18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Authentic CapCut logo - two interlocking rotating trapezoids */}
        <path
          d="M3.5 5.5h11l-4.5 6.5h-11z"
          fill="#FFFFFF"
        />
        <path
          d="M20.5 18.5h-11l4.5-6.5h11z"
          fill="#FFFFFF"
        />
      </svg>
    )
  },
  'VN': {
    name: 'VN Editor',
    category: 'video',
    color: '#2563EB',
    bgColor: '#2563eb18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* VN Editor authentic logo badge */}
        <rect width="24" height="24" rx="5" fill="#2563EB" />
        <text
          x="12"
          y="17"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="13"
          textAnchor="middle"
          fill="#FFFFFF"
          letterSpacing="-0.5"
        >
          VN
        </text>
      </svg>
    )
  },
  'Filmora': {
    name: 'Filmora',
    category: 'video',
    color: '#00E5FF',
    bgColor: '#00e5ff18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Wondershare Filmora official teal origami geometric ribbon */}
        <rect width="24" height="24" rx="5" fill="#0E1924" />
        <path
          d="M6 7l6-3 6 3-6 3-6-3z"
          fill="#00E5FF"
        />
        <path
          d="M6 7v8l6 4v-8l-6-4z"
          fill="#00B2AA"
        />
        <path
          d="M18 7v8l-6 4v-8l6-4z"
          fill="#5CE1E6"
        />
      </svg>
    )
  },

  // ----------------------------------------------------
  // GRAPHICS & AI
  // ----------------------------------------------------
  'Graphic Design': {
    name: 'Graphic Design',
    category: 'design',
    color: '#F59E0B',
    bgColor: '#f59e0b18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Pen tool / Bezier curve vector handles */}
        <path d="M12 2l4 4-8 8H4v-4l8-8z" fill="#F59E0B" fillOpacity="0.2" />
        <circle cx="18" cy="18" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <path d="M15.5 18H8.5" />
      </svg>
    )
  },
  'AI Graphic Design': {
    name: 'AI Graphic Design',
    category: 'design',
    color: '#10B981',
    bgColor: '#10b98118',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
        {/* Glowing Magic Wand with AI stars */}
        <path d="M14.5 4l5.5 5.5-12 12-5.5-5.5 12-12z" stroke="#10B981" strokeWidth="1.8" fill="#10B981" fillOpacity="0.2" />
        <path d="M18 2v3m-1.5-1.5h3" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 14v2m-1-1h2" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M20 12v3m-1.5-1.5h3" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  },
  'Canva': {
    name: 'Canva',
    category: 'design',
    color: '#00C4CC',
    bgColor: '#00c4cc18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Authentic Canva teal badge with distinctive flowing cursive "C" */}
        <defs>
          <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="11" fill="url(#canvaGrad)" />
        <path
          d="M14.8 9.2c-.7-.6-1.7-.9-2.8-.9-2.8 0-4.8 2.2-4.8 5 0 2.6 1.8 4.7 4.5 4.7 1.5 0 2.7-.6 3.4-1.5l-1.4-1.1c-.5.6-1.2.9-2 .9-1.6 0-2.6-1.2-2.6-2.9 0-1.8 1.2-3.1 2.8-3.1.7 0 1.3.2 1.8.6l1.1-1.7z"
          fill="#FFFFFF"
        />
      </svg>
    )
  },
  'Photoshop': {
    name: 'Photoshop',
    category: 'design',
    color: '#31A8FF',
    bgColor: '#31a8ff18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Adobe Photoshop authentic dark blue rounded icon with bright cyan "Ps" */}
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="4.25" fill="none" stroke="#31A8FF" strokeWidth="1.5" />
        <text
          x="12"
          y="16.5"
          fill="#31A8FF"
          fontSize="11.5"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="-0.3"
        >
          Ps
        </text>
      </svg>
    )
  },
  'ChatGPT': {
    name: 'ChatGPT',
    category: 'ai',
    color: '#10A37F',
    bgColor: '#10a37f18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Authentic OpenAI / ChatGPT hexagonal knot vortex */}
        <path d="M19.5 9.5a4.2 4.2 0 0 0-.6-3.8 4.3 4.3 0 0 0-4.5-1.8 4.2 4.2 0 0 0-3.6-2 4.3 4.3 0 0 0-4.1 2.8 4.2 4.2 0 0 0-3.3 2.4 4.3 4.3 0 0 0 .5 4.8 4.2 4.2 0 0 0 .6 3.8 4.3 4.3 0 0 0 4.5 1.8 4.2 4.2 0 0 0 3.6 2 4.3 4.3 0 0 0 4.1-2.8 4.2 4.2 0 0 0 3.3-2.4 4.3 4.3 0 0 0-.5-4.8z" />
        <path d="M12 8.5v7m-3.5-5l7 4m-7 0l7-4" />
      </svg>
    )
  },
  'Gemini': {
    name: 'Google Gemini',
    category: 'ai',
    color: '#4E88F5',
    bgColor: '#4e88f518',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        {/* Authentic Google Gemini 4-pointed radiant sparkle */}
        <defs>
          <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E88F5" />
            <stop offset="50%" stopColor="#7E76F9" />
            <stop offset="100%" stopColor="#E988CD" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C12 7.52 7.52 12 2 12c5.48 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z"
          fill="url(#geminiGrad)"
        />
      </svg>
    )
  },
  'Claude': {
    name: 'Claude AI',
    category: 'ai',
    color: '#D97706',
    bgColor: '#d9770618',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#D97706">
        {/* Official Anthropic / Claude sunburst star with radiating rounded petals */}
        <path d="M12 3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-3 0v-3A1.5 1.5 0 0 1 12 3zm0 13.5a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-3 0v-3A1.5 1.5 0 0 1 12 16.5zM3 12a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 0 3h-3A1.5 1.5 0 0 1 3 12zm13.5 0a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 1-1.5-1.5zM5.64 5.64a1.5 1.5 0 0 1 2.12 0l2.12 2.12a1.5 1.5 0 1 1-2.12 2.12L5.64 7.76a1.5 1.5 0 0 1 0-2.12zm10.6 10.6a1.5 1.5 0 0 1 2.13 0l2.12 2.13a1.5 1.5 0 0 1-2.12 2.12l-2.13-2.12a1.5 1.5 0 0 1 0-2.13zm0-10.6a1.5 1.5 0 0 1 0 2.12l-2.12 2.12a1.5 1.5 0 1 1-2.12-2.12l2.12-2.12a1.5 1.5 0 0 1 2.12 0zm-10.6 10.6a1.5 1.5 0 0 1 0 2.13l-2.12 2.12a1.5 1.5 0 0 1-2.12-2.12l2.12-2.13a1.5 1.5 0 0 1 2.12 0z" />
      </svg>
    )
  }
};

export function getSkillMeta(skillName: string): SkillMeta {
  if (SKILL_DATA[skillName]) {
    return SKILL_DATA[skillName];
  }
  // Case-insensitive / partial match
  const lower = skillName.toLowerCase();
  for (const [key, val] of Object.entries(SKILL_DATA)) {
    if (lower === key.toLowerCase() || lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return val;
    }
  }
  return {
    name: skillName,
    category: 'web',
    color: '#e07a4a',
    bgColor: '#e07a4a18',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  };
}

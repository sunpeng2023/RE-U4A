'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Info, AlertTriangle, Lightbulb, Users,
  Search, ShieldCheck, Globe, History, Leaf, Database, Layers,
  Compass, Zap, BookOpen, Microscope, Book, CheckCircle, HelpCircle, MessageCircle
} from 'lucide-react';

interface Slide {
  id: number;
  bg: string;
  layout: string;
  steps: number;
  title?: string;
  subtitle?: string;
  footer?: string;
  header?: string;
  subHeader?: string;
  questions?: (string | { q: string; link?: number; icon?: React.ReactNode })[];
  facts?: { label: string; text: string }[];
  content?: { title: string; text: string; highlight?: boolean }[];
  task?: string;
  prompts?: string[];
  icon?: React.ReactNode;
  question?: string;
  answer?: string;
  highlights?: string[];
  vocab?: { word: string; def: string }[];
  vocabList?: { icon: string; zh: string; en: string }[];
  wordBank?: string[];
  instruction?: string;
  points?: { title: string; text: string; icon: React.ReactNode }[];
  closing?: string;
  scenarios?: { q: string; keywords: string[]; icon: React.ReactNode; possibleAnswer?: string }[];
  returnTo?: number;
  colorTheme?: 'teal' | 'violet' | 'pink' | 'amber' | 'blue' | 'indigo' | 'emerald' | 'cyan';
  audio?: string;
}

const getThemeColors = (slide: Slide) => {
  const themes = {
    teal: {
      primary: 'text-teal-400',
      bg: 'bg-teal-500',
      border: 'border-teal-500/30',
      glow: 'shadow-teal-500/20',
      gradient: 'from-teal-400 to-cyan-500',
      highlight: 'bg-teal-500/10',
      accent: 'teal-500'
    },
    violet: {
      primary: 'text-violet-400',
      bg: 'bg-violet-500',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/20',
      gradient: 'from-violet-400 to-purple-500',
      highlight: 'bg-violet-500/10',
      accent: 'violet-500'
    },
    pink: {
      primary: 'text-pink-400',
      bg: 'bg-pink-500',
      border: 'border-pink-500/30',
      glow: 'shadow-pink-500/20',
      gradient: 'from-pink-400 to-rose-500',
      highlight: 'bg-pink-500/10',
      accent: 'pink-500'
    },
    amber: {
      primary: 'text-amber-400',
      bg: 'bg-amber-500',
      border: 'border-amber-500/30',
      glow: 'shadow-amber-500/20',
      gradient: 'from-amber-400 to-orange-500',
      highlight: 'bg-amber-500/10',
      accent: 'amber-500'
    },
    blue: {
      primary: 'text-blue-400',
      bg: 'bg-blue-500',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/20',
      gradient: 'from-blue-400 to-indigo-500',
      highlight: 'bg-blue-500/10',
      accent: 'blue-500'
    },
    indigo: {
      primary: 'text-indigo-400',
      bg: 'bg-indigo-500',
      border: 'border-indigo-500/30',
      glow: 'shadow-indigo-500/20',
      gradient: 'from-indigo-400 to-violet-500',
      highlight: 'bg-indigo-500/10',
      accent: 'indigo-500'
    },
    emerald: {
      primary: 'text-emerald-400',
      bg: 'bg-emerald-500',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20',
      gradient: 'from-emerald-400 to-teal-500',
      highlight: 'bg-emerald-500/10',
      accent: 'emerald-500'
    },
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20',
      gradient: 'from-cyan-400 to-blue-500',
      highlight: 'bg-cyan-500/10',
      accent: 'cyan-500'
    }
  };

  if (slide.colorTheme && themes[slide.colorTheme]) {
    return themes[slide.colorTheme];
  }

  // Auto-detect based on layout or icons
  if (slide.layout === 'title') return themes.indigo;
  if (slide.layout === 'vocabCheck' || slide.layout === 'fillBlanks') return themes.emerald;
  if (slide.layout === 'summary') return themes.teal;

  return themes.cyan; // default for space theme
};

const slides: Slide[] = [
  {
    id: 1,
    bg: './images/slide1.png',
    title: 'LIFE BEYOND EARTH?',
    subtitle: 'Are We Alone in the Universe?',
    footer: 'Pre-reading Module',
    layout: 'title',
    steps: 3,
    colorTheme: 'indigo'
  },
  {
    id: 2,
    bg: './images/slide2.png',
    header: 'Think and Share',
    questions: [
      { q: 'If you could send a message to another planet, what would you say?', link: 2 },
      { q: 'Do you believe there are other intelligent beings in space? Why or why not?', link: 3 }
    ],
    layout: 'questions',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 3,
    bg: './images/slide3.png',
    header: 'The Search for Life',
    subHeader: 'Why we are curious',
    facts: [
      { label: 'Key Fact', text: 'Humans have wondered about extraterrestrial life for centuries, looking at the stars for answers.' },
      { label: 'The Science', text: 'Modern astronomers use powerful tools like telescopes to search for planets that might support life.' },
      { label: 'Possibility', text: 'With billions of galaxies, many scientists believe it\'s unlikely that Earth is the only planet with life.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'indigo'
  },
  {
    id: 4,
    bg: './images/slide4.png',
    header: 'The Goldilocks Zone',
    subHeader: 'Finding the right home',
    facts: [
      { label: 'Habitability', text: 'For life to exist, a planet usually needs to be at the right distance from its star (not too hot, not too cold).' },
      { label: 'Liquid Water', text: 'This "Goldilocks Zone" allows for liquid water, which is essential for all known life forms.' },
      { label: 'Earth-like', text: 'Scientists are currently looking for "exoplanets" that share these similar conditions with our home.' }
    ],
    layout: 'history',
    steps: 4,
    returnTo: 1,
    colorTheme: 'blue'
  },
  {
    id: 5,
    bg: './images/slide5.png',
    header: 'Look and Predict',
    task: 'Based on the title "Life Beyond Earth?" and the article\'s focus on "Contacting Beings," discuss:',
    prompts: [
      'Do you think the author believes we will find life soon?',
      'What kind of tools do you think scientists use to "listen" to space?',
      'How would humanity react if we received a signal from another galaxy tomorrow?'
    ],
    layout: 'predict',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 6,
    bg: './images/reading_main.png',
    header: 'Reading: Life Beyond Earth?',
    audio: './images/living_in_space.wav',
    icon: <Search className="text-cyan-400" size={32} />,
    question: 'Do we have evidence of intelligent life in the universe?',
    answer: 'While we haven\'t made physical contact yet, astronomers believe the universe is too old and vast for Earth to be the only home for life. With new technology, we might soon detect signals from other beings.',
    highlights: ['astronomers', 'universe', 'contact', 'beings', 'signals'],
    layout: 'qa',
    steps: 3,
    colorTheme: 'indigo'
  },
  {
    id: 7,
    bg: './images/slide6.png',
    header: 'Astronomers\' Belief',
    icon: <Search className="text-cyan-400" size={32} />,
    question: 'What do astronomers Seth Shostak and Alexandra Barnett believe about intelligent life?',
    answer: 'They believe it exists elsewhere in the universe and that we will soon make contact with these beings.',
    highlights: ['intelligent', 'exists', 'universe', 'contact', 'beings'],
    vocab: [
      { word: 'intelligent', def: 'able to learn, think, and understand' },
      { word: 'exist', def: 'to be real; to be present' },
      { word: 'beings', def: 'living creatures' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'cyan'
  },
  {
    id: 8,
    bg: './images/slide7.png',
    header: 'The Factor of Time',
    icon: <History className="text-amber-400" size={32} />,
    question: 'Why is the age of the universe a reason to believe in other life forms?',
    answer: 'Scientists believe the universe is 12 billion years old. This is a very long period—too long for only one planet in the whole universe to develop life.',
    highlights: ['universe', 'whole'],
    vocab: [
      { word: 'universe', def: 'everything that exists in space' },
      { word: 'whole', def: 'complete; all of something' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'amber'
  },
  {
    id: 9,
    bg: './images/slide8.png',
    header: 'The Scale of Space',
    icon: <Globe className="text-blue-400" size={32} />,
    question: 'How does the number of galaxies influence the search for life?',
    answer: 'With at least 100 billion galaxies, many planets circle stars that are similar to our Sun, increasing the chance of finding life.',
    highlights: ['galaxies', 'circle'],
    vocab: [
      { word: 'galaxies', def: 'huge groups of stars and planets' },
      { word: 'circle', def: 'to move around something' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'blue'
  },
  {
    id: 10,
    bg: './images/slide9.png',
    header: 'Modern Detection Tools',
    icon: <Microscope className="text-emerald-400" size={32} />,
    question: 'How do powerful telescopes change our ability to search for life?',
    answer: 'They allow scientists to identify many more small planets—the size of Mars or Earth—in other solar systems far away.',
    highlights: ['powerful', 'allow', 'identify'],
    vocab: [
      { word: 'powerful', def: 'very strong or effective' },
      { word: 'allow', def: 'to let someone do something' },
      { word: 'identify', def: 'to recognize or find something' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 11,
    bg: './images/slide10.png',
    header: 'Searching for Signs',
    icon: <Compass className="text-cyan-400" size={32} />,
    question: 'What are scientists looking for to find signs of life?',
    answer: 'They look for planets that are similar to Earth and are close enough to a star to potentially support life forms.',
    highlights: ['signs'],
    vocab: [
      { word: 'signs', def: 'proof that something exists' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'cyan'
  },
  {
    id: 12,
    bg: './images/slide11.png',
    header: 'The Challenge of Distance',
    icon: <AlertTriangle className="text-red-400" size={32} />,
    question: 'Have beings from space visited Earth, and why is this difficult?',
    answer: 'Probably not, because the distance between planets is too great for physical travel.',
    highlights: ['beings', 'distance'],
    vocab: [
      { word: 'beings', def: 'living creatures' },
      { word: 'distance', def: 'the space between two places' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'pink'
  },
  {
    id: 13,
    bg: './images/slide12.png',
    header: 'Methods of Communication',
    icon: <Zap className="text-amber-400" size={32} />,
    question: 'How might intelligent life forms try to contact us?',
    answer: 'They might use methods like radio signals or flashes of light to send messages across the universe.',
    highlights: ['contact', 'radio signals'],
    vocab: [
      { word: 'contact', def: 'to communicate with someone' },
      { word: 'radio signals', def: 'waves used to send messages' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'amber'
  },
  {
    id: 14,
    bg: './images/slide13.png',
    header: 'A Bold Prediction',
    icon: <MessageCircle className="text-emerald-400" size={32} />,
    question: 'What does Shostak predict for the future despite our current lack of tools?',
    answer: 'He predicts that we will finally make contact with other life forms within the next 20 years.',
    highlights: ['despite', 'contact'],
    vocab: [
      { word: 'despite', def: 'even though something is true' },
      { word: 'contact', def: 'connection or communication' }
    ],
    layout: 'qa',
    steps: 4,
    colorTheme: 'emerald'
  },
  {
    id: 15,
    bg: './images/slide14.png',
    header: 'Vocabulary Checkpoint 1',
    vocabList: [
      { icon: '🧠', zh: '有智慧的', en: 'intelligent' },
      { icon: '🌱', zh: '存在', en: 'exist' },
      { icon: '📞', zh: '联系/接触', en: 'contact' },
      { icon: '👽', zh: '生物/人', en: 'beings' },
      { icon: '🌌', zh: '整个的', en: 'whole' },
      { icon: '🚀', zh: '宇宙', en: 'universe' }
    ],
    layout: 'vocabCheck',
    steps: 7,
    colorTheme: 'emerald'
  },
  {
    id: 16,
    bg: './images/slide15.png',
    header: 'Vocabulary Checkpoint 2',
    vocabList: [
      { icon: '🌠', zh: '星系', en: 'galaxies' },
      { icon: '⭕', zh: '环绕/旋转', en: 'circle' },
      { icon: '📡', zh: '迹象', en: 'signs' },
      { icon: '⚡', zh: '强大的', en: 'powerful' },
      { icon: '🔭', zh: '识别/确定', en: 'identify' },
      { icon: '📏', zh: '距离', en: 'distance' },
      { icon: '📻', zh: '无线电信号', en: 'radio signal' }
    ],
    layout: 'vocabCheck',
    steps: 8,
    colorTheme: 'emerald'
  },
  {
    id: 17,
    bg: './images/slide16.png',
    header: 'Practice: The Search Continues',
    instruction: 'Fill in the blanks using the correct form of the words from the box.',
    wordBank: ['intelligent', 'beings', 'exists', 'galaxies', 'powerful', 'identified', 'despite', 'distance', 'contact'],
    layout: 'fillBlanks',
    steps: 10,
    colorTheme: 'emerald'
  },
  {
    id: 18,
    bg: './images/slide9.png',
    header: 'Scenario 1: New Discovery',
    scenarios: [
      {
        q: "A scientist finds a planet that moves around a sun far away. What words describe this?", 
        keywords: ['circle', 'identify'],
        icon: <Microscope className="text-emerald-400" />,
        possibleAnswer: "The scientist used a powerful telescope to identify a new planet that circles a distant star."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'emerald'
  },
  {
    id: 19,
    bg: './images/slide12.png',
    header: 'Scenario 2: Alien Message',
    scenarios: [
      {
        q: "We receive a strange flash of light from another galaxy. What is happening?", 
        keywords: ['contact', 'radio signal'],
        icon: <Zap className="text-amber-400" />,
        possibleAnswer: "Alien beings might be trying to contact us using light or a radio signal."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'amber'
  },
  {
    id: 20,
    bg: './images/telescope_discovery.png',
    header: 'Scenario 3: Space Exploration',
    scenarios: [
      {
        q: "Despite the huge distance, how can scientists know what a planet far away looks like?", 
        keywords: ['distance', 'powerful', 'whole'],
        icon: <Search className="text-blue-400" />,
        possibleAnswer: "They use powerful telescopes and tools to identify signs of life in the whole universe."
      }
    ],
    layout: 'scenario',
    steps: 3,
    colorTheme: 'blue'
  },
  {
    id: 21,
    bg: './images/slide17.png',
    header: 'Beyond the Text: Discussion',
    icon: <MessageCircle className="text-cyan-400" size={32} />,
    questions: [
      { q: "If we do make contact with alien beings, do you think we should be friendly or cautious? Why?", icon: <Users className="text-emerald-400" /> },
      { q: "How would the discovery of life on another planet change your view of our whole universe?", icon: <Globe className="text-blue-400" /> }
    ],
    layout: 'discussion',
    steps: 3,
    colorTheme: 'cyan'
  },
  {
    id: 22,
    bg: './images/slide18.png',
    header: 'Summary: Are We Alone?',
    points: [
      { title: 'Probability', text: 'The universe is so old and huge that life likely exists elsewhere.', icon: <CheckCircle className="text-emerald-400" /> },
      { title: 'Technology', text: 'Powerful telescopes allow us to identify Earth-size planets in other systems.', icon: <Microscope className="text-blue-400" /> },
      { title: 'The Future', text: 'We may not have visited each other yet, but contact via signals could happen within 20 years.', icon: <Zap className="text-amber-400" /> }
    ],
    closing: "The universe is a pretty big place. If it's just us, seems like a terrible waste of space.",
    layout: 'summary',
    steps: 5,
    colorTheme: 'teal'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (slides[currentSlide].audio && currentStep === 1) {
      if (audioRef.current) {
        audioRef.current.src = slides[currentSlide].audio!;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    }
  }, [currentSlide, currentStep]);

  const nextAction = useCallback(() => {
    const slide = slides[currentSlide];
    if (currentStep < slide.steps) {
      setCurrentStep(prev => prev + 1);
    } else if (currentSlide < slides.length - 1) {
      let nextIndex = currentSlide + 1;
      // Skip hidden detail slides (index 2 and 3) in normal flow
      if (currentSlide === 1) {
        nextIndex = 4;
      }
      setCurrentSlide(nextIndex);
      setCurrentStep(0);
    }
  }, [currentSlide, currentStep]);

  const prevAction = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (currentSlide > 0) {
      let prevIndex = currentSlide - 1;
      // Skip hidden detail slides when coming back from slide index 4
      if (currentSlide === 4) {
        prevIndex = 1;
      }
      const prevSlide = slides[prevIndex];
      setCurrentSlide(prevIndex);
      setCurrentStep(prevSlide.steps);
    }
  }, [currentSlide, currentStep]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCurrentStep(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowDown') nextAction();
      if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp' || e.key === 'ArrowUp') prevAction();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, currentStep]);

  const slide = slides[currentSlide];
  const theme = getThemeColors(slide);

  const highlightText = (text: string, words: string[] | undefined) => {
    if (!words || words.length === 0) return text;
    let result = text;
    // Sort words by length descending to avoid partial matches
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
    
    sortedWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, (match) => `<span class="${theme.primary} font-black underline decoration-current/50 decoration-4 underline-offset-4">${match}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-[#0a0a0c] text-white font-sans selection:${theme.bg} selection:text-white cursor-pointer`} onClick={nextAction}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(10,10,12,0.95) 100%), url(${slide.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-6 md:px-12 h-full flex flex-col justify-center items-center text-center relative z-10">
            
            {/* Layout Rendering Logic */}
            {slide.layout === 'title' && (
              <div className="relative group">
                {currentStep >= 1 && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-3xl blur opacity-30`}></div>
                    <div className="relative px-8 py-12 md:px-20 md:py-24 bg-black/50 backdrop-blur-3xl rounded-3xl border border-white/10 ring-1 ring-white/20">
                      <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-6">{slide.title}</motion.h1>
                      {currentStep >= 2 && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={`h-1 w-24 ${theme.bg} mx-auto mb-8`} />}
                      {currentStep >= 2 && <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-xl md:text-3xl font-medium ${theme.primary}/90 uppercase tracking-[0.3em] mb-12`}>{slide.subtitle}</motion.p>}
                      {currentStep >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-[0.2em] text-gray-400 uppercase"><Info size={14} className={theme.primary} />{slide.footer}</motion.div>}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {slide.layout === 'questions' && (
              <div className="max-w-4xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-5xl md:text-6xl font-black tracking-tight text-white mb-12 flex items-center gap-4"><Users className={theme.primary} size={32} />{slide.header}</motion.h2>}
                <div className="grid gap-6">
                  {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                    <motion.div 
                      key={i} 
                      initial={{ x: 50, opacity: 0 }} 
                      animate={{ x: 0, opacity: 1 }} 
                      onClick={(e) => { 
                        if (typeof q !== 'string' && q.link !== undefined) {
                          e.stopPropagation();
                          goToSlide(q.link);
                        }
                      }}
                      className={`relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 ${typeof q !== 'string' && q.link !== undefined ? 'cursor-pointer hover:bg-white/10 group' : ''}`}
                    >
                      <p className="text-2xl italic text-gray-200">"{typeof q === 'string' ? q : q.q}"</p>
                      {typeof q !== 'string' && q.link !== undefined && (
                        <div className={`mt-4 flex items-center gap-2 ${theme.primary} text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                          Explore more <ChevronRight size={16} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'qa' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-12 flex items-center gap-6"><div className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">{slide.icon}</div>{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {currentStep >= 2 && <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-8 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-xl"><p className="text-3xl md:text-4xl font-light text-white leading-tight">{highlightText(slide.question!, slide.highlights)}</p></motion.div>}
                  {currentStep >= 3 && <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className={`p-8 md:p-12 ${theme.highlight} backdrop-blur-3xl rounded-[40px] border ${theme.border} ${theme.glow} shadow-2xl`}><p className="text-2xl md:text-3xl font-medium text-gray-100 leading-relaxed">{highlightText(slide.answer!, slide.highlights)}</p></motion.div>}
                  {currentStep >= 4 && slide.vocab && (
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-10 bg-black/40 backdrop-blur-2xl rounded-[32px] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                      {slide.vocab.map((v, i) => (<div key={i} className="flex flex-col gap-2"><span className={`${theme.primary} font-black tracking-wide text-3xl`}>{v.word}</span><span className="text-gray-300 text-xl leading-snug">{v.def}</span></div>))}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {slide.layout === 'vocabCheck' && (
              <div className="max-w-6xl w-full">
                {currentStep >= 1 && <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-5xl md:text-7xl font-black mb-16 tracking-tighter ${theme.primary}`}>{slide.header}</motion.h2>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {slide.vocabList?.map((item, i) => (
                    currentStep >= 1 && (
                      <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                        <span className="text-4xl">{item.icon}</span>
                        <div className="flex-1 flex justify-between items-center pr-4 border-l border-white/10 pl-6">
                          <span className="text-2xl text-gray-100 font-bold">{item.zh}</span>
                          <AnimatePresence>
                            {currentStep >= i + 2 && <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-4xl font-black ${theme.primary} tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]`}>{item.en}</motion.span>}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'fillBlanks' && (
              <div className="max-w-6xl w-full text-left overflow-y-auto max-h-[90vh] py-8">
                {currentStep >= 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                    <h2 className="text-5xl font-black mb-4">{slide.header}</h2>
                    <p className={`${theme.primary} font-bold uppercase tracking-widest text-sm mb-4`}>{slide.instruction}</p>
                    <div className="flex flex-wrap gap-3 p-6 bg-white/5 rounded-2xl border border-white/10 mb-6 backdrop-blur-sm shadow-xl">
                      <span className="text-white font-black mr-2 text-lg">Word Bank:</span>
                      {slide.wordBank?.map((word, i) => (
                        <span key={i} className={`px-4 py-2 ${theme.highlight} border ${theme.border} rounded-xl ${theme.primary} font-black text-xl tracking-wide`}>{word}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
                {currentStep >= 1 && (
                  <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-2xl relative">
                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
                      For a long time, we didn't know if other (1) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 2 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>intelligent</span> (2) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 3 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>beings</span> lived in space. However, scientists now believe that life (3) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 4 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>exists</span> in many (4) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 5 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>galaxies</span>. Using (5) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 6 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>powerful</span> tools, they have (6) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 7 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>identified</span> several Earth-like planets. (7) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 8 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>Despite</span> the huge (8) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 9 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>distance</span>, we might one day make (9) <span className={`inline-block border-b-4 mx-2 px-3 min-w-[140px] transition-all duration-700 ${currentStep >= 10 ? `border-current ${theme.primary} font-black` : 'border-gray-600 text-transparent'}`}>contact</span>.
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {slide.layout === 'scenario' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-5xl md:text-7xl font-black mb-16 tracking-tighter ${theme.primary} flex items-center gap-6`}>{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {slide.scenarios?.map((s, i) => (
                    <div key={i} className="space-y-8">
                      {currentStep >= 1 && (
                        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 flex gap-8 items-start shadow-xl">
                          <div className="p-4 bg-white/5 rounded-2xl">{s.icon}</div>
                          <p className="text-3xl md:text-4xl font-light leading-tight text-white">{s.q}</p>
                        </motion.div>
                      )}
                      {currentStep >= 2 && (
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`flex flex-wrap gap-6 items-center p-8 ${theme.highlight} border ${theme.border} rounded-3xl backdrop-blur-md`}>
                          <span className={`${theme.primary} font-black uppercase tracking-widest text-xl`}>Keywords to use:</span>
                          {s.keywords.map((word, idx) => (
                            <span key={idx} className="px-6 py-3 bg-black/40 rounded-xl text-white font-bold text-2xl border border-white/10">{word}</span>
                          ))}
                        </motion.div>
                      )}
                      {currentStep >= 3 && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-10 ${theme.highlight} rounded-[40px] border ${theme.border} ${theme.glow}`}>
                           <span className={`${theme.primary} font-black uppercase tracking-widest text-sm mb-4 block`}>Possible Answer:</span>
                           <p className="text-3xl italic font-medium text-white leading-relaxed">{highlightText(s.possibleAnswer!, s.keywords)}</p>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'history' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && (
                  <div className="mb-12 flex justify-between items-end">
                    <div>
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${theme.primary} font-bold tracking-[0.3em] uppercase text-sm mb-2 block`}>{slide.subHeader}</motion.span>
                      <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-7xl font-black tracking-tighter">{slide.header}</motion.h2>
                    </div>
                    {slide.returnTo !== undefined && (
                      <motion.button 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        onClick={(e) => { e.stopPropagation(); goToSlide(slide.returnTo!); }}
                        className={`px-6 py-3 ${theme.highlight} hover:bg-white/10 border ${theme.border} rounded-2xl ${theme.primary} font-black flex items-center gap-2 transition-all mb-4 outline-none focus:ring-4 focus:ring-current/50 focus:border-current`}
                      >
                        <ChevronLeft size={20} /> Back to Menu
                      </motion.button>
                    )}
                  </div>
                )}
                <div className="grid md:grid-cols-3 gap-6">
                  {slide.facts?.map((f, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl hover:bg-white/10 transition-colors">
                      <div className={`absolute top-0 left-0 w-1 h-full ${theme.bg} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}></div>
                      <span className={`text-xs font-black ${theme.primary} uppercase tracking-widest mb-6 block opacity-70`}>{f.label}</span>
                      <p className="text-xl md:text-2xl font-medium leading-snug text-gray-100">{f.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'risks' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-5xl md:text-7xl font-black mb-12 tracking-tight flex items-center gap-4"><AlertTriangle className="text-red-500" size={48} />{slide.header}</motion.h2>}
                <div className="space-y-4">
                  {slide.content?.map((item, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-8 rounded-3xl ${item.highlight ? 'bg-red-500/20 border-2 border-red-500' : 'bg-white/5 border border-white/10'}`}>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className={`text-xl font-black uppercase tracking-widest ${item.highlight ? 'text-red-400' : theme.primary}`}>{item.title}</h3>
                        <p className={`text-xl md:text-2xl ${item.highlight ? 'font-bold text-white' : 'text-gray-300'}`}>{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'predict' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-6xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-12 flex items-center gap-6`}>{slide.icon}{slide.header}</motion.h2>}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {currentStep >= 2 && <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"><p className="text-3xl font-light text-white leading-tight mb-0">{slide.task}</p></motion.div>}
                  {currentStep >= 3 && (
                    <ul className="space-y-4">
                      {slide.prompts?.map((p, i) => (
                        <motion.li key={i} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-6 p-5 bg-white/5 rounded-2xl border border-white/5 shadow-md">
                          <span className={`flex-shrink-0 w-10 h-10 rounded-full ${theme.highlight} border ${theme.border} flex items-center justify-center font-black ${theme.primary}`}>{i + 1}</span>
                          <p className="text-xl font-medium text-gray-200">{p}</p>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {slide.layout === 'discussion' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-8xl font-black mb-16 tracking-tighter flex items-center gap-6">{slide.icon}{slide.header}</motion.h2>}
                <div className="space-y-8">
                  {slide.questions?.map((q, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-10 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 flex gap-8 items-start shadow-xl">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        {typeof q !== 'string' ? q.icon : <HelpCircle />}
                      </div>
                      <p className="text-3xl font-light leading-tight text-white">
                        {typeof q === 'string' ? q : q.q}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {slide.layout === 'summary' && (
              <div className="max-w-5xl w-full text-left">
                {currentStep >= 1 && <motion.h2 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`text-6xl md:text-8xl font-black mb-16 tracking-tighter bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>{slide.header}</motion.h2>}
                <div className="grid gap-6 mb-16">
                  {slide.points?.map((p, i) => currentStep >= i + 2 && (
                    <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-6 items-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl">
                      <div className="p-3 bg-white/5 rounded-2xl">{p.icon}</div>
                      <div>
                        <h3 className={`text-2xl font-black ${theme.primary} uppercase tracking-widest`}>{p.title}</h3>
                        <p className="text-xl text-gray-300">{p.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {currentStep >= 5 && <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center"><p className={`text-3xl font-black italic ${theme.primary} ${theme.glow} px-8 py-4 ${theme.highlight} border ${theme.border} rounded-full inline-block`}>{slide.closing}</p></motion.div>}
              </div>
            )}
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS BAR - QUICK SWITCH (Subtle Design) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/4 z-50 px-4 group opacity-40 hover:opacity-100 transition-opacity duration-500">
        <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div 
            className={`absolute top-0 left-0 h-full ${theme.bg}/60`}
            initial={false}
            animate={{ width: `${(currentSlide / (slides.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-0">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
              className="w-3 h-3 rounded-full transition-all duration-300 relative group/dot"
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i <= currentSlide ? `${theme.primary}/60 scale-75` : 'bg-white/10 scale-50 group-hover/dot:scale-100 group-hover/dot:bg-white/30'}`} />
              {i === currentSlide && <div className={`absolute -inset-0.5 ${theme.bg}/20 rounded-full blur-sm`} />}
              <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono ${theme.primary}/80 border border-white/10 opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none whitespace-nowrap`}>P.{i + 1}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-12 z-50">
        <button onClick={(e) => { e.stopPropagation(); prevAction(); }} className="group relative p-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl">
          <ChevronLeft size={36} className={`relative z-10 text-gray-400 group-hover:${theme.primary} transition-colors`} />
        </button>
      </div>

      <div className="absolute bottom-12 right-12 z-50">
        <button onClick={(e) => { e.stopPropagation(); nextAction(); }} className="group relative p-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-2xl border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-2xl">
          <ChevronRight size={36} className={`relative z-10 text-gray-400 group-hover:${theme.primary} transition-colors`} />
        </button>
      </div>

      <div className={`absolute top-8 left-12 flex items-center gap-4 text-xs font-bold tracking-[0.4em] ${theme.primary}/60 uppercase`}>
        <div className={`w-12 h-[1px] ${theme.bg}/40`}></div>
        Presentation Mode
      </div>
      <div className="absolute top-8 right-12 text-sm font-mono tracking-[0.3em] text-white/30">
        <span className={`${theme.primary}/60 font-black`}>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
                <span className={`ml-4 text-[10px] ${theme.primary}/40 uppercase`}>Step {currentStep} / {slide.steps}</span>
              </div>
              <audio ref={audioRef} className="hidden" />
            </main>
          );
        }
        
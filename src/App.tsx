/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Facebook, 
  MapPin, 
  CheckCircle2, 
  Music, 
  Mic2, 
  Calendar, 
  Star, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
  Award,
  Users,
  DollarSign,
  Zap,
  Speaker
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-charcoal/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img src="logo.png" alt="7i Audio Logo" className="h-12 w-auto" referrerPolicy="no-referrer" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-brand-cyan transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-gradient-brand px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            Book Now <Phone size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-charcoal border-t border-white/10 py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium hover:text-brand-cyan transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-gradient-brand px-6 py-3 rounded-full text-center font-bold shadow-lg"
            >
              Book Now 📞
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    const particleCount = 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="palmera1.png" 
          alt="Event Setup" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-maroon/80 via-brand-charcoal/90 to-brand-charcoal"></div>
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img src="logo.png" alt="7i Audio" className="h-32 md:h-48 mx-auto drop-shadow-[0_0_30px_rgba(232,52,26,0.3)]" referrerPolicy="no-referrer" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-7xl font-display font-black mb-4 text-white text-glow-cyan"
        >
          LIGHTS AND SOUNDS SERVICES
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-3xl font-heading font-bold mb-8 text-brand-gold text-glow-gold"
        >
          Affordable & Quality — For Every Occasion
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm border border-white/20">
            <MapPin size={16} className="text-brand-cyan" /> San Pablo City, Lipa, Tanauan, Tiaong & Nearby Areas
          </span>
          <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm border border-white/20">
            <CheckCircle2 size={16} className="text-green-400" /> DTI Registered Business
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <a 
            href="#contact" 
            className="bg-gradient-brand px-10 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(232,52,26,0.4)] hover:scale-105 transition-transform animate-pulse flex items-center justify-center gap-2"
          >
            Book Your Event <Mic2 size={20} />
          </a>
          <a 
            href="#portfolio" 
            className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2"
          >
            See Our Work <Music size={20} />
          </a>
        </motion.div>

        {/* Soundwave Animation */}
        <div className="mt-20 flex justify-center items-end gap-1 h-12">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-brand-cyan soundwave-bar" 
              style={{ animationDelay: `${i * 0.1}s`, height: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: 'Birthday', desc: 'From intimate gatherings to grand celebrations', icon: '🎂' },
    { title: 'Debut', desc: 'Make her 18th unforgettable with premium sound', icon: '💃' },
    { title: 'Wedding', desc: 'Crystal-clear audio for your most important day', icon: '💍' },
    { title: 'School / Corporate Events', desc: 'Professional PA system for any venue', icon: '🏢' },
    { title: 'Reunion / Anniversary', desc: 'Relive memories with quality sound', icon: '🎉' },
    { title: 'And Other Occasions', desc: 'We set up wherever you need us', icon: '🎤' },
  ];

  return (
    <section id="services" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background Soundwave SVG */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,500 Q250,200 500,500 T1000,500" fill="none" stroke="white" strokeWidth="2" />
          <path d="M0,600 Q250,300 500,600 T1000,600" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">OUR SERVICES 🎛️</h2>
          <div className="w-24 h-1 bg-brand-cyan mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-brand-cyan transition-all group border-glow-cyan"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const events = [
    {
      title: 'Graduation Ceremony',
      location: 'Brgy Bitin National High School',
      date: 'March 30, 2026',
      desc: 'Full PA system and projection setup for school graduation ceremony',
      images: ['graduation1.png', 'graduation2.png', 'graduation3.png'],
      icon: '🎓'
    },
    {
      title: "Mr. Mili's 70th Birthday",
      location: "Palmera's Garden Restaurant, San Pablo City",
      date: 'February 14, 2026',
      desc: 'Complete lights, sounds, and DJ setup for an elegant 70th birthday celebration',
      images: ['palmera2.png', 'palmera3.png', 'palmera1.png'],
      icon: '🎂'
    },
    {
      title: "Vyco's 1st Birthday",
      location: "Carlito's Resort",
      date: 'August 9, 2025',
      desc: 'Sound system and LED lights for a vibrant forest-themed 1st birthday celebration',
      images: ['vyco1.png', 'vyco2.png', 'vyco3.png'],
      icon: '🎈'
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#121212]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">RECENT EVENTS 🔥</h2>
          <div className="w-24 h-1 bg-brand-red mx-auto"></div>
        </div>

        <div className="space-y-20">
          {events.map((event, index) => (
            <motion.div 
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <img 
                    src={event.images[0]} 
                    alt={event.title} 
                    className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(event.images[0])}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {event.images.slice(1).map((img, i) => (
                  <img 
                    key={i}
                    src={img} 
                    alt={event.title} 
                    className="w-full h-40 object-cover rounded-2xl cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(img)}
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{event.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-cyan">{event.title}</h3>
                    <p className="text-brand-gold font-heading">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                  <Calendar size={16} /> {event.date}
                </div>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  {event.desc}
                </p>
                <div className="flex gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex-1">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Equipment</p>
                    <p className="text-sm">Full PA System, LED Lights, DJ Setup</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-brand-cyan transition-colors">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    { title: 'Quality Equipment', desc: 'Professional-grade mixers, speakers, amplifiers, and lights', icon: <Speaker className="text-brand-cyan" /> },
    { title: 'Affordable Rates', desc: 'Premium sound without the premium price tag', icon: <DollarSign className="text-brand-gold" /> },
    { title: 'DTI Registered', desc: 'A legitimate, trusted business you can count on', icon: <Award className="text-brand-cyan" /> },
    { title: 'Family Run', desc: 'Personal, hands-on service with passion in every event', icon: <Users className="text-brand-gold" /> },
  ];

  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">WHY 7i AUDIO? ⚡</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center hover:border-brand-gold transition-all border-glow-gold"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,200 Q500,800 1000,200" fill="none" stroke="white" strokeWidth="1" />
          <path d="M0,400 Q500,1000 1000,400" fill="none" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">ABOUT 7i AUDIO 🎵</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              7i Audio was established in October 2022 with a passion for delivering high-quality audio and event solutions. Founded by Winis Reyes, together with his sons Jan Win Renald Reyes and John Fredrick Reyes, the business is built on family values, dedication, and a shared love for sound and event production.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-10">
              From small gatherings to large celebrations, 7i Audio aims to provide reliable, professional, and immersive audio experiences. With a hands-on approach and attention to detail, the team ensures every event is enhanced with clear sound, proper setup, and smooth execution. As a growing family-run business, 7i Audio continues to improve its services, invest in quality equipment, and prioritize customer satisfaction — making every event memorable through sound.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {['Winis Reyes (Founder)', 'John Fredrick Reyes', 'Jan Win Renald Reyes'].map(name => (
                <span key={name} className="bg-brand-maroon/50 px-4 py-2 rounded-full text-sm font-medium border border-brand-maroon">
                  {name}
                </span>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-6 py-3 rounded-xl border border-green-500/20">
              <CheckCircle2 size={20} />
              <span className="font-bold uppercase tracking-widest">DTI Registered Business</span>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-brand opacity-20 blur-2xl rounded-full"></div>
              <img 
                src="1775815897023_image.png" 
                alt="7i Audio Flyer" 
                className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServiceAreas = () => {
  const areas = ['Alaminos', 'San Pablo City', 'Tiaong', 'Sto. Tomas', 'Tanauan', 'Malvar', 'Lipa City', 'And Nearby Areas'];

  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">WE SERVE THESE AREAS 📍</h2>
          <p className="text-brand-gold font-heading text-xl">Laguna & Batangas Province — and beyond!</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 p-6 rounded-xl border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors"
            >
              <MapPin className="text-brand-cyan shrink-0" size={20} />
              <span className="font-medium">{area}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "The sound was perfect throughout the whole event. Super clear ang vocals at walang feedback! Highly recommend 7i Audio.", author: "Birthday Client, San Pablo City" },
    { text: "Very professional ang team. On time ang setup, maayos ang lights, at nag-enjoy talaga ang mga bisita namin.", author: "Graduation Event Organizer" },
    { text: "Affordable pero hindi mapapansin na mura dahil grabe ang quality. Worth every peso!", author: "Resort Event Client" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">WHAT CLIENTS SAY 🎤</h2>
          <div className="w-24 h-1 bg-brand-cyan mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-8 rounded-2xl border border-white/10 border-glow-cyan relative"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-brand-gold text-brand-gold" />)}
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">"{r.text}"</p>
              <p className="text-brand-cyan font-bold text-sm">— {r.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">BOOK YOUR EVENT 📞</h2>
          <div className="w-24 h-1 bg-gradient-brand mx-auto"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-brand-red/30 border-glow-gold">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-brand-gold" /> Contact Info
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-red/20 rounded-full flex items-center justify-center text-brand-red">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Call/Text</p>
                    <p className="font-bold">0960 311 6481</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Facebook</p>
                    <p className="font-bold">7i audio</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-cyan/20 rounded-full flex items-center justify-center text-brand-cyan">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Serving</p>
                    <p className="font-bold text-sm">San Pablo City, Lipa, Tanauan & Nearby</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <form className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Contact Number</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors" placeholder="09XX XXX XXXX" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Event Type</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors appearance-none">
                    <option className="bg-brand-charcoal">Birthday</option>
                    <option className="bg-brand-charcoal">Debut</option>
                    <option className="bg-brand-charcoal">Wedding</option>
                    <option className="bg-brand-charcoal">School Event</option>
                    <option className="bg-brand-charcoal">Corporate</option>
                    <option className="bg-brand-charcoal">Reunion</option>
                    <option className="bg-brand-charcoal">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Event Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Venue/Location</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors" placeholder="Event Venue" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-cyan outline-none transition-colors" placeholder="Tell us more about your event..."></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-brand py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-[0_0_20px_rgba(232,52,26,0.4)] transition-all animate-pulse"
              >
                Send Inquiry 🚀
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] py-16 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
          <div className="text-center md:text-left">
            <img src="logo.png" alt="7i Audio" className="h-16 mx-auto md:mx-0 mb-4" referrerPolicy="no-referrer" />
            <p className="text-gray-500 max-w-xs">Making Every Event Memorable Through Sound 🎵</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-brand-cyan">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-brand-gold">Service Areas</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>San Pablo City</li>
                <li>Lipa City</li>
                <li>Tanauan</li>
                <li>Tiaong</li>
              </ul>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-cyan transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-red transition-colors">
                <Phone size={20} />
              </a>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/10 text-xs">
              <CheckCircle2 size={14} className="text-green-400" /> DTI Registered
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          <p>© 2025 7i Audio Lights and Sounds Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-brand-charcoal text-white selection:bg-brand-cyan selection:text-brand-charcoal">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <WhyChooseUs />
      <AboutUs />
      <ServiceAreas />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

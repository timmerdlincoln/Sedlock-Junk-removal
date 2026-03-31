import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, Truck, Shield, Star, Quote, ChevronRight, Sparkles, Trash2, Recycle, Leaf, Package, Monitor, Sofa, Coffee, Archive, FileText, Headphones, Box, Smartphone, Tv, Speaker } from 'lucide-react';
import React, { useRef, useState, useMemo, useEffect } from 'react';

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#021631]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex flex-col items-start justify-center hover:opacity-90 transition-opacity">
          <span className="font-black text-[22px] tracking-tighter text-white leading-none">SEDLOCK</span>
          <span className="font-serif text-[14px] text-white leading-none mt-0.5">
            J
            <span className="relative inline-block px-[0.5px]">
              <span className="absolute -top-[2px] left-1/2 -translate-x-1/2 flex flex-col items-center w-[110%]">
                <span className="w-1 h-[1px] bg-white"></span>
                <span className="w-full h-[1px] bg-white mt-[0.5px]"></span>
              </span>
              u
            </span>
            nk Removal
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
        </div>
        <a href="#contact" className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-white/90 transition-colors">
          Get a Quote
        </a>
      </div>
    </nav>
  );
}

function AnimatedLinesBackground() {
  const lines = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: `line-${i}`,
    width: Math.random() * 2 + 2,
    height: Math.random() * 50 + 50,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * -30,
    opacity: Math.random() * 0.3 + 0.2,
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-gradient-to-b from-transparent via-white/30 to-transparent"
          style={{
            width: `${line.width}px`,
            height: `${line.height}vh`,
            left: `${line.left}%`,
            opacity: line.opacity,
            top: '-50%',
          }}
          animate={{
            y: ['0vh', '150vh'],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [cycleKey, setCycleKey] = useState(0);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    setClearing(false);
    const clearTimer = setTimeout(() => setClearing(true), 5000);
    const resetTimer = setTimeout(() => setCycleKey((k: number) => k + 1), 5800);
    return () => {
      clearTimeout(clearTimer);
      clearTimeout(resetTimer);
    };
  }, [cycleKey]);

  const junkIcons = [Package, Monitor, Sofa, Coffee, Archive, FileText, Headphones, Box, Smartphone, Tv, Speaker, Trash2, Leaf];
  const START_Y = -15;
  const fallingJunk = useMemo(() => Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    Icon: junkIcons[i % junkIcons.length],
    size: Math.random() * 18 + 14,
    landX: Math.random() * 24 + 38,
    landY: Math.random() * 10 + 57,
    delay: (i / 35) * 3.5,
    rotation: Math.random() * 340 - 170,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), [cycleKey]);

  return (
    <section ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white text-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-radial-faded" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob" />

      {/* Trailer Back */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full max-w-[800px] aspect-[2/1] pointer-events-none z-0 opacity-80">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M150 100 L650 100 L600 300 L200 300 Z" fill="#020408" />
          <path d="M100 120 L150 100 L200 300 L180 320 Z" fill="#05080f" />
          <path d="M700 120 L650 100 L600 300 L620 320 Z" fill="#05080f" />
        </svg>
      </div>

      {/* Falling Junk — pile up then clear */}
      <motion.div
        key={cycleKey}
        animate={{ opacity: clearing ? 0 : 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      >
        {fallingJunk.map((item) => {
          const Icon = item.Icon;
          const yTravel = item.landY - START_Y;
          return (
            <motion.div
              key={item.id}
              className="absolute text-slate-700/80"
              style={{ left: `${item.landX}vw`, top: `${START_Y}vh` }}
              initial={{ y: 0, opacity: 0, rotate: 0 }}
              animate={{ y: `${yTravel}vh`, opacity: 1, rotate: item.rotation }}
              transition={{
                y: { duration: 1.3, delay: item.delay, ease: [0.3, 0, 0.8, 1] },
                opacity: { duration: 0.15, delay: item.delay },
                rotate: { duration: 1.3, delay: item.delay, ease: 'easeOut' },
              }}
            >
              <Icon size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trailer Front */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full max-w-[800px] aspect-[2/1] pointer-events-none z-0 opacity-90">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M100 120 L700 120 L620 320 L180 320 Z" fill="#0a0f1c" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <path d="M100 120 L700 120" stroke="#3b82f6" strokeWidth="4" opacity="0.3" />
          <circle cx="280" cy="320" r="45" fill="#000000" stroke="#0f172a" strokeWidth="8" />
          <circle cx="280" cy="320" r="20" fill="#1e293b" />
          <circle cx="520" cy="320" r="45" fill="#000000" stroke="#0f172a" strokeWidth="8" />
          <circle cx="520" cy="320" r="20" fill="#1e293b" />
          <path d="M700 280 L780 280" stroke="#0a0f1c" strokeWidth="16" strokeLinecap="round" />
          <path d="M770 280 L770 320" stroke="#0a0f1c" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <div className="absolute inset-0 bg-white/40 blur-3xl -z-10 rounded-[100px]" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-black drop-shadow-sm"
        >
          Clear the Clutter.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-700">
            Reclaim Your Space.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-800 max-w-2xl mb-10 font-medium drop-shadow-sm"
        >
          Fast, eco-friendly, and transparent junk removal. Fill out our form below or call us directly to get a quote, and we'll haul it away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a href="#contact" className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-lg font-medium text-lg overflow-hidden transition-transform hover:scale-[1.02] shadow-lg shadow-black/20">
            <span className="relative z-10 flex items-center gap-2">
              Get Instant Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black opacity-20 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 rounded-lg font-medium text-lg border border-black/20 bg-white/95 hover:bg-white transition-colors backdrop-blur-md text-black shadow-sm text-center">
            View Services
          </a>
        </motion.div>
      </motion.div>

      {/* Fade to blue background at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-white/0 to-[#021631] pointer-events-none z-20" />
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Sparkles className="text-blue-400" size={24} />,
      title: "1. Get in Contact",
      desc: "Fill out our form below to get a call booked."
    },
    {
      icon: <Clock className="text-purple-400" size={24} />,
      title: "2. Receive a Quote/Book",
      desc: "Receive a call from a tech, who will provide you with a no-hidden-fee quote. Then, book a time that's best for you."
    },
    {
      icon: <Truck className="text-green-400" size={24} />,
      title: "3. We Haul It Away",
      desc: "Our professional team arrives on time, does all the heavy lifting, and cleans up after."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">A seamless approach to getting rid of your unwanted items.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card hover-glow p-8 rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <motion.div
                  variants={{
                    hover: {
                      y: [0, -4, 0],
                      rotate: [0, -5, 5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { title: "Residential Junk", icon: <Trash2 size={20} />, desc: "Furniture, appliances, yard waste, and general household clutter." },
    { title: "Commercial Cleanouts", icon: <Shield size={20} />, desc: "Office furniture, construction debris, and retail cleanouts." },
    { title: "Eco-Friendly Recycling", icon: <Recycle size={20} />, desc: "We sort and recycle up to 70% of what we haul away." },
    { title: "Yard Waste Removal", icon: <Leaf size={20} />, desc: "Branches, clippings, dirt, and old landscaping materials." },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Services</h2>
            <p className="text-white/60 text-lg max-w-xl">Removal solutions tailored to your needs.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-gradient-to-br hover:from-[#042A5E] hover:to-[#021631] hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer flex items-start gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/5 transition-colors duration-300" />

              <div className="relative mt-1 p-3 rounded-lg bg-white/5 text-white/80 group-hover:text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                {service.icon}
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-white/20 via-blue-400/20 to-transparent blur-[100px] rounded-full opacity-50 pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-white">Simple, No-Surprise Pricing</h2>

        <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

          <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed mb-8">
            Every job is unique, but most cleanouts land between <span className="text-white font-bold not-italic text-2xl md:text-3xl">$175</span> and <span className="text-white font-bold not-italic text-2xl md:text-3xl">$475</span>. Your custom quote is based simply on the space your items take up.
          </p>

          <div className="text-left max-w-xl mx-auto bg-white/5 p-6 md:p-8 rounded-2xl border border-white/5">
            <h3 className="text-lg md:text-xl font-medium text-white/90 mb-5 italic font-serif text-center">What goes into your final quote?</h3>

            <ul className="space-y-4 text-base md:text-lg text-white/80 italic font-serif">
              <li className="flex items-start gap-4">
                <span className="font-bold not-italic text-blue-400 mt-0.5">1.</span>
                <span><span className="font-semibold not-italic text-white">Volume</span> — How much room your items take up in our truck.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold not-italic text-blue-400 mt-0.5">2.</span>
                <span><span className="font-semibold not-italic text-white">Weight</span> — Dense materials like concrete or dirt cost a bit more to haul.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold not-italic text-blue-400 mt-0.5">3.</span>
                <span><span className="font-semibold not-italic text-white">Accessibility</span> — Flights of stairs, tight corners, or long walks to the curb.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#021631] rounded-lg font-medium hover:bg-white/90 transition-colors shadow-lg shadow-white/10">
              Get Your Free Quote <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  const team = [
    { name: "Founder", role: "LOGISTICS", image: "https://i.postimg.cc/d0vdxfwq/Screenshot-2026-03-30-at-10-16-20-PM.png" },
    { name: "Co-Founder", role: "OPERATIONS", image: "https://i.postimg.cc/0Npn6m2m/Screenshot-2026-03-30-at-10-16-38-PM.png" }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Meet the team <span className="text-white/40">building the<br />future of junk removal</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-4 text-center">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-white/5 max-w-[280px] mx-auto">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-all duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-32 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-8">Why Choose Us?</h3>
          <p className="text-lg md:text-2xl text-white/80 italic font-serif leading-relaxed mb-6">
            Sedlock Junk Removal is a locally owned, student-run junk removal service based in Indianola, Iowa.
            We provide fast, affordable cleanouts with straightforward pricing and no hidden fees.
          </p>
          <p className="text-lg md:text-2xl text-white/80 italic font-serif leading-relaxed">
            Real people. No corporate upsells. Just reliable service when you need it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      text: "These two men were very professional showed up on time , even did extra work when asked outside of what they already had contracted to do. They work quickly and got the job done and cleaned up after themselves.I highly recommend these guys.If you need some stuff , moved around or disposed of.",
      author: "Leasa Collins Garrett",
      role: "Recommends Sedlock Junk Removal",
      avatar: "https://i.postimg.cc/MHVdCK9c/Cat.jpg"
    },
    {
      text: "We used Sedlock Junk Removal to get outdoor junk and yard debris removed. They were quick to answer and fast to fit us in. I would recommend!",
      author: "Paige Villalobos",
      role: "Recommends Sedlock Junk Removal",
      avatar: "https://i.postimg.cc/htr34vcx/Paige.jpg"
    },
    {
      text: "very polite and professional. Right on time. No dings on the walls getting the sofa down the 18 steps!!",
      author: "Cathy Williams",
      role: "Recommends Sedlock Junk Removal",
      avatar: "https://i.postimg.cc/hP82MvzX/cathy.jpg"
    },
    {
      text: "They took care of my couch! Very professional and quick!",
      author: "Zach Kline",
      role: "Recommends Sedlock Junk Removal",
      avatar: "https://i.postimg.cc/rFy4XwZt/zach.jpg"
    }
  ];

  return (
    <section id="reviews" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm mb-6">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>4.9/5 Average Rating</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Customer Reviews</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl hover-glow"
            >
              <Quote size={24} className="text-white/20 mb-6" />
              <p className="text-white/80 leading-relaxed mb-8 text-sm md:text-base">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-medium text-sm">{review.author}</div>
                  <div className="text-white/50 text-xs">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const serviceOptions = [
    'Residential Junk Removal',
    'Commercial Cleanout',
    'Yard Waste Removal',
    'Appliance Removal',
    'Furniture Removal',
    'Construction Debris',
    'Other'
  ];

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Enter a valid phone number';
    if (!formData.message.trim()) newErrors.message = 'Tell us what you need removed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('https://formspree.io/f/maqljawq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: selectedService || 'Not specified',
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error('Form submission failed');

      setIsSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setSelectedService('');
      setTimeout(() => setIsSubmitted(false), 6000);
    } catch (err) {
      console.error('Submit error:', err);
      setErrors({ message: 'Failed to send — please call us directly at (913) 416-3819' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (field: string) =>
    `w-full bg-[#010E21]/60 border ${errors[field] ? 'border-red-400/60' : 'border-white/10'} rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 transition-all placeholder:text-white/25`;

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-500/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column */}
          <div className="md:sticky md:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70">Available 7 days a week</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Ready to clear<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">the clutter?</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
                Get your free, no-obligation quote. We'll call you back within the hour to schedule a time that works for you.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 mb-10"
            >
              <a href="tel:9134163819" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                <div className="w-11 h-11 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-0.5">Call or text</div>
                  <div className="text-white font-medium">(913) 416-3819</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </a>

              <a href="mailto:timsedlock1@gmail.com" className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                <div className="w-11 h-11 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-0.5">Email us</div>
                  <div className="text-white font-medium">timsedlock1@gmail.com</div>
                </div>
                <ChevronRight size={16} className="ml-auto text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>

            {/* Service area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-xl border border-white/10 bg-white/5"
            >
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-sm font-medium text-white/80">Service Area</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Indianola, Des Moines, and surrounding areas in Central Iowa. Not sure if we cover your area? Just ask — we're happy to help.
              </p>
            </motion.div>
          </div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="glass-card p-7 md:p-8 rounded-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-2xl pointer-events-none" />

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-500/10"
                  >
                    <CheckCircle2 size={36} />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
                  <p className="text-white/60 text-sm max-w-xs mx-auto">We received your request and will call you back within the hour to discuss your quote.</p>
                </motion.div>
              ) : (
                <div className="relative">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">Get Your Free Quote</h3>
                    <p className="text-sm text-white/40">Fill out the form and we'll get back to you ASAP.</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-white/50 mb-1.5 block">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputClasses('firstName')} placeholder="John" />
                        {errors.firstName && <span className="text-xs text-red-400 mt-1 block">{errors.firstName}</span>}
                      </div>
                      <div>
                        <label className="text-xs font-medium text-white/50 mb-1.5 block">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputClasses('lastName')} placeholder="Doe" />
                        {errors.lastName && <span className="text-xs text-red-400 mt-1 block">{errors.lastName}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/50 mb-1.5 block">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClasses('email')} placeholder="john@example.com" />
                      {errors.email && <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/50 mb-1.5 block">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handlePhoneChange} className={inputClasses('phone')} placeholder="(555) 000-0000" maxLength={14} />
                      {errors.phone && <span className="text-xs text-red-400 mt-1 block">{errors.phone}</span>}
                    </div>

                    {/* Service type selector */}
                    <div>
                      <label className="text-xs font-medium text-white/50 mb-2 block">What do you need removed?</label>
                      <div className="flex flex-wrap gap-2">
                        {serviceOptions.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(selectedService === service ? '' : service)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selectedService === service
                                ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white/70'
                              }`}
                          >
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-white/50 mb-1.5 block">Message</label>
                      <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className={`${inputClasses('message')} resize-none`} placeholder="Tell us what you need removed, roughly how much there is, and any access details (stairs, narrow hallways, etc.)..." />
                      {errors.message && <span className="text-xs text-red-400 mt-1 block">{errors.message}</span>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 mt-2 rounded-lg bg-white text-[#021631] font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message <ArrowRight size={16} /></>
                      )}
                    </button>

                    <p className="text-xs text-white/30 text-center pt-1">
                      No spam, ever. We'll only use your info to follow up on your request.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WorkDone() {
  const projects = [
    {
      title: "Trailer Cleanout",
      image: "https://i.postimg.cc/QtFG5hVC/IMG-9814-4.avif"
    },
    {
      title: "Closet Cleanout",
      image: "https://i.postimg.cc/Y0Bn9HFr/IMG-9838-3.avif"
    },
    {
      title: "Basement Cleanout",
      image: "https://i.postimg.cc/V6ng2VVT/IMG-9842-3.avif"
    },
    {
      title: "Storage Cleanout",
      image: "https://i.postimg.cc/Zq36qyxw/IMG-9841-3.avif"
    },
    {
      title: "Yard Debris Removal",
      image: "https://i.postimg.cc/85NfPXC9/IMG-9839-3.avif"
    }
  ];

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Work</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">See the difference we can make. Here are some of our recent cleanouts.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 group shadow-lg flex items-center justify-center"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'Residential Junk', href: '#services' },
      { label: 'Commercial Cleanouts', href: '#services' },
      { label: 'Yard Waste Removal', href: '#services' },
      { label: 'Eco-Friendly Recycling', href: '#services' },
    ],
    company: [
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Reviews', href: '#reviews' },
      { label: 'About Us', href: '#about' },
    ],
    areas: [
      'Indianola',
      'Des Moines',
      'Norwalk',
      'Carlisle',
      'Pleasant Hill',
    ]
  };

  return (
    <footer className="relative z-10 border-t border-white/10">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-blue-600/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Got junk? Let's get rid of it.</h3>
            <p className="text-sm text-white/50">Free quotes · No hidden fees · Same-week pickup</p>
          </div>
          <a href="#contact" className="shrink-0 px-6 py-2.5 bg-white text-[#021631] rounded-lg font-medium text-sm hover:bg-white/90 transition-colors shadow-lg shadow-white/10 flex items-center gap-2">
            Get a Quote <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex flex-col items-start justify-center mb-4 hover:opacity-90 transition-opacity">
              <span className="font-black text-[22px] tracking-tighter text-white leading-none">SEDLOCK</span>
              <span className="font-serif text-[14px] text-white leading-none mt-0.5">
                J
                <span className="relative inline-block px-[0.5px]">
                  <span className="absolute -top-[2px] left-1/2 -translate-x-1/2 flex flex-col items-center w-[110%]">
                    <span className="w-1 h-[1px] bg-white"></span>
                    <span className="w-full h-[1px] bg-white mt-[0.5px]"></span>
                  </span>
                  u
                </span>
                nk Removal
              </span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-5">
              Locally owned, student-run junk removal serving Indianola and the greater Des Moines area.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61574228498498" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/40 hover:text-white/80 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">Service Areas</h4>
            <ul className="space-y-2.5">
              {footerLinks.areas.map((area) => (
                <li key={area}>
                  <span className="text-sm text-white/40">{area}, IA</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/30">
            © {currentYear} Sedlock Junk Removal. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="min-h-screen bg-[#021631] text-white selection:bg-white/30"
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      <AnimatedLinesBackground />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Services />
        <Pricing />
        <Testimonials />
        <AboutUs />
        <WorkDone />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

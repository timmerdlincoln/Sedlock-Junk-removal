import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Clock, Truck, Shield, Star, Quote, ChevronRight, Sparkles, Trash2, Recycle, Leaf, Package, Monitor, Sofa, Coffee, Archive, FileText, Headphones, Box, Smartphone, Tv, Speaker } from 'lucide-react';
import React, { useRef, useState, useMemo } from 'react';

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

  const junkIcons = [Package, Monitor, Sofa, Coffee, Archive, FileText, Headphones, Box, Smartphone, Tv, Speaker, Trash2, Leaf];
  const fallingJunk = useMemo(() => Array.from({ length: 80 }).map((_, i) => {
    const fallDuration = Math.random() * 2 + 1.5; // 1.5s to 3.5s
    const waitDuration = 3; // wait 3 seconds
    const leaveDuration = Math.random() * 4 + 4; // 4s to 8s to slowly leave
    const totalDuration = fallDuration + waitDuration + leaveDuration;
    
    const t1 = fallDuration / totalDuration;
    const t2 = (fallDuration + waitDuration) / totalDuration;

    return {
      id: `junk-${i}`,
      Icon: junkIcons[i % junkIcons.length],
      size: Math.random() * 24 + 16,
      startX: Math.random() * 26 + 37, // 37vw to 63vw (tighter inside trailer)
      endX: Math.random() * 26 + 37,
      startY: -20, // -20vh
      endY: Math.random() * 12 + 56, // 56vh to 68vh (trailer bed)
      leaveY: 120, // fall off screen
      duration: totalDuration,
      times: [0, t1, t2, 1],
      delay: Math.random() * -totalDuration,
      rotation: Math.random() * 360,
    };
  }), []);

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

      {/* Falling Junk */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {fallingJunk.map((item) => {
          const Icon = item.Icon;
          return (
            <motion.div
              key={item.id}
              className="absolute text-slate-700/80"
              style={{
                left: `${item.startX}vw`,
                top: `${item.startY}vh`,
              }}
              animate={{
                y: [`0vh`, `${item.endY - item.startY}vh`, `${item.endY - item.startY}vh`, `${item.leaveY}vh`],
                x: [`0vw`, `${item.endX - item.startX}vw`, `${item.endX - item.startX}vw`, `${item.endX - item.startX}vw`],
                rotate: [0, item.rotation, item.rotation, item.rotation + 180],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: item.duration,
                times: item.times,
                repeat: Infinity,
                delay: item.delay,
                ease: "linear",
              }}
            >
              <Icon size={item.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

      {/* Trailer Front */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-full max-w-[800px] aspect-[2/1] pointer-events-none z-0 opacity-90">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M100 120 L700 120 L620 320 L180 320 Z" fill="#0a0f1c" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <path d="M100 120 L700 120" stroke="#3b82f6" strokeWidth="4" opacity="0.3" />
          <circle cx="280" cy="320" r="45" fill="#000000" stroke="#0f172a" strokeWidth="8"/>
          <circle cx="280" cy="320" r="20" fill="#1e293b" />
          <circle cx="520" cy="320" r="45" fill="#000000" stroke="#0f172a" strokeWidth="8"/>
          <circle cx="520" cy="320" r="20" fill="#1e293b" />
          <path d="M700 280 L780 280" stroke="#0a0f1c" strokeWidth="16" strokeLinecap="round"/>
          <path d="M770 280 L770 320" stroke="#0a0f1c" strokeWidth="8" strokeLinecap="round"/>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to clear<br />the clutter?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-md">
              Get your free quote today. We're available 7 days a week for all your junk removal needs.
            </p>
            
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <img src="https://i.postimg.cc/FsDN89w7/Screenshot-2026-03-31-at-11-10-53-AM.png" alt="Contact" className="w-10 h-10 rounded-full object-cover object-top border border-white/10" />
                <span>(913) 416-3819</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://i.postimg.cc/FsDN89w7/Screenshot-2026-03-31-at-11-10-53-AM.png" alt="Contact" className="w-10 h-10 rounded-full object-cover object-top border border-white/10" />
                <span>timsedlock1@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 max-w-md mx-auto w-full">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Message Sent!</h3>
                <p className="text-white/60 text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">First Name</label>
                    <input type="text" name="firstName" className="w-full bg-[#010E21]/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="John" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Last Name</label>
                    <input type="text" name="lastName" className="w-full bg-[#010E21]/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">Email</label>
                  <input type="email" name="email" className="w-full bg-[#010E21]/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="john@example.com" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">Phone Number</label>
                  <input type="tel" name="phone" className="w-full bg-[#010E21]/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors" placeholder="(555) 000-0000" required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/60">Message</label>
                  <textarea name="message" rows={3} className="w-full bg-[#010E21]/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none" placeholder="Tell us what you need removed..." required></textarea>
                </div>
                <button type="submit" className="w-full py-2.5 mt-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors">
                  Send Message
                </button>
              </form>
            )}
          </div>
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
  return (
    <footer className="border-t border-white/10 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-start justify-center">
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
        </div>
        <div className="text-sm text-white/40">
          © {new Date().getFullYear()} Sedlock Junk Removal. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
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
